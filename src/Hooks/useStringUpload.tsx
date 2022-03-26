import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { useEffect, useState } from 'react';

import { AuthType, useAuth } from '../Contexts/AuthContext';

const useStringUpload = (message: string, folder: string) => {
  const storage = getStorage();
  const [url, setUrl] = useState('');
  const { user } = useAuth() as AuthType;

  useEffect(() => {
    if (message) {
      const storageRef = ref(storage, `${folder}/${user!.uid}/signature`);
      uploadString(storageRef, message, 'data_url');
      getDownloadURL(ref(storage, `${folder}/${user!.uid}/signature`)).then(
        (link) => setUrl(link),
      );
    }
  }, [message]);

  if (url) {
    return url;
  }
};

export default useStringUpload;
