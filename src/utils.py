"""Utility functions for the deck builder."""
from colorama import Fore, Style, init
from typing import List
from src.models import Card, Deck

# Initialize colorama
init(autoreset=True)


def print_header(text: str) -> None:
    """Print a formatted header.

    Args:
        text: Header text
    """
    print(f"\n{Fore.CYAN}{'=' * 60}")
    print(f"{text:^60}")
    print(f"{'=' * 60}{Style.RESET_ALL}\n")


def print_success(text: str) -> None:
    """Print success message.

    Args:
        text: Message text
    """
    print(f"{Fore.GREEN}✓ {text}{Style.RESET_ALL}")


def print_error(text: str) -> None:
    """Print error message.

    Args:
        text: Message text
    """
    print(f"{Fore.RED}✗ {text}{Style.RESET_ALL}")


def print_warning(text: str) -> None:
    """Print warning message.

    Args:
        text: Message text
    """
    print(f"{Fore.YELLOW}⚠ {text}{Style.RESET_ALL}")


def print_info(text: str) -> None:
    """Print info message.

    Args:
        text: Message text
    """
    print(f"{Fore.CYAN}ℹ {text}{Style.RESET_ALL}")


def print_menu(options: List[str], title: str = "Menu") -> None:
    """Print a formatted menu.

    Args:
        options: List of menu options
        title: Menu title
    """
    print(f"\n{Fore.GREEN}{title}{Style.RESET_ALL}")
    print("-" * 40)
    for i, option in enumerate(options, 1):
        print(f"{Fore.YELLOW}{i}.{Style.RESET_ALL} {option}")
    print()


def get_user_choice(prompt: str = "Choose an option: ", valid_range: tuple = None) -> str:
    """Get user input with optional validation.

    Args:
        prompt: Input prompt
        valid_range: Optional tuple (min, max) for numeric validation

    Returns:
        User input
    """
    while True:
        choice = input(f"{Fore.MAGENTA}{prompt}{Style.RESET_ALL}").strip()

        if valid_range:
            try:
                num = int(choice)
                if valid_range[0] <= num <= valid_range[1]:
                    return choice
                else:
                    print_error(f"Please enter a number between {valid_range[0]} and {valid_range[1]}")
            except ValueError:
                print_error("Please enter a valid number")
        else:
            return choice


def confirm_action(prompt: str) -> bool:
    """Ask user to confirm an action.

    Args:
        prompt: Confirmation prompt

    Returns:
        True if confirmed, False otherwise
    """
    response = input(f"{Fore.YELLOW}{prompt} (y/n): {Style.RESET_ALL}").strip().lower()
    return response in ['y', 'yes']


def display_deck_stats(deck: Deck) -> None:
    """Display deck statistics in a formatted way.

    Args:
        deck: Deck to display stats for
    """
    stats = deck.get_statistics()

    print(f"\n{Fore.CYAN}=== Deck Statistics ==={Style.RESET_ALL}")
    print(f"Total Cards: {stats['total_cards']}")
    print(f"Average Cost: {stats['average_cost']}")
    print(f"Upgraded Cards: {stats['upgraded_count']}")

    print(f"\n{Fore.YELLOW}Card Types:{Style.RESET_ALL}")
    for card_type, count in stats['card_types'].items():
        percentage = (count / stats['total_cards'] * 100) if stats['total_cards'] > 0 else 0
        print(f"  {card_type}: {count} ({percentage:.1f}%)")

    print(f"\n{Fore.YELLOW}Rarities:{Style.RESET_ALL}")
    for rarity, count in stats['rarities'].items():
        percentage = (count / stats['total_cards'] * 100) if stats['total_cards'] > 0 else 0
        print(f"  {rarity}: {count} ({percentage:.1f}%)")


def display_cards_list(cards: List[Card], title: str = "Cards", compact: bool = True) -> None:
    """Display a list of cards.

    Args:
        cards: List of cards to display
        title: Title for the list
        compact: If True, use compact format
    """
    if not cards:
        print_warning(f"No cards in {title}")
        return

    print(f"\n{Fore.CYAN}=== {title} ({len(cards)} cards) ==={Style.RESET_ALL}")

    if compact:
        for i, card in enumerate(cards, 1):
            print(f"{i}. {card.display(compact=True)}")
    else:
        for i, card in enumerate(cards, 1):
            print(f"\n{Fore.YELLOW}Card {i}:{Style.RESET_ALL}")
            print(card.display(compact=False))


def clear_screen() -> None:
    """Clear the terminal screen."""
    import os
    os.system('cls' if os.name == 'nt' else 'clear')


def pause() -> None:
    """Pause and wait for user to press enter."""
    input(f"\n{Fore.CYAN}Press Enter to continue...{Style.RESET_ALL}")
