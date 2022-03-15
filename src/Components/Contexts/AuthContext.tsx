import { createContext, useContext, useEffect, useState } from "react";
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
} from "firebase/auth";
import { db } from "../../Firebase/config";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext({});

export default function AuthContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState({}) as any;

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

  function forgotPassword(auth: any, email: string) {
    sendPasswordResetEmail(auth, email);
  }
  function resetPassword(user: any, newPassword: string) {
    updatePassword(user, newPassword);
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }
  const value = {
    user,
    signIn,
    signUp,
    logOut,
    forgotPassword,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
