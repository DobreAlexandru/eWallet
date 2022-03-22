import { Cancel, CheckCircle } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import useStringUpload from '../../Hooks/useStringUpload';

const Signature = () => {
  const sigPad = useRef() as MutableRefObject<any>;
  const [signature, setSignature] = useState('');
  const { user } = useAuth() as AuthType;
  const url = useStringUpload(signature, 'signatures');

  const handleClear = () => {
    sigPad.current.clear();
  };

  const handleSave = () => {
    setSignature(sigPad.current.toDataURL());
  };

  useEffect(() => {
    if (url) {
      const docRef = doc(db, 'users', user!.uid);
      updateDoc(docRef, {
        'id.signature': url,
      });
    }
  }, [url]);

  return (
    <Grid item xs={12} md={6}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="body1">Signature</Typography>
      </Grid>
      <SignatureCanvas
        ref={sigPad}
        penColor="#F1DAC4"
        canvasProps={{ className: 'sigCanvas' }}
      />
      <Grid container>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton aria-label="delete" size="small" onClick={handleSave}>
            <CheckCircle />
          </IconButton>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton aria-label="delete" size="small" onClick={handleClear}>
            <Cancel />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signature;
