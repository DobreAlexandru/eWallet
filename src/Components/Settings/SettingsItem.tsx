import { CheckCircle, Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';

const SettingsItem = ({ label, value }: { label: string; value: string }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useAuth() as AuthType;

  return (
    <ListItem
      secondaryAction={
        isDisabled ? (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setIsDisabled(false)}
          >
            <Edit />
          </IconButton>
        ) : (
          <>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setIsDisabled(true)}
            >
              <CheckCircle />
            </IconButton>
          </>
        )
      }
    >
      {isDisabled ? (
        <ListItemText primary={label} secondary={value} />
      ) : (
        <ListItemText>
          <TextField required id={label} label={label} />
        </ListItemText>
      )}
    </ListItem>
  );
};

export default SettingsItem;
