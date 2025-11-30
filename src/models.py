"""Core models for the deck builder."""
import random
from enum import Enum
from typing import List, Optional
import json


class CardType(Enum):
    """Card types in Slay the Spire."""
    ATTACK = "Attack"
    SKILL = "Skill"
    POWER = "Power"
    STATUS = "Status"
    CURSE = "Curse"


class Rarity(Enum):
    """Card rarity levels."""
    STARTER = "Starter"
    COMMON = "Common"
    UNCOMMON = "Uncommon"
    RARE = "Rare"
    SPECIAL = "Special"


class Card:
    """Represents a card with all its properties."""

    def __init__(
        self,
        name: str,
        cost: int,
        card_type: CardType,
        rarity: Rarity,
        description: str,
        damage: int = 0,
        block: int = 0,
        upgradeable: bool = True,
        upgraded: bool = False
    ):
        """Initialize a card.

        Args:
            name: Card name
            cost: Energy cost to play
            card_type: Type of card (Attack, Skill, etc.)
            rarity: Rarity level
            description: What the card does
            damage: Damage dealt (if attack)
            block: Block gained (if defensive)
            upgradeable: Whether card can be upgraded
            upgraded: Whether card is currently upgraded
        """
        self.name = name
        self.cost = cost
        self.card_type = card_type
        self.rarity = rarity
        self.description = description
        self.damage = damage
        self.block = block
        self.upgradeable = upgradeable
        self.upgraded = upgraded

    def upgrade(self) -> bool:
        """Upgrade the card if possible.

        Returns:
            True if upgraded successfully, False otherwise
        """
        if not self.upgradeable or self.upgraded:
            return False

        self.upgraded = True
        self.name = f"{self.name}+"

        # Typical upgrade bonuses
        if self.damage > 0:
            self.damage += 3
        if self.block > 0:
            self.block += 3
        if self.cost > 0 and self.card_type != CardType.POWER:
            # Some cards get cost reduction
            pass

        return True

    def display(self, compact: bool = False) -> str:
        """Display the card.

        Args:
            compact: If True, show single-line format

        Returns:
            Formatted card string
        """
        if compact:
            stats = []
            if self.damage > 0:
                stats.append(f"DMG:{self.damage}")
            if self.block > 0:
                stats.append(f"BLK:{self.block}")
            stats_str = " ".join(stats) if stats else ""
            upgrade_marker = "+" if self.upgraded else ""
            return f"[{self.cost}] {self.name}{upgrade_marker} ({self.card_type.value}) {stats_str}"

        # Full card display
        lines = [
            "┌─────────────────────┐",
            f"│ {self.name:<19} │",
            f"│ Cost: {self.cost:<14} │",
            f"│ {self.card_type.value:<19} │",
            f"│ {self.rarity.value:<19} │",
            "├─────────────────────┤",
        ]

        # Add stats
        if self.damage > 0:
            lines.append(f"│ Damage: {self.damage:<12} │")
        if self.block > 0:
            lines.append(f"│ Block: {self.block:<13} │")

        # Word wrap description
        desc_words = self.description.split()
        desc_line = ""
        for word in desc_words:
            if len(desc_line) + len(word) + 1 <= 19:
                desc_line += word + " "
            else:
                lines.append(f"│ {desc_line:<19} │")
                desc_line = word + " "
        if desc_line:
            lines.append(f"│ {desc_line:<19} │")

        lines.append("└─────────────────────┘")

        return "\n".join(lines)

    def to_dict(self) -> dict:
        """Convert card to dictionary for serialization."""
        return {
            "name": self.name,
            "cost": self.cost,
            "card_type": self.card_type.value,
            "rarity": self.rarity.value,
            "description": self.description,
            "damage": self.damage,
            "block": self.block,
            "upgradeable": self.upgradeable,
            "upgraded": self.upgraded
        }

    @classmethod
    def from_dict(cls, data: dict) -> 'Card':
        """Create card from dictionary."""
        return cls(
            name=data["name"],
            cost=data["cost"],
            card_type=CardType(data["card_type"]),
            rarity=Rarity(data["rarity"]),
            description=data["description"],
            damage=data.get("damage", 0),
            block=data.get("block", 0),
            upgradeable=data.get("upgradeable", True),
            upgraded=data.get("upgraded", False)
        )

    def copy(self) -> 'Card':
        """Create a copy of this card."""
        return Card(
            name=self.name.replace("+", ""),  # Remove upgrade marker
            cost=self.cost,
            card_type=self.card_type,
            rarity=self.rarity,
            description=self.description,
            damage=self.damage - (3 if self.upgraded and self.damage > 0 else 0),
            block=self.block - (3 if self.upgraded and self.block > 0 else 0),
            upgradeable=self.upgradeable,
            upgraded=False
        )

    def __eq__(self, other):
        """Compare cards by name and upgrade status."""
        if not isinstance(other, Card):
            return False
        return self.name == other.name and self.upgraded == other.upgraded

    def __repr__(self):
        return f"Card({self.name}, {self.cost}, {self.card_type.value})"


