import {
  CalculateOutlined,
  ConfirmationNumberOutlined,
  FingerprintSharp,
  SnippetFolderOutlined,
} from '@mui/icons-material';
import { Container, Grid } from '@mui/material';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import DashboardItem from '../Components/Menu/DashboardItem';

const categories = [
  {
    name: 'Identification',
    icon: (
      <FingerprintSharp
        sx={{
          fontSize: 100,
        }}
      />
    ),
    link: '/identification',
  },
  {
    name: 'Finance',
    icon: <CalculateOutlined sx={{ fontSize: 100 }} />,
    link: '/finance',
  },
  {
    name: 'Documents',
    icon: <SnippetFolderOutlined sx={{ fontSize: 100 }} />,
    link: '/documents',
  },
  {
    name: 'Travel',
    icon: <ConfirmationNumberOutlined sx={{ fontSize: 100 }} />,
    link: '/transportation',
  },
];

const Menu = () => {
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

export default Menu;
