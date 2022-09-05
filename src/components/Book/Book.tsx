import React, { FC, useState, useEffect } from 'react';
import './Book.scss';
import { Link, useParams, generatePath } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Product as BookState } from '@chec/commerce.js/types/product';
import { retrieveBookById } from '../../utils/index';

const Book = (): JSX.Element => {
  const [book, setBook] = useState<BookState>();
  const { id } = useParams<'id'>();
  const [variant, setVariant] = useState<string>('');
  const [formatOption, setFormatOption] = useState<string>('');

  useEffect(
    () => {
      retrieveBookById(id!).then((bookData) => {
        setBook(bookData);
        setVariant(bookData.variant_groups[0].id);
        setFormatOption(bookData.variant_groups[0].options[0].id);
      });
    },
    [id] as string[],
  );

  return (
    <Container fluid="lg" className="py-4">
      {book && (
        <Row className="justify-content-center">
          <Col xs={12} className="header-title header-title-mobile">
            <h1 className="fw-semibold">{book.name}</h1>
            <div className="authors">
              {book.variant_groups[1].options.map((author) => (
                <p key={author.id}>
                  {author.name} <span className="text-secondary">(Author)</span>
                </p>
              ))}
            </div>
          </Col>
          <Col xs={12} lg={3} className="book-img">
            <img
              src={book?.image?.url}
              alt="book img"
              className="shadow w-100"
            />
          </Col>
          <Col xs={12} lg={8} className="px-2">
            <div className="header-title header-title-desktop">
              <h1 className="fw-semibold">{book.name}</h1>
              <div className="authors">
                {book.variant_groups[1].options.map((author) => (
                  <p key={author.id}>
                    {author.name}{' '}
                    <span className="text-secondary">(Author)</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="content-book">
              <Row className="format">
                <Col xs={12}>
                  <p className="text-uppercase fw-normal mb-1">Format</p>
                </Col>
                <div className="content-format-desktop d-flex gap-2">
                  {book.variant_groups[0].options.map((format, index) => (
                    <Link key={format.id} to="" className="nav-link">
                      <div
                        key={format.id}
                        className={`p-3 box  ${
                          formatOption === format.id ? 'box-format-active' : ''
                        }`}
                      >
                        <p className="lead">{format.name}</p>
                        <p className="lead text-secondary">English</p>
                        <p className="lead fw-semibold">
                          {format.price.formatted_with_symbol}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="content-format-mobile">
                  <Dropdown className="format-dropdown">
                    <Dropdown.Toggle
                      variant=""
                      id="format-option"
                      className="w-100 d-flex justify-content-between align-items-center"
                    >
                      <p className="lead fw-normal">Options</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      {book.variant_groups[0].options.map((format) => (
                        <Dropdown.Item key={format.id}>
                          <div className="d-flex align-items-center gap-2">
                            <p className="">{format.name}</p>
                            <p className="fw-semibold">
                              {format.price.formatted_with_symbol}
                            </p>
                            <p>(English)</p>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Row>
              {parseInt(book.sku!) > 0 ? (
                <div className="stock">
                  <i className="fa-solid fa-circle-check"></i>
                  <p className=" fw-semibold text-uppercase">Available</p>
                </div>
              ) : (
                <div className="stock text-warning">
                  <i className="fa-solid fa-shop-slash"></i>
                  <p className=" fw-semibold text-uppercase">Out of stock</p>
                </div>
              )}
              <div className="buttons">
                <Button
                  variant="danger"
                  className="d-flex align-items-center justify-content-center gap-2 rounded-pill"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p className="text-light fw-semibold text-uppercase">
                    Add to cart
                  </p>
                </Button>
                <Button
                  variant="outline-secondary"
                  className="d-flex align-items-center justify-content-center gap-2 rounded-pill"
                >
                  <i className="fa-solid fa-book-bookmark"></i>
                  <p className="fw-semibold text-uppercase">Add to wishlist</p>
                </Button>
              </div>
              <div className="description">
                <h2 className="fw-semibold">Description</h2>
                <p dangerouslySetInnerHTML={{ __html: book.description }}></p>
              </div>
              <div className="product-details mt-4">
                <h2 className="fw-semibold">Product Details</h2>
                <div className="details">
                  <p className="title">Price</p>
                  <p className="info fw-semibold">
                    {book.price.formatted_with_symbol}
                  </p>
                </div>
                <div className="details">
                  <p className="title">Publisher</p>
                  <p className="info">Washington Square Press</p>
                </div>
                <div className="details">
                  <p className="title">Publish Date</p>
                  <p className="info">May 29, 2018</p>
                </div>
                <div className="details">
                  <p className="title">Publish Page</p>
                  <p className="info">400</p>
                </div>
                <div className="details">
                  <p className="title">Dimensions</p>
                  <p className="info">5.3 X 8.1 X 1.1 inches | 0.65 pounds</p>
                </div>
                <div className="details">
                  <p className="title">Language</p>
                  <p className="info">English</p>
                </div>
                <div className="details">
                  <p className="title">Type</p>
                  <p className="info">Paperback</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Book;
