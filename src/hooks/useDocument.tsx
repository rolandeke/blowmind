import { db } from "@/utils/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";



export const useDocument = (collectionName: string, id: string) => {
    const [document, setDocument] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    // realtime data for documents

    useEffect(() => {
        const ref = doc(db, collectionName, id);

        setIsPending(true);
        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                if (snapshot.exists()) {
                    setDocument({ ...snapshot.data(), id: snapshot.id });
                    setError(null);
                } else{
                    setError("No such document exist");
                }
                setIsPending(false)
            },
            (err) => {
                console.log(err.message);
                setIsPending(false);
                setError("Failed to get document");
            }
        );

        return () => unsub();
    }, [collectionName, id]);

    return { document, error, isPending }
};