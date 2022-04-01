import { Global } from '@emotion/react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import TrainIcon from '@mui/icons-material/Train';
import TrainOutlinedIcon from '@mui/icons-material/TrainOutlined';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Reorder } from 'framer-motion';
import { useState } from 'react';

import DashboardItem from '../Components/Menu/DashboardItem';
import TransportationDrawer from '../Components/Transportation/TransportationDrawer';

const drawerBleeding = 56;

const categories = [
  {
    name: 'Single Metro Trip',
    icon: (
      <TrainIcon
        sx={{
          fontSize: 100,
        }}
      />
    ),
    link: '/checkout/singlemetro',
  },
  {
    name: 'Monthly Metro Pass',
    icon: <TrainOutlinedIcon sx={{ fontSize: 100 }} />,
    link: '/checkout/monthlymetro',
  },
  {
    name: 'Single Bus Trip',
    icon: <DirectionsBusIcon sx={{ fontSize: 100 }} />,
    link: '/checkout/singlebus',
  },
  {
    name: 'Monthly Bus Pass',
    icon: <DirectionsBusFilledOutlinedIcon sx={{ fontSize: 100 }} />,
    link: '/checkout/monthlybus',
  },
];

const Root = styled('div')(({ theme }) => ({
  height: '100%',
}));

export default function Transportation() {
  const [items, setItems] = useState(categories);

  return (
    <Root style={{ height: 'calc(100% - 66px)', width: '100%' }}>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
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
      <TransportationDrawer />
    </Root>
  );
}
