import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "./init";
import { useEffect, useState } from "react";

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);

export const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);
  return user;
};
