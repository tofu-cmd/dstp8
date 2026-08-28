import { useEffect } from 'react';

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className="pagination" aria-label="Card result pages">

            <button
                type="button"
                onClick={() =>
                    onPageChange((page) => Math.max(1, page - 1))
                }
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <div className="pagination-pages">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={
                            page === currentPage
                                ? 'pagination-page active'
                                : 'pagination-page'
                        }
                        onClick={() => onPageChange(page)}
                        aria-current={
                            page === currentPage
                                ? 'page'
                                : undefined
                        }
                        aria-label={`Go to page ${page}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                onClick={() =>
                    onPageChange((page) =>
                        Math.min(totalPages, page + 1)
                    )
                }
                disabled={currentPage === totalPages}
            >
                Next
            </button>

        </nav>
    );
}

