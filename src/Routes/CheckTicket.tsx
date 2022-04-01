import { Button, Container, Stack, Typography } from '@mui/material';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

import { db } from '../Firebase/config';
import useTicketData from '../Hooks/useTicketData';

const CheckTicket = () => {
  const ticketCode = useParams().ticket as string;
  const [isValidated, setIsValidated] = useState(false);
  const today = new Date();
  const { userCode, ticket } = useTicketData(ticketCode);

  const deleteTicket = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (userCode) {
      updateDoc(doc(db, 'users', userCode), {
        transportationIDS: arrayRemove(ticket),
      });
      deleteDoc(doc(db, 'tickets', ticketCode));
      setIsValidated(true);
    }
  };

  return (
    <Container
      sx={{
        height: 'calc(100% - 66px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        padding: '0',
      }}
    >
      {ticket && !isValidated && (
        <Stack spacing={4}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {ticket.name}
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Ticket is{' '}
            {today <= ticket.expiryDate.toDate() ? 'valid.' : 'not valid.'}
          </Typography>
          <QRCode
            value={ticketCode}
            fgColor={
              today <= ticket.expiryDate.toDate() ? '#ABDF75' : '#FE5F55'
            }
          />
          {today <= ticket.expiryDate.toDate() &&
            (ticket.name === 'Single Bus Trip' ||
              ticket.name === 'Single Metro Trip') && (
              <Button onClick={deleteTicket} variant="contained">
                Validate
              </Button>
            )}
        </Stack>
      )}
      {isValidated && (
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Ticket successfully validated!
        </Typography>
      )}
    </Container>
  );
};

export default CheckTicket;
