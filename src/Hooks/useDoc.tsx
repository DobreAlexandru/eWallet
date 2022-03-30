import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { AuthType, useAuth } from '../Contexts/AuthContext';
import { db } from '../Firebase/config';

const useDoc = (folder: string) => {
  const { user } = useAuth() as AuthType;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user!.uid) {
      const unsub = onSnapshot(
        doc(db, 'users', user!.uid),
        (doc: DocumentData) => {
          setData(doc.data()[folder]);
        },
      );
      return () => unsub();
    }
  }, [folder]);

  return data as any; // Exporting as any as this data could take multiple forms, I'm casting the correct type whenever I call the hook.
};

export default useDoc;
