import { Box, Card, Container, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import AddTransaction from '../Components/Finance/AddTransaction';
import FinanceGraph from '../Components/Finance/FinanceGraph';
import TotalBalance from '../Components/Finance/TotalBalance';
import Transactions from '../Components/Finance/Transactions';

import useDoc from '../Hooks/useDoc';
import { FinanceDataItem } from '../Types/FinanceData';

const Finance = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const data = useDoc('transactions') as Array<FinanceDataItem>;

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        height: 'calc(100vh - 66px)',
        overflowY: 'hidden',
      }}
    >
      <Stack
        sx={{
          width: '100%',
        }}
        spacing={5}
      >
        <Grid container sx={{ height: '60%' }}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <TotalBalance data={data} />
              <AddTransaction />
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box onClick={() => setIsFlipped(!isFlipped)}>
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <FinanceGraph data={data} type="income" />
                <FinanceGraph data={data} type="expense" />
              </ReactCardFlip>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: '100%',

              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <FinanceGraph data={data} type="income" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <FinanceGraph data={data} type="expense" />
          </Grid>
        </Grid>
        <Transactions data={data} />
      </Stack>
    </Container>
  );
};
export default Finance;
