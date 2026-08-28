export default function useDeck(decklist, setList) {

    function addCard(cardInfo) {
        const existingCard = decklist.find(
            card => card.name === cardInfo.name
        );

        if (!existingCard) {
            const newDeck = [
                ...decklist,
                                {
                    ...cardInfo,
                    name: cardInfo.name,
                    qty: 1,
                    type: cardInfo.classification?.type,
                    img: cardInfo.media?.image_url
                }

            ];

            setList(newDeck);
        }
        else if (existingCard.qty < 3) {
            let count = 0;
            for(let i=0; i<decklist.length; i++){
                count += decklist[i].qty;
            }
            if(count < 40){
            const newDeck = decklist.map(card =>
                card.name === cardInfo.name
                    ? { ...card, qty: card.qty + 1 }
                    : card
            );

            setList(newDeck);
            }
        }
        else {
            alert("You can only have a maximum of 3 cards in a deck!");
        }
    }

    function subCard(cardInfo) {
        const existingCard = decklist.find(
            card => card.name === cardInfo.name
        );

        if (!existingCard) return;

        if (existingCard.qty === 1) {
            const newDeck = decklist.filter(
                card => card.name !== cardInfo.name
            );

            setList(newDeck);
        }
        else {
            const newDeck = decklist.map(card =>
                card.name === cardInfo.name
                    ? { ...card, qty: card.qty - 1 }
                    : card
            );

            setList(newDeck);
        }
    }

    return {
        addCard,
        subCard
    };
}