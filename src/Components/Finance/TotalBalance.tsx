import { Typography } from '@mui/material';

import { FinanceDataItem } from '../../Types/FinanceData';
import { calculateBalance } from '../../Utils/Helpers/filterGraphData';

const TotalBalance = ({ data }: { data: Array<FinanceDataItem> }) => {
  return (
    <Typography variant="h5">Balance: € {calculateBalance(data)}</Typography>
  );
};

export default TotalBalance;
