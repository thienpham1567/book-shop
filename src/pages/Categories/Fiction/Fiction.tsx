import React, { Fragment, useState, useEffect } from 'react'
import { Link, Outlet, useOutlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { fetchBooks } from '../../../features/booksSlice';
import { Product as Book } from '@chec/commerce.js/types/product';
import { getBooksByCategory } from '../../../utils';

const Fiction = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const { value, loading, error } = useSelector((state: RootState) => state.booksReducer);
  const [fiction, setFiction] = useState<Book[]>([]);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [])

  useEffect(() => {
    console.log(value);

    setFiction(getBooksByCategory(value, { categories: ['fiction'] }));
    console.log(fiction);

  }, [value])

  return (
    <Fragment>
      {
        !outlet ? <Container>

        </Container>
          : <Outlet />
      }
    </Fragment>
  )
}

export default Fiction