import React, { Fragment, useState, useEffect } from 'react'
import { Link, Outlet, useOutlet } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { fetchBooks } from '../../../features/booksSlice';
import { Product as Book } from '@chec/commerce.js/types/product';
import { getBooksByCategory } from '../../../utils';
import '../Category.scss';

const Fiction = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const { value, loading, error } = useSelector((state: RootState) => state.booksReducer);
  const [fiction, setFiction] = useState<Book[]>([]);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [])

  useEffect(() => {
    setFiction(getBooksByCategory(value, { categories: ['fiction'] }));
  }, [value])

  return (
    <Fragment>
      {
        !outlet ? <Container>
          <Row>
            <Col className='header shadow-sm'><p className="header-text">Fiction Book</p></Col>
          </Row>
          <Row className='mt-5 gy-5'>
            {fiction.map((book) => (<Col key={book.id} xs={12} lg={3} xl={2}>
              <Link to="/">
                <div className='img-wrapper'>
                  <img src={book.image?.url} alt="book img" className="shadow-sm" />
                </div>
              </Link>
              <div className="details-wrapper">
                <Link to="/" className='nav-link'>
                  <p className='fw-semibold book-title'>{book.name}</p>
                </Link>
                <div className="details">

                </div>
              </div>
              <Button variant="danger" className="d-flex align-items-center justify-content-center gap-2 w-100 rounded-pill">
                <i className="fa-solid fa-cart-shopping"></i>
                <p className='text-light fw-semibold text-uppercase'>Add to cart</p>
              </Button>
            </Col>))}
          </Row>
        </Container>
          : <Outlet />
      }
    </Fragment>
  )
}

export default Fiction