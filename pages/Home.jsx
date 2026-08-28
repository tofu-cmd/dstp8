import '../styles/Home.css'
import '../styles/Grid.css'

import { useState, useEffect } from 'react';
import { search, searchDefault } from '../scripts/Riftbound'

import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import useDeck from '../scripts/useDeck';

const RESULTS_PER_PAGE = 12;

export default function Home({ decklist, setList, onCardSelect }) {
    const [cardData, setCardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);

    const { addCard, subCard } = useDeck(decklist, setList);

    const totalPages = Math.max(
        1,
        Math.ceil(cardData.length / RESULTS_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;

    const visibleCards = cardData.slice(
        startIndex,
        startIndex + RESULTS_PER_PAGE
    );

    useEffect(() => {
        async function loadInitialCards() {
            const randomCards =
                "https://api.riftcodex.com/cards?size=100&new=true&sort=collector_number";

            try {
                const data = await searchDefault(randomCards);

                setCardData(data.items || []);
                setCurrentPage(1);
            }
            catch (error) {
                console.error("Failed to load cards.", error);
            }
        }

        loadInitialCards();
    }, []);

    function updateCards(items) {
        setCardData(items || []);
        setCurrentPage(1);
    }

    async function handleSearch(searchItem) {
        if (!searchItem.trim()) {
            setHasSearched(false);

            const randomCards =
                "https://api.riftcodex.com/cards?size=100&new=true&sort=collector_number";

            try {
                const data = await searchDefault(randomCards);
                updateCards(data.items);
            }
            catch (error) {
                console.error("Failed to load cards.", error);
            }

            return;
        }

        try {
            const data = await search(searchItem);

            updateCards(data.items);
            setHasSearched(true);
        }
        catch (error) {
            console.error("Failed to load cards.", error);
        }
    }

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            
            {!hasSearched && (
                <h1 className="latest-cards-title">
                    Latest Cards
                </h1>
            )}

            {cardData.length > 0 ? (
                <>
                    <div className="card-grid">
                        {visibleCards.map((card) => (
                            <Card
                                key={card.id}
                                img={card.media?.image_url}
                                name={card.name}
                                type={card.classification?.type}
                                attribute={card.riftbound_id}
                                text={card.text?.plain}
                                qty={
                                    decklist.find(
                                        deckCard =>
                                            deckCard.name === card.name
                                    )?.qty || 0
                                }
                                subFunc={() => subCard(card)}
                                addFunc={() => addCard(card)}
                                onSelect={() => onCardSelect(card)}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                </>
            ) : (
                <p className="home-empty-message">
                    No cards found. Try another search.
                </p>
            )}
        </>
    );
}
