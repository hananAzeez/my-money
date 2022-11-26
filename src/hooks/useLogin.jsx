import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      //login user
      dispatch({ type: "LOGIN", payload: user });

      //update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      console.log("isCancelled", isCancelled);
      if (isCancelled) {
        setError("Something went wrong, Try again!");
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    console.log("called");
    return () => {
      console.log("cleanup login");
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, login };
};
