import random
from colorama import Fore, Style

class Card:
    def __init__(self, name, cost, card_type, effect):
        self.name = name
        self.cost = cost
        self.card_type = card_type
        self.effect = effect

    def display(self):
        card_art = f"""
        +-----------+
        | {self.name:<10} |
        | Cost: {self.cost:<2}    |
        | Type: {self.card_type:<6} |
        | Effect: {self.effect} |
        +-----------+
        """
        print(card_art)

class Deck:
    def __init__(self):
        self.cards = []

    def add_card(self, card):
        self.cards.append(card)

    def remove_card(self, card):
        self.cards.remove(card)

    def shuffle(self):
        random.shuffle(self.cards)

    def draw_card(self):
        if self.cards:
            return self.cards.pop()
        return None

    def display_deck(self):
        print(Fore.CYAN + "Current Deck:" + Style.RESET_ALL)
        for card in self.cards:
            card.display()

def main():
    # Create some cards
    strike = Card("Strike", 1, "Attack", "Deal 6 damage.")
    defend = Card("Defend", 1, "Skill", "Gain 5 block.")
    fireball = Card("Fireball", 3, "Attack", "Deal 10 damage to all enemies.")

    # Create a deck and add cards
    player_deck = Deck()
    player_deck.add_card(strike)
    player_deck.add_card(defend)
    player_deck.add_card(fireball)

    while True:
        print(Fore.GREEN + "1. Shuffle Deck\n2. Draw Card\n3. Display Deck\n4. Exit" + Style.RESET_ALL)
        choice = input("Choose an option: ")

        if choice == '1':
            player_deck.shuffle()
            print(Fore.YELLOW + "Deck shuffled!" + Style.RESET_ALL)
        elif choice == '2':
            drawn_card = player_deck.draw_card()
            if drawn_card:
                print(Fore.MAGENTA + "Drew card:" + Style.RESET_ALL)
                drawn_card.display()
            else:
                print(Fore.RED + "No cards left in the deck!" + Style.RESET_ALL)
        elif choice == '3':
            player_deck.display_deck()
        elif choice == '4':
            print(Fore.RED + "Exiting the game." + Style.RESET_ALL)
            break
        else:
            print(Fore.RED + "Invalid option. Please try again." + Style.RESET_ALL)

if __name__ == "__main__":
    main()
