"""Tests for the models module."""
import unittest
import json
import tempfile
import os
from src.models import Card, CardType, Rarity, Deck, GameState


class TestCard(unittest.TestCase):
    """Test cases for the Card class."""

    def setUp(self):
        """Set up test fixtures."""
        self.strike = Card(
            name="Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.STARTER,
            description="Deal 6 damage.",
            damage=6
        )

        self.defend = Card(
            name="Defend",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.STARTER,
            description="Gain 5 Block.",
            block=5
        )

    def test_card_creation(self):
        """Test creating a card."""
        self.assertEqual(self.strike.name, "Strike")
        self.assertEqual(self.strike.cost, 1)
        self.assertEqual(self.strike.card_type, CardType.ATTACK)
        self.assertEqual(self.strike.damage, 6)
        self.assertEqual(self.strike.block, 0)
        self.assertFalse(self.strike.upgraded)

    def test_card_upgrade(self):
        """Test upgrading a card."""
        self.assertTrue(self.strike.upgrade())
        self.assertTrue(self.strike.upgraded)
        self.assertEqual(self.strike.name, "Strike+")
        self.assertEqual(self.strike.damage, 9)  # 6 + 3

        # Can't upgrade again
        self.assertFalse(self.strike.upgrade())

    def test_card_display_compact(self):
        """Test compact card display."""
        display = self.strike.display(compact=True)
        self.assertIn("Strike", display)
        self.assertIn("DMG:6", display)
        self.assertIn("[1]", display)

    def test_card_display_full(self):
        """Test full card display."""
        display = self.strike.display(compact=False)
        self.assertIn("Strike", display)
        self.assertIn("Damage: 6", display)
        self.assertIn("Cost: 1", display)

    def test_card_to_dict(self):
        """Test card serialization to dict."""
        card_dict = self.strike.to_dict()
        self.assertEqual(card_dict["name"], "Strike")
        self.assertEqual(card_dict["cost"], 1)
        self.assertEqual(card_dict["damage"], 6)
        self.assertEqual(card_dict["card_type"], "Attack")

    def test_card_from_dict(self):
        """Test card deserialization from dict."""
        card_dict = self.strike.to_dict()
        new_card = Card.from_dict(card_dict)
        self.assertEqual(new_card.name, self.strike.name)
        self.assertEqual(new_card.cost, self.strike.cost)
        self.assertEqual(new_card.damage, self.strike.damage)

    def test_card_copy(self):
        """Test copying a card."""
        self.strike.upgrade()
        copy = self.strike.copy()

        self.assertEqual(copy.name, "Strike")  # Should not have +
        self.assertFalse(copy.upgraded)
        self.assertEqual(copy.damage, 6)  # Should be base damage

    def test_card_equality(self):
        """Test card equality."""
        strike2 = Card(
            name="Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.STARTER,
            description="Deal 6 damage.",
            damage=6
        )

        self.assertEqual(self.strike, strike2)

        strike2.upgrade()
        self.assertNotEqual(self.strike, strike2)


class TestDeck(unittest.TestCase):
    """Test cases for the Deck class."""

    def setUp(self):
        """Set up test fixtures."""
        self.deck = Deck("Test Deck")
        self.strike = Card(
            name="Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.STARTER,
            description="Deal 6 damage.",
            damage=6
        )
        self.defend = Card(
            name="Defend",
            cost=1,
            card_type=CardType.SKILL,
            rarity=Rarity.STARTER,
            description="Gain 5 Block.",
            block=5
        )

    def test_deck_creation(self):
        """Test creating a deck."""
        self.assertEqual(self.deck.name, "Test Deck")
        self.assertEqual(self.deck.size(), 0)

    def test_add_card(self):
        """Test adding cards to deck."""
        self.deck.add_card(self.strike)
        self.assertEqual(self.deck.size(), 1)

        self.deck.add_card(self.defend, count=3)
        self.assertEqual(self.deck.size(), 4)

    def test_remove_card(self):
        """Test removing cards from deck."""
        self.deck.add_card(self.strike)
        self.deck.add_card(self.defend)

        self.assertTrue(self.deck.remove_card(self.strike))
        self.assertEqual(self.deck.size(), 1)

        # Try to remove card not in deck
        self.assertFalse(self.deck.remove_card(self.strike))

    def test_shuffle(self):
        """Test shuffling deck."""
        # Add many cards
        for _ in range(10):
            self.deck.add_card(self.strike.copy())
            self.deck.add_card(self.defend.copy())

        original_order = [card.name for card in self.deck.cards]
        self.deck.shuffle()
        shuffled_order = [card.name for card in self.deck.cards]

        # Should have same cards, likely different order
        self.assertEqual(len(original_order), len(shuffled_order))

    def test_draw_card(self):
        """Test drawing cards from deck."""
        self.deck.add_card(self.strike)
        self.deck.add_card(self.defend)

        drawn = self.deck.draw_card()
        self.assertIsNotNone(drawn)
        self.assertEqual(self.deck.size(), 1)

        # Draw last card
        drawn = self.deck.draw_card()
        self.assertIsNotNone(drawn)
        self.assertEqual(self.deck.size(), 0)

        # Try to draw from empty deck
        drawn = self.deck.draw_card()
        self.assertIsNone(drawn)

    def test_get_statistics(self):
        """Test getting deck statistics."""
        # Empty deck
        stats = self.deck.get_statistics()
        self.assertEqual(stats["total_cards"], 0)

        # Add cards
        self.deck.add_card(self.strike, count=3)
        self.deck.add_card(self.defend, count=2)

        stats = self.deck.get_statistics()
        self.assertEqual(stats["total_cards"], 5)
        self.assertEqual(stats["average_cost"], 1.0)
        self.assertEqual(stats["card_types"]["Attack"], 3)
        self.assertEqual(stats["card_types"]["Skill"], 2)

    def test_save_and_load_deck(self):
        """Test saving and loading deck to/from file."""
        self.deck.add_card(self.strike, count=2)
        self.deck.add_card(self.defend, count=3)

        # Save to temp file
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
            temp_file = f.name

        try:
            self.deck.save_to_file(temp_file)

            # Load from file
            loaded_deck = Deck.load_from_file(temp_file)

            self.assertEqual(loaded_deck.name, self.deck.name)
            self.assertEqual(loaded_deck.size(), self.deck.size())
            self.assertEqual(loaded_deck.cards[0].name, self.deck.cards[0].name)

        finally:
            # Clean up
            if os.path.exists(temp_file):
                os.remove(temp_file)


