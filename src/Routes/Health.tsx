import BedIcon from '@mui/icons-material/Bed';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import { Container, Grid } from '@mui/material';
import { Reorder } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';

import DashboardItem from '../Components/Dashboard/DashboardItem';

const categories = [
  {
    name: 'Vitals',
    icon: (
      <MonitorHeartOutlinedIcon
        sx={{
          fontSize: 125,
        }}
      />
    ),
    link: '/health',
    hash: 'vitals',
  },
  {
    name: 'Sleep',
    icon: <BedIcon sx={{ fontSize: 125 }} />,
    link: '/health',
    hash: 'sleep',
  },
  {
    name: 'Activity',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 125 }} />,
    link: '/health',
    hash: 'activity',
  },
  {
    name: 'eHealth ID',
    icon: (
      <MedicalInformationOutlinedIcon
        sx={{
          fontSize: 125,
        }}
      />
    ),
    link: '/healthid',
    hash: '',
  },
];

const Health = () => {
  const [items, setItems] = useState(categories);

  return (
    <motion.div
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      style={{ height: 'calc(100% - 66px)', width: '100%' }}
    >
      <Container
        sx={{
          height: '100%',
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
    </motion.div>
  );
};

export default Health;
