import '../styles/Card.css'

function Card(props){
    const isSelectable = typeof props.onSelect === 'function';

    function handleKeyDown(event) {
        if (!isSelectable || (event.key !== 'Enter' && event.key !== ' ')) return;

        event.preventDefault();
        props.onSelect();
    }

    function handleQuantityChange(event, changeFunction) {
        event.stopPropagation();
        changeFunction();
    }

    return(
        <div
            className={`card-body${isSelectable ? ' card-body-selectable' : ''}`}
            role={isSelectable ? 'button' : undefined}
            tabIndex={isSelectable ? 0 : undefined}
            onClick={isSelectable ? props.onSelect : undefined}
            onKeyDown={handleKeyDown}
        >
            <img src={props.img} alt={props.name || 'Riftbound card'}></img>
            <div className="card-info">
                <p>{props.type }</p>
                <h2>{props.name}</h2>
                <p>{props.text}</p>
                <div className='btn-controls'>
                    <button type="button" onClick={(event) => handleQuantityChange(event, props.subFunc)} aria-label={`Remove one ${props.name} from deck`}>-</button>
                    {props.qty > 0 && <span className="card-quantity" aria-label={`${props.qty} copies in deck`}>{props.qty}</span>}
                    <button type="button" onClick={(event) => handleQuantityChange(event, props.addFunc)} aria-label={`Add one ${props.name} to deck`}>+</button>
                </div>
                <p>{props.attribute}</p>
            </div>
        </div>
    )
}

export default Card