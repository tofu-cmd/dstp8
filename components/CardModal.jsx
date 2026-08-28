import { useEffect } from 'react';
import '../styles/CardModal.css';

function DetailRow({ label, value }) {
    if (value === undefined || value === null || value === '') return null;

    return (
        <div className="card-detail-row">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

function CardModal({ card, onClose }) {
    useEffect(() => {
        if (!card) return undefined;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [card, onClose]);

    if (!card) return null;

    const classification = {
        ...(card.classification || {}),
        type: card.classification?.type || card.type
    };
    const attributes = card.attributes || {};
    const set = card.set || {};
    const media = {
        ...(card.media || {}),
        image_url: card.media?.image_url || card.img
    };
    const domain = Array.isArray(classification.domain)
        ? classification.domain.join(' · ')
        : classification.domain;
    const tags = Array.isArray(card.tags) ? card.tags.join(' · ') : card.tags;
    const setName = [set.label, set.set_id].filter(Boolean).join(' · ');

    return (
        <div className="card-modal-backdrop" onClick={onClose}>
            <section
                className="card-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="card-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button className="card-modal-close" type="button" onClick={onClose} aria-label="Close card details">
                    ×
                </button>

                <div className="card-modal-art">
                    {media.image_url ? (
                        <img src={media.image_url} alt={media.accessibility_text || card.name} />
                    ) : (
                        <div className="card-modal-art-placeholder">No card artwork available</div>
                    )}
                </div>

                <div className="card-modal-content">
                    <p className="card-modal-eyebrow">{classification.type || 'Riftbound Card'}</p>
                    <h2 id="card-modal-title">{card.name}</h2>

                    {card.text?.plain && (
                        <div className="card-modal-rules">
                            <span>Rules text</span>
                            <p>{card.text.plain}</p>
                        </div>
                    )}

                    {card.text?.flavour && (
                        <blockquote className="card-modal-flavour">“{card.text.flavour}”</blockquote>
                    )}

                    <div className="card-detail-list">
                        <DetailRow label="Identifier" value={card.riftbound_id} />
                        <DetailRow label="Set" value={setName} />
                        <DetailRow label="Rarity" value={classification.rarity} />
                        <DetailRow label="Domain" value={domain} />
                        <DetailRow label="Energy" value={attributes.energy} />
                        <DetailRow label="Might" value={attributes.might} />
                        <DetailRow label="Power" value={attributes.power} />
                        <DetailRow label="Collector no." value={card.collector_number} />
                        <DetailRow label="Artist" value={media.artist} />
                        <DetailRow label="Tags" value={tags} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CardModal;
