"""Tests for the card database module."""
import unittest
from src.card_database import CardDatabase
from src.models import CardType, Rarity


class TestCardDatabase(unittest.TestCase):
    """Test cases for the CardDatabase class."""

    def setUp(self):
        """Set up test fixtures."""
        self.db = CardDatabase()

    def test_database_initialized(self):
        """Test that database is initialized with cards."""
        all_cards = self.db.get_all_cards()
        self.assertGreater(len(all_cards), 0)

    def test_get_card(self):
        """Test getting a specific card by name."""
        strike = self.db.get_card("Strike")
        self.assertEqual(strike.name, "Strike")
        self.assertEqual(strike.cost, 1)
        self.assertEqual(strike.card_type, CardType.ATTACK)

    def test_get_card_not_found(self):
        """Test getting a card that doesn't exist."""
        with self.assertRaises(KeyError):
            self.db.get_card("NonexistentCard")

    def test_get_card_returns_copy(self):
        """Test that get_card returns a copy, not the original."""
        card1 = self.db.get_card("Strike")
        card2 = self.db.get_card("Strike")

        # Modify one
        card1.upgrade()

        # Other should not be affected
        self.assertNotEqual(card1.upgraded, card2.upgraded)

    def test_get_all_cards(self):
        """Test getting all cards."""
        all_cards = self.db.get_all_cards()
        self.assertIsInstance(all_cards, list)
        self.assertGreater(len(all_cards), 10)  # Should have many cards

    def test_get_cards_by_type(self):
        """Test filtering cards by type."""
        attacks = self.db.get_cards_by_type(CardType.ATTACK)
        self.assertGreater(len(attacks), 0)

        # All should be attacks
        for card in attacks:
            self.assertEqual(card.card_type, CardType.ATTACK)

        skills = self.db.get_cards_by_type(CardType.SKILL)
        self.assertGreater(len(skills), 0)

        # All should be skills
        for card in skills:
            self.assertEqual(card.card_type, CardType.SKILL)

    def test_get_cards_by_rarity(self):
        """Test filtering cards by rarity."""
        commons = self.db.get_cards_by_rarity(Rarity.COMMON)
        self.assertGreater(len(commons), 0)

        # All should be common
        for card in commons:
            self.assertEqual(card.rarity, Rarity.COMMON)

        rares = self.db.get_cards_by_rarity(Rarity.RARE)
        self.assertGreater(len(rares), 0)

        # All should be rare
        for card in rares:
            self.assertEqual(card.rarity, Rarity.RARE)

    def test_search_cards(self):
        """Test searching for cards."""
        # Search by name
        results = self.db.search_cards("Strike")
        self.assertGreater(len(results), 0)
        self.assertTrue(any("Strike" in card.name for card in results))

        # Search by description
        results = self.db.search_cards("damage")
        self.assertGreater(len(results), 0)
        self.assertTrue(any("damage" in card.description.lower() for card in results))

        # Case insensitive
        results1 = self.db.search_cards("strike")
        results2 = self.db.search_cards("STRIKE")
        self.assertEqual(len(results1), len(results2))

    def test_get_starter_deck(self):
        """Test getting a starter deck."""
        starter = self.db.get_starter_deck()

        # Should have 10 cards (5 Strikes, 5 Defends)
        self.assertEqual(len(starter), 10)

        strikes = [c for c in starter if c.name == "Strike"]
        defends = [c for c in starter if c.name == "Defend"]

        self.assertEqual(len(strikes), 5)
        self.assertEqual(len(defends), 5)

    def test_specific_cards_exist(self):
        """Test that specific expected cards exist in database."""
        expected_cards = [
            "Strike", "Defend", "Bash", "Anger", "Body Slam",
            "Cleave", "Armaments", "Shrug It Off", "Carnage",
            "Bludgeon", "Feed", "Barricade", "Demon Form"
        ]

        for card_name in expected_cards:
            card = self.db.get_card(card_name)
            self.assertEqual(card.name, card_name)

    def test_card_properties(self):
        """Test that cards have proper properties."""
        # Test an attack card
        bash = self.db.get_card("Bash")
        self.assertEqual(bash.card_type, CardType.ATTACK)
        self.assertGreater(bash.damage, 0)

        # Test a skill card
        defend = self.db.get_card("Defend")
        self.assertEqual(defend.card_type, CardType.SKILL)
        self.assertGreater(defend.block, 0)

        # Test a power card
        inflame = self.db.get_card("Inflame")
        self.assertEqual(inflame.card_type, CardType.POWER)

    def test_rarity_distribution(self):
        """Test that we have cards of different rarities."""
        starters = self.db.get_cards_by_rarity(Rarity.STARTER)
        commons = self.db.get_cards_by_rarity(Rarity.COMMON)
        uncommons = self.db.get_cards_by_rarity(Rarity.UNCOMMON)
        rares = self.db.get_cards_by_rarity(Rarity.RARE)

        self.assertGreater(len(starters), 0)
        self.assertGreater(len(commons), 0)
        self.assertGreater(len(uncommons), 0)
        self.assertGreater(len(rares), 0)


if __name__ == '__main__':
    unittest.main()
