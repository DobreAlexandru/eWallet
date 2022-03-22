import { AddCircle, CheckCircle, Delete, Edit } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';

const SettingsItem = ({
  label,
  value,
  dbKey,
}: {
  label: string;
  value: string;
  dbKey: string;
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useAuth() as AuthType;
  const [input, setInput] = useState(' ');

  const handleCancel = (e: any) => {
    e.preventDefault();
    setInput(value);
    setIsDisabled(true);
  };

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleEdit = (e: any) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const docRef = doc(db, 'users', user!.uid);
    updateDoc(docRef, { [dbKey]: input });
    setIsDisabled(true);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          isDisabled ? (
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleEdit}
              disableRipple
            >
              <Edit />
            </IconButton>
          ) : (
            <>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleUpdate}
                disableRipple
              >
                <CheckCircle />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleCancel}
                disableRipple
              >
                <AddCircle sx={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </>
          )
        }
      >
        <ListItemText>
          <TextField
            disabled={isDisabled}
            required
            id={label}
            label={label}
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
          />
        </ListItemText>
      </ListItem>
      <Divider />
    </>
  );
};

export default SettingsItem;
