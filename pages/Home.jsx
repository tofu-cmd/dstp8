import '../styles/Home.css'
import '../styles/Grid.css'

import { useState, useEffect } from 'react';
import { search, searchDefault } from '../scripts/Riftbound'


import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import useDeck from '../scripts/useDeck';

const RESULTS_PER_PAGE = 8;

export default function Home({ decklist, setList, onCardSelect }){
    const [cardData, setCardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { addCard, subCard } = useDeck(decklist, setList);
    const totalPages = Math.max(1, Math.ceil(cardData.length / RESULTS_PER_PAGE));
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    const visibleCards = cardData.slice(startIndex, startIndex + RESULTS_PER_PAGE);
    
    useEffect(() => {
        async function loadInitialCards() {
            const randomCards = "https://api.riftcodex.com/cards?size=40&set_id=ogn&sort=collector_number";

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
        try{
            const data = await search(searchItem);
            updateCards(data.items);
        }
        catch(error){
            console.error("Failed to load cards.", error)
        }
    }
    
    return(
        <>
        <SearchBar onSearch={handleSearch} />
        {cardData.length > 0 ? (
            <>
                <div className='card-grid'>
                    {visibleCards.map((card) => (
                        <Card
                            key={card.id}
                            img={card.media?.image_url}
                            name={card.name}
                            type={card.classification?.type}
                            attribute={card.riftbound_id}
                            text={card.text?.plain}
                            qty={decklist.find(
                                deckCard => deckCard.name === card.name
                            )?.qty || 0}
                            subFunc={() => subCard(card)}
                            addFunc={() => addCard(card)}
                            onSelect={() => onCardSelect(card)}
                        />
                    ))}
                </div>

                {totalPages > 1 && (
                    <nav className="pagination" aria-label="Card result pages">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <div className="pagination-pages">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    className={page === currentPage ? 'pagination-page active' : 'pagination-page'}
                                    onClick={() => setCurrentPage(page)}
                                    aria-current={page === currentPage ? 'page' : undefined}
                                    aria-label={`Go to page ${page}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </nav>
                )}
            </>
        ) : (
            <p className="home-empty-message">No cards found. Try another search.</p>
        )}
        </>
    )
}
