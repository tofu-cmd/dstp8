import { useState } from 'react';
import { search } from '../scripts/Riftbound';


import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import useDeck from '../scripts/useDeck';
import '../styles/Fancy.css'

export default function Deck({ decklist, setList, onCardSelect }) {
    const [cardData, setCardData] = useState([]);
    const { addCard, subCard } = useDeck(decklist, setList);

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
            <section className="deck-section">
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
            <section className="deck-section my-deck">
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
    </>
);
}