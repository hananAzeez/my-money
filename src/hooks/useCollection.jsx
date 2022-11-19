import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const colRef = collection(db, "transactions");
  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      //updating states
      setDocuments(results);
      setError(null);
    });
    return () => {
      unsub();
    };
  }, [collectionName]);

  return { documents, error };
};
