import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect, useReducer } from "react";
import { db, timestamp } from "../firebase/config";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: null };
    case "ADDED_DOCUMENTS":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENTS":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const colRef = collection(db, "transactions");
  // const ref = db.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      // const addedDocument = await ref.add(...doc, createdAt);
      const addedDocument = await addDoc(colRef, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENTS",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR" });
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, collectionName, id);
      const deletedDocument = await deleteDoc(docRef);
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "could not delete the document",
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
      console.log("cleaned up useFirestore");
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
