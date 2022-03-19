import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Health = () => {
  return (
    <Container
      sx={{
        height: 'calc(100% - 66px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={5}
            sx={{ width: '100%', aspectRatio: '2/1' }}
          ></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={5}
            sx={{ width: '100%', aspectRatio: '2/1' }}
          ></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Health;
