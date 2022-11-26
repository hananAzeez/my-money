import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const queryArr = useRef(_query).current;
  const orderByArr = useRef(_orderBy).current;
  useEffect(() => {
    const colRef = collection(db, "transactions");

    let q;
    if (queryArr) {
      q = query(colRef, where(...queryArr));
    }
    //orderBy not working - error failed precondition
    // if (orderByArr) {
    //   q = query(colRef, orderBy(...orderByArr));
    // }

    const unsub = onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      results.sort((a, b) => {
        return b?.createdAt - a?.createdAt;
      });

      //updating states
      setDocuments(results);
      setError(null);
    });
    return () => {
      unsub();
    };
  }, [collectionName, queryArr, orderByArr]);

  return { documents, error };
};
