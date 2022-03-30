import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FlipIcon from '@mui/icons-material/Flip';
import {
  Card,
  CardActions,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import QRCode from 'react-qr-code';

import { IdentificationData } from '../../Types/IdentificationData';
import TextFields from './TextFields';

const CardBack = ({
  data,
  flip,
}: {
  data: IdentificationData;
  flip: () => void;
}) => {
  return (
    <Card
      sx={{
        height: '534px',
        width: '300px',
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow:
          'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            {data.fullName}
          </Typography>
        }
        avatar={<FingerprintIcon />}
      />
      <TextFields
        fields={{
          Gender: data.gender,
          'Driving Licence': data.driving,
          'Health Insurance': data.insurance,
          'Blood Type': data.bloodType,
          Allergies: data.allergies,
        }}
      />
      <QRCode
        value={'https://digitalwallet.netlify.app/user/' + data.code}
        size={200}
      ></QRCode>
      <CardActions>
        <Grid item xs={12}>
          <IconButton
            aria-label="flip"
            onClick={flip}
            disableRipple={true}
            style={{
              transform: 'rotate(180deg)',
              color: '#F1DAC4',
            }}
          >
            <FlipIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CardBack;
