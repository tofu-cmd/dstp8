import { useEffect, useState } from 'react';
import { search } from '../scripts/Riftbound';


import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import useDeck from '../scripts/useDeck';
import '../styles/Fancy.css'

export default function Deck({ decklist, setList, onCardSelect }) {
    const [cardData, setCardData] = useState([]);
    const [activeSection, setActiveSection] = useState('search');
    const { addCard, subCard } = useDeck(decklist, setList);

    useEffect(() => {
        let frameId;

        function updateActiveSection() {
            frameId = window.requestAnimationFrame(() => {
                const deckSection = document.getElementById('my-deck-section');
                if (!deckSection) return;

                const pivot = window.innerHeight * 0.42;
                setActiveSection(deckSection.getBoundingClientRect().top <= pivot ? 'deck' : 'search');
            });
        }

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, []);

    function jumpToSection(sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function countCards(){
        let count = 0;
        for(let i=0; i<decklist.length; i++){
            count += decklist[i].qty;
        }
        return count;
    }

    async function handleSearch(searchItem) {
        try {
            const data = await search(searchItem);
            setCardData(data.items);
        }
        catch (error) {
            console.error("Failed to load cards.", error);
        }
    }

return (
    <>
        <SearchBar onSearch={handleSearch} />

        <div className="deck-builder">

            {/* Search Results */}
                        <section id="search-results-section" className="deck-section">

                <h2>Search Results</h2>

                {cardData.length > 0 ? (
                    <div className="card-grid">
                        {cardData.map((card) => (
                            <Card
                                key={card.id}
                                img={card.media?.image_url}
                                                                name={card.name}
                                type={card.classification?.type}
                                attribute={card.riftbound_id}
                                text={card.text?.plain}

                                qty={
                                    decklist.find(
                                        deckCard => deckCard.name === card.name
                                    )?.qty || 0
                                }
                                                                subFunc={() => subCard(card)}
                                addFunc={() => addCard(card)}
                                onSelect={() => onCardSelect(card)}
                            />

                        ))}
                    </div>
                ) : (
                    <p className="empty-message">
                        Search for a card to get started.
                    </p>
                )}
            </section>


            {/* Deck */}
                        <section id="my-deck-section" className="deck-section my-deck">

                <h2>My Deck</h2>
                <p>Cards in deck: {countCards()}/40</p>

                {decklist.length === 0 ? (
                    <p className="empty-message">
                        Add cards to start building your deck!
                    </p>
                ) : (
                    <div className="card-grid">
                        {decklist.map((card) => (
                            <Card
                                key={card.name}
                                                                img={card.img}
                                name={card.name}
                                type={card.classification?.type || card.type}
                                attribute={card.riftbound_id}
                                text={card.text?.plain}
                                qty={card.qty}
                                subFunc={() => subCard(card)}
                                addFunc={() => addCard(card)}
                                onSelect={() => onCardSelect(card)}

                            />
                        ))}
                    </div>
                )}
            </section>

                </div>

        <button
            type="button"
            className={`mobile-section-jump ${activeSection === 'deck' ? 'is-top' : 'is-bottom'}`}
            onClick={() => jumpToSection(activeSection === 'deck' ? 'search-results-section' : 'my-deck-section')}
            aria-label={activeSection === 'deck' ? 'Jump to Search Results' : 'Jump to My Deck'}
        >
            {activeSection === 'deck' ? '↑ Search Results' : '↓ My Deck'}
        </button>
    </>
);

}