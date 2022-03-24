import { AddCircle, CheckCircle, Edit } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
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

  const handleCancel = () => {
    setInput(value);
    setIsDisabled(true);
  };

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleUpdate = () => {
    const docRef = doc(db, 'users', user!.uid);
    updateDoc(docRef, { [dbKey]: input });
    setIsDisabled(true);
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        padding: '20px',
      }}
    >
      <TextField
        disabled={isDisabled}
        required
        id={label}
        label={label}
        value={input}
        inputProps={{ maxLength: 16 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      />
      {isDisabled ? (
        <IconButton aria-label="delete" onClick={handleEdit} disableRipple>
          <Edit />
        </IconButton>
      ) : (
        <>
          <IconButton aria-label="delete" onClick={handleUpdate} disableRipple>
            <CheckCircle />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleCancel} disableRipple>
            <AddCircle sx={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        </>
      )}
    </Grid>
  );
};

export default SettingsItem;
