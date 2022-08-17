import React, { useState, useEffect } from 'react'
import './Home.scss'
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from '../../assets/image/banner1.jpg';
import Banner2 from '../../assets/image/banner2.jpg';
import Banner3 from '../../assets/image/banner3.jpg';

const banners = [Banner1, Banner2, Banner3];
const Home = () => {
  return (
    <>
      <Carousel>
        {
          banners.map((banner) => (<Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src={banner}
              alt="First slide"
            />
          </Carousel.Item>))
        }
      </Carousel>

    </>
  )
}

export default Home