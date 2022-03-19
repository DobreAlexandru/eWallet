import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ChangeEvent } from 'react';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';

const Input = styled('input')({
  display: 'none',
});

const UploadButton = ({
  dbKey,
  getDB,
}: {
  dbKey: string;
  getDB: () => void;
}) => {
  const { user } = useAuth() as AuthType;
  const storage = getStorage();
  const metadata = {
    contentType: 'application/pdf',
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];
    const storageRef = ref(storage, `documents/${user.uid}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    const docRef = doc(db, 'users', user.uid);

    if (file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log('Upload is ' + percentage + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(docRef, {
              [dbKey]: arrayUnion({
                name: file.name.slice(0, -4),
                download: downloadURL,
              }),
            });
            getDB();
          });
        },
      );
  };
  return (
    <label
      htmlFor="contained-button-file"
      style={{ position: 'absolute', bottom: '10%', right: '10%' }}
    >
      <Input
        accept="application/pdf"
        id="contained-button-file"
        multiple
        type="file"
        onChange={uploadFile}
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
  );
};

export default UploadButton;
