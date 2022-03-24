import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from '@mui/material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import useUpload from '../../Hooks/useUpload';

const UploadButton = ({ category }: { category: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth() as AuthType;
  const url = useUpload(file, 'application/pdf', 'documents');

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];

    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  useEffect(() => {
    if (file && url) {
      const docRef = doc(db, 'users', user!.uid);

      updateDoc(docRef, {
        [category]: arrayUnion({
          name: file.name.slice(0, -4),
          download: url,
        }),
      });
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <>
      <label
        htmlFor="contained-button-file"
        style={{ position: 'absolute', bottom: '10%', right: '10%' }}
      >
        <input
          accept="application/pdf"
          id="contained-button-file"
          type="file"
          onChange={(e) => {
            handleUpload(e);
          }}
          style={{ display: 'none' }}
        />
        <IconButton
          color="primary"
          aria-label="upload"
          component="span"
          disableRipple={true}
        >
          <UploadFileIcon sx={{ fontSize: 50, color: '#F1DAC4' }} />
        </IconButton>
      </label>
    </>
  );
};

export default UploadButton;
