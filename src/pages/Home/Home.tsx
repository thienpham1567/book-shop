import React, { useState, useEffect, Fragment } from 'react'
import './Home.scss'
import Banner1 from '../../assets/image/banner1.jpg';
import Banner2 from '../../assets/image/banner2.jpg';
import Banner3 from '../../assets/image/banner3.jpg';
import RomanceIcon from '../../assets/image/romance.png';
import FantasyIcon from '../../assets/image/fantasy.png';
import HorrorIcon from '../../assets/image/horror.png';
import ComicIcon from '../../assets/image/comic.png';
import MangaIcon from '../../assets/image/manga.png';
import HistoryIcon from '../../assets/image/history.png';
import Slider from 'react-slick';
import { Container, Row, Col, Button, Spinner, Carousel } from 'react-bootstrap';
import { fetchBooks } from '../../features/booksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Product as Book } from '@chec/commerce.js/types/product.js';
import { Link } from 'react-router-dom'
import { getBooksByCategory } from '../../utils/index';

const banners = [Banner1, Banner2, Banner3];
const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const { books, loading, error } = useSelector((state: RootState) => state.booksReducer);
  const dispatch = useDispatch();
  const [fantasy, setFantasy] = useState<Book[]>([]);
  const [romance, setRomance] = useState<Book[]>([]);
  const [comicAndGraphicNovel, setComicAndGraphicNovel] = useState<Book[]>([]);
  const [horror, setHorror] = useState<Book[]>([]);
  const [manga, setManga] = useState<Book[]>([]);
  const [history, setHistory] = useState<Book[]>([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [])

  useEffect(() => {
    setFantasy(getBooksByCategory(books, { categories: ['fiction', 'fantasy'] }));
    setRomance(getBooksByCategory(books, { categories: ['fiction', 'romance'] }));
    setComicAndGraphicNovel(getBooksByCategory(books, { categories: ['fiction', 'comics-graphic-novels'] }));
    setHorror(getBooksByCategory(books, { categories: ['fiction', 'horror'] }));
    setManga(getBooksByCategory(books, { categories: ['fiction', 'manga'] }));
    setHistory(getBooksByCategory(books, { categories: ['fiction', 'historical'] }));
  }, [books])

  return (
    <Fragment>
      <Carousel>
        {
          banners.map((banner, index) => (<Carousel.Item key={index} interval={3000}>
            <img
              className="d-block w-100"
              src={banner}
              alt="First slide"
            />
          </Carousel.Item>))
        }
      </Carousel>
      <Container className='pt-5'>

        {/* Romance */}
        <Row className="align-items-center">
          <Col xs={12} lg={9} className='d-flex align-items-center gap-3 mb-2'>
            <img src={RomanceIcon} alt="romance icon" />
            <h1 className='header-text'>Romance</h1>
          </Col>
          <Col xs={12} lg={3} className="text-end">
            <Button variant='danger' className="text-uppercase fw-semibold rounded-pill w-100">View List ({romance.length} books)</Button>
          </Col>
          {
            loading ? <Spinner animation='border' variant='secondary' className="mx-auto mt-5" /> : <Slider {...settings} className='shadow p-2'>
              {romance.map((book) => (<Col xs={3} key={book.id}>
                <Link to="/">
                  <img src={book.image?.url} alt="book img" className="img-custom" />
                </Link>
              </Col>))}
            </Slider>
          }
        </Row>
        {/* Fantasy */}
        <Row className="align-items-center mt-5">
          <Col xs={12} lg={9} className='d-flex align-items-center gap-3 mb-2'>
            <img src={FantasyIcon} alt="romance icon" />
            <h1 className='header-text'>Fantasy</h1>
          </Col>
          <Col xs={12} lg={3} className="text-end">
            <Button variant='danger' className="text-uppercase fw-semibold rounded-pill w-100">View List ({romance.length} books)</Button>
          </Col>
          {
            loading ? <Spinner animation='border' variant='secondary' className="mx-auto mt-5" /> : <Slider {...settings} className='shadow p-2'>
              {fantasy.map((book) => (<Col xs={3} key={book.id}>
                <Link to="/">
                  <img src={book.image?.url} alt="book img" className="img-custom" />
                </Link>
              </Col>))}
            </Slider>
          }
        </Row>

        {/* History */}
        <Row className="align-items-center mt-5">
          <Col xs={12} lg={9} className='d-flex align-items-center gap-3 mb-2'>
            <img src={HistoryIcon} alt="romance icon" />
            <h1 className='header-text'>History</h1>
          </Col>
          <Col xs={12} lg={3} className="text-end">
            <Button variant='danger' className="text-uppercase fw-semibold rounded-pill w-100">View List ({romance.length} books)</Button>
          </Col>
          {
            loading ? <Spinner animation='border' variant='secondary' className="mx-auto mt-5" /> : <Slider {...settings} className='shadow p-2'>
              {history.map((book) => (<Col xs={3} key={book.id}>
                <Link to="/">
                  <img src={book.image?.url} alt="book img" className="img-custom" />
                </Link>
              </Col>))}
            </Slider>
          }
        </Row>

        {/* Horror */}
        <Row className="align-items-center mt-5">
          <Col xs={12} lg={9} className='d-flex align-items-center gap-3 mb-2'>
            <img src={HorrorIcon} alt="romance icon" />
            <h1 className='header-text'>Horror</h1>
          </Col>
          <Col xs={12} lg={3} className="text-end">
            <Button variant='danger' className="w-100 text-uppercase fw-semibold rounded-pill">View List ({romance.length} books)</Button>
          </Col>
          {
            loading ? <Spinner animation='border' variant='secondary' className="mx-auto mt-5" /> : <Slider {...settings} className='shadow p-2'>
              {horror.map((book) => (<Col xs={3} key={book.id}>
                <Link to="/">
                  <img src={book.image?.url} alt="book img" className="img-custom" />
                </Link>
              </Col>))}
            </Slider>
          }
        </Row>

        {/* Manga */}
        <Row className="align-items-center mt-5">
          <Col xs={12} lg={9} className='d-flex align-items-center gap-3 mb-2'>
            <img src={MangaIcon} alt="romance icon" />
            <h1 className='header-text'>Manga</h1>
          </Col>
          <Col xs={12} lg={3} className="text-end">
            <Button variant='danger' className="w-100 text-uppercase fw-semibold rounded-pill">View List ({romance.length} books)</Button>
          </Col>
          {
            loading ? <Spinner animation='border' variant='secondary' className="mx-auto mt-5" /> : <Slider {...settings} className='shadow p-2'>
              {manga.map((book) => (<Col xs={3} key={book.id}>
                <Link to="/">
                  <img src={book.image?.url} alt="book img" className="img-custom" />
                </Link>
              </Col>))}
            </Slider>
          }
        </Row>

        {/* Comic & Graphic novels */}
        <Row className="align-items-center mt-5">
          <Col xs={12} lg={9} className='d-flex align-items-center gap-3 mb-2'>
            <img src={ComicIcon} alt="romance icon" />
            <h1 className='header-text'>Comic & Graphic Novels</h1>
          </Col>
          <Col xs={12} lg={3} className="text-end">
            <Button variant='danger' className="w-100 text-uppercase fw-semibold rounded-pill">View List ({romance.length} books)</Button>
          </Col>
          {
            loading ? <Spinner animation='border' variant='secondary' className="mx-auto mt-5" /> : <Slider {...settings} className='shadow p-2'>
              {comicAndGraphicNovel.map((book) => (<Col xs={3} key={book.id}>
                <Link to="/">
                  <img src={book.image?.url} alt="book img" className="img-custom" />
                </Link>
              </Col>))}
            </Slider>
          }
        </Row>
      </Container>
    </Fragment>
  )
}

export default Home