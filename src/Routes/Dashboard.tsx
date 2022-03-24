import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import FingerprintSharpIcon from '@mui/icons-material/FingerprintSharp';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import { Container, Grid } from '@mui/material';
import { Reorder } from 'framer-motion';
import { useState } from 'react';

import DashboardItem from '../Components/Dashboard/DashboardItem';

const categories = [
  {
    name: 'Identification',
    icon: (
      <FingerprintSharpIcon
        sx={{
          fontSize: 125,
        }}
      />
    ),
    hash: '',
    link: '/identification',
  },
  {
    name: 'Finance',
    icon: <CalculateOutlinedIcon sx={{ fontSize: 125 }} />,
    hash: '',
    link: '/finance',
  },
  {
    name: 'Documents',
    icon: <SnippetFolderOutlinedIcon sx={{ fontSize: 125 }} />,
    hash: '',
    link: '/documents',
  },
  {
    name: 'Travel',
    icon: <ConfirmationNumberOutlinedIcon sx={{ fontSize: 125 }} />,
    hash: '',
    link: '/transportation',
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
