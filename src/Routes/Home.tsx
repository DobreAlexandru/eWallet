import { Container, Grid, Typography } from '@mui/material';

import HomeText from '../Components/Home/HomeText';
import TechStack from '../Components/Home/TechStack';

const Home = () => {
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
      <Grid container>
        <HomeText />
        <TechStack />
      </Grid>
    </Container>
  );
};

export default Home;
