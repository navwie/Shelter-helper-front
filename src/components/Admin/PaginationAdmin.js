import React, {useEffect} from 'react';

const Pagination = ({currentPage, prevPage, nextPage, animalForPage, totalAnimal, paginate}) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalAnimal / animalForPage); i++) {
        pageNumber.push(i)
    }
    return (
        <div>
            <ul className="pagination justify-content-center">
                {pageNumber[0] !== currentPage &&
                    <button className='page-link'  aria-label="Previous" onClick={prevPage}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                }
                {
                    pageNumber.map(number => (
                        <li className={number === currentPage ? 'page-item active' : 'page-item'} key={number}>
                            <button className="page-link " onClick={() => paginate(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }
                {pageNumber[pageNumber.length - 1] !== currentPage &&
                    <button className="page-link"  aria-label="Next" onClick={nextPage}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                }

            </ul>
        </div>
    )
}

export default Pagination;
