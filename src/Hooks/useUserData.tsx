import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../Firebase/config';

const useUserData = (userCode: string, collection: string, folder: string) => {
  if (userCode) {
    const [data, setData] = useState();

    useEffect(() => {
      const docRef = doc(db, collection, userCode);
      const getData = async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          {
            const userData = await getDoc(
              doc(db, 'users', docSnap.data().user),
            );
            if (userData.exists()) {
              setData(userData.data()[folder]);
            }
          }
        }
      };
      getData();
    }, [userCode]);

    return data;
  }
};

export default useUserData;
