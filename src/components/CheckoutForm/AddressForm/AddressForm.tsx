import { FC, useState, useEffect } from 'react';
import './AddressForm.scss';
import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import { CheckoutFormProps } from '../../../pages/Checkout/Checkout';

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

interface SelectionType {
  [name: string]: string;
}

const AddressForm: FC<CheckoutFormProps> = ({ checkoutToken }): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInputs>();

  const [countries, setCountries] = useState<SelectionType>({ name: '' });
  const [country, setCountry] = useState('');
  const [subdivisions, setSubdivisions] = useState<SelectionType>({ name: '' });
  const [subdivision, setSubdivision] = useState('');

  const fetchCountries = async (): Promise<void> => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken?.id,
      );
      setCountries(countries);
      setCountry(Object.keys(countries)[0]);
    } catch (error) {
      throw error;
    }
  };

  const fetchSubdivisions = async (countryCode: string): Promise<void> => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode,
      );
      console.log(subdivisions);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchSubdivisions(country);
  }, [country]);

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
      <div className="btns mt-4">
        <Button
          variant="outline-secondary"
          className="d-flex align-items-center justify-content-center gap-2"
          onClick={() => navigate('/cart')}
        >
          <i className="fa-solid fa-chevron-left"></i>
          <p>Back to cart</p>
        </Button>
        <Button
          variant="dark"
          type="submit"
          className="d-flex align-items-center justify-content-center gap-2"
        >
          <p>Confirm and continue</p>
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
      </div>
    </Form>
  );
};

export default AddressForm;
