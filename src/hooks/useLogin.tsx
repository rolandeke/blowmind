import { useAuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


interface UseLogin {
    login: (email: string, password: string) => Promise<void>;
    error: string | null;
    isPending: boolean;
}


const useLogin = (): UseLogin => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();


    const login = async (email: string, password: string): Promise<void> => {
        setError(null);
        setIsPending(true);

        try {
            //login
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user as FirebaseUser;

            if (!user) {
                throw new Error("Failed to login")
            }

            // update online status
            const documentRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(documentRef);

            if (!userDoc.exists()) {
                await setDoc(documentRef, {
                    online: true,
                    email: user.email,
                    firstName: user.displayName?.split("")[0] || "",
                    lastName: user.displayName?.split("")[1] || "",
                    photoURL: user.photoURL || "",
                    interest: [],
                    headline:"",
                });
            } else {
                await updateDoc(documentRef, { online: true});
            }


            

            dispatch({ type: "LOGIN", payload: user });

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