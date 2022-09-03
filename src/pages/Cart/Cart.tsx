import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Card, ButtonGroup } from 'react-bootstrap';
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
    console.log(cart);

  }, [cart?.total_items, cart?.updated])


  return (
    <Fragment>
      <Container>
        <button onClick={() => dispatch(emptyCart())}>empty</button>
        <Card className='shadow'>
          <Card.Body>
            <div className='d-lg-flex justify-content-between align-items-center mb-3'>
              <Card.Title className='fs-2'>Your Cart</Card.Title>
              <Button variant='danger' className='text-uppercase fw-semibold'>Checkout (Total: {cart.subtotal.formatted_with_symbol})</Button>
            </div>
            {cart?.line_items.map((item) => (<Row key={item.id} className="gx-5">
              <Col xs={2} className="p-0">
                <img src={item?.image?.url} alt="book img" className='item-img' />
              </Col>
              <Col xs={6} className="d-flex flex-column justify-content-between">
                <div className="content">
                  <p className="lead fw-normal">{item.name}</p>
                  <p className='text-secondary'>{item.price.formatted_with_symbol} | <span className='text-success fw-semibold'>In Stock</span></p>
                </div>
                <div className='quantity'>
                  <input type="number" name="quantity" value={item.quantity} />
                </div>
              </Col>
              <Col xs={4} className="d-flex flex-column justify-content-between align-items-end">
                <div className='total-price-item'>
                  <p className="lead text-dark fw-semibold">{item.line_total.formatted_with_symbol}</p>
                </div>
                <Button variant="secondary" size='sm' className="d-flex justify-content-center align-items-center gap-2">
                  <i className="fa-solid fa-trash"></i>
                  <p>Delete</p>
                </Button>
              </Col>
            </Row>))}
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  )
}

export default Cart