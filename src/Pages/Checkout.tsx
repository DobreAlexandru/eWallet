import { Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from '../Components/Checkout/PaymentForm';

const PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Checkout = () => {
  return (
    <Container
      sx={{
        overflowY: 'hidden',
        overflowX: 'hidden',
      }}
    >
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    </Container>
  );
};

export default Checkout;
