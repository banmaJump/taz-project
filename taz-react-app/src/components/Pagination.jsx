// /taz-react-app/src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
    return (
        <ul className="actions pagination">
            <li>
                <a
                    onClick={onPrevPage}
                    className={`button large previous ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    前のページへ
                </a>
            </li>
            <li>
                <span>{currentPage} / {totalPages}</span>
            </li>
            <li>
                <a
                    onClick={onNextPage}
                    className={`button large next ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    次のページへ
                </a>
            </li>
        </ul>
    );
};

export default Pagination;