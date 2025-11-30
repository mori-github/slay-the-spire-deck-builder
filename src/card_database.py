"""Database of all available cards."""
from typing import List, Dict
from src.models import Card, CardType, Rarity


class CardDatabase:
    """Central repository of all available cards."""

    def __init__(self):
        """Initialize the card database."""
        self._cards: Dict[str, Card] = {}
        self._initialize_cards()

    def _initialize_cards(self):
        """Create all available cards."""
        # Starter Cards
        self._add_card(Card(
            name="Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.STARTER,
            description="Deal 6 damage.",
            damage=6
        ))

        self._add_card(Card(
            name="Defend",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.STARTER,
            description="Gain 5 Block.",
            block=5
        ))

        # Common Attacks
        self._add_card(Card(
            name="Bash",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 8 damage. Apply 2 Vulnerable.",
            damage=8
        ))

        self._add_card(Card(
            name="Anger",
            cost=0,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 6 damage. Add a copy of this card to discard.",
            damage=6
        ))

        self._add_card(Card(
            name="Body Slam",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal damage equal to your Block.",
            damage=0
        ))

        self._add_card(Card(
            name="Cleave",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 8 damage to ALL enemies.",
            damage=8
        ))

        self._add_card(Card(
            name="Clothesline",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 12 damage. Apply 2 Weak.",
            damage=12
        ))

        self._add_card(Card(
            name="Headbutt",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 9 damage. Put a card from discard on top of draw.",
            damage=9
        ))

        self._add_card(Card(
            name="Heavy Blade",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 14 damage. Strength affects this 3 times.",
            damage=14
        ))

        self._add_card(Card(
            name="Iron Wave",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 5 damage. Gain 5 Block.",
            damage=5,
            block=5
        ))

        self._add_card(Card(
            name="Pommel Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 9 damage. Draw 1 card.",
            damage=9
        ))

        self._add_card(Card(
            name="Sword Boomerang",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 3 damage randomly 3 times.",
            damage=3
        ))

        self._add_card(Card(
            name="Thunderclap",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 4 damage to ALL. Apply 1 Vulnerable to ALL.",
            damage=4
        ))

        self._add_card(Card(
            name="Twin Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.COMMON,
            description="Deal 5 damage twice.",
            damage=5
        ))

        # Common Skills
        self._add_card(Card(
            name="Armaments",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Gain 5 Block. Upgrade a card in hand for combat.",
            block=5
        ))

        self._add_card(Card(
            name="Battle Trance",
            cost=0,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Draw 2 cards. Cannot draw cards this turn."
        ))

        self._add_card(Card(
            name="Blood for Blood",
            cost=4,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Costs 1 less per enemy that died this combat."
        ))

        self._add_card(Card(
            name="Bloodletting",
            cost=0,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Lose 3 HP. Gain 2 Energy."
        ))

        self._add_card(Card(
            name="Flex",
            cost=0,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Gain 2 Strength. At end of turn, lose 2 Strength."
        ))

        self._add_card(Card(
            name="Havoc",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Play top card of draw pile and Exhaust it."
        ))

        self._add_card(Card(
            name="Shrug It Off",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Gain 8 Block. Draw 1 card.",
            block=8
        ))

        self._add_card(Card(
            name="True Grit",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Gain 7 Block. Exhaust a random card.",
            block=7
        ))

        self._add_card(Card(
            name="Warcry",
            cost=0,
            card_type=CardType.SKILL,
            rarity=Rarity.COMMON,
            description="Draw 1 card. Put a card from hand on top of draw."
        ))

        # Uncommon Attacks
        self._add_card(Card(
            name="Carnage",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Ethereal. Deal 20 damage.",
            damage=20
        ))

        self._add_card(Card(
            name="Dropkick",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 5 damage. If Vulnerable, gain 1 Energy and draw 1.",
            damage=5
        ))

        self._add_card(Card(
            name="Hemokinesis",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Lose 2 HP. Deal 15 damage.",
            damage=15
        ))

        self._add_card(Card(
            name="Perfected Strike",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 6 damage. +2 per Strike in deck.",
            damage=6
        ))

        self._add_card(Card(
            name="Pummel",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 2 damage 4 times. Exhaust.",
            damage=2
        ))

        self._add_card(Card(
            name="Reckless Charge",
            cost=0,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 7 damage. Shuffle a Dazed into draw pile.",
            damage=7
        ))

        self._add_card(Card(
            name="Searing Blow",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 12 damage. Can be upgraded any number of times.",
            damage=12
        ))

        self._add_card(Card(
            name="Uppercut",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 13 damage. Apply Weak and Vulnerable.",
            damage=13
        ))

        self._add_card(Card(
            name="Whirlwind",
            cost=-1,
            card_type=CardType.ATTACK,
            rarity=Rarity.UNCOMMON,
            description="Deal 5 damage to ALL enemies X times.",
            damage=5
        ))

        # Uncommon Skills
        self._add_card(Card(
            name="Disarm",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Enemy loses 2 Strength. Exhaust."
        ))

        self._add_card(Card(
            name="Entrench",
            cost=2,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Double your Block."
        ))

        self._add_card(Card(
            name="Flame Barrier",
            cost=2,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Gain 12 Block. Deal 4 damage when attacked.",
            block=12
        ))

        self._add_card(Card(
            name="Ghostly Armor",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Ethereal. Gain 10 Block.",
            block=10
        ))

        self._add_card(Card(
            name="Intimidate",
            cost=0,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Apply 1 Weak to ALL. Exhaust."
        ))

        self._add_card(Card(
            name="Power Through",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Add 2 Wounds. Gain 15 Block.",
            block=15
        ))

        self._add_card(Card(
            name="Seeing Red",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Gain 2 Energy. Exhaust."
        ))

        self._add_card(Card(
            name="Sentinel",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.UNCOMMON,
            description="Gain 5 Block. If Exhausted, gain 2 Energy.",
            block=5
        ))

        # Uncommon Powers
        self._add_card(Card(
            name="Inflame",
            cost=1,
            card_type=CardType.POWER,
            rarity=Rarity.UNCOMMON,
            description="Gain 2 Strength."
        ))

        self._add_card(Card(
            name="Metallicize",
            cost=1,
            card_type=CardType.POWER,
            rarity=Rarity.UNCOMMON,
            description="At end of turn, gain 3 Block."
        ))

        # Rare Attacks
        self._add_card(Card(
            name="Bludgeon",
            cost=3,
            card_type=CardType.ATTACK,
            rarity=Rarity.RARE,
            description="Deal 32 damage.",
            damage=32
        ))

        self._add_card(Card(
            name="Feed",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.RARE,
            description="Deal 10 damage. If fatal, gain 3 Max HP. Exhaust.",
            damage=10
        ))

        self._add_card(Card(
            name="Fiend Fire",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.RARE,
            description="Exhaust hand. Deal 7 damage per card. Exhaust.",
            damage=7
        ))

        self._add_card(Card(
            name="Immolate",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.RARE,
            description="Deal 21 damage to ALL. Add Burn to discard.",
            damage=21
        ))

        self._add_card(Card(
            name="Reaper",
            cost=2,
            card_type=CardType.ATTACK,
            rarity=Rarity.RARE,
            description="Deal 4 damage to ALL. Heal for damage dealt. Exhaust.",
            damage=4
        ))

        # Rare Skills
        self._add_card(Card(
            name="Double Tap",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.RARE,
            description="Next Attack played twice."
        ))

        self._add_card(Card(
            name="Exhume",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.RARE,
            description="Put a card from Exhaust into hand. Exhaust."
        ))

        self._add_card(Card(
            name="Impervious",
            cost=2,
            card_type=CardType.SKILL,
            rarity=Rarity.RARE,
            description="Gain 30 Block. Exhaust.",
            block=30
        ))

        self._add_card(Card(
            name="Offering",
            cost=0,
            card_type=CardType.SKILL,
            rarity=Rarity.RARE,
            description="Lose 6 HP. Gain 2 Energy. Draw 3 cards. Exhaust."
        ))

        # Rare Powers
        self._add_card(Card(
            name="Barricade",
            cost=3,
            card_type=CardType.POWER,
            rarity=Rarity.RARE,
            description="Block does not reset at turn start."
        ))

        self._add_card(Card(
            name="Berserk",
            cost=0,
            card_type=CardType.POWER,
            rarity=Rarity.RARE,
            description="Gain 1 Vulnerable. Start turns with +1 Energy."
        ))

        self._add_card(Card(
            name="Corruption",
            cost=3,
            card_type=CardType.POWER,
            rarity=Rarity.RARE,
            description="Skills cost 0. Skills Exhaust."
        ))

        self._add_card(Card(
            name="Demon Form",
            cost=3,
            card_type=CardType.POWER,
            rarity=Rarity.RARE,
            description="At turn start, gain 2 Strength."
        ))

    def _add_card(self, card: Card):
        """Add a card to the database."""
        self._cards[card.name] = card

    def get_card(self, name: str) -> Card:
        """Get a card by name.

        Args:
            name: Card name

        Returns:
            A copy of the card

        Raises:
            KeyError: If card not found
        """
        if name not in self._cards:
            raise KeyError(f"Card '{name}' not found in database")
        return self._cards[name].copy()

    def get_all_cards(self) -> List[Card]:
        """Get all cards in the database.

        Returns:
            List of all card copies
        """
        return [card.copy() for card in self._cards.values()]

    def get_cards_by_type(self, card_type: CardType) -> List[Card]:
        """Get all cards of a specific type.

        Args:
            card_type: Type to filter by

        Returns:
            List of matching cards
        """
        return [
            card.copy()
            for card in self._cards.values()
            if card.card_type == card_type
        ]

    def get_cards_by_rarity(self, rarity: Rarity) -> List[Card]:
        """Get all cards of a specific rarity.

        Args:
            rarity: Rarity to filter by

        Returns:
            List of matching cards
        """
        return [
            card.copy()
            for card in self._cards.values()
            if card.rarity == rarity
        ]

    def search_cards(self, query: str) -> List[Card]:
        """Search for cards by name or description.

        Args:
            query: Search term

        Returns:
            List of matching cards
        """
        query_lower = query.lower()
        return [
            card.copy()
            for card in self._cards.values()
            if query_lower in card.name.lower() or query_lower in card.description.lower()
        ]

    def get_starter_deck(self) -> List[Card]:
        """Get a standard starter deck.

        Returns:
            List of starter cards (5 Strikes, 5 Defends)
        """
        deck = []
        strike = self.get_card("Strike")
        defend = self.get_card("Defend")

        for _ in range(5):
            deck.append(strike.copy())
            deck.append(defend.copy())

        return deck
