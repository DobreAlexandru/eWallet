import '@react-pdf-viewer/core/lib/styles/index.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ChangeEvent } from 'react';

import { AuthType, useAuth } from '../Contexts/AuthContext';

const storage = getStorage();
const { user } = useAuth() as AuthType;

const metadata = {
  contentType: 'application/pdf',
};

export const handleUpload = (
  e: ChangeEvent<HTMLInputElement>,
  folder: string,
) => {
  let file = e.target.files![0];
  const storageRef = ref(storage, `${folder}/${user.uid}/` + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
          return {
            name: file.name.slice(0, -4),
            download: downloadURL,
          };
        });
      },
    );
};