class Deck:
    """Represents a deck of cards."""

    def __init__(self, name: str = "My Deck"):
        """Initialize a deck.

        Args:
            name: Name of the deck
        """
        self.name = name
        self.cards: List[Card] = []

    def add_card(self, card: Card, count: int = 1) -> None:
        """Add one or more copies of a card.

        Args:
            card: Card to add
            count: Number of copies to add
        """
        for _ in range(count):
            self.cards.append(card)

    def remove_card(self, card: Card) -> bool:
        """Remove a card from the deck.

        Args:
            card: Card to remove

        Returns:
            True if removed, False if not found
        """
        try:
            self.cards.remove(card)
            return True
        except ValueError:
            return False

    def shuffle(self) -> None:
        """Shuffle the deck."""
        random.shuffle(self.cards)

    def draw_card(self) -> Optional[Card]:
        """Draw a card from the deck.

        Returns:
            The drawn card, or None if deck is empty
        """
        if self.cards:
            return self.cards.pop()
        return None

    def size(self) -> int:
        """Get the number of cards in the deck."""
        return len(self.cards)

    def get_statistics(self) -> dict:
        """Get deck statistics.

        Returns:
            Dictionary with deck stats
        """
        if not self.cards:
            return {
                "total_cards": 0,
                "average_cost": 0,
                "card_types": {},
                "rarities": {},
                "upgraded_count": 0
            }

        card_types = {}
        rarities = {}
        total_cost = 0
        upgraded_count = 0

        for card in self.cards:
            # Count card types
            card_type = card.card_type.value
            card_types[card_type] = card_types.get(card_type, 0) + 1

            # Count rarities
            rarity = card.rarity.value
            rarities[rarity] = rarities.get(rarity, 0) + 1

            # Sum costs
            total_cost += card.cost

            # Count upgraded cards
            if card.upgraded:
                upgraded_count += 1

        return {
            "total_cards": len(self.cards),
            "average_cost": round(total_cost / len(self.cards), 2),
            "card_types": card_types,
            "rarities": rarities,
            "upgraded_count": upgraded_count
        }

    def display_deck(self, compact: bool = True) -> None:
        """Display all cards in the deck.

        Args:
            compact: If True, use compact format
        """
        if not self.cards:
            print("Deck is empty!")
            return

        print(f"\n=== {self.name} ({len(self.cards)} cards) ===")
        for i, card in enumerate(self.cards, 1):
            if compact:
                print(f"{i}. {card.display(compact=True)}")
            else:
                print(f"\nCard {i}:")
                print(card.display(compact=False))

    def save_to_file(self, filename: str) -> None:
        """Save deck to a JSON file.

        Args:
            filename: Path to save file
        """
        deck_data = {
            "name": self.name,
            "cards": [card.to_dict() for card in self.cards]
        }
        with open(filename, 'w') as f:
            json.dump(deck_data, f, indent=2)

    @classmethod
    def load_from_file(cls, filename: str) -> 'Deck':
        """Load deck from a JSON file.

        Args:
            filename: Path to load file

        Returns:
            Loaded deck
        """
        with open(filename, 'r') as f:
            deck_data = json.load(f)

        deck = cls(name=deck_data["name"])
        for card_data in deck_data["cards"]:
            deck.add_card(Card.from_dict(card_data))

        return deck


class GameState:
    """Manages the game state including draw pile, hand, and discard pile."""

    def __init__(self, deck: Deck):
        """Initialize game state from a deck.

        Args:
            deck: The deck to use
        """
        self.draw_pile: List[Card] = [card.copy() for card in deck.cards]
        self.hand: List[Card] = []
        self.discard_pile: List[Card] = []
        self.exhaust_pile: List[Card] = []

        # Shuffle draw pile at start
        random.shuffle(self.draw_pile)

    def draw_cards(self, count: int = 1) -> List[Card]:
        """Draw cards from draw pile to hand.

        Args:
            count: Number of cards to draw

        Returns:
            List of cards drawn
        """
        drawn = []
        for _ in range(count):
            # If draw pile empty, shuffle discard into draw pile
            if not self.draw_pile and self.discard_pile:
                self.draw_pile = self.discard_pile.copy()
                self.discard_pile.clear()
                random.shuffle(self.draw_pile)

            # Draw card
            if self.draw_pile:
                card = self.draw_pile.pop()
                self.hand.append(card)
                drawn.append(card)

        return drawn

    def play_card(self, card: Card, exhaust: bool = False) -> bool:
        """Play a card from hand.

        Args:
            card: Card to play
            exhaust: If True, exhaust instead of discarding

        Returns:
            True if played successfully
        """
        if card not in self.hand:
            return False

        self.hand.remove(card)
        if exhaust:
            self.exhaust_pile.append(card)
        else:
            self.discard_pile.append(card)

        return True

    def discard_hand(self) -> None:
        """Discard all cards in hand."""
        self.discard_pile.extend(self.hand)
        self.hand.clear()

    def end_turn(self) -> None:
        """End turn - discard hand and draw new cards."""
        self.discard_hand()
        self.draw_cards(5)  # Standard hand size

    def get_status(self) -> dict:
        """Get current game state.

        Returns:
            Dictionary with pile sizes
        """
        return {
            "draw_pile": len(self.draw_pile),
            "hand": len(self.hand),
            "discard_pile": len(self.discard_pile),
            "exhaust_pile": len(self.exhaust_pile)
        }
