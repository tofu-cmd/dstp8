const DECK_KEY = 'riftbound_deck';

export function saveDeck(deck) {
    localStorage.setItem(DECK_KEY, JSON.stringify(deck));
}

export function loadDeck() {
    const savedDeck = localStorage.getItem(DECK_KEY);

    return savedDeck ? JSON.parse(savedDeck) : [];
}