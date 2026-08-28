import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Deck from '../pages/Deck';
import Footer from '../components/Footer.jsx'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import CardModal from '../components/CardModal.jsx';
import { search } from '../scripts/Riftbound';
import { saveDeck, loadDeck } from '../scripts/Storage';

function App() {
    const [decklist, setList] = useState(() => loadDeck());
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        saveDeck(decklist);
    }, [decklist]);

    async function handleCardSelect(card) {
        setSelectedCard(card);

        const hasFullCardData = card?.classification && card?.media && card?.text;
        if (hasFullCardData || !card?.name) return;

        try {
            const data = await search(card.name);
            const fullCard = data.items?.find((item) =>
                item.riftbound_id === card.riftbound_id || item.name === card.name
            ) || data.items?.[0];

            if (fullCard) {
                setSelectedCard((currentCard) =>
                    currentCard?.name === card.name
                        ? { ...card, ...fullCard, qty: card.qty }
                        : currentCard
                );
            }
        }
        catch (error) {
            console.error("Failed to load full card details.", error);
        }
    }

    return (
        <>
            <header>
                <Navbar 
                    decklist={decklist}
                    setList={setList}
                />
            </header>
            <Routes>
                <Route path="/" element={<Home 
                    decklist={decklist}
                    setList={setList}
                    onCardSelect={handleCardSelect}/>
                    } 
                />

                <Route path="/about" element={<About />} />
                <Route path="/deck" element={<Deck 
                    decklist={decklist}
                    setList={setList}
                    onCardSelect={handleCardSelect}/>} />
            </Routes>
            <footer>
                <Footer />
            </footer>
            <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
        </>
    );
}

export default App;