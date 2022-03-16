import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../../Firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  User,
  Auth,
} from "firebase/auth";
import { db } from "../../Firebase/config";
import { doc, setDoc } from "firebase/firestore";

export type AuthType = {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
  forgotPassword: (auth: Auth, email: string) => void;
  resetPassword: (user: User, newPassword: string) => void;
};
const AuthContext = createContext<AuthType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  // Triggers when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userRecord) => {
        setDoc(doc(db, "users", userRecord.user.uid), {
          email: email,
          firstName: firstName,
          lastName: lastName,
          links: [],
          transportationIDS: [],
          id: {
            birthDate: "",
            birthPlace: "",
            code: "",
            driving: "",
            expiryDate: "",
            fullName: firstName + lastName,
            gender: "",
            image: "",
            insurance: "",
            nationality: "",
            nid: "",
            signature: "",
          },
          identificationDocs: [],
          financeDocs: [],
          propertyDocs: [],
          educationDocs: [],
        });
        // sendEmailVerification(auth.currentUser);
        // updateProfile(auth.currentUser, {
        //   displayName: `${firstName} ${lastName}`,
        // });
      }
    );
  }

  function forgotPassword(auth: Auth, email: string) {
    sendPasswordResetEmail(auth, email);
  }
  function resetPassword(user: User, newPassword: string) {
    updatePassword(user, newPassword);
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

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
}

export function useAuth() {
  return useContext(AuthContext);
}
