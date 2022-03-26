import { Container, Stack } from '@mui/material';

import AddTransaction from '../Components/Finance/AddTransaction';
import FinanceGraph from '../Components/Finance/FinanceGraph';
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
        <AddTransaction />
        <FinanceGraph />
        <Transactions />
      </Stack>
    </Container>
  );
};
export default Finance;
