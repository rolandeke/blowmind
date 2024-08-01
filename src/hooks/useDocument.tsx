import { db } from "../utils/firebaseConfig";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface UseDocumentResult<T> {
    document: T | null;
    error: string | null;
    isPending: boolean;
}

export const useDocument = <T extends DocumentData> (collectionName: string, id: string): UseDocumentResult<T> => {
    const [document, setDocument] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);

    // realtime data for documents

    useEffect(() => {
        const ref = doc(db, collectionName, id);

        setIsPending(true);
        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                if (snapshot.exists()) {
                    setDocument({ ...snapshot.data(), id: snapshot.id } as unknown as T);
                    setError(null);
                } else{
                    setError("No such document exist");
                }
                setIsPending(false)
            },
            (err) => {
                console.log(err.message);
                setIsPending(false);
                setError("Failed to get document:" + err.message);
            }
        );

        return () => unsub();
    }, [collectionName, id]);

    return { document, error, isPending }
};