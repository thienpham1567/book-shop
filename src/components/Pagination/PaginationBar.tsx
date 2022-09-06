import React, { FC, useState, useEffect } from 'react';
import './Pagination.scss';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalBooks: number;
  booksPerPage: number;
  paginate: (numberPage: number) => void;
}

const PaginationBar: FC<PaginationProps> = ({
  currentPage,
  totalBooks,
  booksPerPage,
  paginate,
}): JSX.Element => {
  const pageNumbers: number[] = [];

  for (let index = 1; index <= Math.ceil(totalBooks / booksPerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <Pagination className="justify-content-center">
      <li className="page-item" onClick={() => paginate(1)}>
        <p className="page-link">
          <i className="fa-solid fa-angles-left"></i>
        </p>
      </li>
      <li className="page-item" onClick={() => paginate(currentPage - 1)}>
        <p className="page-link">
          <i className="fa-solid fa-angle-left"></i>
        </p>
      </li>
      {pageNumbers.map((number) => (
        <li className="page-item" key={number} onClick={() => paginate(number)}>
          <p
            // to="/categories/fiction"
            className={`page-link ${
              currentPage === number ? ' active-link' : ''
            }`}
          >
            {number}
          </p>
        </li>
      ))}
      <li className="page-item" onClick={() => paginate(currentPage + 1)}>
        <p className="page-link">
          <i className="fa-solid fa-angle-right"></i>
        </p>
      </li>
      <li
        className="page-item"
        onClick={() => paginate(Math.ceil(totalBooks / booksPerPage))}
      >
        <p className="page-link">
          <i className="fa-solid fa-angles-right"></i>
        </p>
      </li>
    </Pagination>
  );
};

export default PaginationBar;
