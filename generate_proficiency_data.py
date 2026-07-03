"""
Parses proficiency-test.lua and generates:
  - proficiency-pokemon-data.js  (proficiencyPokemonMap)
  - pokemon-proficiency-level-data.js  (pokemonProficiencyLevelMap)
"""

import re
import json
import os
import sys

DEFAULT_LUA_FILES = ["proficiencyFinal.lua", "proficiency-test.lua"]

if len(sys.argv) > 1:
    LUA_FILE = sys.argv[1]
else:
    LUA_FILE = next((path for path in DEFAULT_LUA_FILES if os.path.exists(path)), "proficiencyFinal.lua")

# ---------- Step 1: Build constant name -> id map ----------
const_map = {}  # e.g. {"PROFICIENCY_DAMAGE_REDUCTION_10_PERCENT": 9, ...}
const_pattern = re.compile(r'^(\w+)\s*=\s*(\d+)\s*--')

with open(LUA_FILE, encoding="utf-8") as f:
    lines = f.readlines()

for line in lines:
    m = const_pattern.match(line.strip())
    if m:
        name, val = m.group(1), int(m.group(2))
        const_map[name] = val

print(f"Loaded {len(const_map)} proficiency constants.")

# ---------- Step 2: Parse PROFICIENCY_OPTIONS ----------
# Maps pokemon_id -> {level -> [proficiency_ids]}
pokemon_options = {}  # {int: {int: [int]}}

# State machine
current_pokemon_id = None
current_level = None
in_options = False

poke_start   = re.compile(r'\[(\d+)\]\s*=\s*\{\s*--\s*(.+)')
level_data   = re.compile(r'\[(\d+)\]\s*=\s*\{([^}]*)\}')

for line in lines:
    stripped = line.strip()

    if stripped.startswith("PROFICIENCY_OPTIONS"):
        in_options = True
        continue

    if not in_options:
        continue

    # Pokemon entry: [123] = { -- Pikachu
    pm = poke_start.match(stripped)
    if pm:
        current_pokemon_id = int(pm.group(1))
        pokemon_options[current_pokemon_id] = {}
        continue

    # Level entry: [1] = {PROFICIENCY_X, PROFICIENCY_Y, ...}
    lm = level_data.match(stripped)
    if lm and current_pokemon_id is not None:
        level = int(lm.group(1))
        content = lm.group(2).strip()
        if content:
            consts = [c.strip() for c in content.split(",") if c.strip()]
            ids = []
            for c in consts:
                if c in const_map:
                    ids.append(const_map[c])
                else:
                    print(f"  WARNING: unknown constant '{c}' in pokemon {current_pokemon_id} level {level}")
            pokemon_options[current_pokemon_id][level] = ids
        else:
            pokemon_options[current_pokemon_id][level] = []

print(f"Parsed {len(pokemon_options)} Pokemon entries.")

# ---------- Step 3: Build pokemon name map ----------
# We also need pokemon names – extract them from the Lua comments
pokemon_names = {}  # {int: str}
for line in lines:
    stripped = line.strip()
    pm = poke_start.match(stripped)
    if pm:
        pid = int(pm.group(1))
        name = pm.group(2).strip().rstrip(",}")
        pokemon_names[pid] = name

# ---------- Step 4: Build proficiencyPokemonMap ----------
# Maps proficiency_id -> [pokemon_names]  (only levels 1-9 non-empty)
prof_pokemon_map = {}  # {int: set(str)}

for pid, levels in pokemon_options.items():
    name = pokemon_names.get(pid, f"Unknown#{pid}")
    for level, prof_ids in levels.items():
        for prof_id in prof_ids:
            if prof_id not in prof_pokemon_map:
                prof_pokemon_map[prof_id] = []
            if name not in prof_pokemon_map[prof_id]:
                prof_pokemon_map[prof_id].append(name)

# Sort pokemon names inside each proficiency entry
for k in prof_pokemon_map:
    prof_pokemon_map[k].sort()

print(f"Built proficiencyPokemonMap with {len(prof_pokemon_map)} entries.")

# ---------- Step 5: Build pokemonProficiencyLevelMap ----------
# Maps pokemon_name -> {L1: [...], L2: [...], ...}
pokemon_level_map = {}

for pid, levels in pokemon_options.items():
    name = pokemon_names.get(pid, f"Unknown#{pid}")
    # Only include Pokemon that have at least one non-empty level
    has_data = any(ids for ids in levels.values())
    if not has_data:
        continue
    entry = {}
    for level in range(1, 10):
        ids = levels.get(level, [])
        if ids:
            entry[f"L{level}"] = ids
    if entry:
        pokemon_level_map[name] = entry

# ---------- Step 5b: Build pokemonProficiencyMap (flat: name -> all prof IDs) ----------
pokemon_flat_map = {}  # {name: sorted list of unique prof IDs}

for pid, levels in pokemon_options.items():
    name = pokemon_names.get(pid, f"Unknown#{pid}")
    all_ids = set()
    for level, ids in levels.items():
        all_ids.update(ids)
    if all_ids:
        pokemon_flat_map[name] = sorted(all_ids)

print(f"Built pokemonProficiencyLevelMap with {len(pokemon_level_map)} Pokemon.")
print(f"Built pokemonProficiencyMap (flat) with {len(pokemon_flat_map)} Pokemon.")

# ---------- Step 6: Write JS files ----------
with open("proficiency-pokemon-data.js", "w", encoding="utf-8") as f:
    f.write(f"// Auto-generated from {LUA_FILE}\n")
    f.write("// Maps proficiency ID -> array of Pokemon names that can learn it\n")
    f.write("const proficiencyPokemonMap = ")
    # Convert keys to numbers in output
    out = {int(k): v for k, v in prof_pokemon_map.items()}
    # Sort by key
    sorted_out = dict(sorted(out.items()))
    f.write(json.dumps(sorted_out, ensure_ascii=False, indent=2))
    f.write(";\n")

print("Wrote proficiency-pokemon-data.js")

with open("pokemon-proficiency-level-data.js", "w", encoding="utf-8") as f:
    f.write(f"// Auto-generated from {LUA_FILE}\n")
    f.write("// Maps Pokemon name -> proficiency IDs by level (L1..L9)\n")
    f.write("const pokemonProficiencyLevelMap = ")
    sorted_map = dict(sorted(pokemon_level_map.items()))
    f.write(json.dumps(sorted_map, ensure_ascii=False, indent=2))
    f.write(";\n\n")
    f.write("// Maps Pokemon name -> flat array of all proficiency IDs\n")
    f.write("const pokemonProficiencyMap = ")
    sorted_flat = dict(sorted(pokemon_flat_map.items()))
    f.write(json.dumps(sorted_flat, ensure_ascii=False, indent=2))
    f.write(";\n")

print("Wrote pokemon-proficiency-level-data.js")
print("Done!")
