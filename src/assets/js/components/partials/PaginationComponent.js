import React from "react";


function generatePageNumbers(currentPage, min, max, handlePaginate) {
    let pageNumbers = [];
    for(let i = min; i <= max; i++) {
        pageNumbers.push(<li className={ currentPage == i ? "current" : "" } key={i} onClick={() => handlePaginate(i)}>{ i }</li>)
    }

    return pageNumbers;

}

function PaginationComponent({currentPage, min, max, handlePaginate}) {
    
    const previousPage = () => {
        if(currentPage <= min) {
            return;
        } else {
            handlePaginate( currentPage - 1 );
        }
    }

    const nextPage = () => {
        if(currentPage >= max) {
            return;
        } else {
            handlePaginate( currentPage + 1 );
        }
    }

    return (
        <nav className="pagination-nav">
            <ul>
                <li onClick={previousPage}> &lt; </li>

                    { generatePageNumbers(currentPage, min, max, handlePaginate) }

                <li onClick={nextPage}> &gt; </li>
            </ul>
        </nav>
    )
}

PaginationComponent.defaultProps = {
    currentPage: 1,
    min: 1,
    max: 1,
    handlePaginate: () => {}
}

export default React.memo(PaginationComponent);
