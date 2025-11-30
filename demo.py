#!/usr/bin/env python3
"""Quick demo of the deck builder features."""
from src.models import Deck, GameState
from src.card_database import CardDatabase
from src.utils import print_header, print_success, display_deck_stats, display_cards_list

def main():
    print_header("Slay the Spire Deck Builder - Demo")

    # Initialize the card database
    db = CardDatabase()
    print_success("Initialized card database with 60+ cards!")

    # Demo 1: Browse some cards
    print_header("Demo 1: Card Database")
    print("\nShowing some attack cards:")
    attacks = db.get_cards_by_type(db.get_card("Strike").card_type)[:5]
    for card in attacks:
        print(card.display(compact=True))

    print("\nShowing some rare cards:")
    rares = db.get_cards_by_rarity(db.get_card("Bludgeon").rarity)[:3]
    for card in rares:
        print(card.display(compact=False))

    # Demo 2: Create a deck
    print_header("Demo 2: Creating a Deck")
    my_deck = Deck("Demo Deck")

    # Add starter cards
    starter_cards = db.get_starter_deck()
    for card in starter_cards:
        my_deck.add_card(card)

    # Add some cool cards
    my_deck.add_card(db.get_card("Bash"))
    my_deck.add_card(db.get_card("Bludgeon"))
    my_deck.add_card(db.get_card("Inflame"))
    my_deck.add_card(db.get_card("Shrug It Off"))

    print_success(f"Created deck with {my_deck.size()} cards!")

    # Demo 3: Deck Statistics
    print_header("Demo 3: Deck Statistics")
    display_deck_stats(my_deck)

    # Demo 4: Upgrade a card
    print_header("Demo 4: Upgrading Cards")
    strike = my_deck.cards[0]
    print(f"Before upgrade: {strike.display(compact=True)}")
    strike.upgrade()
    print(f"After upgrade:  {strike.display(compact=True)}")
    print_success("Card upgraded! Damage increased from 6 to 9")

    # Demo 5: Save deck
    print_header("Demo 5: Saving Deck")
    filename = "demo_deck.json"
    my_deck.save_to_file(filename)
    print_success(f"Deck saved to {filename}!")

    # Demo 6: Load deck
    print_header("Demo 6: Loading Deck")
    loaded_deck = Deck.load_from_file(filename)
    print_success(f"Loaded deck '{loaded_deck.name}' with {loaded_deck.size()} cards!")

    # Demo 7: Game Simulation
    print_header("Demo 7: Game Simulation")
    game = GameState(loaded_deck)
    print(f"Initial state: {game.get_status()}")

    print("\nDrawing 5 cards...")
    game.draw_cards(5)
    print(f"After draw: {game.get_status()}")
    display_cards_list(game.hand, "Hand")

    print("\nPlaying first card...")
    if game.hand:
        card = game.hand[0]
        game.play_card(card)
        print_success(f"Played {card.name}!")
        print(f"After playing: {game.get_status()}")

    print("\nEnding turn (discard hand and draw 5 new)...")
    game.end_turn()
    print(f"After end turn: {game.get_status()}")
    display_cards_list(game.hand, "New Hand")

    # Demo 8: Card Search
    print_header("Demo 8: Card Search")

    print("\nSearching for 'damage' cards:")
    results = db.search_cards("damage")
    print(f"Found {len(results)} cards containing 'damage'")
    for card in results[:3]:
        print(card.display(compact=True))

    print_header("Demo Complete!")
    print("To run the interactive app, use: python run_app.py")
    print("To run tests, use: python -m pytest tests/ -v")

if __name__ == "__main__":
    main()
