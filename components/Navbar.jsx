import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css';
import useDeck from '../scripts/useDeck';

function Navbar({ decklist, setList }) {
    const [showDeck, setShowDeck] = useState(false);
    const { addCard, subCard } = useDeck(decklist, setList);

    function toggleDeck() {
        setShowDeck(!showDeck);
    }
    
    return (
        <nav className="navbar">
            <div className="left">
                <h2>LOGO HERE</h2>
            </div>
            <div className="middle">
                <Link to="/" className="links">
                    Home
                </Link>
                <Link to="/deck" className='links'>
                    Decklist
                </Link>
                <Link to="/about" className="links">
                    About
                </Link>
            </div>
            <div className="right">
                <button className="deck-button" onClick={toggleDeck}>
                    View Deck List
                </button>
                {showDeck && (
                    <div className="deck-preview">
                        <h2>Current Decklist</h2>
                        {decklist.length === 0 ? (<p className="empty-deck">Your deck is empty.</p>) 
                        : (decklist.map((card) => (
                                <div className="deck-card" key={card.name}>    
                                    <span>
                                        {card.name} x{card.qty}
                                    </span>
                                    <div className="quantity-buttons">
                                        <button onClick={() => subCard(card)}>-</button>
                                        <button onClick={() => addCard(card)}>+</button>
                                    </div>
                                </div>)))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;