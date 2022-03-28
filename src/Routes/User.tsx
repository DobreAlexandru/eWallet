import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import { Container, Stack } from '@mui/material';

import UserInfoCard from '../Components/User/UserInfoCard';
import useUserData from '../Hooks/useUserData';

const personalInfo: { [key: string]: string } = {
  Name: 'fullName',
  Nationality: 'nationality',
  'Birth Place': 'birthPlace',
  Gender: 'gender',
  'National ID': 'nid',
};

const legalInfo: { [key: string]: string } = {
  'Driving Licence': 'driving',
};

const healthInfo: { [key: string]: string } = {
  Insurance: 'insurance',
  'Blood Type': 'bloodType',
  Allergies: 'allergies',
  Vaccine: 'greenPass',
};

const User = () => {
  const userCode = window.location.hash.substr(1) as string;
  const data = useUserData(userCode);

  return (
    <Container
      sx={{
        height: 'calc(100% - 66px)',
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        padding: '0',
      }}
    >
      {data && (
        <Stack spacing={5} sx={{ width: '100%' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ overflowX: 'scroll' }}
            className="laptop-box"
          >
            <PrivacyTipOutlinedIcon sx={{ fontSize: '75px' }} />
            {data &&
              Object.keys(personalInfo).map((key) => {
                return (
                  <UserInfoCard
                    title={key}
                    content={data[personalInfo[key]]}
                    key={key}
                  />
                );
              })}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ overflowX: 'scroll' }}
            className="laptop-box"
          >
            <LocalPoliceOutlinedIcon sx={{ fontSize: '75px' }} />
            {data &&
              Object.keys(legalInfo).map((key) => {
                return (
                  <UserInfoCard
                    title={key}
                    content={data[legalInfo[key]]}
                    key={key}
                  />
                );
              })}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ overflowX: 'scroll' }}
            className="laptop-box"
          >
            <HealthAndSafetyOutlinedIcon sx={{ fontSize: '75px' }} />
            {data &&
              Object.keys(healthInfo).map((key) => {
                return (
                  <UserInfoCard
                    title={key}
                    content={data[healthInfo[key]]}
                    key={key}
                  />
                );
              })}
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default User;
