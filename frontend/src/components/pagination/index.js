import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  return (
    <div className="mt-8 mb-4 ml-4 flex items-center gap-4">
      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={(event) => handlePageChange(event, number)} 
          className={currentPage === number ? "active text-pink-500" : ""}
        >
          <p className='text-base font-bold'>{number}</p>
        </button>
      ))}
    </div>
  );
};

export default Pagination;
