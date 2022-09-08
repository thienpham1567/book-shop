import { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Checkout.scss';
import AddressForm from '../../components/CheckoutForm/AddressForm/AddressForm';
import PaymentForm from '../../components/CheckoutForm/PaymentForm/PaymentForm';
import ReviewOrder from '../../components/CheckoutForm/ReviewOrder/ReviewOrder';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchCheckoutToken } from '../../features/checkoutTokenSlice';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

const steps = ['Shipping', 'Payment', 'Review'];

export interface CheckoutFormProps {
  checkoutToken: CheckoutToken;
}

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { token, loading, error } = useSelector(
    (state: RootState) => state.checkoutToken,
  );
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    dispatch(fetchCheckoutToken({ cartId: cart?.id, type: 'cart' }));
  }, []);

  const nextStep = () => {};

  const backStep = () => {};

  const FormCheckout = (): JSX.Element => {
    let form: JSX.Element = <></>;
    switch (activeStep) {
      case 0:
        form = <AddressForm />;
        break;
      case 1:
        form = <PaymentForm />;
        break;
      case 2:
        form = <ReviewOrder />;
        break;
    }
    return form;
  };

  return (
    <Container
      fluid="lg"
      className="checkout-wrapper d-flex flex-column flex-md-row justify-content-start justify-lg-content-center gap-2"
    >
      <Card className="checkout shadow">
        <Stepper activeStep={activeStep} className="">
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <FormCheckout checkoutToken={token} />
      </Card>
    </Container>
  );
};

export default Checkout;
