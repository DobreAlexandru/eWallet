import { Typography } from '@mui/material';

import useDoc from '../../Hooks/useDoc';
import { FinanceDataItem } from '../../Types/FinanceData';
import { calculateBalance } from '../../Utils/Helpers/filterGraphData';

const TotalBalance = () => {
  const data = useDoc('transactions') as Array<FinanceDataItem>;

  return (
    <Typography variant="h5">Balance: € {calculateBalance(data)}</Typography>
  );
};

export default TotalBalance;
