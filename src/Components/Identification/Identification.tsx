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
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import QRCode from 'react-qr-code';

import { db } from '../../Firebase/config';
import ProfilePlaceholder from '../../Images/ProfilePlaceholder.svg';
import SignaturePlaceholder from '../../Images/SignaturePlaceholder.png';
import { AuthType, useAuth } from '../Contexts/AuthContext';

type DataType = {
  code: string;
  birthDate: string;
  birthPlace: string;
  driving: string;
  expiryDate: string;
  fullName: string;
  gender: string;
  insurance: string;
  natopnality: string;
  nid: string;
};

const Identification = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { user } = useAuth() as AuthType;
  const [data, setData] = useState<DataType | any>({});

  const getDB = async () => {
    const docRef = doc(db, 'users', user.uid);
    await getDoc(docRef).then((doc: any) => {
      setData(doc.data().id);
    });
  };

  useEffect(() => {
    getDB();
  }, [user]);

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
                border: '5px solid #F1DAC4',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
              src={data.image ? data.image : ProfilePlaceholder}
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
              <Grid item xs={5.9} sx={{ minHeight: '24px' }}>
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
              <Grid item xs={5.9} sx={{ minHeight: '24px' }}>
                <Typography variant="body1" component="div">
                  {data.driving}
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
              <Grid item xs={5.9} sx={{ minHeight: '24px' }}>
                <Typography variant="body1" component="div">
                  {data.insurance}
                </Typography>
                <Divider />
              </Grid>
            </Grid>
            <img
              src={data.signature ? data.signature : SignaturePlaceholder}
              style={{
                width: '150px',
                pointerEvents: 'none',
                filter:
                  'invert(84%) sepia(21%) saturate(350%) hue-rotate(336deg) brightness(106%) contrast(89%)',
              }}
            />

            <CardActions>
              <Grid item xs={12}>
                <IconButton
                  aria-label="flip"
                  onClick={handleClick}
                  disableRipple={true}
                  sx={{ color: '#F1DAC4' }}
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
                  Dobre Alexandru Dumitru
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
                  sx={{ minHeight: '24px' }}
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
                  sx={{ minHeight: '24px' }}
                >
                  {data.birthDate}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div">
                  Expiry Date
                </Typography>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs={5.9}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ minHeight: '24px' }}
                >
                  {data.expiryDate}
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
