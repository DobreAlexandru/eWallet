import { CircularProgress, Container } from '@mui/material';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { auth } from '../Firebase/config';
import { db } from '../Firebase/config';

export type AuthType = {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    nationalID: string,
    birthPlace: string,
    birthDate: Date | null,
    gender: string,
  ) => void;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
  forgotPassword: (auth: Auth, email: string) => void;
  resetPassword: (user: User, newPassword: string) => void;
};
const AuthContext = createContext<AuthType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Triggers when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser as User);
      setIsLoaded(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    nationalID: string,
    birthPlace: string,
    birthDate: Date | null,
    gender: string,
  ) => {
    const uniqueID = uuid();
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userRecord) => {
        setDoc(doc(db, 'users', userRecord.user.uid), {
          email: email,
          firstName: firstName,
          lastName: lastName,
          transportationIDS: [],
          id: {
            birthDate: birthDate,
            birthPlace: birthPlace,
            code: uniqueID,
            driving: '',
            fullName: firstName + ' ' + lastName,
            gender: gender,
            bloodType: '',
            allergies: '',
            image:
              'https://firebasestorage.googleapis.com/v0/b/digitalizing-public-services.appspot.com/o/placeholders%2Fundraw_profile_pic_ic5t.png?alt=media&token=961e5df4-d49a-4291-81e8-e0c8b429ecef',
            insurance: 'Fully Covered',
            nationality: country,
            nid: nationalID,
            signature:
              'https://firebasestorage.googleapis.com/v0/b/digitalizing-public-services.appspot.com/o/placeholders%2Fsignature.png?alt=media&token=bcf8ae5e-230b-4dd0-aa82-851ad5ac7e1d',
          },
          identificationDocs: [],
          financeDocs: [],
          propertyDocs: [],
          educationDocs: [],
        });
        setDoc(doc(db, 'keys', uniqueID), {
          user: userRecord.user.uid,
        });
        sendEmailVerification(auth.currentUser as User);
        updateProfile(auth.currentUser as User, {
          displayName: `${firstName} ${lastName}`,
        });
      },
    );
  };

  const forgotPassword = (auth: Auth, email: string) => {
    sendPasswordResetEmail(auth, email);
  };

  const resetPassword = (user: User, newPassword: string) => {
    updatePassword(user, newPassword);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logOut,
        forgotPassword,
        resetPassword,
      }}
    >
      {isLoaded ? (
        children
      ) : (
        <Container
          sx={{
            height: 'calc(100% - 66px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            padding: '0',
          }}
        >
          <CircularProgress />
        </Container>
      )}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
