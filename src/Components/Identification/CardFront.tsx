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

import { IdentificationData } from '../../Types/IdentificationData';
import calculateDate from '../../Utils/Helpers/timestampToString';
import TextFields from './TextFields';

const CardFront = ({
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
      <img
        style={{
          width: '150px',
          height: '150px',
          border: '2px solid #F1DAC4',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
        src={data.image}
      />
      <TextFields
        fields={{
          'National ID': data.nid,
          Nationality: data.nationality,
          'Birth Place': data.birthPlace,
          'Birth Date': calculateDate(data.birthDate),
        }}
      />
      <img
        src={data.signature}
        style={{
          width: '80%',
          pointerEvents: 'none',
        }}
      />
      <CardActions>
        <Grid item xs={12}>
          <IconButton
            aria-label="flip"
            onClick={flip}
            disableRipple={true}
            sx={{
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

export default CardFront;
