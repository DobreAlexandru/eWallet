import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { doc, updateDoc } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import useUpload from '../../Hooks/useUpload';

const Input = styled('input')({
  display: 'none',
});

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const url = useUpload(image, 'image/png', 'images');
  const { user } = useAuth() as AuthType;

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];

    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (url) {
      const docRef = doc(db, 'users', user!.uid);
      updateDoc(docRef, {
        'id.image': url,
      });
    }
  }, [url]);
  return (
    <Grid item xs={12} md={6}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="body1">Profile Picture</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/png"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUpload}
          />
          <IconButton aria-label="upload" component="span" disableRipple>
            <UploadFileIcon sx={{ fontSize: 150 }} />
          </IconButton>
        </label>
      </Grid>
    </Grid>
  );
};

export default UploadImage;
