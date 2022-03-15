import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  Container,
  Button,
  Box,
  Typography,
  Alert,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import QRCode from "react-qr-code";
import { v4 as uuid } from "uuid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../../Firebase/config";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import { Link } from "react-router-dom";

const items = [
  {
    key: "#singlemetro",
    name: "singleMetro",
    price: 100,
    description: "Single Metro Trip",
  },
  {
    key: "#monthlymetro",
    name: "monthlyMetro",
    price: 1000,
    description: "Monthly Metro Pass",
  },
  {
    key: "#singlebus",
    name: "singleBus",
    price: 100,
    description: "Single Bus Trip",
  },
  {
    key: "#monthlybus",
    name: "monthlyBus",
    price: 1000,
    description: "Monthly Bus Pass",
  },
];

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe() as any;
  const elements = useElements() as any;
  const { user } = useAuth() as any;
  const key = window.location.hash; // Using different window hashes for each item
  const item = items.find((i) => i.key === key) as any;
  const date = new Date(); // Generating an expiry date for each ticket, one month from purchase

  date.setMonth(date.getMonth() + 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoading(true);
      setOpenError(false);
      try {
        const { id } = paymentMethod;

        // Hosting node.js app on heroku. Using axios to help communicate between the two
        const response = await axios.post(
          "https://dibsdigitalwallet.herokuapp.com/checkout",
          {
            amount: item.price,
            id,
            description: item.description,
          }
        );

        if (response.data.success) {
          const docRef = doc(db, "users", user.uid);
          const randomID = uuid();
          setUniqueID(randomID);
          console.log("Successfull payment");
          updateDoc(docRef, {
            transportationIDS: arrayUnion({
              name: item.description,
              code: randomID,
              expiryDate: date,
            }),
          });
          setSuccess(true);
        }
      } catch (error) {}
    } else {
      setOpenError(true);
      setError(error.message);
    }
  };

  return (
    <Container
      className="container"
      sx={{
        minHeight: "calc(100vh - 66px)",
      }}
    >
      {!success ? (
        <>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: "50%",
                minHeight: "300px",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
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
                    padding: "20px",
                  }}
                  elevation={5}
                >
                  <CardElement />
                </Paper>
                {!loading && (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <Typography component="h1" variant="h5" color="#161b33">
                      Pay € {item.price / 100}
                    </Typography>
                  </Button>
                )}
                {loading && (
                  <Box sx={{ paddingTop: "50px" }}>
                    <CircularProgress />
                  </Box>
                )}
                {openError && <Alert severity="error">{error}</Alert>}
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: "20%",
                minHeight: "300px",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ paddingBottom: "25px" }}
              >
                Thank you for your purchase!
              </Typography>
              <QRCode value={uniqueID} />

              <Typography
                component="h1"
                variant="h6"
                sx={{ paddingTop: "25px" }}
              >
                Your ticket has been added to your wallet.
              </Typography>
              <IconButton
                aria-label="back"
                size="large"
                sx={{ color: "#F1DAC4", textDecoration: "none" }}
                component={Link}
                disableRipple={true}
                to="/transportation"
              >
                <SwipeLeftIcon />
              </IconButton>
            </Box>
          </Container>
        </>
      )}
    </Container>
  );
};

export default PaymentForm;
