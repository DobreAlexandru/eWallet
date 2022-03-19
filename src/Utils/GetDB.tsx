import { doc, getDoc } from 'firebase/firestore';
import { DocumentSnapshot } from 'firebase/firestore';

import { AuthType, useAuth } from '../Contexts/AuthContext';
import { db } from '../Firebase/config';

const { user } = useAuth() as AuthType;

export const getDB = async () => {
  const docRef = doc(db, 'users', user.uid);
  await getDoc(docRef).then((doc: DocumentSnapshot) => {
    return doc.data();
  });
};
