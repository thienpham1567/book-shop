import React, { Fragment, useState, useEffect } from 'react'
import { Link, Outlet, useOutlet, useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { fetchBooks } from '../../../features/booksSlice';
import { Product as Book } from '@chec/commerce.js/types/product';
import { getBooksByCategory } from '../../../utils';
import '../Category.scss';
import PaginationBar from '../../../components/Pagination/PaginationBar';

interface AuthorsState {
  bookId: string;
  authors: string[]
}

const Fiction = () => {
  const { category } = useParams();
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state: RootState) => state.booksReducer);
  const [fiction, setFiction] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<AuthorsState[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBookPerPage] = useState(8);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = fiction.slice(indexOfFirstBook, indexOfLastBook);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [])

  useEffect(() => {
    setFiction(getBooksByCategory(books, { categories: ['fiction', category ? category : ''] }));
  }, [books, category])

  const paginate = (numberPage: number): void => {
    setCurrentPage(numberPage);
  }

  return (
    <Fragment>
      {
        !outlet ? <Container fluid="lg">
          {loading ? <div className="spinner">
            <Spinner animation='border' variant='secondary' />
          </div> :
            <>
              <Row>
                <Col className='header shadow-sm'><p className="header-text">Fiction Books</p></Col>
              </Row>
              <Row className='mt-5 gy-5'>
                {currentBooks.map((book) => (<Col key={book.id} xs={12} lg={3}>
                  <Link to={`${book.name}/${book.id}`}>
                    <div className='img-wrapper'>
                      <img src={book.image?.url} alt="book img" className="shadow-sm" />
                    </div>
                  </Link>
                  <div className="details-wrapper">
                    <Link to={`books/${book.name}/${book.id}`} className='nav-link'>
                      <p className='fw-bold lead book-title'>{book.name}</p>
                    </Link>
                    <div className="details">
                      <p className='fw-normal mt-1'>{book.price.formatted_with_symbol}</p>
                    </div>
                  </div>
                  <Button variant="danger" className="d-flex align-items-center justify-content-center gap-2 w-100 rounded-pill">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <p className='text-light fw-semibold text-uppercase'>Add to cart</p>
                  </Button>
                </Col>))}
              </Row>
              <Row className='mt-5'>
                <PaginationBar currentPage={currentPage} totalBooks={fiction.length} booksPerPage={booksPerPage} paginate={paginate} />
              </Row>
            </>}
        </Container>
          : <Outlet />
      }
    </Fragment>
  )
}

export default Fiction;