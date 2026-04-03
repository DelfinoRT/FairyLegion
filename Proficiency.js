// Proficiency.js - Proficiency System Browser

const CATEGORIES = {
    combat:     { label: 'Combate Ofensivo', css: 'cat-combat' },
    defense:    { label: 'Combate Defensivo', css: 'cat-defense' },
    movement:   { label: 'Movimiento', css: 'cat-movement' },
    profession: { label: 'Profesión', css: 'cat-profession' },
    charm:      { label: 'Charms', css: 'cat-charm' },
    ability:    { label: 'Habilidades', css: 'cat-ability' },
    status:     { label: 'Estados', css: 'cat-status' },
    move:       { label: 'Movimientos', css: 'cat-move' },
    type_boost: { label: 'Boost de Tipo', css: 'cat-type-boost' },
    mega:       { label: 'Mega Evolución', css: 'cat-mega' },
    utility:    { label: 'Utilidad', css: 'cat-utility' },
    pvp:        { label: 'PvP', css: 'cat-pvp' },
};

// [ id, description, category ]
const proficiencies = [
    [1,   'Increases the chance to mine Diancie by 3%. // Aumenta la probabilidad de minar a Diancie un 3%.',                                                                                                                             'profession'],
    [2,   'Increases the chance to mine Diancie by 5%. // Aumenta la probabilidad de minar a Diancie un 5%.',                                                                                                                             'profession'],
    [3,   'Increases the chance to mine Diancie by 10%. // Aumenta la probabilidad de minar a Diancie un 10%.',                                                                                                                           'profession'],
    [4,   'Increases the chance to mine Carbink by 5%. // Aumenta la probabilidad de minar a Carbink un 5%.',                                                                                                                             'profession'],
    [5,   'Harvest cooldown reduced by 15s. // El cooldown de cosecha se reduce 15 segundos.',                                                                                                                                            'profession'],
    [6,   'Mining cooldown reduced by 15s. // El cooldown de minería se reduce 15 segundos.',                                                                                                                                             'profession'],
    [7,   'Reduces damage received by 5%. // Reduce el daño recibido un 5%.',                                                                                                                                                             'defense'],
    [8,   'Reduces damage received by 7%. // Reduce el daño recibido un 7%.',                                                                                                                                                             'defense'],
    [9,   'Reduces damage received by 10%. // Reduce el daño recibido un 10%.',                                                                                                                                                           'defense'],
    [10,  'Increases damage dealt to neutral elements by 5%. // Aumenta el daño infligido a elementos neutrales un 5%.',                                                                                                                  'combat'],
    [11,  'Increases damage dealt to neutral elements by 10%. // Aumenta el daño infligido a elementos neutrales un 10%.',                                                                                                                'combat'],
    [12,  'Increases flying speed by 30%. // Aumenta la velocidad de vuelo un 30%.',                                                                                                                                                      'movement'],
    [13,  'Increases surfing speed by 30%. // Aumenta la velocidad de surf un 30%.',                                                                                                                                                      'movement'],
    [14,  'Increases riding speed by 30%. // Aumenta la velocidad de montura un 30%.',                                                                                                                                                    'movement'],
    [15,  '10% chance to harvest an additional Berry or Apricorn. // 10% de probabilidad de cosechar una Berry o Apricorn adicional.',                                                                                                    'profession'],
    [16,  '10% chance to mine an additional Powder. // 10% de probabilidad de minar un Powder adicional.',                                                                                                                                'profession'],
    [17,  '3% chance to bypass Reflect. // 3% de probabilidad de ignorar Reflect.',                                                                                                                                                       'combat'],
    [18,  '5% chance to bypass Reflect. // 5% de probabilidad de ignorar Reflect.',                                                                                                                                                       'combat'],
    [19,  '3% chance to bypass protection moves. // 3% de probabilidad de ignorar movimientos de protección.',                                                                                                                            'combat'],
    [20,  '5% chance to bypass protection moves. // 5% de probabilidad de ignorar movimientos de protección.',                                                                                                                            'combat'],
    [21,  '5% chance to bypass type immunities. // 5% de probabilidad de ignorar las inmunidades de tipo.',                                                                                                                               'combat'],
    [22,  '15% boost to Hyper Potion effectiveness. // Aumenta la efectividad de la Hyper Potion un 15%.',                                                                                                                               'utility'],
    [23,  '2% chance to heal the user for 10% of the damage dealt. // 2% de probabilidad de curar al usuario el 10% del daño infligido.',                                                                                                'combat'],
    [24,  '3% chance to heal the user for 15% of the damage dealt. // 3% de probabilidad de curar al usuario el 15% del daño infligido.',                                                                                                'combat'],
    [25,  'Boosts Wealth Charm by 20%. // Potencia el Wealth Charm un 20%.',                                                                                                                                                              'charm'],
    [26,  'Boosts Lucky Charm by 10%. // Potencia el Lucky Charm un 10%.',                                                                                                                                                                'charm'],
    [27,  'Boosts Dodge Charm by 10%. // Potencia el Dodge Charm un 10%.',                                                                                                                                                                'charm'],
    [28,  'Boosts Stunning Charm by 20%. // Potencia el Stunning Charm un 20%.',                                                                                                                                                          'charm'],
    [29,  'Boosts Vital Charm by 20%. // Potencia el Vital Charm un 20%.',                                                                                                                                                                'charm'],
    [30,  'Boosts Mimic Charm by 20%. // Potencia el Mimic Charm un 20%.',                                                                                                                                                                'charm'],
    [31,  'Boosts Cure Charm by 20%. // Potencia el Cure Charm un 20%.',                                                                                                                                                                  'charm'],
    [32,  'Boosts Experience Charm by 25%. // Potencia el Experience Charm un 25%.',                                                                                                                                                      'charm'],
    [33,  'Boosts Power Charm by 5%. // Potencia el Power Charm un 5%.',                                                                                                                                                                  'charm'],
    [34,  'Boosts Defense Charm by 10%. // Potencia el Defense Charm un 10%.',                                                                                                                                                            'charm'],
    [35,  'Boosts Catch Charm by 10%. // Potencia el Catch Charm un 10%.',                                                                                                                                                                'charm'],
    [36,  'Boosts Fire Charm by 70%. // Potencia el Fire Charm un 70%.',                                                                                                                                                                  'charm'],
    [37,  'Reduces cooldown of Dodge Charm by 50%. // Reduce el cooldown del Dodge Charm un 50%.',                                                                                                                                        'charm'],
    [38,  'Regenerate 1% of the user\'s maximum health every 2 seconds while not in battle. // Regenera el 1% de la vida máxima del usuario cada 2 segundos mientras no está en combate.',                                               'defense'],
    [39,  'The enemy\'s Mold Breaker has no effect on the user. // El Mold Breaker del enemigo no tiene efecto sobre el usuario.',                                                                                                        'defense'],
    [40,  'Boosts the Adaptability ability by 20%. // Potencia la habilidad Adaptability un 20%.',                                                                                                                                        'ability'],
    [41,  'Boosts the Battery ability by 20%. // Potencia la habilidad Battery un 20%.',                                                                                                                                                  'ability'],
    [42,  'Boosts the Berserk ability by 20%. // Potencia la habilidad Berserk un 20%.',                                                                                                                                                  'ability'],
    [43,  'Increases the chance to use the Disguise ability by 20%. // Aumenta la probabilidad de activar la habilidad Disguise un 20%.',                                                                                                 'ability'],
    [44,  'Boosts the Filter ability by 10%. // Potencia la habilidad Filter un 10%.',                                                                                                                                                    'ability'],
    [45,  'Increases the effect of Friend Guard by 25% when received from an ally. // Aumenta el efecto de Friend Guard un 25% cuando es recibido de un aliado.',                                                                         'ability'],
    [46,  'Boosts the Heatproof ability by 10%. // Potencia la habilidad Heatproof un 10%.',                                                                                                                                              'ability'],
    [47,  'Boosts the Intimidate ability by 25%. // Potencia la habilidad Intimidate un 25%.',                                                                                                                                            'ability'],
    [48,  'Boosts the Leaf Guard ability by 100%. // Potencia la habilidad Leaf Guard un 100%.',                                                                                                                                          'ability'],
    [49,  '+10% Moxie ability damage cap. // +10% al límite de daño de la habilidad Moxie.',                                                                                                                                              'ability'],
    [50,  '+10% Moody ability cap. // +10% al límite de la habilidad Moody.',                                                                                                                                                             'ability'],
    [51,  'Boosts the Regenerator ability by 30%. // Potencia la habilidad Regenerator un 30%.',                                                                                                                                          'ability'],
    [52,  'Boosts the Rivalry ability by 100%. // Potencia la habilidad Rivalry un 100%.',                                                                                                                                                'ability'],
    [53,  'Boosts the Schooling ability by 100%. // Potencia la habilidad Schooling un 100%.',                                                                                                                                            'ability'],
    [54,  'Boosts the Shed Skin ability by 50%. // Potencia la habilidad Shed Skin un 50%.',                                                                                                                                              'ability'],
    [55,  'Boosts the Solid Rock ability, increasing the multiplier to 1.5x instead of 1.7x. // Potencia la habilidad Solid Rock, aumentando el multiplicador a 1.5x en lugar de 1.7x.',                                                 'ability'],
    [56,  'Boosts the Tangled Feet ability by 25%. // Potencia la habilidad Tangled Feet un 25%.',                                                                                                                                        'ability'],
    [57,  'Reduces the cooldown of the Telepathy ability to 30 seconds. // Reduce el cooldown de la habilidad Telepathy a 30 segundos.',                                                                                                  'ability'],
    [58,  'Boosts the Volt Absorb ability by 50%. Also reduces the cooldown to 1 minute. // Potencia la habilidad Volt Absorb un 50%. También reduce el cooldown a 1 minuto.',                                                            'ability'],
    [59,  'Boosts the Water Absorb ability by 50%. Also reduces the cooldown to 1 minute. // Potencia la habilidad Water Absorb un 50%. También reduce el cooldown a 1 minuto.',                                                          'ability'],
    [60,  '15% chance to bypass through Levitate ability. // 15% de probabilidad de ignorar la habilidad Levitate.',                                                                                                                      'ability'],
    [61,  'Reduces Mega Transformation cooldown to 4 hours 30 minutes. // Reduce el cooldown de la Mega Transformación a 4 horas y 30 minutos.',                                                                                         'mega'],
    [62,  'Allows Wobbuffet to learn up to 2 TMs. // Permite a Wobbuffet aprender hasta 2 TMs.',                                                                                                                                          'utility'],
    [63,  '3% chance to deal critical damage. // 3% de probabilidad de infligir daño crítico.',                                                                                                                                           'combat'],
    [64,  '5% chance to deal critical damage. // 5% de probabilidad de infligir daño crítico.',                                                                                                                                           'combat'],
    [65,  '10% chance to deal critical damage. // 10% de probabilidad de infligir daño crítico.',                                                                                                                                         'combat'],
    [66,  '5% extra critical damage. // 5% de daño crítico extra.',                                                                                                                                                                       'combat'],
    [67,  '10% extra critical damage. // 10% de daño crítico extra.',                                                                                                                                                                     'combat'],
    [68,  '1% life leech. // 1% de robo de vida.',                                                                                                                                                                                        'combat'],
    [69,  '1.5% life leech. // 1.5% de robo de vida.',                                                                                                                                                                                   'combat'],
    [70,  '2% life leech. // 2% de robo de vida.',                                                                                                                                                                                        'combat'],
    [71,  'Boosts the Ingrain move by 10%. // Potencia el movimiento Ingrain un 10%.',                                                                                                                                                    'move'],
    [72,  'Boosts the Ingrain move by 15%. // Potencia el movimiento Ingrain un 15%.',                                                                                                                                                    'move'],
    [73,  'Boosts the Recovery Wish move by 10%. // Potencia el movimiento Recovery Wish un 10%.',                                                                                                                                        'move'],
    [74,  'Boosts the Recovery Wish move by 15%. // Potencia el movimiento Recovery Wish un 15%.',                                                                                                                                        'move'],
    [75,  'Increases the duration of Reflect by 2 seconds. // Aumenta la duración de Reflect 2 segundos.',                                                                                                                               'move'],
    [76,  'Increases the duration of Protection by 2 seconds. // Aumenta la duración de Protection 2 segundos.',                                                                                                                         'move'],
    [77,  'Increases the duration of Detect by 2 seconds. // Aumenta la duración de Detect 2 segundos.',                                                                                                                                 'move'],
    [78,  'Increases the duration of Confusion status condition caused by the user by 2 seconds. // Aumenta la duración del estado Confusion causado por el usuario 2 segundos.',                                                         'status'],
    [79,  'Increases the duration of Sleep status condition caused by the user by 2 seconds. // Aumenta la duración del estado Sleep causado por el usuario 2 segundos.',                                                                 'status'],
    [80,  'Increases the duration of Frozen Solid status condition caused by the user by 2 seconds. // Aumenta la duración del estado Frozen Solid causado por el usuario 2 segundos.',                                                   'status'],
    [81,  '15% chance to avoid the Confusion status condition. (PvE only) // 15% de probabilidad de evitar el estado Confusion. (Solo PvE)',                                                                                              'status'],
    [82,  '15% chance to avoid the Sleep status condition. (PvE only) // 15% de probabilidad de evitar el estado Sleep. (Solo PvE)',                                                                                                      'status'],
    [83,  '15% chance to avoid the Frozen Solid status condition. (PvE only) // 15% de probabilidad de evitar el estado Frozen Solid. (Solo PvE)',                                                                                        'status'],
    [84,  '10% less damage received from Grass type. // 10% menos de daño recibido de tipo Grass.',                                                                                                                                       'defense'],
    [85,  '10% less damage received from Water type. // 10% menos de daño recibido de tipo Water.',                                                                                                                                       'defense'],
    [86,  '10% less damage received from Fire type. // 10% menos de daño recibido de tipo Fire.',                                                                                                                                         'defense'],
    [87,  '10% less damage received from Bug type. // 10% menos de daño recibido de tipo Bug.',                                                                                                                                           'defense'],
    [88,  '10% less damage received from Dark type. // 10% menos de daño recibido de tipo Dark.',                                                                                                                                         'defense'],
    [89,  '10% less damage received from Ghost type. // 10% menos de daño recibido de tipo Ghost.',                                                                                                                                       'defense'],
    [90,  '10% less damage received from Fighting type. // 10% menos de daño recibido de tipo Fighting.',                                                                                                                                 'defense'],
    [91,  '10% less damage received from Normal type. // 10% menos de daño recibido de tipo Normal.',                                                                                                                                     'defense'],
    [92,  '10% less damage received from Ice type. // 10% menos de daño recibido de tipo Ice.',                                                                                                                                           'defense'],
    [93,  '10% less damage received from Psychic type. // 10% menos de daño recibido de tipo Psychic.',                                                                                                                                   'defense'],
    [94,  '10% less damage received from Fairy type. // 10% menos de daño recibido de tipo Fairy.',                                                                                                                                       'defense'],
    [95,  '10% less damage received from Rock type. // 10% menos de daño recibido de tipo Rock.',                                                                                                                                         'defense'],
    [96,  '10% less damage received from Ground type. // 10% menos de daño recibido de tipo Ground.',                                                                                                                                     'defense'],
    [97,  '10% less damage received from Electric type. // 10% menos de daño recibido de tipo Electric.',                                                                                                                                 'defense'],
    [98,  '10% less damage received from Flying type. // 10% menos de daño recibido de tipo Flying.',                                                                                                                                     'defense'],
    [99,  '10% less damage received from Steel type. // 10% menos de daño recibido de tipo Steel.',                                                                                                                                       'defense'],
    [100, '10% less damage received from Dragon type. // 10% menos de daño recibido de tipo Dragon.',                                                                                                                                     'defense'],
    [101, '10% less damage received from Poison type. // 10% menos de daño recibido de tipo Poison.',                                                                                                                                     'defense'],
    [102, 'Boosts Normal type moves by 35%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Normal un 35%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [103, 'The user gains a temporary second ability upon each release. // El usuario obtiene una segunda habilidad temporal cada vez que es enviado al campo.',                                                                           'ability'],
    [104, 'Deals 10% more damage to enemies resistant to the move\'s type. (no effect against bosses) // Inflige un 10% más de daño a enemigos resistentes al tipo del movimiento. (Sin efecto contra jefes)',                            'combat'],
    [105, '10% less damage received from Water type while fishing. // 10% menos de daño recibido de tipo Water mientras se pesca.',                                                                                                       'profession'],
    [106, 'Provokes nearby passive Pokemon within a 4x4 area. // Provoca a los Pokémon pasivos cercanos en un área de 4x4.',                                                                                                              'utility'],
    [107, 'Blaze ability activates at 45% HP. // La habilidad Blaze se activa al 45% de HP.',                                                                                                                                             'ability'],
    [108, 'Overgrow ability activates at 45% HP. // La habilidad Overgrow se activa al 45% de HP.',                                                                                                                                       'ability'],
    [109, 'Shell Armor ability activates at 45% HP. // La habilidad Shell Armor se activa al 45% de HP.',                                                                                                                                 'ability'],
    [110, 'Swarm ability activates at 45% HP. // La habilidad Swarm se activa al 45% de HP.',                                                                                                                                             'ability'],
    [111, 'Torrent ability activates at 45% HP. // La habilidad Torrent se activa al 45% de HP.',                                                                                                                                         'ability'],
    [112, 'Increases flying speed by 50%. // Aumenta la velocidad de vuelo un 50%.',                                                                                                                                                      'movement'],
    [113, 'Increases surfing speed by 50%. // Aumenta la velocidad de surf un 50%.',                                                                                                                                                      'movement'],
    [114, 'Increases riding speed by 50%. // Aumenta la velocidad de montura un 50%.',                                                                                                                                                    'movement'],
    [115, 'Automatically casts Sunny Day. Cooldown: 10 seconds. // Lanza Sunny Day automáticamente. Cooldown: 10 segundos.',                                                                                                              'move'],
    [116, 'Increases the chance to trigger passive moves by 10%. // Aumenta la probabilidad de activar movimientos pasivos un 10%.',                                                                                                      'move'],
    [117, 'Increases the chance to trigger passive moves by 15%. // Aumenta la probabilidad de activar movimientos pasivos un 15%.',                                                                                                      'move'],
    [118, 'Boosts damage against bosses by 5%. // Aumenta el daño contra jefes un 5%.',                                                                                                                                                   'combat'],
    [119, '5% chance to get extra loot. // 5% de probabilidad de obtener botín extra.',                                                                                                                                                   'utility'],
    [120, '3% chance for a Pokemon to count twice toward tasks. // 3% de probabilidad de que un Pokémon cuente el doble en las tareas.',                                                                                                  'utility'],
    [121, '5% chance to inflict a random damaging status condition when dealing damage. // 5% de probabilidad de infligir un estado de daño aleatorio al atacar.',                                                                         'combat'],
    [122, '20% chance to skip the Teleport cooldown. // 20% de probabilidad de omitir el cooldown de Teleport.',                                                                                                                          'utility'],
    [123, '2% chance to cast a random move from the user\'s TM learnset. // 2% de probabilidad de lanzar un movimiento aleatorio del learnset de TMs del usuario.',                                                                       'move'],
    [124, '2% chance to use Counter upon receiving damage. // 2% de probabilidad de usar Counter al recibir daño.',                                                                                                                       'move'],
    [125, '2% chance to reflect the damage received. // 2% de probabilidad de reflejar el daño recibido.',                                                                                                                                'defense'],
    [126, '5% chance to swap held items with the opponent. (PvP only) // 5% de probabilidad de intercambiar objetos equipados con el oponente. (Solo PvP)',                                                                               'pvp'],
    [127, '5% chance to swap abilities with the opponent for the duration of the battle. (PvP only) // 5% de probabilidad de intercambiar habilidades con el oponente durante el combate. (Solo PvP)',                                    'pvp'],
    [128, '+15% HP when revived. // +15% de HP al ser revivido.',                                                                                                                                                                         'defense'],
    [129, 'Fish an additional Pokemon when fishing with Ultra Rod or Master Rod. // Pesca un Pokémon adicional al usar Ultra Rod o Master Rod.',                                                                                           'profession'],
    [130, 'Encounter an additional Pokemon when using a Bug Net. // Encuentra un Pokémon adicional al usar Bug Net.',                                                                                                                      'profession'],
    [131, 'Encounter an additional Pokemon when using a Ghost Detector. // Encuentra un Pokémon adicional al usar Ghost Detector.',                                                                                                        'profession'],
    [132, 'Encounter an additional Pokemon when using a Magnetic Detector. // Encuentra un Pokémon adicional al usar Magnetic Detector.',                                                                                                  'profession'],
    [133, 'Encounter an additional Pokemon when using a Fiery Fishing Rod. // Encuentra un Pokémon adicional al usar Fiery Fishing Rod.',                                                                                                  'profession'],
    [134, 'Encounter an additional Pokemon when using an Ice Hammer. // Encuentra un Pokémon adicional al usar Ice Hammer.',                                                                                                               'profession'],
    [135, 'Encounter an additional Pokemon when using a Lead Pickaxe. // Encuentra un Pokémon adicional al usar Lead Pickaxe.',                                                                                                            'profession'],
    [136, 'Grants a 3% chance to encounter Dhelmise when fishing with an Ultra or Master Rod. This effect bypasses all bait restrictions. // Otorga un 3% de probabilidad de encontrar a Dhelmise al pescar con Ultra Rod o Master Rod. Este efecto ignora todas las restricciones de cebo.', 'profession'],
    [137, 'Increases duration of Mega transformation by 1 hour. // Aumenta la duración de la Mega Transformación 1 hora.',                                                                                                                'mega'],
    [138, 'Boosts Grass type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Grass un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [139, 'Boosts Normal type moves by 40%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Normal un 40%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [140, 'Boosts Water type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Water un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [141, 'Boosts Fire type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Fire un 10%. (Solo PvE, sin efecto contra jefes)',                                                                     'type_boost'],
    [142, 'Boosts Bug type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Bug un 10%. (Solo PvE, sin efecto contra jefes)',                                                                       'type_boost'],
    [143, 'Boosts Rock type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Rock un 10%. (Solo PvE, sin efecto contra jefes)',                                                                     'type_boost'],
    [144, 'Boosts Ground type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Ground un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [145, 'Boosts Dark type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Dark un 10%. (Solo PvE, sin efecto contra jefes)',                                                                     'type_boost'],
    [146, 'Boosts Ghost type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Ghost un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [147, 'Boosts Fairy type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Fairy un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [148, 'Boosts Fighting type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Fighting un 10%. (Solo PvE, sin efecto contra jefes)',                                                             'type_boost'],
    [149, 'Boosts Dragon type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Dragon un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [150, 'Boosts Ice type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Ice un 10%. (Solo PvE, sin efecto contra jefes)',                                                                       'type_boost'],
    [151, 'Boosts Psychic type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Psychic un 10%. (Solo PvE, sin efecto contra jefes)',                                                               'type_boost'],
    [152, 'Boosts Electric type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Electric un 10%. (Solo PvE, sin efecto contra jefes)',                                                             'type_boost'],
    [153, 'Boosts Steel type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Steel un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [154, 'Boosts Flying type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Flying un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [155, 'Boosts Poison type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Poison un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [156, 'Reduces cooldown of the Bug Net by 2 seconds. // Reduce el cooldown de la Bug Net 2 segundos.',                                                                                                                                'profession'],
    [157, 'Reduces cooldown of the Ghost Detector by 2 seconds. // Reduce el cooldown del Ghost Detector 2 segundos.',                                                                                                                    'profession'],
    [158, 'Reduces cooldown of the Magnetic Detector by 2 seconds. // Reduce el cooldown del Magnetic Detector 2 segundos.',                                                                                                              'profession'],
    [159, 'Reduces cooldown of the Lead Pickaxe by 2 seconds. // Reduce el cooldown del Lead Pickaxe 2 segundos.',                                                                                                                        'profession'],
    [160, 'Reduces cooldown of the Ice Hammer by 2 seconds. // Reduce el cooldown del Ice Hammer 2 segundos.',                                                                                                                            'profession'],
    [161, 'Reduces cooldown of the Fiery Fishing Rod by 2 seconds. // Reduce el cooldown de la Fiery Fishing Rod 2 segundos.',                                                                                                            'profession'],
    [162, 'Immunity to Paralysis status condition. // Inmunidad al estado Paralysis.',                                                                                                                                                     'status'],
    [163, '0.5% chance to revive instantly after fainting. (PvE only) // 0.5% de probabilidad de revivir instantáneamente al desmayarse. (Solo PvE)',                                                                                    'utility'],
    [164, '0.6% chance to reuse the same move at 100% of its original damage. (No cooldown in PvE; 30s cooldown in PvP) // 0.6% de probabilidad de reutilizar el mismo movimiento con el 100% de su daño original. (Sin cooldown en PvE; 30s en PvP)', 'move'],
    [165, '10% chance to gain 30% Movement Speed for 10 seconds when attacking. // 10% de probabilidad de ganar un 30% de velocidad de movimiento durante 10 segundos al atacar.',                                                        'movement'],
    [166, '5% chance to reflect the Paralysis status condition. // 5% de probabilidad de reflejar el estado Paralysis.',                                                                                                                  'status'],
    [167, '3% chance to apply Paralysis for 2 seconds when attacking. // 3% de probabilidad de aplicar Paralysis durante 2 segundos al atacar.',                                                                                          'status'],
    [168, '5% chance to increase the duration of Paralysis applied by the Pokemon by 2 seconds. // 5% de probabilidad de aumentar la duración del Paralysis aplicado por el Pokémon en 2 segundos.',                                      'status'],
    [169, '2% chance to use a random move from the enemy. // 2% de probabilidad de usar un movimiento aleatorio del enemigo.',                                                                                                            'move'],
    [170, '2% chance to pull up to 4 Pokemon within a 5x5 range toward the user. // 2% de probabilidad de atraer hasta 4 Pokémon en un rango de 5x5 hacia el usuario.',                                                                  'move'],
    [171, 'Automatically targets Pokemon around the user in a 4x4 area. // Ataca automáticamente a los Pokémon alrededor del usuario en un área de 4x4.',                                                                                 'utility'],
    [172, 'Pokemon can use up to 4 Blinks within 10 seconds before the cooldown starts. // El Pokémon puede usar hasta 4 Blinks en 10 segundos antes de que empiece el cooldown.',                                                        'move'],
    [173, 'Pokemon can use up to 4 Dark Portals within 10 seconds before the cooldown starts. // El Pokémon puede usar hasta 4 Dark Portals en 10 segundos antes de que empiece el cooldown.',                                            'move'],
    [174, '10% chance to skip the Harvest cooldown after a successful harvest. // 10% de probabilidad de omitir el cooldown de cosecha tras una cosecha exitosa.',                                                                         'profession'],
    [175, '10% chance to skip the Mining cooldown after a successful mine. // 10% de probabilidad de omitir el cooldown de minería tras una mina exitosa.',                                                                                'profession'],
    [177, '2% chance to prevent enemy Reflect. // 2% de probabilidad de prevenir el Reflect del enemigo.',                                                                                                                                'move'],
    [178, '3% chance to prevent enemy Telekinesis. // 3% de probabilidad de prevenir el Telekinesis del enemigo.',                                                                                                                        'move'],
    [179, '3% chance to reflect the Stun status condition. // 3% de probabilidad de reflejar el estado Stun.',                                                                                                                            'status'],
    [180, '3% chance to cast Telekinesis automatically when attacking. // 3% de probabilidad de lanzar Telekinesis automáticamente al atacar.',                                                                                           'move'],
    [181, '10% chance to skip the Self-Stun caused by Telekinesis. // 10% de probabilidad de omitir el auto-aturdimiento causado por Telekinesis.',                                                                                       'status'],
    [182, 'Copy 2 random moves from the target\'s learnset. Triggers on hit; active until the Pokemon is returned to its Pokeball. // Copia 2 movimientos aleatorios del learnset del objetivo. Se activa al golpear; permanece activo hasta que el Pokémon sea devuelto a su Pokeball.', 'move'],
    [183, '2% chance to automatically cast Reflect when an enemy uses the move. // 2% de probabilidad de lanzar Reflect automáticamente cuando un enemigo usa ese movimiento.',                                                           'move'],
    [184, '15% chance to skip the Self-Stun caused by Tearful Look. // 15% de probabilidad de omitir el auto-aturdimiento causado por Tearful Look.',                                                                                     'status'],
    [185, '5% chance to bypass Reflect with 50% damage. // 5% de probabilidad de ignorar Reflect con el 50% del daño.',                                                                                                                   'combat'],
    [186, '5% chance to bypass Substitute with 50% damage. // 5% de probabilidad de ignorar Substitute con el 50% del daño.',                                                                                                             'combat'],
    [187, 'Reduces the cooldown of the Pokemon\'s 4th move. Applies only to the original moveset and ignores custom moves. // Reduce el cooldown del 4.º movimiento del Pokémon. Solo aplica al moveset original e ignora los movimientos personalizados.', 'move'],
    [188, '1% chance to transform the user into its Mega Form for 5 minutes when attacking. (PvE only) // 1% de probabilidad de transformar al usuario en su Mega Forma durante 5 minutos al atacar. (Solo PvE)',                          'mega'],
    [189, '3% chance to transform the user into its Mega Form for 5 minutes when attacking. Additionally, the Pokemon gains 25% damage reduction (10% in PvP). // 3% de probabilidad de transformar al usuario en su Mega Forma durante 5 minutos al atacar. Además, el Pokémon gana un 25% de reducción de daño (10% en PvP).', 'mega'],
];

// --- Render ---

function getCategoryBadge(catKey) {
    const cat = CATEGORIES[catKey];
    if (!cat) return '';
    return `<span class="cat-badge ${cat.css}">${cat.label}</span>`;
}

function renderTable(data) {
    const tbody = document.getElementById('profTableBody');
    const count = document.getElementById('profCount');
    if (!tbody) return;

    count.textContent = `Mostrando ${data.length} proficiencia(s)`;

    tbody.innerHTML = data.map(p => {
        const [id, desc, cat] = p;
        return `<tr>
            <td>${id}</td>
            <td>${desc}</td>
            <td>${getCategoryBadge(cat)}</td>
        </tr>`;
    }).join('');
}

function buildCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    // All button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Todas';
    allBtn.dataset.cat = 'all';
    container.appendChild(allBtn);

    Object.entries(CATEGORIES).forEach(([key, val]) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = val.label;
        btn.dataset.cat = key;
        container.appendChild(btn);
    });
}

function getFiltered(searchQuery, activeCat) {
    return proficiencies.filter(p => {
        const [id, desc, cat] = p;
        const matchesCat = activeCat === 'all' || cat === activeCat;
        const matchesSearch = !searchQuery ||
            desc.toLowerCase().includes(searchQuery) ||
            String(id).includes(searchQuery);
        return matchesCat && matchesSearch;
    });
}

function initProficiencyBrowser() {
    buildCategoryFilters();

    let activeCat = 'all';
    let searchQuery = '';

    const searchInput = document.getElementById('profSearch');
    const filterContainer = document.getElementById('categoryFilters');

    renderTable(getFiltered(searchQuery, activeCat));

    searchInput.addEventListener('input', function () {
        searchQuery = this.value.toLowerCase().trim();
        renderTable(getFiltered(searchQuery, activeCat));
    });

    filterContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        renderTable(getFiltered(searchQuery, activeCat));
    });
}

document.addEventListener('DOMContentLoaded', initProficiencyBrowser);
