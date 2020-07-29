import React from 'react';
import './fields.css'

const Pagination = ({ boardsPerPage, totalBoards, paginate, activePage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalBoards / boardsPerPage); i++) {
        pageNumbers.push(i);
    }



    return (
        <ul className='pagination'>
            {pageNumbers.map(number => (
                <button onClick={(e) => {
                    var current = document.getElementsByClassName("active");
                    if (current.length > 0) {
                        current[0].className = current[0].className.replace(" active", "");
                    }

                    e.target.className += " active"
                    paginate(number)
                }}
                    className={'page-link' + (number === 1 ? ' active' : '')} key={number}>
                    {number}
                </button>
            ))}
        </ul>
    );
};

export default Pagination;