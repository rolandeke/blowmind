import { useAuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { useEffect, useState } from "react"
import { doc, updateDoc } from "firebase/firestore";


const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();


    const login = async (email: string, password: string) => {
        setError(null);
        setIsPending(true);

        try {
            //login
            const res = await signInWithEmailAndPassword(auth, email, password);

            // update online status
            const documentRef = doc(db, "users", res.user?.uid);
            await updateDoc(documentRef, { online: true, email: res.user?.email });

            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }   catch (err: any) {
            if (!isCancelled) {
                setIsPending(false);
                setError(err.message);
                console.log(err.message);
            }
        }
    };

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, []);

    return { login, isPending, error };

};

export default useLogin;