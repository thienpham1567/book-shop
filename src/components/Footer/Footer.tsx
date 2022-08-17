import React from 'react'
import './Footer.scss'
import { Container, Row, Col } from 'react-bootstrap'
import StarImg from '../../assets/image/icons8-star-64.png'
import SubStarImg from '../../assets/image/icons8-star-48.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container fluid className='footer'>
      <Row className='justify-content-center align-items-center p-custom'>
        <Col sm={12} md={4} className="d-flex flex-column justify-content-center align-items-center justify-content-md-start align-items-md-start">
          <div className='d-flex'>
            <img src={StarImg} alt="star" />
            <p className="text-light h3 mt-4">Trustpilot</p>
          </div>
          <div className='d-flex align-items-center ms-1'>
            <img src={SubStarImg} alt="" />
            <img src={SubStarImg} alt="" />
            <img src={SubStarImg} alt="" />
            <img src={SubStarImg} alt="" />
            <img src={SubStarImg} alt="" />
          </div>
          <p className='reviews text-light ms-2'>TrustScore <span>4.9</span> | <span>15,487</span> reviews</p>
          <img src="https://rails-assets-us.bookshop.org/assets/ClimateNeutralLabelCertifiedHorizontalWhiteOutline-17ebe1222195c2028711dcd4eb05d8ef1d83ad6f315c9f4445fa69fc570bfff2.png" alt="" className='w-75 mt-4' />
        </Col>
        <Col sm={12} md={4}>
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <Link to="/" className='nav-link text-light'>About</Link>
            <Link to="/" className='nav-link text-light'>Support / Help</Link>
            <Link to="/" className='nav-link text-light'>Become an Affiliate</Link>
            <Link to="/" className='nav-link text-light'>Gift Cards</Link>
            <Link to="/" className='nav-link text-light'>Bookshop For Authors</Link>
            <Link to="/" className='nav-link text-light'>Bookshop For Bookstores</Link>
            <Link to="/" className='nav-link text-light'>Contact</Link>
            <Link to="/" className='nav-link text-light'>Return and Refund Policy</Link>
          </div>
        </Col>
        <Col sm={12} md={4} className="d-flex flex-column justify-content-center align-items-center justify-content-md-end align-items-md-end">
          <div className="d-flex align-items-center">
            <p className="fw-normal text-light">Follow us</p>
            <img src="https://rails-assets-us.bookshop.org/assets/icon-twitter-5acbd084f784885a73c99242d5d3d12ce4bc9ea1063bf462b03ab0fa5e6df67e.svg" alt="twitter" />
            <img src="https://rails-assets-us.bookshop.org/assets/icon-facebook-573255ba1a893bcc1b0e26d5bb3d26e29950e72079360d7b58e6ca1aa628757c.svg" alt="" />
            <img src="https://rails-assets-us.bookshop.org/assets/icon-instagram-015ea6b8500fb243a606a5117772f949603f9d035d5ab677b7d24a6f379e3cbe.svg" alt="" />
          </div>
          <div className="mt-2 d-flex flex-column media-payment">
            <p className="fw-normal text-light text-center fs-5">Payments Accepted</p>
            <img src="https://rails-assets-us.bookshop.org/assets/payment_methods-a0a4f59e2dde1469a5f84fa9a6462171db755cdb0dcdf8ce8bd2dc8ecb6fa03f.png" alt="payments" className="" />
            <img src="https://rails-assets-us.bookshop.org/assets/bcorp_logo-dbd633d3bd3540edec0d2271427738792bd79e1aae13585deec0b658d29ddc08.png" alt="certified" className="" />
          </div>
        </Col>
      </Row>
      <Row className="pb-4">
        <Col className='d-flex justify-content-center align-items-center gap-5'>
          <p className="text-light fw-normal">&copy; 2022 All Rights Reserved</p>
          <Link to="/" className="nav-link text-light fw-normal">Term of Use</Link>
          <Link to="/" className="nav-link text-light fw-normal">Privacy Notice</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer