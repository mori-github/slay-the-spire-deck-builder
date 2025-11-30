"""Interactive deck builder application."""
from typing import Optional
from src.models import Deck, GameState, CardType, Rarity
from src.card_database import CardDatabase
from src.utils import (
    print_header, print_menu, get_user_choice, print_success,
    print_error, print_info, confirm_action, display_deck_stats,
    display_cards_list, pause
)


class DeckBuilderApp:
    """Interactive deck builder application."""

    def __init__(self):
        """Initialize the application."""
        self.db = CardDatabase()
        self.current_deck: Optional[Deck] = None

    def run(self):
        """Run the main application loop."""
        print_header("Slay the Spire - Deck Builder")
        print_info("Welcome to the Deck Builder!")

        while True:
            options = [
                "Create New Deck",
                "Load Deck from File",
                "Edit Current Deck",
                "View Deck Statistics",
                "Play with Deck (Game Mode)",
                "Browse Card Database",
                "Save Deck to File",
                "Exit"
            ]

            print_menu(options, "Main Menu")
            choice = get_user_choice("Choose an option: ", (1, len(options)))

            if choice == '1':
                self.create_new_deck()
            elif choice == '2':
                self.load_deck()
            elif choice == '3':
                self.edit_deck()
            elif choice == '4':
                self.view_statistics()
            elif choice == '5':
                self.play_game()
            elif choice == '6':
                self.browse_cards()
            elif choice == '7':
                self.save_deck()
            elif choice == '8':
                print_success("Thanks for using Deck Builder! Goodbye!")
                break

    def create_new_deck(self):
        """Create a new deck."""
        print_header("Create New Deck")

        deck_name = input("Enter deck name: ").strip()
        if not deck_name:
            deck_name = "My Deck"

        self.current_deck = Deck(deck_name)

        # Ask if user wants starter deck
        if confirm_action("Start with standard starter deck (5 Strikes, 5 Defends)?"):
            starter_cards = self.db.get_starter_deck()
            for card in starter_cards:
                self.current_deck.add_card(card)
            print_success(f"Created deck '{deck_name}' with starter cards!")
        else:
            print_success(f"Created empty deck '{deck_name}'!")

        pause()

    def load_deck(self):
        """Load a deck from file."""
        print_header("Load Deck")

        filename = input("Enter filename to load: ").strip()
        if not filename:
            print_error("No filename provided")
            pause()
            return

        try:
            self.current_deck = Deck.load_from_file(filename)
            print_success(f"Loaded deck '{self.current_deck.name}'!")
        except FileNotFoundError:
            print_error(f"File '{filename}' not found")
        except Exception as e:
            print_error(f"Error loading deck: {e}")

        pause()

    def edit_deck(self):
        """Edit the current deck."""
        if not self.current_deck:
            print_error("No deck loaded! Create or load a deck first.")
            pause()
            return

        while True:
            print_header(f"Edit Deck: {self.current_deck.name}")
            self.current_deck.display_deck(compact=True)

            options = [
                "Add Card to Deck",
                "Remove Card from Deck",
                "Upgrade Card in Deck",
                "Shuffle Deck",
                "Back to Main Menu"
            ]

            print_menu(options, "Deck Editor")
            choice = get_user_choice("Choose an option: ", (1, len(options)))

            if choice == '1':
                self.add_card_to_deck()
            elif choice == '2':
                self.remove_card_from_deck()
            elif choice == '3':
                self.upgrade_card_in_deck()
            elif choice == '4':
                self.current_deck.shuffle()
                print_success("Deck shuffled!")
                pause()
            elif choice == '5':
                break

    def add_card_to_deck(self):
        """Add a card to the current deck."""
        print_header("Add Card to Deck")

        # Search for card
        query = input("Enter card name to search (or press Enter to browse all): ").strip()

        if query:
            cards = self.db.search_cards(query)
        else:
            cards = self.db.get_all_cards()

        if not cards:
            print_error("No cards found")
            pause()
            return

        # Display found cards
        display_cards_list(cards, "Available Cards")

        # Select card
        choice = get_user_choice(
            "Enter card number to add (0 to cancel): ",
            (0, len(cards))
        )

        if choice == '0':
            return

        selected_card = cards[int(choice) - 1]

        # Ask how many copies
        count = int(get_user_choice("How many copies to add? ", (1, 10)))

        self.current_deck.add_card(selected_card, count)
        print_success(f"Added {count}x {selected_card.name} to deck!")
        pause()

    def remove_card_from_deck(self):
        """Remove a card from the current deck."""
        if self.current_deck.size() == 0:
            print_error("Deck is empty!")
            pause()
            return

        print_header("Remove Card from Deck")

        # Select card to remove
        choice = get_user_choice(
            "Enter card number to remove (0 to cancel): ",
            (0, self.current_deck.size())
        )

        if choice == '0':
            return

        card_index = int(choice) - 1
        card = self.current_deck.cards[card_index]

        if self.current_deck.remove_card(card):
            print_success(f"Removed {card.name} from deck!")
        else:
            print_error("Failed to remove card")

        pause()

    def upgrade_card_in_deck(self):
        """Upgrade a card in the current deck."""
        if self.current_deck.size() == 0:
            print_error("Deck is empty!")
            pause()
            return

        print_header("Upgrade Card")

        # Select card to upgrade
        choice = get_user_choice(
            "Enter card number to upgrade (0 to cancel): ",
            (0, self.current_deck.size())
        )

        if choice == '0':
            return

        card_index = int(choice) - 1
        card = self.current_deck.cards[card_index]

        if card.upgrade():
            print_success(f"Upgraded {card.name}!")
        else:
            print_error("Card cannot be upgraded (already upgraded or not upgradeable)")

        pause()

    def view_statistics(self):
        """View deck statistics."""
        if not self.current_deck:
            print_error("No deck loaded! Create or load a deck first.")
            pause()
            return

        print_header(f"Deck Statistics: {self.current_deck.name}")
        display_deck_stats(self.current_deck)
        pause()

    def play_game(self):
        """Play with the deck in game mode."""
        if not self.current_deck:
            print_error("No deck loaded! Create or load a deck first.")
            pause()
            return

        if self.current_deck.size() == 0:
            print_error("Deck is empty! Add some cards first.")
            pause()
            return

        print_header("Game Mode")
        print_info("Starting a new game with your deck!")

        game_state = GameState(self.current_deck)

        # Draw initial hand
        game_state.draw_cards(5)

        while True:
            # Display game state
            status = game_state.get_status()
            print(f"\n{'-' * 60}")
            print(f"Draw Pile: {status['draw_pile']} | Hand: {status['hand']} | "
                  f"Discard: {status['discard_pile']} | Exhaust: {status['exhaust_pile']}")
            print(f"{'-' * 60}")

            # Display hand
            if game_state.hand:
                display_cards_list(game_state.hand, "Your Hand")
            else:
                print_info("Hand is empty")

            # Game options
            options = [
                "Play Card",
                "Draw Card",
                "End Turn",
                "View Draw Pile",
                "View Discard Pile",
                "Exit Game"
            ]

            print_menu(options, "Game Actions")
            choice = get_user_choice("Choose an action: ", (1, len(options)))

            if choice == '1':
                if not game_state.hand:
                    print_error("No cards in hand!")
                    pause()
                    continue

                card_choice = get_user_choice(
                    "Enter card number to play (0 to cancel): ",
                    (0, len(game_state.hand))
                )

                if card_choice != '0':
                    card = game_state.hand[int(card_choice) - 1]
                    exhaust = confirm_action("Exhaust this card?")

                    if game_state.play_card(card, exhaust):
                        print_success(f"Played {card.name}!")
                    else:
                        print_error("Failed to play card")

                    pause()

            elif choice == '2':
                drawn = game_state.draw_cards(1)
                if drawn:
                    print_success(f"Drew: {drawn[0].name}")
                else:
                    print_info("No cards to draw!")
                pause()

            elif choice == '3':
                game_state.end_turn()
                print_success("Turn ended! Drew new hand.")
                pause()

            elif choice == '4':
                display_cards_list(game_state.draw_pile, "Draw Pile")
                pause()

            elif choice == '5':
                display_cards_list(game_state.discard_pile, "Discard Pile")
                pause()

            elif choice == '6':
                if confirm_action("Exit game mode?"):
                    break

    def browse_cards(self):
        """Browse the card database."""
        while True:
            print_header("Card Database Browser")

            options = [
                "View All Cards",
                "Filter by Card Type",
                "Filter by Rarity",
                "Search Cards",
                "Back to Main Menu"
            ]

            print_menu(options, "Browse Options")
            choice = get_user_choice("Choose an option: ", (1, len(options)))

            if choice == '1':
                cards = self.db.get_all_cards()
                display_cards_list(cards, "All Cards", compact=True)
                pause()

            elif choice == '2':
                self.filter_by_type()

            elif choice == '3':
                self.filter_by_rarity()

            elif choice == '4':
                query = input("Enter search term: ").strip()
                cards = self.db.search_cards(query)
                display_cards_list(cards, f"Search Results for '{query}'")
                pause()

            elif choice == '5':
                break

    def filter_by_type(self):
        """Filter cards by type."""
        print_header("Filter by Card Type")

        types = list(CardType)
        for i, card_type in enumerate(types, 1):
            print(f"{i}. {card_type.value}")

        choice = get_user_choice("Select card type: ", (1, len(types)))
        selected_type = types[int(choice) - 1]

        cards = self.db.get_cards_by_type(selected_type)
        display_cards_list(cards, f"{selected_type.value} Cards")
        pause()

    def filter_by_rarity(self):
        """Filter cards by rarity."""
        print_header("Filter by Rarity")

        rarities = list(Rarity)
        for i, rarity in enumerate(rarities, 1):
            print(f"{i}. {rarity.value}")

        choice = get_user_choice("Select rarity: ", (1, len(rarities)))
        selected_rarity = rarities[int(choice) - 1]

        cards = self.db.get_cards_by_rarity(selected_rarity)
        display_cards_list(cards, f"{selected_rarity.value} Cards")
        pause()

    def save_deck(self):
        """Save the current deck to file."""
        if not self.current_deck:
            print_error("No deck loaded! Create or load a deck first.")
            pause()
            return

        print_header("Save Deck")

        filename = input("Enter filename to save to: ").strip()
        if not filename:
            print_error("No filename provided")
            pause()
            return

        if not filename.endswith('.json'):
            filename += '.json'

        try:
            self.current_deck.save_to_file(filename)
            print_success(f"Deck saved to '{filename}'!")
        except Exception as e:
            print_error(f"Error saving deck: {e}")

        pause()


def main():
    """Run the deck builder application."""
    app = DeckBuilderApp()
    app.run()


if __name__ == "__main__":
    main()
