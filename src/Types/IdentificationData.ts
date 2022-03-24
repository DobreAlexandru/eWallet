import { Timestamp } from 'firebase/firestore';

export type IdentificationData = {
  code: string;
  birthDate: Timestamp;
  birthPlace: string;
  driving: string;
  expiryDate: string;
  fullName: string;
  gender: string;
  insurance: string;
  nationality: string;
  nid: string;
  image: string;
  signature: string;
  bloodType: string;
  allergies: string;
};
