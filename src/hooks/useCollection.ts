import { useState, useEffect } from "react";
import { db } from "../utils/firebaseConfig";
import {
    collection,
    onSnapshot,
    query as firestoreQuery,
    where,
    orderBy as firestoreOrderby,
    WhereFilterOp,
    OrderByDirection,
    Query,
    DocumentData,
    CollectionReference,
} from "firebase/firestore";

interface UseCollectionReturn<T> {
    documents: T[] | null;
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

    useEffect(() => {
        setIsPending(true);

        let ref: Query<DocumentData> | CollectionReference<DocumentData> = collection(db, collectionName);

        if (_query) {
            ref = firestoreQuery(ref, where(..._query));
        }

        if (_orderBy) {
            ref = firestoreQuery(ref, firestoreOrderby(..._orderBy));
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
    }, [collectionName, _query, _orderBy]);

    return { documents, error, isPending };
};
