// Slay the Spire Deck Builder - Main Application Logic

// Starter decks for each character
const STARTER_DECKS = {
    ironclad: {
        'Strike': 5,
        'Defend': 4,
        'Bash': 1
    },
    silent: {
        'Strike': 5,
        'Defend': 5,
        'Survivor': 1,
        'Neutralize': 1
    },
    defect: {
        'Strike': 4,
        'Defend': 4,
        'Zap': 1,
        'Dualcast': 1
    },
    watcher: {
        'Strike': 4,
        'Defend': 4,
        'Eruption': 1,
        'Vigilance': 1
    }
};

class DeckBuilder {
    constructor() {
        this.currentCharacter = 'ironclad';
        this.deck = {};
        this.filters = {
            rarity: 'all',
            type: 'all',
            search: ''
        };

        this.initializeElements();
        this.attachEventListeners();
        this.renderAvailableCards();
        this.updateDeckDisplay();
    }

    initializeElements() {
        // Controls
        this.characterSelect = document.getElementById('character-select');
        this.rarityFilter = document.getElementById('rarity-filter');
        this.typeFilter = document.getElementById('type-filter');
        this.searchInput = document.getElementById('search-input');
        this.loadStarterBtn = document.getElementById('load-starter');
        this.clearDeckBtn = document.getElementById('clear-deck');

        // Display areas
        this.availableCardsContainer = document.getElementById('available-cards');
        this.deckCardsContainer = document.getElementById('deck-cards');

        // Stats
        this.totalCardsSpan = document.getElementById('total-cards');
        this.avgCostSpan = document.getElementById('avg-cost');
        this.attackCountSpan = document.getElementById('attack-count');
        this.skillCountSpan = document.getElementById('skill-count');
        this.powerCountSpan = document.getElementById('power-count');
        this.basicCountSpan = document.getElementById('basic-count');
        this.commonCountSpan = document.getElementById('common-count');
        this.uncommonCountSpan = document.getElementById('uncommon-count');
        this.rareCountSpan = document.getElementById('rare-count');

        // Modals
        this.modal = document.getElementById('modal');
        this.exportModal = document.getElementById('export-modal');
        this.importModal = document.getElementById('import-modal');

        // Buttons
        this.exportDeckBtn = document.getElementById('export-deck');
        this.importDeckBtn = document.getElementById('import-deck');
        this.copyExportBtn = document.getElementById('copy-export');
        this.confirmImportBtn = document.getElementById('confirm-import');

        // Close buttons for modals
        this.closeButtons = document.querySelectorAll('.close');
    }

