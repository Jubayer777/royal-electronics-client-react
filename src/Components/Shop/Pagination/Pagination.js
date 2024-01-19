import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ itemsPerPage, totalItems, paginate ,pageIncrement, pageDecrement }) => {
   
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
    <div className="parent">
            <nav className='pagination'>
            <Link className='page-item previous' onClick={()=>pageDecrement()} to="#" ><FontAwesomeIcon icon={faArrowLeft} /></Link>
                {
                    pageNumbers.map(number => (
                    
                        <Link className='page-item' onClick={() => paginate(number)} to="#" >
                        {number}
                        </Link>
                    
                    ))
                }
                <Link className='page-item next' onClick={()=>pageIncrement()} to="#" ><FontAwesomeIcon icon={faArrowRight} /></Link>
            </nav> 
    </div>
    );
};

export default Pagination;