import { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import './Cart.scss'
import { fetchCart, emptyCart } from '../../features/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import EmptyCartIcon from '../../assets/image/basket.png';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [cart?.total_items, cart?.updated])

  const buysBook = () => {
    navigate('/');
  }

  //Delete all items
  const deleteAll = () => {
    dispatch(emptyCart());
  }

  return (
    <Fragment>
      <Container>
        <p className='display-5 fw-normal text-center mb-4'>Shopping Cart</p>
        {
          cart.line_items?.length <= 0 ?
            (<div className="text-center">
              <img src={EmptyCartIcon} alt="empty cart" />
              <p className="lead">Your cart is empty</p>
              <Button variant='danger' className='text-uppercase rounded-pill mt-3 px-4' onClick={buysBook}>Continue shopping</Button>
            </div>) :
            (<Card className='shadow'>
              <Card.Body>
                <div className='d-lg-flex justify-content-between align-items-center mb-3 px-3'>
                  <Button variant='outline-dark' className='text-uppercase fw-semibold' onClick={deleteAll}>Delete all</Button>
                  <Button variant='danger' className='text-uppercase fw-semibold'>Checkout (Total: {cart.subtotal?.formatted_with_symbol})</Button>
                </div>
                {cart.line_items?.map((item) => (<Row key={item.id} className="gx-5">
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
            </Card>)}
      </Container>
    </Fragment>
  )
}

export default Cart