    attachEventListeners() {
        // Character and filter changes
        this.characterSelect.addEventListener('change', () => {
            this.currentCharacter = this.characterSelect.value;
            this.renderAvailableCards();
        });

        this.rarityFilter.addEventListener('change', () => {
            this.filters.rarity = this.rarityFilter.value;
            this.renderAvailableCards();
        });

        this.typeFilter.addEventListener('change', () => {
            this.filters.type = this.typeFilter.value;
            this.renderAvailableCards();
        });

        this.searchInput.addEventListener('input', () => {
            this.filters.search = this.searchInput.value.toLowerCase();
            this.renderAvailableCards();
        });

        // Deck actions
        this.loadStarterBtn.addEventListener('click', () => this.loadStarterDeck());

        this.clearDeckBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your deck?')) {
                this.deck = {};
                this.updateDeckDisplay();
                this.renderAvailableCards();
            }
        });

        this.exportDeckBtn.addEventListener('click', () => this.showExportModal());
        this.importDeckBtn.addEventListener('click', () => this.showImportModal());
        this.copyExportBtn.addEventListener('click', () => this.copyExportText());
        this.confirmImportBtn.addEventListener('click', () => this.importDeck());

        // Modal close buttons
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    getFilteredCards() {
        let cards = CARDS[this.currentCharacter];

        // Apply rarity filter
        if (this.filters.rarity !== 'all') {
            cards = cards.filter(card => card.rarity === this.filters.rarity);
        }

        // Apply type filter
        if (this.filters.type !== 'all') {
            cards = cards.filter(card => card.type === this.filters.type);
        }

        // Apply search filter
        if (this.filters.search) {
            cards = cards.filter(card =>
                card.name.toLowerCase().includes(this.filters.search) ||
                card.description.toLowerCase().includes(this.filters.search)
            );
        }

        return cards;
    }

    renderAvailableCards() {
        const cards = this.getFilteredCards();
        this.availableCardsContainer.innerHTML = '';

        cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            this.availableCardsContainer.appendChild(cardElement);
        });
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card rarity-${card.rarity}`;

        const count = this.deck[card.name] || 0;
        const countBadge = count > 0 ? `<span class="card-count">${count}</span>` : '';

        cardDiv.innerHTML = `
            ${countBadge}
            <div class="card-header">
                <span class="card-name">${card.name}</span>
                <span class="card-cost">${card.cost}</span>
            </div>
            <span class="card-type ${card.type}">${card.type}</span>
            <p class="card-description">${card.description}</p>
        `;

        cardDiv.addEventListener('click', () => this.addCardToDeck(card));

        return cardDiv;
    }

    addCardToDeck(card) {
        if (!this.deck[card.name]) {
            this.deck[card.name] = 0;
        }
        this.deck[card.name]++;
        this.updateDeckDisplay();
        this.renderAvailableCards(); // Update to show count badges
    }

    removeCardFromDeck(cardName) {
        if (this.deck[cardName]) {
            this.deck[cardName]--;
            if (this.deck[cardName] === 0) {
                delete this.deck[cardName];
            }
        }
        this.updateDeckDisplay();
        this.renderAvailableCards(); // Update to show count badges
    }

    loadStarterDeck() {
        // Get the starter deck for current character
        const starterDeck = STARTER_DECKS[this.currentCharacter];

        if (!starterDeck) {
            alert('No starter deck found for this character');
            return;
        }

        // Clear current deck and load starter deck
        this.deck = { ...starterDeck };
        this.updateDeckDisplay();
        this.renderAvailableCards();
    }

    updateDeckDisplay() {
        this.deckCardsContainer.innerHTML = '';

        // Get all cards in deck
        const deckCards = [];
        const allCards = CARDS[this.currentCharacter];

        for (const cardName in this.deck) {
            const card = allCards.find(c => c.name === cardName);
            if (card) {
                deckCards.push({
                    card: card,
                    count: this.deck[cardName]
                });
            }
        }

        // Sort by cost, then by name
        deckCards.sort((a, b) => {
            const costA = a.card.cost === 'X' ? -1 : parseInt(a.card.cost);
            const costB = b.card.cost === 'X' ? -1 : parseInt(b.card.cost);
            if (costA !== costB) return costA - costB;
            return a.card.name.localeCompare(b.card.name);
        });

        // Render deck cards
        deckCards.forEach(({ card, count }) => {
            const deckCardElement = this.createDeckCardElement(card, count);
            this.deckCardsContainer.appendChild(deckCardElement);
        });

        // Update statistics
        this.updateStatistics();
    }

    createDeckCardElement(card, count) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `deck-card rarity-${card.rarity}`;

        cardDiv.innerHTML = `
            <div class="deck-card-info">
                <span class="deck-card-cost">${card.cost}</span>
                <span class="deck-card-name">${card.name}</span>
                <span class="deck-card-type ${card.type}">${card.type}</span>
            </div>
            <div class="deck-card-actions">
                <span class="deck-card-count">×${count}</span>
                <button class="btn-remove">Remove</button>
            </div>
        `;

        const removeBtn = cardDiv.querySelector('.btn-remove');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeCardFromDeck(card.name);
        });

        cardDiv.addEventListener('click', () => this.showCardDetails(card));

        return cardDiv;
    }

    updateStatistics() {
        let totalCards = 0;
        let totalCost = 0;
        let costCount = 0;
        let attackCount = 0;
        let skillCount = 0;
        let powerCount = 0;
        let basicCount = 0;
        let commonCount = 0;
        let uncommonCount = 0;
        let rareCount = 0;

        const allCards = CARDS[this.currentCharacter];

        for (const cardName in this.deck) {
            const count = this.deck[cardName];
            totalCards += count;

            const card = allCards.find(c => c.name === cardName);
            if (card) {
                // Calculate average cost (exclude X cost cards)
                if (card.cost !== 'X') {
                    totalCost += parseInt(card.cost) * count;
                    costCount += count;
                }

                // Count by type
                if (card.type === 'Attack') attackCount += count;
                else if (card.type === 'Skill') skillCount += count;
                else if (card.type === 'Power') powerCount += count;

                // Count by rarity
                if (card.rarity === 'Basic') basicCount += count;
                else if (card.rarity === 'Common') commonCount += count;
                else if (card.rarity === 'Uncommon') uncommonCount += count;
                else if (card.rarity === 'Rare') rareCount += count;
            }
        }

        const avgCost = costCount > 0 ? (totalCost / costCount).toFixed(2) : '0.00';

        // Update UI
        this.totalCardsSpan.textContent = totalCards;
        this.avgCostSpan.textContent = avgCost;
        this.attackCountSpan.textContent = attackCount;
        this.skillCountSpan.textContent = skillCount;
        this.powerCountSpan.textContent = powerCount;
        this.basicCountSpan.textContent = basicCount;
        this.commonCountSpan.textContent = commonCount;
        this.uncommonCountSpan.textContent = uncommonCount;
        this.rareCountSpan.textContent = rareCount;
    }

    showCardDetails(card) {
        const modalDetails = document.getElementById('modal-card-details');
        modalDetails.innerHTML = `
            <div class="card rarity-${card.rarity}" style="max-width: 400px; margin: 0 auto;">
                <div class="card-header">
                    <span class="card-name">${card.name}</span>
                    <span class="card-cost">${card.cost}</span>
                </div>
                <span class="card-type ${card.type}">${card.type}</span>
                <p class="card-description">${card.description}</p>
                <p style="margin-top: 10px; color: #b0b0b0; font-size: 0.9em;">
                    <strong>Rarity:</strong> ${card.rarity}<br>
                    <strong>Character:</strong> ${card.character}
                </p>
            </div>
        `;
        this.modal.style.display = 'block';
    }

    showExportModal() {
        const exportData = {
            character: this.currentCharacter,
            deck: this.deck
        };
        const exportText = JSON.stringify(exportData, null, 2);
        document.getElementById('export-text').value = exportText;
        this.exportModal.style.display = 'block';
    }

    showImportModal() {
        document.getElementById('import-text').value = '';
        this.importModal.style.display = 'block';
    }

    copyExportText() {
        const exportText = document.getElementById('export-text');
        exportText.select();
        document.execCommand('copy');

        // Visual feedback
        const originalText = this.copyExportBtn.textContent;
        this.copyExportBtn.textContent = 'Copied!';
        setTimeout(() => {
            this.copyExportBtn.textContent = originalText;
        }, 2000);
    }

    importDeck() {
        const importText = document.getElementById('import-text').value;

        try {
            const importData = JSON.parse(importText);

            if (!importData.character || !importData.deck) {
                throw new Error('Invalid deck format');
            }

            // Validate that all cards exist for the character
            const characterCards = CARDS[importData.character];
            if (!characterCards) {
                throw new Error('Invalid character');
            }

            for (const cardName in importData.deck) {
                const card = characterCards.find(c => c.name === cardName);
                if (!card) {
                    throw new Error(`Card "${cardName}" not found for ${importData.character}`);
                }
            }

            // Import successful
            this.currentCharacter = importData.character;
            this.characterSelect.value = this.currentCharacter;
            this.deck = importData.deck;

            this.renderAvailableCards();
            this.updateDeckDisplay();
            this.importModal.style.display = 'none';

            alert('Deck imported successfully!');
        } catch (error) {
            alert('Error importing deck: ' + error.message);
        }
    }
}

// Initialize the deck builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DeckBuilder();
});
