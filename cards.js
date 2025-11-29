// Slay the Spire Card Database
const CARDS = {
  ironclad: [
    // Starter
    { name: "Strike", cost: 1, type: "Attack", rarity: "Basic", description: "Deal 6 damage.", character: "Ironclad" },
    { name: "Defend", cost: 1, type: "Skill", rarity: "Basic", description: "Gain 5 Block.", character: "Ironclad" },
    { name: "Bash", cost: 2, type: "Attack", rarity: "Basic", description: "Deal 8 damage. Apply 2 Vulnerable.", character: "Ironclad" },

    // Common Attacks
    { name: "Anger", cost: 0, type: "Attack", rarity: "Common", description: "Deal 6 damage. Add a copy of this card into your discard pile.", character: "Ironclad" },
    { name: "Body Slam", cost: 1, type: "Attack", rarity: "Common", description: "Deal damage equal to your current Block.", character: "Ironclad" },
    { name: "Cleave", cost: 1, type: "Attack", rarity: "Common", description: "Deal 8 damage to ALL enemies.", character: "Ironclad" },
    { name: "Clothesline", cost: 2, type: "Attack", rarity: "Common", description: "Deal 12 damage. Apply 2 Weak.", character: "Ironclad" },
    { name: "Heavy Blade", cost: 2, type: "Attack", rarity: "Common", description: "Deal 14 damage. Strength affects this card 3 times.", character: "Ironclad" },
    { name: "Iron Wave", cost: 1, type: "Attack", rarity: "Common", description: "Gain 5 Block. Deal 5 damage.", character: "Ironclad" },
    { name: "Pommel Strike", cost: 1, type: "Attack", rarity: "Common", description: "Deal 9 damage. Draw 1 card.", character: "Ironclad" },
    { name: "Sword Boomerang", cost: 1, type: "Attack", rarity: "Common", description: "Deal 3 damage to a random enemy 3 times.", character: "Ironclad" },
    { name: "Thunderclap", cost: 1, type: "Attack", rarity: "Common", description: "Deal 4 damage and apply 1 Vulnerable to ALL enemies.", character: "Ironclad" },
    { name: "Twin Strike", cost: 1, type: "Attack", rarity: "Common", description: "Deal 5 damage twice.", character: "Ironclad" },
    { name: "Wild Strike", cost: 1, type: "Attack", rarity: "Common", description: "Deal 12 damage. Shuffle a Wound into your draw pile.", character: "Ironclad" },

    // Common Skills
    { name: "Armaments", cost: 1, type: "Skill", rarity: "Common", description: "Gain 5 Block. Upgrade a card in your hand for the rest of combat.", character: "Ironclad" },
    { name: "Battle Trance", cost: 0, type: "Skill", rarity: "Common", description: "Draw 3 cards. You cannot draw additional cards this turn.", character: "Ironclad" },
    { name: "Blood for Blood", cost: 4, type: "Attack", rarity: "Common", description: "Deal 18 damage. Costs 1 less Energy for each time you lose HP this combat.", character: "Ironclad" },
    { name: "Bloodletting", cost: 0, type: "Skill", rarity: "Common", description: "Lose 3 HP. Gain 2 Energy.", character: "Ironclad" },
    { name: "Flex", cost: 0, type: "Skill", rarity: "Common", description: "Gain 2 Strength. At the end of your turn, lose 2 Strength.", character: "Ironclad" },
    { name: "Havoc", cost: 1, type: "Skill", rarity: "Common", description: "Play the top card of your draw pile and Exhaust it.", character: "Ironclad" },
    { name: "Shrug It Off", cost: 1, type: "Skill", rarity: "Common", description: "Gain 8 Block. Draw 1 card.", character: "Ironclad" },
    { name: "Warcry", cost: 0, type: "Skill", rarity: "Common", description: "Draw 1 card. Place a card from your hand on top of your draw pile. Exhaust.", character: "Ironclad" },
    { name: "True Grit", cost: 1, type: "Skill", rarity: "Common", description: "Gain 7 Block. Exhaust a random card from your hand.", character: "Ironclad" },

    // Uncommon Attacks
    { name: "Carnage", cost: 2, type: "Attack", rarity: "Uncommon", description: "Ethereal. Deal 20 damage.", character: "Ironclad" },
    { name: "Dropkick", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 5 damage. If the enemy has Vulnerable, gain 1 Energy and draw 1 card.", character: "Ironclad" },
    { name: "Hemokinesis", cost: 1, type: "Attack", rarity: "Uncommon", description: "Lose 2 HP. Deal 15 damage.", character: "Ironclad" },
    { name: "Perfected Strike", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 6 damage. Deals 2 additional damage for ALL of your cards containing 'Strike'.", character: "Ironclad" },
    { name: "Pummel", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 2 damage 4 times. Exhaust.", character: "Ironclad" },
    { name: "Rampage", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 8 damage. Increase this card's damage by 5 this combat.", character: "Ironclad" },
    { name: "Reckless Charge", cost: 0, type: "Attack", rarity: "Uncommon", description: "Deal 7 damage. Shuffle a Dazed into your draw pile.", character: "Ironclad" },
    { name: "Searing Blow", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 12 damage. Can be upgraded any number of times.", character: "Ironclad" },
    { name: "Sever Soul", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 16 damage. Exhaust all non-Attack cards in your hand.", character: "Ironclad" },
    { name: "Uppercut", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 13 damage. Apply 1 Weak. Apply 1 Vulnerable.", character: "Ironclad" },
    { name: "Whirlwind", cost: "X", type: "Attack", rarity: "Uncommon", description: "Deal 5 damage to ALL enemies X times.", character: "Ironclad" },

    // Uncommon Skills
    { name: "Battle Trance", cost: 0, type: "Skill", rarity: "Uncommon", description: "Draw 3 cards. You cannot draw additional cards this turn.", character: "Ironclad" },
    { name: "Burning Pact", cost: 1, type: "Skill", rarity: "Uncommon", description: "Exhaust 1 card. Draw 2 cards.", character: "Ironclad" },
    { name: "Disarm", cost: 1, type: "Skill", rarity: "Uncommon", description: "Enemy loses 2 Strength. Exhaust.", character: "Ironclad" },
    { name: "Dual Wield", cost: 1, type: "Skill", rarity: "Uncommon", description: "Add a copy of an Attack or Power card in your hand into your hand.", character: "Ironclad" },
    { name: "Entrench", cost: 2, type: "Skill", rarity: "Uncommon", description: "Double your Block.", character: "Ironclad" },
    { name: "Flame Barrier", cost: 2, type: "Skill", rarity: "Uncommon", description: "Gain 12 Block. Whenever you are attacked this turn, deal 4 damage back.", character: "Ironclad" },
    { name: "Ghostly Armor", cost: 1, type: "Skill", rarity: "Uncommon", description: "Ethereal. Gain 10 Block.", character: "Ironclad" },
    { name: "Infernal Blade", cost: 1, type: "Skill", rarity: "Uncommon", description: "Add a random Attack into your hand. It costs 0 this turn. Exhaust.", character: "Ironclad" },
    { name: "Intimidate", cost: 0, type: "Skill", rarity: "Uncommon", description: "Apply 1 Weak to ALL enemies. Exhaust.", character: "Ironclad" },
    { name: "Power Through", cost: 1, type: "Skill", rarity: "Uncommon", description: "Add 2 Wounds into your hand. Gain 15 Block.", character: "Ironclad" },
    { name: "Seeing Red", cost: 1, type: "Skill", rarity: "Uncommon", description: "Gain 2 Energy. Exhaust.", character: "Ironclad" },
    { name: "Sentinel", cost: 1, type: "Skill", rarity: "Uncommon", description: "Gain 5 Block. If this card is Exhausted, gain 2 Energy.", character: "Ironclad" },
    { name: "Shockwave", cost: 2, type: "Skill", rarity: "Uncommon", description: "Apply 3 Weak and Vulnerable to ALL enemies. Exhaust.", character: "Ironclad" },
    { name: "Spot Weakness", cost: 1, type: "Skill", rarity: "Uncommon", description: "If the enemy intends to attack, gain 3 Strength.", character: "Ironclad" },

    // Uncommon Powers
    { name: "Brutality", cost: 0, type: "Power", rarity: "Uncommon", description: "At the start of your turn, lose 1 HP and draw 1 card.", character: "Ironclad" },
    { name: "Combust", cost: 1, type: "Power", rarity: "Uncommon", description: "At the end of your turn, lose 1 HP and deal 5 damage to ALL enemies.", character: "Ironclad" },
    { name: "Dark Embrace", cost: 2, type: "Power", rarity: "Uncommon", description: "Whenever a card is Exhausted, draw 1 card.", character: "Ironclad" },
    { name: "Evolve", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you draw a Status card, draw 1 card.", character: "Ironclad" },
    { name: "Feel No Pain", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever a card is Exhausted, gain 3 Block.", character: "Ironclad" },
    { name: "Fire Breathing", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you draw a Status or Curse card, deal 6 damage to ALL enemies.", character: "Ironclad" },
    { name: "Inflame", cost: 1, type: "Power", rarity: "Uncommon", description: "Gain 2 Strength.", character: "Ironclad" },
    { name: "Metallicize", cost: 1, type: "Power", rarity: "Uncommon", description: "At the end of your turn, gain 3 Block.", character: "Ironclad" },
    { name: "Rupture", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you lose HP from a card, gain 1 Strength.", character: "Ironclad" },

    // Rare Attacks
    { name: "Bludgeon", cost: 3, type: "Attack", rarity: "Rare", description: "Deal 32 damage.", character: "Ironclad" },
    { name: "Feed", cost: 1, type: "Attack", rarity: "Rare", description: "Deal 10 damage. If Fatal, raise your Max HP by 3. Exhaust.", character: "Ironclad" },
    { name: "Fiend Fire", cost: 2, type: "Attack", rarity: "Rare", description: "Exhaust your hand. Deal 7 damage for each card Exhausted. Exhaust.", character: "Ironclad" },
    { name: "Immolate", cost: 2, type: "Attack", rarity: "Rare", description: "Deal 21 damage to ALL enemies. Add a Burn into your discard pile.", character: "Ironclad" },
    { name: "Reaper", cost: 2, type: "Attack", rarity: "Rare", description: "Deal 4 damage to ALL enemies. Heal HP equal to unblocked damage. Exhaust.", character: "Ironclad" },

    // Rare Skills
    { name: "Double Tap", cost: 1, type: "Skill", rarity: "Rare", description: "This turn, your next Attack is played twice.", character: "Ironclad" },
    { name: "Exhume", cost: 1, type: "Skill", rarity: "Rare", description: "Put a card from your Exhaust pile into your hand. Exhaust.", character: "Ironclad" },
    { name: "Impervious", cost: 2, type: "Skill", rarity: "Rare", description: "Gain 30 Block. Exhaust.", character: "Ironclad" },
    { name: "Limit Break", cost: 1, type: "Skill", rarity: "Rare", description: "Double your Strength. Exhaust.", character: "Ironclad" },
    { name: "Offering", cost: 0, type: "Skill", rarity: "Rare", description: "Lose 6 HP. Gain 2 Energy. Draw 3 cards. Exhaust.", character: "Ironclad" },
    { name: "Second Wind", cost: 1, type: "Skill", rarity: "Rare", description: "Exhaust all non-Attack cards in your hand. Gain 5 Block for each card Exhausted.", character: "Ironclad" },

    // Rare Powers
    { name: "Barricade", cost: 3, type: "Power", rarity: "Rare", description: "Block is not removed at the start of your turn.", character: "Ironclad" },
    { name: "Berserk", cost: 0, type: "Power", rarity: "Rare", description: "Gain 1 Energy at the start of your turn. Gain 1 Vulnerable at the start of your turn.", character: "Ironclad" },
    { name: "Corruption", cost: 3, type: "Power", rarity: "Rare", description: "Skills cost 0. Whenever you play a Skill, Exhaust it.", character: "Ironclad" },
    { name: "Demon Form", cost: 3, type: "Power", rarity: "Rare", description: "At the start of your turn, gain 2 Strength.", character: "Ironclad" },
  ],

  silent: [
    // Starter
    { name: "Strike", cost: 1, type: "Attack", rarity: "Basic", description: "Deal 6 damage.", character: "Silent" },
    { name: "Defend", cost: 1, type: "Skill", rarity: "Basic", description: "Gain 5 Block.", character: "Silent" },
    { name: "Survivor", cost: 1, type: "Skill", rarity: "Basic", description: "Gain 8 Block. Discard 1 card.", character: "Silent" },
    { name: "Neutralize", cost: 0, type: "Attack", rarity: "Basic", description: "Deal 3 damage. Apply 1 Weak.", character: "Silent" },

    // Common Attacks
    { name: "Backstab", cost: 0, type: "Attack", rarity: "Common", description: "Deal 11 damage. Exhaust.", character: "Silent" },
    { name: "Bane", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. If the enemy has Poison, deal 7 damage again.", character: "Silent" },
    { name: "Dagger Spray", cost: 1, type: "Attack", rarity: "Common", description: "Deal 4 damage to ALL enemies twice.", character: "Silent" },
    { name: "Dagger Throw", cost: 1, type: "Attack", rarity: "Common", description: "Deal 9 damage. Draw 1 card. Discard 1 card.", character: "Silent" },
    { name: "Flying Knee", cost: 1, type: "Attack", rarity: "Common", description: "Deal 8 damage. If the enemy intends to attack, gain 1 Energy.", character: "Silent" },
    { name: "Poisoned Strike", cost: 1, type: "Attack", rarity: "Common", description: "Deal 6 damage. Apply 3 Poison.", character: "Silent" },
    { name: "Quick Slash", cost: 1, type: "Attack", rarity: "Common", description: "Deal 8 damage. Draw 1 card.", character: "Silent" },
    { name: "Slice", cost: 0, type: "Attack", rarity: "Common", description: "Deal 6 damage.", character: "Silent" },
    { name: "Sneaky Strike", cost: 2, type: "Attack", rarity: "Common", description: "Deal 12 damage. Costs 0 if you have discarded a card this turn.", character: "Silent" },
    { name: "Sucker Punch", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. Apply 1 Weak.", character: "Silent" },

    // Common Skills
    { name: "Acrobatics", cost: 1, type: "Skill", rarity: "Common", description: "Draw 3 cards. Discard 1 card.", character: "Silent" },
    { name: "Backflip", cost: 1, type: "Skill", rarity: "Common", description: "Gain 5 Block. Draw 2 cards.", character: "Silent" },
    { name: "Blade Dance", cost: 1, type: "Skill", rarity: "Common", description: "Add 3 Shivs into your hand.", character: "Silent" },
    { name: "Cloak and Dagger", cost: 1, type: "Skill", rarity: "Common", description: "Gain 6 Block. Add 1 Shiv into your hand.", character: "Silent" },
    { name: "Deadly Poison", cost: 1, type: "Skill", rarity: "Common", description: "Apply 5 Poison.", character: "Silent" },
    { name: "Deflect", cost: 0, type: "Skill", rarity: "Common", description: "Gain 4 Block.", character: "Silent" },
    { name: "Dodge and Roll", cost: 1, type: "Skill", rarity: "Common", description: "Gain 4 Block. Next turn, gain 4 Block.", character: "Silent" },
    { name: "Outmaneuver", cost: 1, type: "Skill", rarity: "Common", description: "Next turn, gain 2 Energy.", character: "Silent" },
    { name: "Piercing Wail", cost: 1, type: "Skill", rarity: "Common", description: "ALL enemies lose 6 Strength for this turn. Exhaust.", character: "Silent" },
    { name: "Prepared", cost: 0, type: "Skill", rarity: "Common", description: "Draw 1 card. Discard 1 card.", character: "Silent" },

    // Uncommon Attacks
    { name: "All-Out Attack", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 10 damage to ALL enemies. Discard 1 card.", character: "Silent" },
    { name: "Choke", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 12 damage. Whenever you play a card this turn, the enemy loses 3 HP.", character: "Silent" },
    { name: "Dash", cost: 2, type: "Attack", rarity: "Uncommon", description: "Gain 10 Block. Deal 10 damage.", character: "Silent" },
    { name: "Endless Agony", cost: 0, type: "Attack", rarity: "Uncommon", description: "Deal 4 damage. Whenever this card is Exhausted, add a copy of it to your hand. Exhaust.", character: "Silent" },
    { name: "Eviscerate", cost: 3, type: "Attack", rarity: "Uncommon", description: "Deal 7 damage 3 times. Costs 1 less Energy for each card discarded this turn.", character: "Silent" },
    { name: "Finisher", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 6 damage for each Attack played this turn.", character: "Silent" },
    { name: "Flechettes", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 4 damage for each Skill in your hand.", character: "Silent" },
    { name: "Heel Hook", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 5 damage. If the enemy has Weak, gain 1 Energy and draw 1 card.", character: "Silent" },
    { name: "Masterful Stab", cost: 0, type: "Attack", rarity: "Uncommon", description: "Can only be played if the previous 2 cards played this turn were Attacks. Deal 12 damage.", character: "Silent" },
    { name: "Predator", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 15 damage. Next turn, draw 2 additional cards.", character: "Silent" },
    { name: "Riddle with Holes", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 3 damage 5 times.", character: "Silent" },
    { name: "Skewer", cost: "X", type: "Attack", rarity: "Uncommon", description: "Deal 7 damage X times.", character: "Silent" },

    // Uncommon Skills
    { name: "Blur", cost: 1, type: "Skill", rarity: "Uncommon", description: "Block is not removed at the start of your next turn.", character: "Silent" },
    { name: "Bouncing Flask", cost: 2, type: "Skill", rarity: "Uncommon", description: "Apply 3 Poison to a random enemy 3 times.", character: "Silent" },
    { name: "Calculated Gamble", cost: 0, type: "Skill", rarity: "Uncommon", description: "Discard your hand, then draw that many cards. Exhaust.", character: "Silent" },
    { name: "Catalyst", cost: 1, type: "Skill", rarity: "Uncommon", description: "Double an enemy's Poison. Exhaust.", character: "Silent" },
    { name: "Concentrate", cost: 0, type: "Skill", rarity: "Uncommon", description: "Discard 3 cards. Gain 2 Energy.", character: "Silent" },
    { name: "Crippling Cloud", cost: 2, type: "Skill", rarity: "Uncommon", description: "Apply 4 Poison and 2 Weak to ALL enemies. Exhaust.", character: "Silent" },
    { name: "Distraction", cost: 1, type: "Skill", rarity: "Uncommon", description: "Add a random Skill into your hand. It costs 0 this turn. Exhaust.", character: "Silent" },
    { name: "Escape Plan", cost: 0, type: "Skill", rarity: "Uncommon", description: "Draw 1 card. Discard 1 card.", character: "Silent" },
    { name: "Leg Sweep", cost: 2, type: "Skill", rarity: "Uncommon", description: "Gain 11 Block. Apply 2 Weak.", character: "Silent" },
    { name: "Reflex", cost: 0, type: "Skill", rarity: "Uncommon", description: "Unplayable. If this card is discarded from your hand, draw 2 cards.", character: "Silent" },
    { name: "Setup", cost: 1, type: "Skill", rarity: "Uncommon", description: "Place a card from your hand on top of your draw pile. It costs 0 until played.", character: "Silent" },
    { name: "Tactician", cost: 0, type: "Skill", rarity: "Uncommon", description: "Unplayable. If this card is discarded from your hand, gain 1 Energy.", character: "Silent" },
    { name: "Terror", cost: 1, type: "Skill", rarity: "Uncommon", description: "Apply 99 Vulnerable. Exhaust.", character: "Silent" },

    // Uncommon Powers
    { name: "Accuracy", cost: 1, type: "Power", rarity: "Uncommon", description: "Shivs deal 4 additional damage.", character: "Silent" },
    { name: "After Image", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you play a card, gain 1 Block.", character: "Silent" },
    { name: "Caltrops", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you are attacked, deal 3 damage back.", character: "Silent" },
    { name: "Footwork", cost: 1, type: "Power", rarity: "Uncommon", description: "Gain 2 Dexterity.", character: "Silent" },
    { name: "Infinite Blades", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you draw a card, add a Shiv into your hand.", character: "Silent" },
    { name: "Noxious Fumes", cost: 1, type: "Power", rarity: "Uncommon", description: "At the start of your turn, apply 2 Poison to ALL enemies.", character: "Silent" },
    { name: "Well-Laid Plans", cost: 1, type: "Power", rarity: "Uncommon", description: "At the end of your turn, Retain up to 1 card.", character: "Silent" },

    // Rare Attacks
    { name: "Die Die Die", cost: 1, type: "Attack", rarity: "Rare", description: "Deal 13 damage to ALL enemies. Exhaust.", character: "Silent" },
    { name: "Glass Knife", cost: 1, type: "Attack", rarity: "Rare", description: "Deal 8 damage twice. Decrease damage by 2 this combat.", character: "Silent" },
    { name: "Grand Finale", cost: 0, type: "Attack", rarity: "Rare", description: "Can only be played if there are no cards in your draw pile. Deal 50 damage to ALL enemies.", character: "Silent" },
    { name: "Unload", cost: 1, type: "Attack", rarity: "Rare", description: "Deal 14 damage. Discard all non-Attack cards.", character: "Silent" },

    // Rare Skills
    { name: "Adrenaline", cost: 0, type: "Skill", rarity: "Rare", description: "Gain 1 Energy. Draw 2 cards. Exhaust.", character: "Silent" },
    { name: "Bullet Time", cost: 3, type: "Skill", rarity: "Rare", description: "You cannot draw additional cards this turn. Reduce the cost of all cards in your hand to 0 this turn.", character: "Silent" },
    { name: "Burst", cost: 1, type: "Skill", rarity: "Rare", description: "Next turn, the next 2 Skills you play are played twice.", character: "Silent" },
    { name: "Corpse Explosion", cost: 2, type: "Skill", rarity: "Rare", description: "Apply 6 Poison. When the enemy dies, deal 6 damage to ALL enemies.", character: "Silent" },
    { name: "Malaise", cost: "X", type: "Skill", rarity: "Rare", description: "Enemy loses X Strength. Apply X Weak. Exhaust.", character: "Silent" },
    { name: "Phantasmal Killer", cost: 1, type: "Skill", rarity: "Rare", description: "Next turn, your next Attack is played 3 times. Exhaust.", character: "Silent" },
    { name: "Storm of Steel", cost: 1, type: "Skill", rarity: "Rare", description: "Discard your hand. Add 1 Shiv into your hand for each card discarded.", character: "Silent" },

    // Rare Powers
    { name: "A Thousand Cuts", cost: 2, type: "Power", rarity: "Rare", description: "Whenever you play a card, deal 1 damage to ALL enemies.", character: "Silent" },
    { name: "Envenom", cost: 2, type: "Power", rarity: "Rare", description: "Whenever an Attack deals unblocked damage, apply 1 Poison.", character: "Silent" },
    { name: "Tools of the Trade", cost: 1, type: "Power", rarity: "Rare", description: "At the start of your turn, draw 1 card and discard 1 card.", character: "Silent" },
    { name: "Wraith Form", cost: 3, type: "Power", rarity: "Rare", description: "Gain 2 Intangible. At the end of your turn, lose 1 Dexterity.", character: "Silent" },
  ],

  defect: [
    // Starter
    { name: "Strike", cost: 1, type: "Attack", rarity: "Basic", description: "Deal 6 damage.", character: "Defect" },
    { name: "Defend", cost: 1, type: "Skill", rarity: "Basic", description: "Gain 5 Block.", character: "Defect" },
    { name: "Zap", cost: 1, type: "Skill", rarity: "Basic", description: "Channel 1 Lightning.", character: "Defect" },
    { name: "Dualcast", cost: 1, type: "Skill", rarity: "Basic", description: "Evoke your next Orb twice.", character: "Defect" },

    // Common Attacks
    { name: "Ball Lightning", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. Channel 1 Lightning.", character: "Defect" },
    { name: "Barrage", cost: 1, type: "Attack", rarity: "Common", description: "Deal 4 damage for each channeled Orb.", character: "Defect" },
    { name: "Beam Cell", cost: 0, type: "Attack", rarity: "Common", description: "Deal 3 damage. Apply 1 Vulnerable.", character: "Defect" },
    { name: "Cold Snap", cost: 1, type: "Attack", rarity: "Common", description: "Deal 6 damage. Channel 1 Frost.", character: "Defect" },
    { name: "Compile Driver", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. Draw 1 card for each unique Orb channeled.", character: "Defect" },
    { name: "Go for the Eyes", cost: 0, type: "Attack", rarity: "Common", description: "Deal 3 damage. If the enemy intends to attack, apply 1 Weak.", character: "Defect" },
    { name: "Rebound", cost: 1, type: "Attack", rarity: "Common", description: "Deal 9 damage. Next turn, put this card on top of your draw pile.", character: "Defect" },
    { name: "Streamline", cost: 2, type: "Attack", rarity: "Common", description: "Deal 15 damage. Reduce this card's cost by 1 this combat.", character: "Defect" },
    { name: "Sweeping Beam", cost: 1, type: "Attack", rarity: "Common", description: "Deal 6 damage to ALL enemies. Draw 1 card.", character: "Defect" },

    // Common Skills
    { name: "Charge Battery", cost: 1, type: "Skill", rarity: "Common", description: "Gain 7 Block. Next turn, gain 1 Energy.", character: "Defect" },
    { name: "Coolheaded", cost: 1, type: "Skill", rarity: "Common", description: "Channel 1 Frost. Draw 1 card.", character: "Defect" },
    { name: "Hologram", cost: 1, type: "Skill", rarity: "Common", description: "Gain 3 Block. Place a card from your discard pile on top of your draw pile.", character: "Defect" },
    { name: "Leap", cost: 1, type: "Skill", rarity: "Common", description: "Gain 9 Block.", character: "Defect" },
    { name: "Stack", cost: 1, type: "Skill", rarity: "Common", description: "Gain Block equal to the number of cards in your discard pile.", character: "Defect" },
    { name: "Steam Barrier", cost: 0, type: "Skill", rarity: "Common", description: "Gain 6 Block.", character: "Defect" },
    { name: "Turbo", cost: 0, type: "Skill", rarity: "Common", description: "Gain 2 Energy. Add a Void into your discard pile.", character: "Defect" },

    // Uncommon Attacks
    { name: "Blizzard", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 2 damage to ALL enemies for each Frost channeled this combat.", character: "Defect" },
    { name: "Bullseye", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 8 damage. Apply 2 Lock-On.", character: "Defect" },
    { name: "Claw", cost: 0, type: "Attack", rarity: "Uncommon", description: "Deal 3 damage. Increase this card's damage by 2 this combat.", character: "Defect" },
    { name: "Doom and Gloom", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 10 damage to ALL enemies. Channel 1 Dark.", character: "Defect" },
    { name: "FTL", cost: 0, type: "Attack", rarity: "Uncommon", description: "Deal 5 damage. If you drew this card this turn, draw 1 card.", character: "Defect" },
    { name: "Melter", cost: 1, type: "Attack", rarity: "Uncommon", description: "Remove up to 6 Block from an enemy. Deal 10 damage.", character: "Defect" },
    { name: "Rip and Tear", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 7 damage twice. Costs 1 less Energy for each Orb channeled this combat.", character: "Defect" },
    { name: "Scrape", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 7 damage. Draw 4 cards. Discard 4 cards.", character: "Defect" },
    { name: "Sunder", cost: 3, type: "Attack", rarity: "Uncommon", description: "Deal 24 damage. If this kills an enemy, gain 3 Energy.", character: "Defect" },
    { name: "All For One", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 10 damage. Put all cost 0 cards from your discard pile into your hand.", character: "Defect" },

    // Uncommon Skills
    { name: "Aggregate", cost: 1, type: "Skill", rarity: "Uncommon", description: "Channel your next Orb 3 times.", character: "Defect" },
    { name: "Auto-Shields", cost: 1, type: "Skill", rarity: "Uncommon", description: "If you have no Block, gain 11 Block.", character: "Defect" },
    { name: "Boot Sequence", cost: 0, type: "Skill", rarity: "Uncommon", description: "Gain 10 Block. Draw 1 card. Exhaust.", character: "Defect" },
    { name: "Chaos", cost: 1, type: "Skill", rarity: "Uncommon", description: "Channel 1 random Orb.", character: "Defect" },
    { name: "Chill", cost: 0, type: "Skill", rarity: "Uncommon", description: "Channel 1 Frost. Exhaust.", character: "Defect" },
    { name: "Consume", cost: 2, type: "Skill", rarity: "Uncommon", description: "Gain 2 Focus. Lose 1 Orb Slot.", character: "Defect" },
    { name: "Darkness", cost: 1, type: "Skill", rarity: "Uncommon", description: "Channel 1 Dark.", character: "Defect" },
    { name: "Double Energy", cost: 0, type: "Skill", rarity: "Uncommon", description: "Double your current Energy. Exhaust.", character: "Defect" },
    { name: "Force Field", cost: 4, type: "Skill", rarity: "Uncommon", description: "Gain 12 Block. Block is not removed next turn.", character: "Defect" },
    { name: "Fusion", cost: 2, type: "Skill", rarity: "Uncommon", description: "Channel 1 Plasma.", character: "Defect" },
    { name: "Genetic Algorithm", cost: 1, type: "Skill", rarity: "Uncommon", description: "Gain 1 Block. Permanently increase this card's Block by 2. Exhaust.", character: "Defect" },
    { name: "Glacier", cost: 2, type: "Skill", rarity: "Uncommon", description: "Gain 7 Block. Channel 2 Frost.", character: "Defect" },
    { name: "Overclock", cost: 0, type: "Skill", rarity: "Uncommon", description: "Draw 2 cards. Add 1 Burn into your discard pile.", character: "Defect" },
    { name: "Recycle", cost: 1, type: "Skill", rarity: "Uncommon", description: "Exhaust a card. Gain 1 Energy.", character: "Defect" },
    { name: "Reinforced Body", cost: "X", type: "Skill", rarity: "Uncommon", description: "Gain 7 Block X times.", character: "Defect" },
    { name: "Reprogram", cost: 1, type: "Skill", rarity: "Uncommon", description: "Lose 1 Focus. Gain 1 Strength. Gain 1 Dexterity.", character: "Defect" },
    { name: "Skim", cost: 1, type: "Skill", rarity: "Uncommon", description: "Draw 3 cards.", character: "Defect" },
    { name: "Tempest", cost: "X", type: "Skill", rarity: "Uncommon", description: "Channel X Lightning. Exhaust.", character: "Defect" },
    { name: "White Noise", cost: 1, type: "Skill", rarity: "Uncommon", description: "Add a random Power card into your hand. It costs 0 this turn. Exhaust.", character: "Defect" },

    // Uncommon Powers
    { name: "Capacitor", cost: 1, type: "Power", rarity: "Uncommon", description: "Gain 2 Orb Slots.", character: "Defect" },
    { name: "Defragment", cost: 1, type: "Power", rarity: "Uncommon", description: "Gain 1 Focus.", character: "Defect" },
    { name: "Heatsinks", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you play a Power card, draw 1 card.", character: "Defect" },
    { name: "Hello World", cost: 1, type: "Power", rarity: "Uncommon", description: "At the start of your turn, add a random Common card into your hand.", character: "Defect" },
    { name: "Loop", cost: 1, type: "Power", rarity: "Uncommon", description: "At the start of your turn, trigger the passive ability of your next Orb.", character: "Defect" },
    { name: "Self Repair", cost: 1, type: "Power", rarity: "Uncommon", description: "At the end of combat, heal 7 HP.", character: "Defect" },
    { name: "Static Discharge", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you receive unblocked attack damage, Channel 1 Lightning.", character: "Defect" },
    { name: "Storm", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you play a Power card, Channel 1 Lightning.", character: "Defect" },

    // Rare Attacks
    { name: "Core Surge", cost: 1, type: "Attack", rarity: "Rare", description: "Deal 11 damage. Gain 1 Artifact. Exhaust.", character: "Defect" },
    { name: "Hyperbeam", cost: 2, type: "Attack", rarity: "Rare", description: "Deal 26 damage to ALL enemies. Lose 3 Focus.", character: "Defect" },
    { name: "Meteor Strike", cost: 5, type: "Attack", rarity: "Rare", description: "Deal 24 damage 3 times. Channel 3 Plasma.", character: "Defect" },
    { name: "Thunder Strike", cost: 3, type: "Attack", rarity: "Rare", description: "Deal 7 damage for each Lightning channeled this combat.", character: "Defect" },

    // Rare Skills
    { name: "Amplify", cost: 1, type: "Skill", rarity: "Rare", description: "This turn, your next Power card is played twice.", character: "Defect" },
    { name: "Fission", cost: 0, type: "Skill", rarity: "Rare", description: "Evoke all Orbs. Gain 1 Energy for each Orb evoked. Exhaust.", character: "Defect" },
    { name: "Multi-Cast", cost: "X", type: "Skill", rarity: "Rare", description: "Evoke your next Orb X times.", character: "Defect" },
    { name: "Rainbow", cost: 2, type: "Skill", rarity: "Rare", description: "Channel 1 Lightning. Channel 1 Frost. Channel 1 Dark.", character: "Defect" },
    { name: "Reboot", cost: 0, type: "Skill", rarity: "Rare", description: "Shuffle your discard pile into your draw pile. Draw 4 cards. Exhaust.", character: "Defect" },
    { name: "Seek", cost: 0, type: "Skill", rarity: "Rare", description: "Choose a card from your draw pile and add it into your hand. Exhaust.", character: "Defect" },

    // Rare Powers
    { name: "Biased Cognition", cost: 1, type: "Power", rarity: "Rare", description: "Gain 4 Focus. At the end of your turn, lose 1 Focus.", character: "Defect" },
    { name: "Buffer", cost: 2, type: "Power", rarity: "Rare", description: "Prevent the next time you would lose HP.", character: "Defect" },
    { name: "Creative AI", cost: 3, type: "Power", rarity: "Rare", description: "At the start of your turn, add a random Power card into your hand.", character: "Defect" },
    { name: "Echo Form", cost: 3, type: "Power", rarity: "Rare", description: "The first card you play each turn is played twice.", character: "Defect" },
    { name: "Electrodynamics", cost: 2, type: "Power", rarity: "Rare", description: "Lightning now hits ALL enemies. Channel 2 Lightning.", character: "Defect" },
    { name: "Machine Learning", cost: 1, type: "Power", rarity: "Rare", description: "At the start of your turn, draw 1 additional card.", character: "Defect" },
  ],

  watcher: [
    // Starter
    { name: "Strike", cost: 1, type: "Attack", rarity: "Basic", description: "Deal 6 damage.", character: "Watcher" },
    { name: "Defend", cost: 1, type: "Skill", rarity: "Basic", description: "Gain 5 Block.", character: "Watcher" },
    { name: "Eruption", cost: 2, type: "Attack", rarity: "Basic", description: "Deal 9 damage. Enter Wrath.", character: "Watcher" },
    { name: "Vigilance", cost: 2, type: "Skill", rarity: "Basic", description: "Gain 8 Block. Enter Calm.", character: "Watcher" },

    // Common Attacks
    { name: "Bowling Bash", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. If the enemy has Block, draw 1 card.", character: "Watcher" },
    { name: "Consecrate", cost: 0, type: "Attack", rarity: "Common", description: "Deal 5 damage to ALL enemies.", character: "Watcher" },
    { name: "Crush Joints", cost: 1, type: "Attack", rarity: "Common", description: "Deal 8 damage. If the target intends to attack, apply 1 Vulnerable.", character: "Watcher" },
    { name: "Cut Through Fate", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. Draw 1 card. Scry 2.", character: "Watcher" },
    { name: "Empty Fist", cost: 1, type: "Attack", rarity: "Common", description: "Deal 9 damage. Exit your Stance.", character: "Watcher" },
    { name: "Flurry of Blows", cost: 0, type: "Attack", rarity: "Common", description: "Deal 4 damage. Whenever you change Stances, return this from the discard pile to your hand.", character: "Watcher" },
    { name: "Flying Sleeves", cost: 1, type: "Attack", rarity: "Common", description: "Retain. Deal 4 damage. Discard a card to repeat this 2 more times.", character: "Watcher" },
    { name: "Follow-Up", cost: 1, type: "Attack", rarity: "Common", description: "Deal 7 damage. If the last card played was an Attack, gain 1 Energy.", character: "Watcher" },
    { name: "Just Lucky", cost: 0, type: "Attack", rarity: "Common", description: "Deal 3 damage. Scry 1. Gain 2 Block.", character: "Watcher" },
    { name: "Sash Whip", cost: 1, type: "Attack", rarity: "Common", description: "Deal 8 damage. Apply 1 Weak.", character: "Watcher" },
    { name: "Third Eye", cost: 1, type: "Skill", rarity: "Common", description: "Gain 7 Block. Scry 3.", character: "Watcher" },

    // Common Skills
    { name: "Crescendo", cost: 1, type: "Skill", rarity: "Common", description: "Enter Wrath. Exhaust.", character: "Watcher" },
    { name: "Empty Body", cost: 1, type: "Skill", rarity: "Common", description: "Gain 7 Block. Exit your Stance.", character: "Watcher" },
    { name: "Evaluate", cost: 1, type: "Skill", rarity: "Common", description: "Gain 6 Block. Place a card from your hand on top of your draw pile.", character: "Watcher" },
    { name: "Foresight", cost: 1, type: "Skill", rarity: "Common", description: "Scry 3. Whenever you Scry, gain 2 Block.", character: "Watcher" },
    { name: "Halt", cost: 0, type: "Skill", rarity: "Common", description: "Gain 3 Block. Whenever you are attacked this turn, gain 1 Block.", character: "Watcher" },
    { name: "Prostrate", cost: 0, type: "Skill", rarity: "Common", description: "Gain 4 Block. Gain 2 Mantra.", character: "Watcher" },
    { name: "Protect", cost: 2, type: "Skill", rarity: "Common", description: "Gain 12 Block. At the end of your turn, retain this card.", character: "Watcher" },
    { name: "Simmering Fury", cost: 1, type: "Skill", rarity: "Common", description: "At the start of your next turn, enter Wrath.", character: "Watcher" },
    { name: "Tranquility", cost: 1, type: "Skill", rarity: "Common", description: "Enter Calm. Exhaust.", character: "Watcher" },

    // Uncommon Attacks
    { name: "Carve Reality", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 6 damage. Gain 4 Block.", character: "Watcher" },
    { name: "Conclude", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 12 damage to ALL enemies. End your turn. Can only be played if the only Attack in your hand.", character: "Watcher" },
    { name: "Empty Mind", cost: 1, type: "Skill", rarity: "Uncommon", description: "Exit your Stance. Draw 2 cards.", character: "Watcher" },
    { name: "Fear No Evil", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 8 damage. If the enemy intends to attack, enter Calm.", character: "Watcher" },
    { name: "Foreign Influence", cost: 0, type: "Skill", rarity: "Uncommon", description: "Choose 1 of 3 random Attack cards to add into your hand. Exhaust.", character: "Watcher" },
    { name: "Indignation", cost: 1, type: "Skill", rarity: "Uncommon", description: "Enter Wrath. Apply 3 Vulnerable to ALL enemies. Exhaust.", character: "Watcher" },
    { name: "Inner Peace", cost: 1, type: "Skill", rarity: "Uncommon", description: "If you are in Calm, draw 3 cards.", character: "Watcher" },
    { name: "Meditate", cost: 1, type: "Skill", rarity: "Uncommon", description: "Enter Calm. Put a card from your discard pile into your hand. End your turn.", character: "Watcher" },
    { name: "Perseverance", cost: 1, type: "Skill", rarity: "Uncommon", description: "Retain. Gain 5 Block. Whenever you exit Calm, return this from the discard pile to your hand.", character: "Watcher" },
    { name: "Pray", cost: 1, type: "Skill", rarity: "Uncommon", description: "Gain 3 Mantra. Shuffle an Insight into your draw pile.", character: "Watcher" },
    { name: "Pressure Points", cost: 1, type: "Skill", rarity: "Uncommon", description: "Apply 8 Mark. Mark deals damage equal to its value when you draw a Status card.", character: "Watcher" },
    { name: "Reach Heaven", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 10 damage. Shuffle a Through Violence into your discard pile.", character: "Watcher" },
    { name: "Sands of Time", cost: 4, type: "Attack", rarity: "Uncommon", description: "Retain. Deal 20 damage. Whenever you play another Attack this turn, reduce this card's cost by 1.", character: "Watcher" },
    { name: "Sanctity", cost: 1, type: "Skill", rarity: "Uncommon", description: "Gain 6 Block. Shuffle an Insight into your draw pile.", character: "Watcher" },
    { name: "Study", cost: 2, type: "Skill", rarity: "Uncommon", description: "Shuffle 2 Insights into your draw pile.", character: "Watcher" },
    { name: "Swivel", cost: 2, type: "Skill", rarity: "Uncommon", description: "Gain 8 Block. Next turn, gain 8 Block.", character: "Watcher" },
    { name: "Talk to the Hand", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 5 damage. Whenever you attack, gain 2 Block this turn.", character: "Watcher" },
    { name: "Tantrum", cost: 1, type: "Attack", rarity: "Uncommon", description: "Deal 3 damage 3 times. Shuffle this into your draw pile.", character: "Watcher" },
    { name: "Wallop", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 9 damage. Gain 9 Block.", character: "Watcher" },
    { name: "Wave of the Hand", cost: 1, type: "Skill", rarity: "Uncommon", description: "Whenever an enemy gains Block, remove it.", character: "Watcher" },
    { name: "Wheel Kick", cost: 2, type: "Attack", rarity: "Uncommon", description: "Deal 15 damage. Draw 2 cards.", character: "Watcher" },
    { name: "Windmill Strike", cost: 2, type: "Attack", rarity: "Uncommon", description: "Retain. Deal 7 damage. Whenever this card is Retained, increase its damage by 4.", character: "Watcher" },
    { name: "Worship", cost: 2, type: "Skill", rarity: "Uncommon", description: "Gain 5 Mantra.", character: "Watcher" },
    { name: "Wreath of Flame", cost: 1, type: "Skill", rarity: "Uncommon", description: "Your next Attack deals 5 additional damage.", character: "Watcher" },

    // Uncommon Powers
    { name: "Battle Hymn", cost: 1, type: "Power", rarity: "Uncommon", description: "At the start of your turn, add a Smite into your hand.", character: "Watcher" },
    { name: "Devotion", cost: 1, type: "Power", rarity: "Uncommon", description: "At the start of your turn, gain 2 Mantra.", character: "Watcher" },
    { name: "Fasting", cost: 2, type: "Power", rarity: "Uncommon", description: "Gain 3 Strength. Gain 3 Dexterity. Gain 1 less Energy at the start of each turn.", character: "Watcher" },
    { name: "Like Water", cost: 1, type: "Power", rarity: "Uncommon", description: "At the end of your turn, if you are in Calm, gain 5 Block.", character: "Watcher" },
    { name: "Mental Fortress", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you change Stances, gain 4 Block.", character: "Watcher" },
    { name: "Nirvana", cost: 1, type: "Power", rarity: "Uncommon", description: "Whenever you Scry, gain 3 Block.", character: "Watcher" },
    { name: "Study", cost: 2, type: "Power", rarity: "Uncommon", description: "At the end of your turn, shuffle a card from your discard pile into your draw pile.", character: "Watcher" },

    // Rare Attacks
    { name: "Brilliance", cost: 1, type: "Attack", rarity: "Rare", description: "Add X Miracles into your hand. Deals damage equal to the number of Miracles in your hand. Exhaust.", character: "Watcher" },
    { name: "Judgement", cost: 1, type: "Skill", rarity: "Rare", description: "If the enemy has 30 or less HP, set their HP to 0.", character: "Watcher" },
    { name: "Ragnarok", cost: 3, type: "Attack", rarity: "Rare", description: "Deal 5 damage to a random enemy 5 times.", character: "Watcher" },
    { name: "Sunder", cost: 3, type: "Attack", rarity: "Rare", description: "Deal 24 damage to ALL enemies. If this kills an enemy, gain 3 Energy.", character: "Watcher" },

    // Rare Skills
    { name: "Blasphemy", cost: 1, type: "Skill", rarity: "Rare", description: "Enter Divinity. Die next turn.", character: "Watcher" },
    { name: "Conjure Blade", cost: "X", type: "Skill", rarity: "Rare", description: "Shuffle X Expunger into your draw pile.", character: "Watcher" },
    { name: "Deceive Reality", cost: 1, type: "Skill", rarity: "Rare", description: "Gain 4 Block. Add a Safety into your hand.", character: "Watcher" },
    { name: "Vault", cost: 3, type: "Skill", rarity: "Rare", description: "Take an extra turn after this one. End your turn.", character: "Watcher" },
    { name: "Wish", cost: 3, type: "Skill", rarity: "Rare", description: "Choose: Gain 6 Plated Armor, 3 Strength, or 60 Gold. Exhaust.", character: "Watcher" },

    // Rare Powers
    { name: "Alpha", cost: 1, type: "Power", rarity: "Rare", description: "Shuffle a Beta into your draw pile. Exhaust.", character: "Watcher" },
    { name: "Deva Form", cost: 3, type: "Power", rarity: "Rare", description: "Whenever you gain Energy, increase it by 1.", character: "Watcher" },
    { name: "Establishment", cost: 1, type: "Power", rarity: "Rare", description: "Whenever a card is Retained, reduce its cost by 1 this combat.", character: "Watcher" },
    { name: "Master Reality", cost: 1, type: "Power", rarity: "Rare", description: "Whenever a card is created during combat, Upgrade it.", character: "Watcher" },
    { name: "Omega", cost: 3, type: "Power", rarity: "Rare", description: "At the end of your turn, deal 50 damage to ALL enemies.", character: "Watcher" },
  ]
};

// Export for use in the app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CARDS;
}
