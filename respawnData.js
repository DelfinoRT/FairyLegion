// respawnData.js
const respawnData = [
    {
        level: 350,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=6F3ykUdFq8k",
        spawnMany: ["Hisuian Arcanine", "Coalossal", "Heatmor", "Ninetales", "Arcanine", "Magmar", "Magmortar", "Typhlosion", "Cinderace", "Delphox"],
        spawnFew: ["Hisuian Typhlosion"],
        city: "Cerulean",
        minLevel: 350,
        mainType: "Fire"
    },
    {
        level: 320,
        type: "Normal",
        video: "https://www.youtube.com/watch?v=D-awzTlsvBU",
        spawnMany: ["Exploud", "Kangaskhan", "Furfrou", "Furret", "Gumshoos", "Ambipom", "Slaking", "Zangoose", "Tauros", "Ursaring"],
        spawnFew: ["Stantler", "Snorlax", "Spinda", "Lickilicky"],
        city: "Cerulean",
        minLevel: 320,
        mainType: "Normal"
    },
    {
        level: 320,
        type: "Dragon",
        video: "https://www.youtube.com/watch?v=oe46wtv1880",
        spawnMany: ["Dragonair", "Dragonite", "Altaria", "Flygon"],
        spawnFew: ["Salamence", "Drampa", "Kingdra", "Druddigon", "Goodra", "Noivern", "Haxorus"],
        city: "Cerulean",
        minLevel: 320,
        mainType: "Dragon"
    },
    {
        level: 320,
        type: "Water",
        video: "https://www.youtube.com/watch?v=f5vyFE_JknU",
        spawnMany: ["Blastoise", "Poliwrath", "Crawdaunt", "Wugtrio", "Kingler", "Golduck", "Greninja", "Feraligatr", "Floatzel"],
        spawnFew: ["Palafin", "Milotic", "Azumarill", "Starmie"],
        city: "Cerulean",
        minLevel: 320,
        mainType: "Water"
    },
    {
        level: 320,
        type: "Fight",
        video: "https://www.youtube.com/watch?v=xByBoposhZ4",
        spawnMany: ["Grapploct", "Bewear", "Hitmonchan", "Hitmonlee", "Hitmontop", "Primeape", "Machamp", "Medicham"],
        spawnFew: ["Breloom", "Hisuian Lilligant"],
        city: "Cerulean",
        minLevel: 320,
        mainType: "Fight"
    },
    {
        level: 320,
        type: "Fight",
        video: "https://www.youtube.com/watch?v=W8zCPw-AuLY",
        spawnMany: ["Hitmontop", "Primeape", "Hitmonchan", "Hariyama", "Conkeldurr", "Hitmonlee", "Breloom", "Medicham"],
        spawnFew: ["Passimian"],
        city: "Seafolk Village",
        minLevel: 320,
        mainType: "Fight",
    },
    {
        level: 310,
        type: "Grass",
        video: "https://www.youtube.com/watch?v=lOplgejoUQ4",
        spawnMany: ["Leafeon", "Cherrim", "Lilligant", "Maractus", "Victreebel", "Venusaur", "Sceptile", "Whimsicott", "Jumpluff", "Roserade", "Tangrowth", "Eldegoss", "Alolan Exeggutor"],
        spawnFew: ["Shiinotic", "Decidueye", "Tsareena", "Lurantis", "Carnivine"],
        city: "Hau'oli",
        minLevel: 310,
        mainType: "Grass",
    },
    {
        level: 305,
        type: "Bug",
        video: "https://www.youtube.com/watch?v=82TpHi917vQ",
        spawnMany: ["Pinsir", "Illumise", "Dustox", "Beautifly", "Beedrill", "Volbeat", "Mothim", "Ledian", "Ninjask", "Vikavolt", "Crustle"],
        spawnFew: ["Araquanid", "Centiskorch", "Galvantula", "Ribombee", "Yanmega", "Leavanny", "Vespiquen", "Golisopod"],
        city: "Paniola Ranch (Paradise Island)",
        minLevel: 305,
        mainType: "Bug"
    },
    {
        level: 305,
        type: "Steel",
        video: "https://www.youtube.com/watch?v=yk3Hjqw8Ajo",
        spawnMany: ["Steelix", "Aggron", "Bastiodon", "Probopass", "Bisharp", "Lucario"],
        spawnFew: ["Excadrill", "Copperajah"],
        city: "Cerulean",
        minLevel: 305,
        mainType: "Steel"
    },
    {
        level: 300,
        type: "Ground",
        video: "https://www.youtube.com/watch?v=0ntP0R21BVo",
        spawnMany: ["Sandslash", "Diggersby", "Hippowdon", "Torterra", "Dugtrio", "Claydol", "Donphan"],
        spawnFew: ["Gliscor"],
        city: "Seafolk Village",
        minLevel: 300,
        mainType: "Ground"
    },
    {
        level: 290,
        type: "Electric",
        video: "https://www.youtube.com/watch?v=RNQxidD5Ng8",
        spawnMany: ["Electivire", "Raichu", "Electrode", "Electabuzz", "Ampharos", "Magnezone", "Manectric", "Pachirisu"],
        spawnFew: ["Morpeko", "Heliolisk", "Electrified Pikachu", "Shiny Pikachu", "Alolan Golem"],
        city: "Paniola Ranch (Paradise Island)",
        minLevel: 290,
        mainType: "Electric"
    },
    {
        level: 280,
        type: "Fairy",
        video: "https://www.youtube.com/watch?v=huSUYYC_abA",
        spawnMany: ["Wigglytuff", "Playful Ribombee", "Illuminating Shiinotic", "Whimsicott", "Granbull", "Sparkling Dedenne", "Lovely Sylveon"],
        spawnFew: ["Shiinotic", "Togekiss", "Ribombee", "Sylveon"],
        city: "Paniola Ranch (Paradise Island)",
        minLevel: 280,
        mainType: "Fairy"
    },
    {
        level: 275,
        type: "Fly",
        video: "https://www.youtube.com/watch?v=iSeiXxVhuIY",
        spawnMany: ["Pidgeotto", "Pidgeot", "Fearow", "Noctowl", "Toucannon", "Swellow", "Xatu", "Dodrio"],
        spawnFew: ["Honchkrow", "Aerodactyl"],
        city: "Vermilion",
        minLevel: 275,
        mainType: "Fly"
    },
    {
        level: 275,
        type: "Poison",
        video: "https://www.youtube.com/watch?v=KQUdfSCL2Es",
        spawnMany: ["Arbok", "Crobat", "Weezing", "Ariados", "Seviper", "Skuntank", "Swalot", "Muk", "Drapion"],
        spawnFew: [],
        city: "Heahea",
        minLevel: 275,
        mainType: "Poison"
    },
    {
        level: 270,
        type: "Dark",
        video: "https://www.youtube.com/watch?v=vB5xYl41vUs",
        spawnMany: ["Undead Hydreigon", "Beast Absol", "Pirate Umbreon", "Mightyena", "Alolan Persian", "Alolan Raticate", "Obstagoon"],
        spawnFew: ["Liepard", "Shiftry", "Absol", "Hydreigon", "Umbreon"],
        city: "Paniola Ranch (Paradise Island)",
        minLevel: 270,
        mainType: "Dark"
    },
    {
        level: 265,
        type: "Steel",
        video: "https://www.youtube.com/watch?v=GcZoYwYS_Vw",
        spawnMany: ["Steelix", "Aggron", "Ferrothorn", "Skarmory", "Magnezone", "Scizor"],
        spawnFew: ["Mawile", "Aegislash", "Lucario", "Dedenne"],
        city: "Fuchsia",
        minLevel: 265,
        mainType: "Steel"
    },
    {
        level: 265,
        type: "Poison",
        video: "https://www.youtube.com/watch?v=GLNdIhFZxts",
        spawnMany: ["Ariados", "Arbok", "Weezing", "Nidoqueen", "Nidoking", "Muk", "Swalot", "Seviper", "Dragalge", "Garbodor"],
        spawnFew: [],
        city: "Viridian",
        minLevel: 265,
        mainType: "Poison"
    },
    {
        level: 260,
        type: "Bug",
        video: "https://www.youtube.com/watch?v=7aAzq0mjq2k",
        spawnMany: ["Masquerain", "Ariados", "Ledian", "Pinsir", "Heracross", "Ninjask", "Venomoth", "Galvantula", "Kricketune"],
        spawnFew: ["Crobat"],
        city: "Olivine",
        minLevel: 260,
        mainType: "Bug"
    },
    {
        level: 250,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=vo25LxSz1Pw",
        spawnMany: ["Alakazam", "Hypno", "Grumpig", "Espeon"],
        spawnFew: ["Chimecho", "Bronzong", "Gothitelle"],
        city: "Cianwood",
        minLevel: 250,
        mainType: "Psychic"
    },
    {
        level: 215,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=q7U6cvJUzC4",
        spawnMany: ["Alakazam", "Claydol", "Chimecho", "Hypno", "Xatu", "Grumpig", "Espeon"],
        spawnFew: ["Gothitelle", "Gardevoir"],
        city: "Malie (Lanakila)",
        minLevel: 215,
        mainType: "Psychic"
    },
    {
        level: 210,
        type: "Fight",
        video: "https://www.youtube.com/watch?v=4UmwQPk5hmk",
        spawnMany: ["Primeape", "Hitmonlee", "Hitmonchan", "Conkeldurr", "Machamp", "Hitmontop", "Bewear"],
        spawnFew: ["Hawlucha", "Crabominable"],
        city: "Cianwood",
        minLevel: 210,
        mainType: "Fight"
    },
    {
        level: 210,
        type: "Grass",
        video: "https://www.youtube.com/watch?v=V7V-p1BAoXc",
        spawnMany: ["Tangrowth", "Meganium", "Vileplume", "Venusaur", "Sceptile", "Leafeon", "Tsareena", "Lurantis", "Lilligant"],
        spawnFew: ["Chesnaught"],
        city: "Malie (Grass)",
        minLevel: 210,
        mainType: "Grass"
    },
    {
        level: 205,
        type: "Ghost",
        video: "https://www.youtube.com/watch?v=FOv4RPxf4fI",
        spawnMany: ["Gengar", "Dusknoir", "Haunter", "Chandelure", "Gourgeist", "Misdreavus", "Mightyena"],
        spawnFew: ["Banette", "Rotom", "Mismagius", "Hydreigon", "Liepard", "Absol", "Umbreon"],
        city: "Mandarin",
        minLevel: 205,
        mainType: "Ghost"
    },
    {
        level: 200,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=6bf3iaTYvOA",
        spawnMany: ["Houndoom", "Magcargo", "Ninetales", "Typhlosion", "Arcanine", "Camerupt", "Magmortar", "Torkoal", "Charizard", "Elder Charizard"],
        spawnFew: ["Magmar", "Talonflame"],
        city: "Cianwood",
        minLevel: 200,
        mainType: "Fire"
    },
    {
        level: 200,
        type: "Dark",
        video: "https://www.youtube.com/watch?v=iOEhxWr3ryQ",
        spawnMany: ["Mightyena", "Alolan Raticate", "Absol", "Liepard", "Tyranitar", "Hydreigon", "Sneasel", "Umbreon", "Pangoro", "Alolan Persian"],
        spawnFew: ["Weavile", "Noivern", "Zoroark"],
        city: "Cianwood",
        minLevel: 200,
        mainType: "Dark"
    },
    {
        level: 200,
        type: "Ice",
        video: "https://www.youtube.com/watch?v=K_47U-6ShB8",
        spawnMany: ["Glalie", "Vanilluxe", "Glaceon", "Jynx", "Froslass", "Delibird", "Avalugg", "Weavile", "Beartic"],
        spawnFew: ["Alolan Sandslash", "Alolan Ninetales"],
        city: "Malie (Lanakila)",
        minLevel: 200,
        mainType: "Ice"
    },
    {
        level: 200,
        type: "Rock",
        video: "https://www.youtube.com/watch?v=oZUi1tjx0Ho",
        spawnMany: ["Tyranitar", "Steelix", "Onix", "Sudowoodo", "Golem", "Rhyperior", "Probopass"],
        spawnFew: ["Aerodactyl", "Pupitar"],
        city: "Mossdeep",
        minLevel: 200,
        mainType: "Rock"
    },
    {
        level: 200,
        type: "Water",
        video: "https://www.youtube.com/watch?v=by-i7jrVp30",
        spawnMany: ["Elder Blastoise", "Feraligatr", "Lumineon", "Octillery", "Sharpedo", "Floatzel"],
        spawnFew: ["Buizel"],
        city: "Mandarin",
        minLevel: 200,
        mainType: "Water"
    },
    {
        level: 190,
        type: "Normal",
        video: "https://www.youtube.com/watch?v=wGb7bOWtWdI",
        spawnMany: ["Exploud", "Cinccino", "Persian", "Kangaskhan", "Ambipom", "Raticate", "Ursaring", "Zangoose", "Delcatty", "Furfrou", "Miltank", "Purugly", "Stoutland", "Slaking", "Gengar", "Decidueye"],
        spawnFew: ["Diggersby", "Dubwool", "Greedent", "Snorlax", "Mimikyu", "Hisuian Zoroark", "Polteageist"],
        city: "Paniola Ranch",
        minLevel: 190,
        mainType: "Normal"
    },
    {
        level: 190,
        type: "Fairy",
        video: "https://www.youtube.com/watch?v=E0hmRyYLcy0",
        spawnMany: ["Whimsicott", "Clefable", "Granbull", "Sylveon", "Slurpuff", "Aromatisse", "Wigglytuff", "Florges"],
        spawnFew: [],
        city: "Cianwood",
        minLevel: 190,
        mainType: "Fairy"
    },
    {
        level: 190,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=maHVEshpBtk",
        spawnMany: ["Reuniclus", "Mr Mime", "Espeon", "Alakazam", "Hypno"],
        spawnFew: ["Chimecho", "Wobbuffet"],
        city: "Cinnabar (PAPOI)",
        minLevel: 190,
        mainType: "Psychic"
    },
    {
        level: 190,
        type: "Electric",
        video: "https://www.youtube.com/watch?v=23CvF8qf6pw",
        spawnMany: ["Ampharos", "Electabuzz", "Electivire", "Raichu", "Pachirisu", "Zebstrika", "Electrode", "Minun", "Plusle", "Galvantula", "Magnezone", "Manectric", "Fearow", "Pidgeot", "Dodrio", "Swellow", "Xatu", "Togekiss"],
        spawnFew: [],
        city: "Saffron",
        minLevel: 190,
        mainType: "Electric"
    },
    {
        level: 180,
        type: "Water",
        video: "https://www.youtube.com/watch?v=Umz7ZxEWzyw",
        spawnMany: ["Blastoise", "Golduck", "Gorebyss", "Feraligatr", "Huntail", "Tentacruel", "Octillery", "Lanturn", "Cloyster", "Sharpedo", "Mantine", "Wailord"],
        spawnFew: ["Lumineon", "Wailmer", "Mini Boss Raphael", "Alomomola", "Milotic"],
        city: "Shamouti",
        minLevel: 180,
        mainType: "Water"
    },
    {
        level: 180,
        type: "Dragon",
        video: "https://www.youtube.com/watch?v=xMkNd_7OjMA",
        spawnMany: ["Dragonair", "Haxorus", "Dragonite", "Altaria", "Flygon", "Garchomp", "Salamence"],
        spawnFew: ["Fraxure"],
        city: "Shamouti",
        minLevel: 180,
        mainType: "Dragon"
    },
    {
        level: 180,
        type: "Normal",
        video: "https://www.youtube.com/watch?v=0-uopiTVl-c",
        spawnMany: ["Ursaring", "Stoutland", "Exploud", "Purugly", "Ambipom", "Snorlax", "Granbull", "Wigglytuff", "Clefable", "Azumarill", "Aromatisse", "Togekiss"],
        spawnFew: ["Lopunny"],
        city: "Shamouti",
        minLevel: 180,
        mainType: "Normal"
    },
    {
        level: 175,
        type: "Ice",
        video: "https://www.youtube.com/watch?v=PYrj8LCcVMQ",
        spawnMany: ["Mr Rime", "Froslass", "Weavile", "Galarian Darmanitan", "Glalie", "Snom", "Crabominable"],
        spawnFew: ["Frosmoth"],
        city: "Seafolk Village",
        minLevel: 175,
        mainType: "Ice"
    },
    {
        level: 175,
        type: "Fight",
        video: "https://www.youtube.com/watch?v=dsiDntsHGzs",
        spawnMany: ["Conkeldurr", "Hitmonchan", "Hariyama", "Primeape", "Hitmonlee", "Machamp"],
        spawnFew: ["Bewear", "Hitmontop"],
        city: "Malie",
        minLevel: 175,
        mainType: "Fight"
    },
    {
        level: 175,
        type: "Poison",
        video: "https://www.youtube.com/watch?v=G3ZbsfXGGQo",
        spawnMany: ["Muk", "Arbok", "Nidoqueen", "Nidoking", "Weezing", "Seviper"],
        spawnFew: [],
        city: "Mandarin",
        minLevel: 175,
        mainType: "Poison"
    },
    {
        level: 175,
        type: "Steel",
        video: "https://www.youtube.com/watch?v=evELM1VHugY",
        spawnMany: ["Metagross", "Steelix", "Probopass", "Aggron", "Bastiodon", "Lairon"],
        spawnFew: [],
        city: "Hau'oli",
        minLevel: 175,
        mainType: "Steel"
    },
    {
        level: 170,
        type: "Grass",
        video: "https://www.youtube.com/watch?v=t7kgpdAk8Ks",
        spawnMany: ["Venusaur", "Sceptile", "Victreebel", "Vileplume", "Meganium", "Tsareena", "Shiftry", "Eldegoss", "Lilligant"],
        spawnFew: ["Bellossom", "Lurantis"],
        city: "Paniola Ranch",
        minLevel: 170,
        mainType: "Grass"
    },
    {
        level: 170,
        type: "Dragon",
        video: "https://www.youtube.com/watch?v=fSBX1n0QlXE",
        spawnMany: ["Dragonite", "Flygon", "Goodra", "Haxorus", "Kommo-o"],
        spawnFew: ["Salamence", "Hakamo-o", "Drampa", "Dragonair"],
        city: "Seafolk Village",
        minLevel: 170,
        mainType: "Dragon"
    },
    {
        level: 170,
        type: "Rock",
        video: "https://www.youtube.com/watch?v=qGBhbILNhU0",
        spawnMany: ["Tyranitar", "Sudowoodo", "Lunatone", "Solrock", "Lycanroc", "Gigalith", "Nosepass"],
        spawnFew: [],
        city: "Hau'oli",
        minLevel: 170,
        mainType: "Rock"
    },
    {
        level: 170,
        type: "Ground",
        video: "https://www.youtube.com/watch?v=HU1zFDfzgsM",
        spawnMany: ["Diglett", "Dugtrio", "Donphan", "Claydol", "Sandslash", "Marowak", "Hippowdon", "Torterra"],
        spawnFew: ["Excadrill"],
        city: "Mandarin ",
        minLevel: 170,
        mainType: "Ground"
    },
    {
        level: 170,
        type: "Bug",
        video: "https://www.youtube.com/watch?v=3XxdRFkulTY",
        spawnMany: ["Pinsir", "Beedrill", "Ledian", "Illumise", "Kricketune", "Volbeat", "Mothim", "Yanmega"],
        spawnFew: ["Kricketot", "Scizor", "Vivillion"],
        city: "Mandarin",
        minLevel: 170,
        mainType: "Bug"
    },
    {
        level: 170,
        type: "Dragon",
        video: "https://www.youtube.com/watch?v=9eAFqLn-kM4",
        spawnMany: ["Dragonite", "Altaria", "Dragonair", "Kingdra", "Jynx", "Mamoswine"],
        spawnFew: ["Lapras", "Salamence", "Snover", "Abomasnow", "Piloswine", "Glalie"],
        city: "Frozen Harbour",
        minLevel: 170,
        mainType: "Dragon"
    },
    {
        level: 160,
        type: "Alakazam Room",
        video: "https://www.youtube.com/watch?v=p484oYvKRzc",
        spawnMany: ["Espeon", "Hypno", "Alakazam", "Gengar", "Umbreon", "Arcanine", "Charizard", "Elder Charizard"],
        spawnFew: ["Vivillon"],
        city: "Lavender (Inquisition)",
        minLevel: 160,
        mainType: "Alakazam Room"
    },
    {
        level: 160,
        type: "Tyranitar Room",
        video: "https://www.youtube.com/watch?v=6Uk-K55cbps",
        spawnMany: ["Cloyster", "Jynx", "Dewgong", "Dragonite", "Abomasnow", "Venusaur", "Meganium", "Muk", "Rhydon", "Forretress", "Ursaring", "Heracross", "Golem", "Yanmega", "Scizor", "Steelix"],
        spawnFew: ["Vivillon", "Pinsir"],
        city: "Lavender (Inquisition)",
        minLevel: 160,
        mainType: "Tyranitar Room"
    },
    {
        level: 160,
        type: "Blastoise Room",
        video: "https://www.youtube.com/watch?v=iGGMEHsdhdI",
        spawnMany: ["Slowking", "Blastoise", "Gyarados", "Kingdra", "Feraligatr", "Mantine", "Golduck", "Azumarill", "Omastar", "Golem"],
        spawnFew: [],
        city: "Lavender (Inquisition)",
        minLevel: 160,
        mainType: "Blastoise Room"
    },
    {
        level: 160,
        type: "Ampharos Room",
        video: "https://www.youtube.com/watch?v=cgF4uqpS4yE",
        spawnMany: ["Ampharos", "Electabuzz", "Raichu", "Golem"],
        spawnFew: ["Electivire"],
        city: "Lavender (Inquisition)",
        minLevel: 160,
        mainType: "Ampharos Room"
    },
    {
        level: 160,
        type: "Charizard Room",
        video: "https://www.youtube.com/watch?v=OLsmQ_SbFtI",
        spawnMany: ["Charizard", "Elder Charizard", "Magmar", "Arcanine", "Onix", "Typhlosion", "Houndoom"],
        spawnFew: [],
        city: "Lavender (Inquisition)",
        minLevel: 160,
        mainType: "Charizard Room"
    },
    {
        level: 155,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=D543tMgchU4",
        spawnMany: ["Hypno", "Kadabra", "Alakazam", "Chimecho", "Grumpig", "Espeon"],
        spawnFew: [],
        city: "Cianwood",
        minLevel: 155,
        mainType: "Psychic"
    },
    {
        level: 150,
        type: "Fairy",
        video: "https://www.youtube.com/watch?v=55ftHOZXzms",
        spawnMany: ["Whimsicott", "Sylveon", "Granbull", "Clefable", "Togetic", "Aromatisse"],
        spawnFew: ["Comfey", "Alcremie", "Galarian Rapidash", "Shiinotic", "Togekiss", "Galarian Weezing", "Dedenne", "Slurpuff", "Florges"],
        city: "Paniola Ranch",
        minLevel: 150,
        mainType: "Fairy"
    },
    {
        level: 150,
        type: "Electric",
        video: "https://www.youtube.com/watch?v=7OlBwTbUo4s",
        spawnMany: ["Ampharos", "Manectric", "Electrode", "Raichu", "Electivire"],
        spawnFew: ["Togedemaru", "Alolan Raichu", "Electabuzz"],
        city: "Malie",
        minLevel: 150,
        mainType: "Electric"
    },
    {
        level: 150,
        type: "Ground",
        video: "https://www.youtube.com/watch?v=8dLYEoxp0T8",
        spawnMany: ["Flygon", "Dugtrio"],
        spawnFew: ["Gabite", "Garchomp", "Gengar", "Zangoose", "Rotom"],
        city: "Rustboro",
        minLevel: 150,
        mainType: "Ground"
    },
    {
        level: 150,
        type: "Dark",
        video: "https://www.youtube.com/watch?v=z7SagSCcBRg",
        spawnMany: ["Liepard", "Mightyena", "Umbreon", "Sneasel", "Poochyena", "Dragonite", "Dragonair"],
        spawnFew: ["Honchkrow", "Absol"],
        city: "Frozen Harbour",
        minLevel: 150,
        mainType: "Dark"
    },
    {
        level: 150,
        type: "Water",
        video: "https://www.youtube.com/watch?v=CMP31_-Bo9I",
        spawnMany: ["Empoleon", "Feraligatr", "Blastoise", "Octillery", "Golduck"],
        spawnFew: ["Milotic"],
        city: "Frozen Harbour",
        minLevel: 150,
        mainType: "Water"
    },
    {
        level: 150,
        type: "Dark",
        video: "https://www.youtube.com/watch?v=mYvGl4F06Sg",
        spawnMany: ["Liepard", "Alolan Raticate", "Spiritomb", "Umbreon", "Mightyena"],
        spawnFew: ["Absol"],
        city: "Hau'oli",
        minLevel: 150,
        mainType: "Dark"
    },
    {
        level: 150,
        type: "Fairy",
        video: "https://www.youtube.com/watch?v=DrxTR14jFQc",
        spawnMany: ["Clefable", "Wigglytuff", "Granbull", "Togekiss", "Girafarig", "Dewgong", "Jynx", "Cloyster", "Piloswine", "Dragonite"],
        spawnFew: ["Kangaskhan", "Sneasel", "Lapras"],
        city: "Lavender (Palace)",
        minLevel: 150,
        mainType: "Fairy"
    },
    {
        level: 150,
        type: "Electric",
        video: "https://www.youtube.com/watch?v=RjgVO4uWQio",
        spawnMany: ["Raichu", "Ampharos", "Pidgeot", "Onix", "Golem", "Steelix"],
        spawnFew: ["Electabuzz", "Electivire", "Manectric", "Blissey", "Rhydon", "Aerodactyl", "Tyranitar", "Omastar", "Kabutops"],
        city: "Lavender (Palace)",
        minLevel: 150,
        mainType: "Electric"
    },
    {
        level: 150,
        type: "Normal",
        video: "https://www.youtube.com/watch?v=HLR5rzU75LM",
        spawnMany: ["Linoone", "Raticate", "Pidgey", "Pikachu", "Meowth", "Caterpie", "Jigglypuff", "Nidoran", "Mankey", "Zubat", "Rhyhorn", "Cubone", "Whismur"],
        spawnFew: ["Cincinno", "Dunsparce"],
        city: "Lavender (Palace)",
        minLevel: 150,
        mainType: "Normal"
    },
    {
        level: 150,
        type: "Grass",
        video: "https://www.youtube.com/watch?v=RRE-4oC1TMw",
        spawnMany: ["Vileplume", "Venusaur", "Victreebel", "Meganium"],
        spawnFew: [],
        city: "Lavender (Palace)",
        minLevel: 150,
        mainType: "Grass"
    },
    {
        level: 140,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=KHl_83KWUSE",
        spawnMany: ["Charmander", "Charmeleon", "Braixen", "Raboot", "Combusken", "Arcanine", "Cyndaquil", "Quilava"],
        spawnFew: ["Typhlosion", "Rapidash", "Heat Rotom", "Talonflame", "Delphox", "Cinderace", "Infernape", "Blaziken", "Pyroar", "Litleo", "Scorbunny", "Magmar", "Ninetales"],
        city: "Violet",
        minLevel: 140,
        mainType: "Fire"
    },
    {
        level: 140,
        type: "Ghost",
        video: "https://www.youtube.com/watch?v=zlsT8yHWHEg",
        spawnMany: ["Gengar", "Ariados", "Umbreon", "Misdreavus"],
        spawnFew: ["Mega Banette"],
        city: "Cinnabar (PAPOI)",
        minLevel: 140,
        mainType: "Ghost"
    },
    {
        level: 140,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=SSJ8XUZdyvM",
        spawnMany: ["Alakazam", "Hypno", "Espeon", "Mr Mime"],
        spawnFew: ["Mega Gardevoir"],
        city: "Cinnabar (PAPOI)",
        minLevel: 140,
        mainType: "Psychic"
    },
    {
        level: 140,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=APSRYSx_Tb8",
        spawnMany: ["Elder Charizard", "Arcanine", "Charizard", "Ninetales", "Magmar"],
        spawnFew: ["Mega Blaziken"],
        city: "Cinnabar (PAPOI)",
        minLevel: 140,
        mainType: "Fire"
    },
    {
        level: 140,
        type: "Ice",
        video: "https://www.youtube.com/watch?v=9P0rr75VGdU",
        spawnMany: ["Dewgong", "Dragonite", "Kingdra", "Jynx", "Cloyster"],
        spawnFew: ["Mega Altaria"],
        city: "Cinnabar (PAPOI)",
        minLevel: 140,
        mainType: "Ice"
    },
    {
        level: 135,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=YoGwksjUIaM",
        spawnMany: ["Pignite", "Emboar", "Combusken", "Blaziken", "Magmar", "Magmortar"],
        spawnFew: [],
        city: "Goldenrod (Frond Island)",
        minLevel: 135,
        mainType: "Fire"
    },
    {
        level: 135,
        type: "Normal",
        video: "https://www.youtube.com/watch?v=zvjau0xtpi4",
        spawnMany: ["Vigoroth", "Slaking", "Herdier", "Stoutland", "Ambipom", "Kangaskhan"],
        spawnFew: ["Snorlax"],
        city: "Goldenrod (Frond Island)",
        minLevel: 135,
        mainType: "Normal"
    },
    {
        level: 135,
        type: "Water",
        video: "https://www.youtube.com/watch?v=wdPgJb4PVMI",
        spawnMany: ["Dewott", "Samurott", "Croconaw", "Feraligatr", "Wartortle", "Blastoise"],
        spawnFew: ["Milotic"],
        city: "Goldenrod (Frond Island)",
        minLevel: 135,
        mainType: "Water"
    },
    {
        level: 135,
        type: "Grass",
        video: "https://www.youtube.com/watch?v=55UKspeZO20",
        spawnMany: ["Serperior", "Tangrowth", "Bayleef", "Meganium", "Grovyle", "Sceptile", "Parasect"],
        spawnFew: ["Maractus", "Simisage"],
        city: "Goldenrod (Frond Island)",
        minLevel: 135,
        mainType: "Grass"
    },
    {
        level: 135,
        type: "Ice",
        video: "https://www.youtube.com/watch?v=fQtfa6mfV6o",
        spawnMany: ["Snorunt", "Glalie", "Piloswine"],
        spawnFew: ["Weavile", "Mamoswine", "Sneasel"],
        city: "Frozen Harbour",
        minLevel: 135,
        mainType: "Ice"
    },
    {
        level: 135,
        type: "Electric",
        video: "https://www.youtube.com/watch?v=FzpQNKCZIMI",
        spawnMany: ["Raichu", "Zebstrika", "Electrode", "Ampharos"],
        spawnFew: ["Electabuzz", "Pachirisu", "Zeraora", "Heliolisk", "Magnezone"],
        city: "Celadon",
        minLevel: 135,
        mainType: "Electric"
    },
    {
        level: 130,
        type: "Ice",
        video: "https://www.youtube.com/watch?v=2dobV0zyDMQ",
        spawnMany: ["Snover", "Abomasnow", "Glalie"],
        spawnFew: [],
        city: "Frozen Harbour",
        minLevel: 130,
        mainType: "Ice"
    },
    {
        level: 130,
        type: "Bug",
        video: "https://www.youtube.com/watch?v=Gt-VXTsiHX0",
        spawnMany: ["Forretress", "Heracross", "Ninjask", "Masquerain", "Mothim", "Ledian", "Pineco", "Pinsir", "Beedrill", "Volbeat", "Illumise", "Yanma", "Ariados"],
        spawnFew: ["Vespiquen", "Yanmega", "Parasect", "Wormadam Trash", "Wormadam Plant"],
        city: "Shamouti",
        minLevel: 130,
        mainType: "Bug"
    },
    {
        level: 130,
        type: "Fight",
        video: "https://www.youtube.com/watch?v=UjDRF0k5RAA",
        spawnMany: ["Primeape", "Hariyama", "Hitmonlee", "Machamp", "Hitmonchan", "Hitmontop"],
        spawnFew: ["Lucario", "Medicham"],
        city: "Dewford",
        minLevel: 130,
        mainType: "Fight"
    },
    {
        level: 130,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=OM1OL8vtQQ0",
        spawnMany: ["Elder Charizard"],
        spawnFew: [],
        city: "Cinnabar",
        minLevel: 130,
        mainType: "Fire"
    },
    {
        level: 130,
        type: "Rock",
        video: "https://www.youtube.com/watch?v=pkH8a_ZJ1sU",
        spawnMany: ["Rampardos"],
        spawnFew: [],
        city: "Rustboro",
        minLevel: 130,
        mainType: "Rock"
    },
    {
        level: 120,
        type: "Dark",
        video: "https://www.youtube.com/watch?v=5VuaSePlZD4",
        spawnMany: ["Sableye", "Poochyena", "Mightyena", "Purrloin", "Liepard"],
        spawnFew: ["Spiritomb", "Absol", "Bisharp"],
        city: "Azalea",
        minLevel: 120,
        mainType: "Dark"
    },
    {
        level: 120,
        type: "Steel",
        video: "https://www.youtube.com/watch?v=u7DIUwcd0FA",
        spawnMany: ["Steelix", "Aggron", "Rhydon"],
        spawnFew: ["Cualquier duda", "World: Platinum", "Name: Lany", "Pagina del Juego", "Descargalo", "Pagina Informativa"],
        city: "Dewford",
        minLevel: 120,
        mainType: "Steel"
    },
    {
        level: 120,
        type: "Electric",
        video: "https://www.youtube.com/watch?v=j3U4lwPShik",
        spawnMany: ["Electabuzz", "Electivire", "Voltorb", "Electrode", "Magnezone"],
        spawnFew: ["Rhyperior"],
        city: "Frozen Harbour",
        minLevel: 120,
        mainType: "Electric"
    },
    {
        level: 110,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=4iu6MtVslMI",
        spawnMany: ["Growlithe", "Charmander", "Charmeleon", "Charizard"],
        spawnFew: ["Rapidash", "Arcanine", "Ninetales", "Magmar", "Magmortar", "Typhlosion", "Quilava"],
        city: "Lavender",
        minLevel: 110,
        mainType: "Fire"
    },
    {
        level: 100,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=Mw6xSogiat4",
        spawnMany: ["Meditite", "Medicham", "Gallade", "Grumpig", "Natu", "Xatu", "Kirlia", "Gardevoir"],
        spawnFew: ["Mr Mime", "Wobbuffet", "Girafarig", "Chimecho", "Hypno"],
        city: "Azalea",
        minLevel: 100,
        mainType: "Psychic"
    },
    {
        level: 100,
        type: "Dragon",
        video: "https://www.youtube.com/watch?v=EDr23jNI9SI",
        spawnMany: [],
        spawnFew: ["Dragonair", "Dragonite", "Altaria", "Kingdra"],
        city: "Frozen Harbour",
        minLevel: 100,
        mainType: "Dragon"
    },
    {
        level: 100,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=XjnAZxq3Exg",
        spawnMany: ["Charmeleon", "Charizard", "Growlithe", "Arcanine", "Ponyta", "Rapidash", "Graveler", "Rhydon", "Donphan", "Golem", "Onix", "Sandslash", "Machoke", "Machamp", "Primeape"],
        spawnFew: ["Growlithe", "Vulpix", "Ninetales"],
        city: "Lavender (Elemental)",
        minLevel: 100,
        mainType: "Fire"
    },
    {
        level: 100,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=1iHe2v7k1Rg",
        spawnMany: ["Kadabra", "Alakazam", "Hypno"],
        spawnFew: ["Mr Mime", "Nidoqueen", "Nidoking", "Dratini", "Dragonair", "Cloyster", "Dewgong", "Dragapult"],
        city: "Lavender (Elemental)",
        minLevel: 100,
        mainType: "Psychic"
    },
    {
        level: 100,
        type: "Water",
        video: "https://www.youtube.com/watch?v=K3NRHPlerpM",
        spawnMany: ["Wartortle", "Blastoise", "Golduck", "Seadra"],
        spawnFew: ["Bulbasaur", "Ivysaur", "Venusaur", "Victreebel", "Vileplume"],
        city: "Lavender (Elemental)",
        minLevel: 100,
        mainType: "Water"
    },
    {
        level: 90,
        type: "Rock",
        video: "https://www.youtube.com/watch?v=4odEAhpjuIs",
        spawnMany: ["Machamp", "Hariyama", "Onix", "Rhydon", "Steelix"],
        spawnFew: ["Tyranitar", "Mawile", "Ferrothorn", "Slaking"],
        city: "Dewford",
        minLevel: 90,
        mainType: "Rock"
    },
    {
        level: 90,
        type: "Fight",
        video: "https://www.youtube.com/watch?v=4tPPQVo5xJc",
        spawnMany: ["Machoke", "Machamp", "Hitmonlee", "Primeape"],
        spawnFew: ["Hitmonchan", "Hitmontop", "Hariyama", "Cualquier duda", "World: Platinum", "Name: Lany", "Pagina del Juego", "Descargalo", "Pagina Informativa"],
        city: "Dewford",
        minLevel: 90,
        mainType: "Fight"
    },
    {
        level: 90,
        type: "Fire",
        video: "https://www.youtube.com/watch?v=zLaN9rWtDtU",
        spawnMany: ["Combusken", "Blaziken", "Charizard"],
        spawnFew: ["Charmeleon", "Torkoal", "Typhlosion", "Heat Rotom"],
        city: "",
        minLevel: 90,
        mainType: "Fire"
    },
    {
        level: 80,
        type: "Ghost",
        video: "https://www.youtube.com/watch?v=tEkaM8VGODI",
        spawnMany: ["Gengar", "Haunter", "Dusknoir", "Misdreavus", "Banette"],
        spawnFew: ["Drifblim", "Mismagius"],
        city: "",
        minLevel: 80,
        mainType: "Ghost"
    },
    {
        level: 60,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=bPjHPmNxgJA",
        spawnMany: ["Xatu", "Ariados", "Kadabra", "Alakazam"],
        spawnFew: [],
        city: "",
        minLevel: 60,
        mainType: "Psychic"
    },
    {
        level: 40,
        type: "Psychic",
        video: "https://www.youtube.com/watch?v=htydF86-LBw",
        spawnMany: ["Kadabra", "Alakazam"],
        spawnFew: ["Hypno", "Reuniclus"],
        city: "",
        minLevel: 40,
        mainType: "Psychic"
    },
    {
        level: 40,
        type: "Ghost",
        video: "https://www.youtube.com/watch?v=PVy558PXReQ",
        spawnMany: ["Drifloon", "Gastly", "Haunter", "Duskull", "Dusclops"],
        spawnFew: ["Lampent", "Mimikyu", "Gourgeist", "Banette", "Misdreavus"],
        city: "",
        minLevel: 40,
        mainType: "Ghost"
    },


    
];

