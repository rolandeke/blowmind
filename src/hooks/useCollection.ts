import { useState, useEffect, useRef } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, onSnapshot, query as firestoreQuery, where, orderBy as firestoreOrderby, WhereFilterOp, OrderByDirection, Query, DocumentData, CollectionReference } from "firebase/firestore";

interface UseCollectionReturn<T> {
    documents:T[] | null;
    error: string | null;
    isPending: boolean;
}

export const useCollection = <T extends DocumentData>(
    collectionName: string, 
    _query?: [string, WhereFilterOp, any] | null,
    _orderBy?: [string, OrderByDirection] | null
): UseCollectionReturn<T> => {
    const [documents, setDocuments] = useState<T[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const queryRef = useRef(_query).current;
    const orderByRef = useRef(_orderBy).current;

    useEffect(() => {
        setIsPending(true);
        let ref: Query<DocumentData> | CollectionReference <DocumentData> = collection(db, collectionName);

        if (queryRef) {
            ref = firestoreQuery(ref, where(...queryRef));
        }

        if (orderByRef) {
            ref = firestoreQuery(ref, firestoreOrderby(...orderByRef));
        }

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                const results: T[] = snapshot.docs.map((doc) => ({
                    ...(doc.data() as T),
                    id: doc.id,
                }));

                setIsPending(false);
                setDocuments(results);
            },
            (err) => {
                setIsPending(false);
                console.error(err.message);
                setError("Could not fetch data");
            }
        );

        return () => unsub();
    }, [collectionName, queryRef, orderByRef]);

    return { documents, error, isPending };
};
