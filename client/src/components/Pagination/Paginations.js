import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
      {totalPages > 0 ? (
        <div className="container d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1, "pre")} disabled={currentPage === 1}/>

            {Array(totalPages).fill(null).map((element, index) => (
                <Pagination.Item
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => onPageChange(index + 1, "number")}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

            <Pagination.Next onClick={() => onPageChange(currentPage + 1, "next")} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      ) : null}
    </>
  );
};

export default Paginations;
