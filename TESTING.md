# Testing Guide

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

For testing tools:
```bash
pip install -r requirements-dev.txt
```

### 2. Run the Demo (Non-Interactive)
```bash
python demo.py
```
This shows all features in action without requiring input.

### 3. Run Unit Tests
```bash
# All tests
python -m pytest tests/ -v

# With coverage report
python -m pytest tests/ --cov=src --cov-report=term

# HTML coverage report
python -m pytest tests/ --cov=src --cov-report=html
# Then open htmlcov/index.html in a browser
```

### 4. Run Interactive Application
```bash
python run_app.py
```

Or:
```bash
python -m src.interactive
```

Or the original simple version:
```bash
python deck_builder.py
```

## Interactive App - Things to Try

### Option 1: Create New Deck
1. Choose option `1` - Create New Deck
2. Enter a deck name (e.g., "My First Deck")
3. Choose `y` to start with starter deck (5 Strikes, 5 Defends)

### Option 3: Edit Current Deck
1. Choose option `3` - Edit Current Deck
2. Try these sub-options:
   - **Add Card**: Search for "bash" or "bludgeon" and add to deck
   - **Remove Card**: Select a card number to remove
   - **Upgrade Card**: Select a card to upgrade (damage/block increases!)
   - **Shuffle Deck**: Randomize card order

### Option 4: View Deck Statistics
1. Choose option `4` - View Deck Statistics
2. See total cards, average cost, card type distribution, rarity breakdown

### Option 5: Play with Deck (Game Mode)
This simulates actual Slay the Spire mechanics!
1. Choose option `5` - Play with Deck
2. You'll see:
   - Draw pile, hand, discard pile, exhaust pile counts
   - Your current hand of cards
3. Try these actions:
   - **Play Card**: Select a card from your hand to play
   - **Draw Card**: Draw from draw pile
   - **End Turn**: Discards hand and draws 5 new cards
   - **View Piles**: See what's in draw or discard pile

### Option 6: Browse Card Database
1. Choose option `6` - Browse Card Database
2. Try:
   - **View All Cards**: See all 60+ cards
   - **Filter by Card Type**: See all Attacks, Skills, or Powers
   - **Filter by Rarity**: See Commons, Uncommons, or Rares
   - **Search Cards**: Search by name or description (e.g., "damage", "block")

### Option 7: Save Deck to File
1. Choose option `7` - Save Deck to File
2. Enter filename (e.g., "my_deck.json")
3. Deck is saved and can be loaded later

### Option 2: Load Deck from File
1. Choose option `2` - Load Deck from File
2. Enter filename (e.g., "example_deck.json" or "my_deck.json")
3. Deck is loaded and ready to edit/play

## Programmatic Usage Examples

### Example 1: Create Custom Deck
```python
from src.models import Deck
from src.card_database import CardDatabase

db = CardDatabase()
deck = Deck("Strength Deck")

# Add cards
deck.add_card(db.get_card("Strike"), count=3)
deck.add_card(db.get_card("Inflame"), count=2)  # Power that adds Strength
deck.add_card(db.get_card("Heavy Blade"))        # Scales with Strength
deck.add_card(db.get_card("Defend"), count=3)

# Save it
deck.save_to_file("strength_deck.json")
```

### Example 2: Upgrade All Cards
```python
from src.models import Deck

deck = Deck.load_from_file("my_deck.json")

for card in deck.cards:
    if card.upgrade():
        print(f"Upgraded {card.name}!")

deck.save_to_file("upgraded_deck.json")
```

### Example 3: Analyze Deck
```python
from src.models import Deck
from src.card_database import CardDatabase

db = CardDatabase()
deck = Deck.load_from_file("my_deck.json")

stats = deck.get_statistics()
print(f"Total Cards: {stats['total_cards']}")
print(f"Average Cost: {stats['average_cost']}")
print(f"Attacks: {stats['card_types'].get('Attack', 0)}")
print(f"Skills: {stats['card_types'].get('Skill', 0)}")
```

### Example 4: Simulate Drawing Cards
```python
from src.models import Deck, GameState

deck = Deck.load_from_file("my_deck.json")
game = GameState(deck)

# Draw opening hand
game.draw_cards(5)
print(f"Drew {len(game.hand)} cards")

# Play all cards
while game.hand:
    card = game.hand[0]
    game.play_card(card)
    print(f"Played {card.name}")

# End turn - reshuffles discard into draw if needed
game.end_turn()
print("New turn, new hand!")
```

## Test Files Explained

### tests/test_models.py
Tests for core classes:
- **Card**: Creation, upgrade, serialization, display
- **Deck**: Add/remove cards, shuffle, draw, statistics, save/load
- **GameState**: Draw mechanics, playing cards, discard/exhaust, turn management

### tests/test_card_database.py
Tests for card database:
- Database initialization
- Getting specific cards
- Filtering by type and rarity
- Search functionality
- Starter deck generation

## Coverage Report

Run with coverage:
```bash
python -m pytest tests/ --cov=src --cov-report=html --cov-report=term
```

Expected coverage: **95%+**

View detailed HTML report:
```bash
# Opens in browser
open htmlcov/index.html  # macOS
xdg-open htmlcov/index.html  # Linux
```

## Performance

All tests run in < 1 second:
- 34 test cases
- Tests card operations, deck management, game simulation
- No external dependencies except colorama

## Troubleshooting

### Import Errors
If you get import errors, make sure you're running from the project root:
```bash
cd /path/to/slay-the-spire-deck-builder
python demo.py
```

### Color Display Issues
If colors don't display properly on Windows:
```python
# colorama should auto-initialize, but you can force it:
from colorama import init
init(autoreset=True)
```

### Test Failures
If tests fail, ensure:
1. All dependencies installed: `pip install -r requirements-dev.txt`
2. Running from project root
3. Python 3.8+ is being used

## Next Steps

After testing, you can:
1. Add more cards to `src/card_database.py`
2. Implement energy system in `src/models.py`
3. Add status effects (Vulnerable, Weak, Strength)
4. Create deck validation rules
5. Add relic system
6. Build a GUI with tkinter or pygame
7. Create an AI deck optimizer

Enjoy building decks! 🎴
