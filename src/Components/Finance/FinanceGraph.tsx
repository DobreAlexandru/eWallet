import { Box } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

import useDoc from '../../Hooks/useDoc';
import { FinanceDataItem } from '../../Types/FinanceData';
import { dataByType, formatData } from '../../Utils/Helpers/filterGraphData';

const FinanceGraph = ({ type }: { type: string }) => {
  const data = useDoc('transactions') as Array<FinanceDataItem>;

  return (
    <Box>
      <PieChart
        data={formatData(dataByType(data)[type])}
        label={({ dataEntry }) =>
          dataEntry.title + ' ' + Math.round(dataEntry.percentage) + '%'
        }
        animate
        labelStyle={{
          fill: '#161b33',
          pointerEvents: 'none',
          fontSize: '5px',
          fontWeight: 'bold',
        }}
      />
    </Box>
  );
};

export default FinanceGraph;
