import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Checkout = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Checkout;
