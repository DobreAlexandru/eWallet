import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../Firebase/config';
import { Ticket } from '../Types/TransportationTicket';

const useCollection = (code: string) => {
  const [userCode, setUserCode] = useState<string>();
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    const docRef = doc(db, 'tickets', code);
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserCode(docSnap.data().user);
        setTicket(docSnap.data().ticket);
      }
    };
    getData();
  }, [code]);

  return { userCode, ticket };
};
export default useCollection;
