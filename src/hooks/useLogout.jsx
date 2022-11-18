import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      await auth.signOut();

      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { error, isPending, logout };
};
