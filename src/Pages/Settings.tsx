import { CheckCircle, Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Container,
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
import { AuthType, useAuth } from '../Contexts/AuthContext';
import { db } from '../Firebase/config';

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
          <SettingsItem label="Name" value={data.fullName} />
          <SettingsItem label="Driving Licence" value={data.driving} />
          <SettingsItem label="Gender" value={data.gender} />
          <SettingsItem label="Gender" value={data.gender} />
        </List>
      </Paper>
    </Container>
  );
};

export default Settings;
