import { Delete } from '@mui/icons-material';
import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import useDoc from '../../Hooks/useDoc';
import { Ticket } from '../../Types/TransportationTicket';
import calculateDate from '../../Utils/Helpers/calculateDate';

const Tickets = () => {
  const { user } = useAuth() as AuthType;
  const tickets = useDoc('transportationIDS');

  const handleDelete = (item: Ticket) => {
    const docRef = doc(db, 'users', user!.uid);
    updateDoc(docRef, {
      transportationIDS: arrayRemove(item),
    });
    deleteDoc(doc(db, 'tickets', item.code));
  };

  return (
    <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
      {tickets
        .slice(0)
        .reverse()
        .map((item: Ticket) => (
          <Grid
            item
            component={motion.div}
            layout
            xs={12}
            md={7}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '25px',
              paddingTop: '25px',
            }}
            key={item.code}
          >
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#161b33',
                maxWidth: '600px',
                minWidth: '100%',
              }}
            >
              <Stack spacing={1}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    paddingTop: '25px',
                  }}
                  variant="h5"
                  gutterBottom
                  component="div"
                >
                  {item.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <QRCode
                    value={
                      'https://digitalwallet.netlify.app/tickets/' + item.code
                    }
                  />
                </Box>
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                  variant="h5"
                >
                  Expiry date: {calculateDate(item.expiryDate)}
                </Typography>
                <IconButton
                  aria-label="delete"
                  sx={{ color: '#F1DAC4' }}
                  onClick={() => handleDelete(item)}
                  disableRipple
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </Stack>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default Tickets;