// Function to handle user input and show respawn info
document.getElementById("go-btn").addEventListener("click", function() {
    const level = parseInt(document.getElementById("level-input").value);
    const type = document.getElementById("type-select").value;

    const resultDiv = document.getElementById("respawn-results");
    resultDiv.innerHTML = ''; // Clear previous results

    if (isNaN(level) || level < 1) {
        resultDiv.innerHTML = "Por favor, ingresa un nivel válido.";
        return;
    }

    const filteredRespawns = respawnData.filter(respawn => {
        return respawn.level <= level && (!type || respawn.type === type);
    });

    if (filteredRespawns.length === 0) {
        resultDiv.innerHTML = "No se encontraron respawns para este nivel y tipo.";
        return;
    }

    filteredRespawns.forEach(respawn => {
        const respawnInfo = `
            <div class="respawn-entry">
                <h3>Ciudad: ${respawn.city}</h3>
                <p><strong>Requiere nivel mínimo:</strong> ${respawn.minLevel}</p>
                <p><strong>Tipo principal:</strong> ${respawn.mainType}</p>
                <p><strong>Pokémon que aparecen:</strong></p>
                <ul>
                    ${respawn.spawnMany.map(pokemon => `<li>${pokemon}</li>`).join('')}
                </ul>
                <p><strong>Pokémon raros:</strong></p>
                <ul>
                    ${respawn.spawnFew.map(pokemon => `<li>${pokemon}</li>`).join('')}
                </ul>
                <p><strong>Ver en video:</strong> <a href="${respawn.video}" target="_blank">¡Haz clic aquí!</a></p>
            </div>
        `;
        resultDiv.innerHTML += respawnInfo;
    });
});
