import { Box, Card, Container, Grid, Stack } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

import AddTransaction from '../Components/Finance/AddTransaction';
import FinanceGraph from '../Components/Finance/FinanceGraph';
import TotalBalance from '../Components/Finance/TotalBalance';
import Transactions from '../Components/Finance/Transactions';

const Finance = () => {
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
              <TotalBalance />
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
            <SwipeableViews enableMouseEvents style={{ width: '80%' }}>
              <FinanceGraph type="income" />
              <FinanceGraph type="expense" />
            </SwipeableViews>
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
            <FinanceGraph type="income" />
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
            <FinanceGraph type="expense" />
          </Grid>
        </Grid>
        <Transactions />
      </Stack>
    </Container>
  );
};
export default Finance;
