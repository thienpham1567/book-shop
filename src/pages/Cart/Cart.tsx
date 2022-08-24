import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import './Cart.scss'
import { fetchCart, emptyCart } from '../../features/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [cart?.total_items, cart?.updated])


  return (
    <Fragment>
      <Container>
        <Card className='shadow'>
          <Card.Body>
            <div className='d-lg-flex justify-content-between align-items-center mb-3'>
              <Card.Title className='fs-2'>Your Cart</Card.Title>
              <Button variant='danger' className='text-uppercase fw-semibold'>Checkout (Total: {cart.subtotal.formatted_with_symbol})</Button>
            </div>
            {cart?.line_items.map((item) => (<Row className="gx-5">
              <Col xs={2} className="p-0">
                <img src={item?.image?.url} alt="book img" className='item-img' />
              </Col>
              <Col xs={6}>
                <div className="content">
                  <p className="lead fw-normal">{item.name}</p>
                  <p className='text-secondary'>{item.price.formatted_with_symbol} | <span className='text-success fw-semibold'>In Stock</span></p>
                </div>
              </Col>
              <Col xs={4}></Col>
            </Row>))}
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  )
}

export default Cart