import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FlipIcon from '@mui/icons-material/Flip';
import {
  Card,
  CardActions,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import QRCode from 'react-qr-code';

import useDoc from '../Hooks/useDoc';

type DataType = {
  code: string;
  birthDate: Timestamp;
  birthPlace: string;
  driving: string;
  expiryDate: string;
  fullName: string;
  gender: string;
  insurance: string;
  nationality: string;
  nid: string;
  image: string;
  signature: string;
};

const Identification = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const data = useDoc('id') as any;

  const convertDate = (date: Date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

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
      {data.code && (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
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
            <Grid
              container
              rowSpacing={1}
              sx={{
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  National ID
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid
                item
                xs={5.9}
                sx={{
                  minHeight: '24px',
                }}
              >
                <Typography variant="body1" component="div">
                  {data.nid}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Driving Licence
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid
                item
                xs={5.9}
                sx={{
                  minHeight: '24px',
                }}
              >
                <Typography variant="body1" component="div">
                  {data.driving ? data.driving : 'None'}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Health Insurance
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid
                item
                xs={5.9}
                sx={{
                  minHeight: '24px',
                }}
              >
                <Typography variant="body1" component="div">
                  {data.insurance}
                </Typography>
                <Divider />
              </Grid>
            </Grid>
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
                  onClick={handleClick}
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

            <Grid
              container
              rowSpacing={1}
              sx={{
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Nationality
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs={5.9}>
                <Typography variant="body1" component="div">
                  {data.nationality}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Place of Birth
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs={5.9}>
                <Typography variant="body1" component="div">
                  {data.birthPlace}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Gender
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs={5.9}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    minHeight: '24px',
                  }}
                >
                  {data.gender}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Birth Date
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs={5.9}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    minHeight: '24px',
                  }}
                >
                  {convertDate(data.birthDate.toDate())}
                </Typography>
                <Divider />
              </Grid>
            </Grid>
            <QRCode value={data.code} size={200}></QRCode>
            <CardActions>
              <Grid item xs={12}>
                <IconButton
                  aria-label="flip"
                  onClick={handleClick}
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
        </ReactCardFlip>
      )}
    </Container>
  );
};

export default Identification;
