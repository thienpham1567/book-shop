import React, { useState } from 'react';
import './Navbar.scss';
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Col,
  Row,
  Form,
  Button,
  Offcanvas,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="px-2 shadow-sm">
      <Container fluid>
        <Row className="block py-3 justify-content-end align-items-center">
          <Col xs={5} lg={4}>
            <Navbar.Brand>
              <Link to="/">
                <img
                  src="https://rails-assets-us.bookshop.org/assets/logo-a52621fe944d907a0a91448f35b41eca07947302711d35c3322a99144928f1aa.svg"
                  alt=""
                />
              </Link>
            </Navbar.Brand>
          </Col>
          <Col lg={4} className="d-none d-lg-flex">
            <div className="search-input w-100">
              <Form.Control
                type="text"
                id="search"
                size="lg"
                placeholder="Search books,authors"
                aria-describedby="Search books,authors"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </Col>
          <Col xs={7} lg={4}>
            <div className="shopping-cart d-flex gap-3 justify-content-end align-items-center">
              <p className="d-none d-md-flex justify-content-md-end">
                Choose a Bookstore
              </p>
              <Button variant="outline-secondary d-none d-lg-flex">
                Sign in
              </Button>
              <span className="fs-4 d-lg-none">
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <div className="cart">
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="quantity">
                  <span>1</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center justify-content-center">
          <Col xs={1} lg={12}>
            <Navbar.Toggle aria-controls={`navbar-lg`} className="ps-0" />
            <Navbar.Offcanvas
              id={`navbar-lg`}
              aria-labelledby={`navbar-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 gap-5">
                  <Link to="/" className="nav-link nav-link-hover">
                    Gift Cards
                  </Link>
                  <Link to="/" className="nav-link nav-link-hover">
                    Best Sellers
                  </Link>
                  <Link to="/" className="nav-link nav-link-hover">
                    New Books
                  </Link>
                  {/* <NavDropdown
                    title="Fiction"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <div className="d-flex align-items-center justify-content-center shadow-sm">
                      <div className="links">
                        <Link to="/" className="nav-link">
                          Romance
                        </Link>
                        <Link to="/" className="nav-link">
                          Comics & Graphic Novels
                        </Link>
                        <Link to="/" className="nav-link">
                          Horror
                        </Link>
                      </div>
                      <div className="links">
                        <Link to="/" className="nav-link">
                          Fantasy
                        </Link>
                        <Link to="/" className="nav-link">
                          Manga
                        </Link>
                        <Link to="/" className="nav-link">
                          Historical Fiction
                        </Link>
                      </div>
                    </div>
                  </NavDropdown> */}
                  <div className="nav-item show dropdown">
                    <Link to='/fiction' id="offcanvasNavbarDropdown-expand-lg"
                      aria-expanded="true"
                      role="button"
                      className="dropdown-toggle nav-link nav-link-hover"
                    >Fiction

                    </Link>
                    <div
                      aria-labelledby="offcanvasNavbarDropdown-expand-lg"
                      data-bs-popper="static"
                      className="dropdown-menu show"
                    >
                      <div className="d-flex align-items-center justify-content-center shadow-sm">
                        <div className="links">
                          <Link to="/" className="nav-link">
                            Romance
                          </Link>
                          <Link to="/" className="nav-link">
                            Comics & Graphic Novels
                          </Link>
                          <Link to="/" className="nav-link">
                            Horror
                          </Link>
                        </div>
                        <div className="links">
                          <Link to="/" className="nav-link">
                            Fantasy
                          </Link>
                          <Link to="/" className="nav-link">
                            Manga
                          </Link>
                          <Link to="/" className="nav-link">
                            Historical Fiction
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <NavDropdown
                    title="Nonfiction"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Link to="/" className="nav-link nav-link-hover">
                    Kids
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Col>
          <Col xs={11} className="d-flex d-lg-none p-0">
            <div className="search-input w-100">
              <Form.Control
                type="text"
                id="search"
                size="lg"
                placeholder="Search books,authors"
                aria-describedby="Search books,authors"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
