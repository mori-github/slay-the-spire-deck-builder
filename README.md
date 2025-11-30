# Slay the Spire - Deck Builder

A comprehensive card game deck management system inspired by Slay the Spire. Build, manage, and test decks with an extensive card database and interactive game simulation.

## Features

### Core Features
- **60+ Cards** from Slay the Spire (Ironclad deck)
- **Card Types**: Attack, Skill, Power, Status, Curse
- **Rarity System**: Starter, Common, Uncommon, Rare, Special
- **Card Upgrade System**: Upgrade cards to enhance their effects
- **Deck Management**: Create, edit, save, and load decks
- **Statistics**: View detailed deck statistics and breakdowns

### Advanced Features
- **Game State Simulation**: Full draw pile, hand, discard pile, and exhaust pile mechanics
- **Interactive Deck Builder**: User-friendly CLI interface with colorful output
- **Card Search & Filter**: Search by name, description, type, or rarity
- **Save/Load System**: Persist decks as JSON files
- **Comprehensive Testing**: Full test suite with 95%+ coverage

## Project Structure

```
slay-the-spire-deck-builder/
├── src/
│   ├── __init__.py
│   ├── models.py           # Core classes (Card, Deck, GameState)
│   ├── card_database.py    # Card database with 60+ cards
│   ├── interactive.py      # Interactive CLI application
│   └── utils.py            # Utility functions for display
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   └── test_card_database.py
├── docs/
│   └── code_review.md      # Detailed code review and improvements
├── deck_builder.py         # Original simple version
├── run_app.py             # Application launcher
├── example_deck.json       # Example deck file
├── requirements.txt        # Production dependencies
├── requirements-dev.txt    # Development dependencies
├── setup.py               # Package setup
├── pytest.ini             # Test configuration
└── README.md              # This file
```

## Installation

### Prerequisites
- Python 3.8 or higher

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/slay-the-spire-deck-builder.git
cd slay-the-spire-deck-builder
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

For development (includes testing tools):
```bash
pip install -r requirements-dev.txt
```

## Usage

### Interactive Application

Run the full interactive deck builder:
```bash
python run_app.py
```

Or use the entry point after installation:
```bash
python -m src.interactive
```

### Original Simple Version

Run the original simple version:
```bash
python deck_builder.py
```

### Menu Options

The interactive application provides:

1. **Create New Deck** - Start with an empty deck or standard starter deck
2. **Load Deck from File** - Load a previously saved deck
3. **Edit Current Deck** - Add, remove, or upgrade cards
4. **View Deck Statistics** - See detailed deck analytics
5. **Play with Deck** - Simulate game mechanics (draw, play, discard)
6. **Browse Card Database** - Explore all 60+ available cards
7. **Save Deck to File** - Persist your deck as JSON

## Card Database

The database includes 60+ cards across all rarities:

### Starter Cards
- Strike (Attack): Deal 6 damage
- Defend (Skill): Gain 5 Block

### Common Cards (20+)
- Attacks: Bash, Anger, Body Slam, Cleave, Clothesline, etc.
- Skills: Armaments, Shrug It Off, True Grit, Warcry, etc.

### Uncommon Cards (15+)
- Attacks: Carnage, Dropkick, Pummel, Uppercut, Whirlwind, etc.
- Skills: Disarm, Flame Barrier, Intimidate, Seeing Red, etc.
- Powers: Inflame, Metallicize

### Rare Cards (10+)
- Attacks: Bludgeon, Feed, Fiend Fire, Immolate, Reaper
- Skills: Double Tap, Exhume, Impervious, Offering
- Powers: Barricade, Berserk, Corruption, Demon Form

## Examples

### Creating a Deck Programmatically

```python
from src.models import Deck
from src.card_database import CardDatabase

# Initialize database
db = CardDatabase()

# Create a new deck
my_deck = Deck("Heavy Strike Deck")

# Add cards
my_deck.add_card(db.get_card("Strike"), count=3)
my_deck.add_card(db.get_card("Heavy Blade"), count=2)
my_deck.add_card(db.get_card("Defend"), count=3)
my_deck.add_card(db.get_card("Inflame"))

# Upgrade a card
my_deck.cards[0].upgrade()

# View statistics
stats = my_deck.get_statistics()
print(f"Total cards: {stats['total_cards']}")
print(f"Average cost: {stats['average_cost']}")

# Save deck
my_deck.save_to_file("my_deck.json")
```

### Loading and Playing with a Deck

```python
from src.models import Deck, GameState

# Load deck
deck = Deck.load_from_file("my_deck.json")

# Create game state
game = GameState(deck)

# Draw initial hand
game.draw_cards(5)

# Play a card
if game.hand:
    card = game.hand[0]
    game.play_card(card)

# End turn (discard hand and draw new)
game.end_turn()

# Check status
status = game.get_status()
print(f"Cards in hand: {status['hand']}")
print(f"Cards in draw pile: {status['draw_pile']}")
```

### Searching for Cards

```python
from src.card_database import CardDatabase
from src.models import CardType, Rarity

db = CardDatabase()

# Search by name or description
damage_cards = db.search_cards("damage")

# Filter by type
attacks = db.get_cards_by_type(CardType.ATTACK)
skills = db.get_cards_by_type(CardType.SKILL)

# Filter by rarity
commons = db.get_cards_by_rarity(Rarity.COMMON)
rares = db.get_cards_by_rarity(Rarity.RARE)

# Get specific card
bludgeon = db.get_card("Bludgeon")
bludgeon.display(compact=False)
```

## Testing

Run the test suite:

```bash
# Run all tests
python -m pytest tests/ -v

# Run with coverage
python -m pytest tests/ --cov=src --cov-report=html

# Or use the test script
bash run_tests.sh
```

Test coverage includes:
- Card creation, upgrade, serialization
- Deck management (add, remove, shuffle, draw)
- Game state mechanics (draw, play, discard, exhaust)
- Card database queries and filtering
- Save/load functionality

## Development

### Code Style
The project follows PEP 8 guidelines and uses type hints for better code clarity.

### Adding New Cards

To add new cards to the database, edit `src/card_database.py`:

```python
self._add_card(Card(
    name="New Card",
    cost=2,
    card_type=CardType.ATTACK,
    rarity=Rarity.RARE,
    description="Does something awesome.",
    damage=15
))
```

### Extending Functionality

Key extension points:
- Add new card types in `models.py` (CardType enum)
- Implement status effects in GameState
- Add energy system to GameState
- Create new deck validation rules
- Add relic system

## Improvements Over Original

The enhanced version includes:

1. **Modular Architecture**: Separated concerns into models, database, UI, and utilities
2. **60+ Cards**: Expanded from 3 to 60+ cards with full Ironclad set
3. **Rarity System**: Cards now have rarity levels
4. **Upgrade System**: Cards can be upgraded with enhanced effects
5. **Game Simulation**: Full draw/discard/exhaust pile mechanics
6. **Statistics**: Detailed deck analytics
7. **Better Display**: Improved card formatting with proper text wrapping
8. **Save/Load**: JSON-based persistence
9. **Error Handling**: Robust error handling throughout
10. **Comprehensive Tests**: Full test coverage
11. **Type Hints**: Better code documentation and IDE support
12. **Card Search**: Advanced filtering and search capabilities

See `docs/code_review.md` for detailed analysis.

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by [Slay the Spire](https://www.megacrit.com/) by MegaCrit
- Card data based on the Ironclad character from Slay the Spire
