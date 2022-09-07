import { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Checkout.scss';
import AddressForm from '../../components/AddressForm/AddressForm';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { commerce } from '../../lib/commerce';

const steps = ['ADDRESS', 'PAYMENT'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {};

  const backStep = () => {};

  const FormCheckout = (): JSX.Element =>
    activeStep === 0 ? <AddressForm /> : <PaymentForm />;

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
        <FormCheckout />
      </Card>
      <Card className="order-summary shadow">
        <Card.Body>
          <p className="fs-4 fw-semibold text-secondary">Order summary</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Checkout;
