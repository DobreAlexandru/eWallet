import { Container, Divider, Grid, Paper } from '@mui/material';

import SettingsItem from '../Components/Settings/SettingsItem';
import Signature from '../Components/Settings/Signature';
import UploadImage from '../Components/Settings/UploadImage';
import useDoc from '../Hooks/useDoc';
import { IdentificationData } from '../Types/IdentificationData';

const Settings = () => {
  const data = useDoc('id') as IdentificationData;

  const items = [
    { label: 'Name', value: data.fullName, dbKey: 'id.fullName' },
    { label: 'Driving Licence', value: data.driving, dbKey: 'id.driving' },
    { label: 'Gender', value: data.gender, dbKey: 'id.gender' },
    { label: 'Health Insurance', value: data.insurance, dbKey: 'id.insurance' },
    { label: 'Blood Type', value: data.bloodType, dbKey: 'id.bloodType' },
    { label: 'Allergies', value: data.allergies, dbKey: 'id.allergies' },
  ];

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        minHeight: 'calc(100vh - 66px)',
      }}
    >
      <Paper sx={{ width: '100%' }} elevation={5}>
        <Grid container>
          {items.map((item) => {
            return (
              <SettingsItem
                label={item.label}
                value={item.value}
                dbKey={item.dbKey}
                key={item.dbKey}
              />
            );
          })}
        </Grid>
        <Divider />
        <Grid container sx={{ padding: 2 }}>
          <Signature />
          <UploadImage />
        </Grid>
      </Paper>
    </Container>
  );
};

export default Settings;
