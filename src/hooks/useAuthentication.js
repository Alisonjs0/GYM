import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { db } from "@/firebase/config";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // logout\

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken();
      document.cookie = `securetoken=${token}; path=/; secure; max-age=${60 * 60}`; 

      router.push("/");

      setLoading(false);

    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("auth/invalid-email")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("auth/invalid-credential")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente mais tarde.";
        console.log(error.message);
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    error,
    setError,
    loading,
    logout,
    login,

  };
};
