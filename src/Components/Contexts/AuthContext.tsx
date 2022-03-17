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

import { auth } from '../../Firebase/config';
import { db } from '../../Firebase/config';

export type AuthType = {
  user: User | any;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => void;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
  forgotPassword: (auth: Auth, email: string) => void;
  resetPassword: (user: User, newPassword: string) => void;
};
const AuthContext = createContext<AuthType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | any>({});

  // Triggers when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser as User);
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
  ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userRecord) => {
        setDoc(doc(db, 'users', userRecord.user.uid), {
          email: email,
          firstName: firstName,
          lastName: lastName,
          links: [],
          transportationIDS: [],
          id: {
            birthDate: '',
            birthPlace: '',
            code: '',
            driving: '',
            expiryDate: '',
            fullName: firstName + lastName,
            gender: '',
            image: '',
            insurance: '',
            nationality: '',
            nid: '',
            signature: '',
          },
          identificationDocs: [],
          financeDocs: [],
          propertyDocs: [],
          educationDocs: [],
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
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

export function useAuth() {
  return useContext(AuthContext);
}
