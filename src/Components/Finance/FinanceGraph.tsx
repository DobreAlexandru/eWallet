import { Box } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

import { FinanceDataItem } from '../../Types/FinanceData';
import { dataByType, formatData } from '../../Utils/Helpers/filterGraphData';

const FinanceGraph = ({
  data,
  type,
}: {
  data: Array<FinanceDataItem>;
  type: string;
}) => {
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
