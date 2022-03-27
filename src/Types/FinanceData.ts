import { Timestamp } from 'firebase/firestore';

export type FinanceDataItem = {
  amount: number;
  category: string;
  date: Timestamp;
  id: string;
  type: string;
};
export type FormattedDataItem = {
  color: string;
  title: string;
  value: number;
};
