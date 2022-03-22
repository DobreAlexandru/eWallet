import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';

import { AuthType, useAuth } from '../Contexts/AuthContext';

const useStorage = (file: File | null, contentType: string, folder: string) => {
  const [url, setUrl] = useState('');
  const storage = getStorage();

  const { user } = useAuth() as AuthType;

  const metadata = {
    contentType: contentType,
  };

  useEffect(() => {
    if (file) {
      const storageRef = ref(storage, `${folder}/${user!.uid}/` + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file!, metadata);

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
            setUrl(downloadURL);
          });
        },
      );
    }
  }, [file]);

  return url;
};

export default useStorage;