class TestGameState(unittest.TestCase):
    """Test cases for the GameState class."""

    def setUp(self):
        """Set up test fixtures."""
        deck = Deck("Test Deck")
        strike = Card(
            name="Strike",
            cost=1,
            card_type=CardType.ATTACK,
            rarity=Rarity.STARTER,
            description="Deal 6 damage.",
            damage=6
        )

        for _ in range(10):
            deck.add_card(strike.copy())

        self.game_state = GameState(deck)

    def test_initial_state(self):
        """Test initial game state."""
        status = self.game_state.get_status()
        self.assertEqual(status["draw_pile"], 10)
        self.assertEqual(status["hand"], 0)
        self.assertEqual(status["discard_pile"], 0)
        self.assertEqual(status["exhaust_pile"], 0)

    def test_draw_cards(self):
        """Test drawing cards."""
        drawn = self.game_state.draw_cards(3)
        self.assertEqual(len(drawn), 3)

        status = self.game_state.get_status()
        self.assertEqual(status["draw_pile"], 7)
        self.assertEqual(status["hand"], 3)

    def test_draw_with_reshuffle(self):
        """Test that discard pile reshuffles into draw pile."""
        # Draw all cards
        self.game_state.draw_cards(10)
        self.assertEqual(self.game_state.get_status()["draw_pile"], 0)

        # Play some cards to discard
        for i in range(5):
            self.game_state.play_card(self.game_state.hand[0])

        self.assertEqual(self.game_state.get_status()["discard_pile"], 5)

        # Try to draw - should reshuffle discard into draw
        drawn = self.game_state.draw_cards(3)
        self.assertEqual(len(drawn), 3)
        self.assertEqual(self.game_state.get_status()["discard_pile"], 0)

    def test_play_card(self):
        """Test playing cards."""
        self.game_state.draw_cards(3)
        card = self.game_state.hand[0]

        self.assertTrue(self.game_state.play_card(card))

        status = self.game_state.get_status()
        self.assertEqual(status["hand"], 2)
        self.assertEqual(status["discard_pile"], 1)

    def test_play_card_exhaust(self):
        """Test playing cards with exhaust."""
        self.game_state.draw_cards(3)
        card = self.game_state.hand[0]

        self.assertTrue(self.game_state.play_card(card, exhaust=True))

        status = self.game_state.get_status()
        self.assertEqual(status["hand"], 2)
        self.assertEqual(status["discard_pile"], 0)
        self.assertEqual(status["exhaust_pile"], 1)

    def test_discard_hand(self):
        """Test discarding entire hand."""
        self.game_state.draw_cards(5)
        self.game_state.discard_hand()

        status = self.game_state.get_status()
        self.assertEqual(status["hand"], 0)
        self.assertEqual(status["discard_pile"], 5)

    def test_end_turn(self):
        """Test ending turn."""
        self.game_state.draw_cards(3)
        self.game_state.end_turn()

        status = self.game_state.get_status()
        self.assertEqual(status["hand"], 5)  # Should draw 5 new cards
        self.assertEqual(status["discard_pile"], 3)  # Previous hand discarded


if __name__ == '__main__':
    unittest.main()
