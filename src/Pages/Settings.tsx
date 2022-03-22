import { CheckCircle, Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import SettingsItem from '../Components/Settings/SettingsItem';
import Signature from '../Components/Settings/Signature';
import UploadImage from '../Components/Settings/UploadImage';
import { AuthType, useAuth } from '../Contexts/AuthContext';
import { db } from '../Firebase/config';
import useDoc from '../Hooks/useDoc';

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

const Settings = () => {
  const { user } = useAuth() as AuthType;
  const data = useDoc('id') as any;

  const items = [
    { label: 'Name', value: data.fullName, dbKey: 'id.fullName' },
    { label: 'Driving Licence', value: data.driving, dbKey: 'id.driving' },
    { label: 'Gender', value: data.gender, dbKey: 'id.gender' },
    { label: 'Health Insurance', value: data.insurance, dbKey: 'id.insurance' },
  ];

  return (
    <Container
      sx={{
        height: 'calc(100% - 66px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <Paper sx={{ width: '100%' }} elevation={5}>
        <List>
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
        </List>
        <Grid container sx={{ padding: 2 }}>
          <Signature />
          <UploadImage />
        </Grid>
      </Paper>
    </Container>
  );
};

export default Settings;
