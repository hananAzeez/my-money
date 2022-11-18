import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);

      if (!user) {
        throw new Error("Could not complete signup");
      }

      //add display name
      await updateProfile(user, { displayName });

      //login user
      dispatch({ type: "LOGIN", payload: user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      console.log("cleaned up signup");
      setIsCancelled(true);
    };
  }, []);
  return { error, isPending, signup };
};
