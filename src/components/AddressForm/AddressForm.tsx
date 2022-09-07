import React, { useState, useEffect } from 'react';
import './AddressForm.scss';
import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

interface ShippingInputs {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  city: string;
  zipCode: string;
  country: string;
  subdivision: string;
}

const AddressForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInputs>();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [subdivisions, setSubdivisions] = useState([]);
  const [subdivision, setSubdivision] = useState('');

  const fetchCountries = async () => {
    try {
      // const data = commerce.services.localeListShippingCountries();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubdivisions = async () => {};

  useEffect(() => {
    fetchCountries();
    fetchSubdivisions();
  }, []);

  useEffect(() => {}, [country]);

  const onSubmit: SubmitHandler<ShippingInputs> = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <Form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-layout">
        <Form.Group className="form-group">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName?.message ? (
            <p className="invalid">{errors.firstName?.message}</p>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName?.message ? (
            <p className="invalid">{errors.lastName?.message}</p>
          ) : (
            ''
          )}
        </Form.Group>
      </div>
      <div className="form-layout">
        <Form.Group className="form-group">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address?.message ? (
            <p className="invalid">{errors.address?.message}</p>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email?.message ? (
            <p className="invalid">{errors.email?.message}</p>
          ) : (
            ''
          )}
        </Form.Group>
      </div>
      <div className="form-layout">
        <Form.Group className="form-group">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            {...register('city', { required: 'City is required' })}
          />
          {errors.city?.message ? (
            <p className="invalid">{errors.city?.message}</p>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Zip / Postal code</Form.Label>
          <Form.Control
            type="text"
            {...register('zipCode', {
              required: 'Zip or Postal code is required',
            })}
          />
          {errors.zipCode?.message ? (
            <p className="invalid">{errors.zipCode?.message}</p>
          ) : (
            ''
          )}
        </Form.Group>
      </div>
      <div className="form-layout">
        <Form.Group className="w-100">
          <Form.Label>Country</Form.Label>
          <Form.Select {...register('country')}>
            <option disabled value={''}>
              Select country
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label>Subdivision</Form.Label>
          <Form.Select {...register('subdivision')}>
            <option disabled value={''}>
              Select subdivision
            </option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-4">
        <Button
          variant="outline-secondary"
          className="text-uppercase"
          onClick={() => navigate('/cart')}
        >
          Back to cart
        </Button>
        <Button variant="success" type="submit" className="text-uppercase">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default AddressForm;
