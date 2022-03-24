import { Timestamp } from 'firebase/firestore';

const calculateDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
};

export default calculateDate;
