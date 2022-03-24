import { Timestamp } from 'firebase/firestore';

export type Ticket = {
  code: string;
  name: string;
  expiryDate: Timestamp;
};
