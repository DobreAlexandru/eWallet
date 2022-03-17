import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsBusSharpIcon from '@mui/icons-material/DirectionsBusSharp';
import FingerprintSharpIcon from '@mui/icons-material/FingerprintSharp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Container, Grid } from '@mui/material';
import { Reorder } from 'framer-motion';
import { useState } from 'react';

import DashboardItem from './DashboardItem/DashboardItem';

const categories = [
  {
    name: 'Identification',
    icon: (
      <FingerprintSharpIcon
        sx={{
          fontSize: 125,
          color: '#F1DAC4',
        }}
      />
    ),
    hash: '',
    link: '/identification',
    color: '#A69CAC',
  },
  {
    name: 'Health',
    icon: <LocalHospitalIcon sx={{ fontSize: 125, color: '#F1DAC4' }} />,
    hash: '',
    link: '/health',
    color: '#A69CAC',
  },
  {
    name: 'Documents',
    icon: <AssignmentIcon sx={{ fontSize: 125, color: '#F1DAC4' }} />,
    hash: '',
    link: '/documents',
    color: '#A69CAC',
  },
  {
    name: 'Travel',
    icon: <DirectionsBusSharpIcon sx={{ fontSize: 125, color: '#F1DAC4' }} />,
    hash: '',
    link: '/transportation',
    color: '#A69CAC',
  },
];

const Dashboard = () => {
  const [items, setItems] = useState(categories);

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
      <Reorder.Group onReorder={setItems} values={items}>
        <Grid container>
          {items.map((item) => {
            return <DashboardItem key={item.name} item={item} />;
          })}
        </Grid>
      </Reorder.Group>
    </Container>
  );
};

export default Dashboard;
