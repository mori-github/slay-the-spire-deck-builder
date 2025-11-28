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

        // Orb tracking for Defect
        this.orbSlots = 3;
        this.orbs = [];

        // Hand simulator
        this.simulatedHand = [];

        this.initializeElements();
        this.attachEventListeners();
        this.renderAvailableCards();
        this.updateDeckDisplay();
        this.updateOrbTracker();
        this.updateHandSimulator();
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

        // Orb tracker elements
        this.orbTracker = document.getElementById('orb-tracker');
        this.orbSlotsContainer = document.getElementById('orb-slots');
        this.orbSlotCountSpan = document.getElementById('orb-slot-count');
        this.channelLightningBtn = document.getElementById('channel-lightning');
        this.channelFrostBtn = document.getElementById('channel-frost');
        this.channelDarkBtn = document.getElementById('channel-dark');
        this.channelPlasmaBtn = document.getElementById('channel-plasma');
        this.evokeOrbBtn = document.getElementById('evoke-orb');
        this.clearOrbsBtn = document.getElementById('clear-orbs');
        this.addOrbSlotBtn = document.getElementById('add-orb-slot');
        this.removeOrbSlotBtn = document.getElementById('remove-orb-slot');

        // Hand simulator elements
        this.simulatedHandContainer = document.getElementById('simulated-hand');
        this.totalDamageSpan = document.getElementById('total-damage');
        this.totalBlockSpan = document.getElementById('total-block');
        this.totalEnergySpan = document.getElementById('total-energy');
        this.handEffectsDiv = document.getElementById('hand-effects');
        this.clearHandBtn = document.getElementById('clear-hand');

        // Close buttons for modals
        this.closeButtons = document.querySelectorAll('.close');
    }

    attachEventListeners() {
        // Character and filter changes
        this.characterSelect.addEventListener('change', () => {
            this.currentCharacter = this.characterSelect.value;
            this.renderAvailableCards();
            this.updateOrbTracker();
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

        // Orb tracker event listeners
        this.channelLightningBtn.addEventListener('click', () => this.channelOrb('lightning'));
        this.channelFrostBtn.addEventListener('click', () => this.channelOrb('frost'));
        this.channelDarkBtn.addEventListener('click', () => this.channelOrb('dark'));
        this.channelPlasmaBtn.addEventListener('click', () => this.channelOrb('plasma'));
        this.evokeOrbBtn.addEventListener('click', () => this.evokeOrb());
        this.clearOrbsBtn.addEventListener('click', () => this.clearOrbs());
        this.addOrbSlotBtn.addEventListener('click', () => this.adjustOrbSlots(1));
        this.removeOrbSlotBtn.addEventListener('click', () => this.adjustOrbSlots(-1));

        // Hand simulator event listeners
        this.clearHandBtn.addEventListener('click', () => this.clearHand());
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

        // Calculate orb bonus damage for Defect Attack cards
        let orbDamageBonus = '';
        if (this.currentCharacter === 'defect' && card.type === 'Attack' && this.orbs.length > 0) {
            const orbDamage = this.calculateOrbDamage();
            if (orbDamage > 0) {
                orbDamageBonus = `<span class="orb-damage-bonus">+${orbDamage} ⚡</span>`;
            }
        }

        cardDiv.innerHTML = `
            ${countBadge}
            <div class="card-header">
                <span class="card-name">${card.name}${orbDamageBonus}</span>
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

        // Calculate orb bonus damage for Defect Attack cards
        let orbDamageBonus = '';
        if (this.currentCharacter === 'defect' && card.type === 'Attack' && this.orbs.length > 0) {
            const orbDamage = this.calculateOrbDamage();
            if (orbDamage > 0) {
                orbDamageBonus = ` <span class="orb-damage-bonus">+${orbDamage}</span>`;
            }
        }

        cardDiv.innerHTML = `
            <div class="deck-card-info">
                <span class="deck-card-cost">${card.cost}</span>
                <span class="deck-card-name">${card.name}${orbDamageBonus}</span>
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

        cardDiv.addEventListener('click', () => this.addCardToHand(card));

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

        // Add orb data for Defect
        if (this.currentCharacter === 'defect') {
            exportData.orbSlots = this.orbSlots;
            exportData.orbs = this.orbs;
        }

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

            // Restore orb data for Defect
            if (importData.character === 'defect') {
                if (importData.orbSlots !== undefined) {
                    this.orbSlots = importData.orbSlots;
                }
                if (importData.orbs !== undefined) {
                    this.orbs = importData.orbs;
                }
            }

            this.renderAvailableCards();
            this.updateDeckDisplay();
            this.updateOrbTracker();
            this.importModal.style.display = 'none';

            alert('Deck imported successfully!');
        } catch (error) {
            alert('Error importing deck: ' + error.message);
        }
    }

    // Orb tracker methods
    updateOrbTracker() {
        // Show orb tracker only for Defect
        if (this.currentCharacter === 'defect') {
            this.orbTracker.style.display = 'block';
            this.renderOrbSlots();
        } else {
            this.orbTracker.style.display = 'none';
        }
    }

    calculateOrbDamage() {
        // Calculate passive damage from all orbs
        let totalDamage = 0;
        this.orbs.forEach(orbType => {
            switch(orbType) {
                case 'lightning':
                    totalDamage += 3; // Lightning passive damage
                    break;
                case 'dark':
                    totalDamage += 6; // Dark passive damage
                    break;
                // Frost and Plasma don't add damage
            }
        });
        return totalDamage;
    }

    renderOrbSlots() {
        this.orbSlotsContainer.innerHTML = '';
        this.orbSlotCountSpan.textContent = this.orbSlots;

        // Render all orb slots
        for (let i = 0; i < this.orbSlots; i++) {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'orb-slot';

            if (this.orbs[i]) {
                const orbType = this.orbs[i];
                slotDiv.classList.add('filled', orbType);

                // Add emoji for each orb type
                const orbEmojis = {
                    lightning: '⚡',
                    frost: '❄️',
                    dark: '🌑',
                    plasma: '⚛️'
                };
                slotDiv.textContent = orbEmojis[orbType] || '';
            }

            this.orbSlotsContainer.appendChild(slotDiv);
        }
    }

    channelOrb(orbType) {
        if (this.orbs.length >= this.orbSlots) {
            // Evoke the rightmost orb when slots are full
            this.orbs.shift();
        }

        // Channel the new orb
        this.orbs.push(orbType);
        this.renderOrbSlots();
        this.renderAvailableCards(); // Update damage bonuses
        this.updateDeckDisplay(); // Update deck damage bonuses
    }

    evokeOrb() {
        if (this.orbs.length > 0) {
            // Evoke the rightmost orb
            this.orbs.shift();
            this.renderOrbSlots();
            this.renderAvailableCards(); // Update damage bonuses
            this.updateDeckDisplay(); // Update deck damage bonuses
        }
    }

    clearOrbs() {
        this.orbs = [];
        this.renderOrbSlots();
        this.renderAvailableCards(); // Update damage bonuses
        this.updateDeckDisplay(); // Update deck damage bonuses
    }

    adjustOrbSlots(amount) {
        this.orbSlots += amount;

        // Minimum 0 slots, maximum 10 slots
        if (this.orbSlots < 0) this.orbSlots = 0;
        if (this.orbSlots > 10) this.orbSlots = 10;

        // Remove orbs if we have more orbs than slots
        while (this.orbs.length > this.orbSlots) {
            this.orbs.shift();
        }

        this.renderOrbSlots();
    }

    // Hand simulator methods
    addCardToHand(card) {
        this.simulatedHand.push(card);
        this.updateHandSimulator();
    }

    removeCardFromHand(index) {
        this.simulatedHand.splice(index, 1);
        this.updateHandSimulator();
    }

    clearHand() {
        this.simulatedHand = [];
        this.updateHandSimulator();
    }

    updateHandSimulator() {
        // Render hand cards
        this.simulatedHandContainer.innerHTML = '';

        if (this.simulatedHand.length === 0) {
            this.simulatedHandContainer.classList.add('empty');
            this.simulatedHandContainer.innerHTML = '<p style="color: #6b7280; font-style: italic;">Click cards in your deck to add them</p>';
        } else {
            this.simulatedHandContainer.classList.remove('empty');

            this.simulatedHand.forEach((card, index) => {
                const handCardDiv = document.createElement('div');
                handCardDiv.className = `hand-card rarity-${card.rarity}`;

                handCardDiv.innerHTML = `
                    <span class="hand-card-cost">${card.cost}</span>
                    <span class="hand-card-name">${card.name}</span>
                    <span class="hand-card-remove">×</span>
                `;

                const removeBtn = handCardDiv.querySelector('.hand-card-remove');
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removeCardFromHand(index);
                });

                this.simulatedHandContainer.appendChild(handCardDiv);
            });
        }

        // Calculate and display stats
        this.calculateHandStats();
    }

    calculateHandStats() {
        let totalDamage = 0;
        let totalBlock = 0;
        let totalEnergy = 0;
        const effects = [];

        // Get orb damage bonus for Defect
        const orbDamage = this.currentCharacter === 'defect' ? this.calculateOrbDamage() : 0;

        this.simulatedHand.forEach(card => {
            // Calculate energy cost
            if (card.cost !== 'X') {
                totalEnergy += parseInt(card.cost);
            }

            // Parse card description for damage and block
            const desc = card.description.toLowerCase();

            // Extract damage (looking for "deal X damage")
            const damageMatch = desc.match(/deal (\d+) damage/);
            if (damageMatch) {
                let damage = parseInt(damageMatch[1]);

                // Add orb damage bonus for Defect attacks
                if (this.currentCharacter === 'defect' && card.type === 'Attack') {
                    damage += orbDamage;
                }

                // Check for multiple hits
                const timesMatch = desc.match(/(\d+) times/);
                if (timesMatch) {
                    damage *= parseInt(timesMatch[1]);
                }

                totalDamage += damage;
            }

            // Extract block (looking for "gain X block")
            const blockMatch = desc.match(/gain (\d+) block/);
            if (blockMatch) {
                let block = parseInt(blockMatch[1]);

                // Check for multiple applications
                const timesMatch = desc.match(/(\d+) times/);
                if (timesMatch && desc.includes('block') && desc.includes('times')) {
                    block *= parseInt(timesMatch[1]);
                }

                totalBlock += block;
            }

            // Parse special effects
            this.parseCardEffects(card, effects);
        });

        // Update UI
        this.totalDamageSpan.textContent = totalDamage;
        this.totalBlockSpan.textContent = totalBlock;
        this.totalEnergySpan.textContent = totalEnergy;

        // Display effects
        this.handEffectsDiv.innerHTML = '';
        if (effects.length > 0) {
            effects.forEach(effect => {
                const effectSpan = document.createElement('span');
                effectSpan.className = 'hand-effect';
                effectSpan.textContent = effect;
                this.handEffectsDiv.appendChild(effectSpan);
            });
        }
    }

    parseCardEffects(card, effects) {
        const desc = card.description.toLowerCase();

        // Draw cards
        const drawMatch = desc.match(/draw (\d+) card/);
        if (drawMatch) {
            effects.push(`Draw ${drawMatch[1]} card(s)`);
        }

        // Gain energy
        const energyMatch = desc.match(/gain (\d+) energy/);
        if (energyMatch) {
            effects.push(`Gain ${energyMatch[1]} energy`);
        }

        // Apply status effects
        if (desc.includes('vulnerable')) {
            const vulnMatch = desc.match(/(\d+) vulnerable/);
            if (vulnMatch) {
                effects.push(`Apply ${vulnMatch[1]} Vulnerable`);
            }
        }

        if (desc.includes('weak')) {
            const weakMatch = desc.match(/(\d+) weak/);
            if (weakMatch) {
                effects.push(`Apply ${weakMatch[1]} Weak`);
            }
        }

        if (desc.includes('strength')) {
            const strMatch = desc.match(/(?:gain |lose )?(\d+) strength/);
            if (strMatch) {
                if (desc.includes('gain')) {
                    effects.push(`Gain ${strMatch[1]} Strength`);
                } else if (desc.includes('lose')) {
                    effects.push(`Lose ${strMatch[1]} Strength`);
                }
            }
        }

        if (desc.includes('poison')) {
            const poisonMatch = desc.match(/(?:apply )?(\d+) poison/);
            if (poisonMatch) {
                effects.push(`Apply ${poisonMatch[1]} Poison`);
            }
        }

        // Channel orbs (for Defect)
        if (desc.includes('channel')) {
            if (desc.includes('lightning')) {
                effects.push('Channel Lightning');
            }
            if (desc.includes('frost')) {
                effects.push('Channel Frost');
            }
            if (desc.includes('dark')) {
                effects.push('Channel Dark');
            }
            if (desc.includes('plasma')) {
                effects.push('Channel Plasma');
            }
        }

        // Exhaust
        if (desc.includes('exhaust') && !desc.includes('exhaust a card')) {
            effects.push('Exhaust');
        }
    }
}

// Initialize the deck builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DeckBuilder();
});
