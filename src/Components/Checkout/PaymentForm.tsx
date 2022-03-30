import CreditCardIcon from '@mui/icons-material/CreditCard';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  Stripe,
  StripeCardElement,
  StripeCardNumberElement,
  StripeElements,
} from '@stripe/stripe-js/types/stripe-js';
import axios from 'axios';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import { CheckoutItem } from '../../Types/CheckoutItem';

const items = [
  {
    key: 'singlemetro',
    price: 120,
    description: 'Single Metro Trip',
  },
  {
    key: 'monthlymetro',
    price: 1200,
    description: 'Monthly Metro Pass',
  },
  {
    key: 'singlebus',
    price: 100,
    description: 'Single Bus Trip',
  },
  {
    key: 'monthlybus',
    price: 1000,
    description: 'Monthly Bus Pass',
  },
];

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [uniqueID, setUniqueID] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;
  const { user } = useAuth() as AuthType;
  const key = useParams().item;

  const item = items.find((i) => i.key === key) as CheckoutItem;
  const date = new Date() as Date;

  // Generating an expiry date for each ticket
  switch (item.key) {
    case 'monthlybus':
    case 'monthlymetro':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'singlemetro':
    case 'singlebus':
      date.setFullYear(date.getFullYear() + 1);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as
        | StripeCardElement
        | StripeCardNumberElement,
    });

    if (!error) {
      setOpenError(false);
      try {
        // Hosting node.js app on heroku. Using axios to help communicate between the two
        const response = await axios.post(
          'https://dibsdigitalwallet.herokuapp.com/checkout',
          {
            amount: item.price,
            id: paymentMethod!.id,
            description: item.description,
          },
        );

        if (response.data.success) {
          const docRef = doc(db, 'users', user!.uid);
          const randomID = uuid();
          setUniqueID(randomID);
          // Adding ticket to the tickets panel
          updateDoc(docRef, {
            transportationIDS: arrayUnion({
              name: item.description,
              code: randomID,
              expiryDate: date,
            }),
          });
          // Then adding it to the tickets database alongside the user that bought it
          setDoc(doc(db, 'tickets', randomID), {
            user: user!.uid,
            ticket: {
              name: item.description,
              code: randomID,
              expiryDate: date,
            },
          });
          // Then adding it to the finance tab as an expense
          updateDoc(docRef, {
            transactions: arrayUnion({
              type: 'expense',
              amount: item.price / 100,
              id: randomID,
              date: new Date(),
              category: 'Travel',
            }),
          });
          setSuccess(true);
        }
      } catch (error) {}
    } else {
      setOpenError(true);
      setLoading(false);
      setError(error.message as string);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: '50%',
                minHeight: '300px',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                {item.description}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Paper
                  sx={{
                    padding: '20px',
                  }}
                  elevation={5}
                >
                  <CardElement />
                </Paper>

                <LoadingButton
                  type="submit"
                  fullWidth
                  endIcon={<CreditCardIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <Typography variant="h5">Pay € {item.price / 100}</Typography>
                </LoadingButton>

                {openError && <Alert severity="error">{error}</Alert>}
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: '20%',
                minHeight: '300px',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ paddingBottom: '25px' }}
              >
                Thank you for your purchase!
              </Typography>
              <QRCode value={uniqueID} />
              <Typography
                component="h1"
                variant="h6"
                sx={{ paddingTop: '25px' }}
              >
                Your ticket has been added to your wallet.
              </Typography>
              <IconButton
                aria-label="back"
                size="large"
                sx={{ color: '#F1DAC4', textDecoration: 'none' }}
                component={Link}
                disableRipple={true}
                to="/transportation"
              >
                <SwipeLeftIcon />
              </IconButton>
            </Box>
          </Container>
        </motion.div>
      )}
    </>
  );
};

export default PaymentForm;
