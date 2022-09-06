import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../features/booksSlice';
import { addBookToCart, insertItemId } from '../../features/cartSlice';
import { RootState } from '../../app/store';
import { Product as Book } from '@chec/commerce.js/types/product.js';
import { getBooksListByTitle } from '../../utils';
import PaginationBar from '../../components/Pagination/PaginationBar';
const SearchBooksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books } = useSelector((state: RootState) => state.books);
  const { cart, itemIdsAtCart } = useSelector((state: RootState) => state.cart);
  const [results, setResults] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBookPerPage] = useState(8);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = results.slice(indexOfFirstBook, indexOfLastBook);

  const query = searchParams.get('q')!;

  useEffect(() => {
    dispatch(fetchBooks());
    setResults(getBooksListByTitle(books, query));
  }, []);

  useEffect(() => {
    setResults(getBooksListByTitle(books, query));
  }, [query]);

  const paginate = (numberPage: number): void => {
    setCurrentPage(numberPage);
  };

  const addBook = (data: { id: string; quantity: number }): void => {
    dispatch(addBookToCart(data));
    dispatch(insertItemId(data.id));
  };

  return (
    <Container fluid="lg">
      {!results ? (
        <div className="spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <>
          <Row className="mt-5 gy-5">
            {currentBooks.map((book) => (
              <Col className="book-in-mobile" key={book.id} xs={12} lg={3}>
                <Link to={`${book.permalink}/${book.id}`}>
                  <div className="img-wrapper">
                    <img
                      src={book.image?.url}
                      alt="book img"
                      className="shadow-sm"
                    />
                  </div>
                </Link>
                <div className="details-wrapper">
                  <Link
                    to={`${book.permalink}/${book.id}})}`}
                    className="nav-link"
                  >
                    <p className="fw-bold lead book-title">{book.name}</p>
                  </Link>
                  <div className="details">
                    <p className="fw-normal mt-1">
                      {book.price.formatted_with_symbol}
                    </p>
                  </div>
                </div>
                {itemIdsAtCart.includes(book.id) ? (
                  <Button
                    variant="outline-danger"
                    className="w-100 rounded-pill"
                    onClick={() => navigate('/cart')}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-2 ">
                      <i className="fa-solid fa-cart-shopping"></i>
                      <p className="fw-semibold text-uppercase">In Cart</p>
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    className="d-flex align-items-center justify-content-center gap-2 w-100 rounded-pill"
                    onClick={addBook.bind(this, {
                      id: book.id,
                      quantity: 1,
                    })}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-2 ">
                      <i className="fa-solid fa-cart-shopping"></i>
                      <p className="text-light fw-semibold text-uppercase">
                        Add to cart
                      </p>
                    </div>
                  </Button>
                )}
              </Col>
            ))}
          </Row>
          <Row className="mt-5">
            <PaginationBar
              currentPage={currentPage}
              totalBooks={results.length}
              booksPerPage={booksPerPage}
              paginate={paginate}
            />
          </Row>
        </>
      )}
    </Container>
  );
};

export default SearchBooksList;
