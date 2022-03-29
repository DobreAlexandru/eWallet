import { Timestamp } from 'firebase/firestore';

// Converting from Timestamp to string
const calculateDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
};

export default calculateDate;
