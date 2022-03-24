import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

const texts = ['ID card', 'passport', 'documents', 'bus tickets'];
const HomeText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={5}
      sx={{
        paddingLeft: '5%',
        paddingBottom: '10%',
      }}
    >
      <Typography variant="h3">
        Your
        <TextTransition
          text={texts[index % texts.length]}
          springConfig={presets.wobbly}
          direction="down"
          noOverflow={true}
        />
        on all of your devices
      </Typography>
    </Grid>
  );
};

export default HomeText;
