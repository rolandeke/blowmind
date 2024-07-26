import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react"
import { auth, db } from "../utils/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import "firebase/compat/auth"



const useGoogle = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const googleSignUp = async () => {
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);

            if (!res) {
                throw new Error("Could not complete signup")
            }

            if (res.user.displayName) {
                const splitName: string[] = res.user.displayName.split(" ");
                const firstName: string = splitName[0];
                const lastName: string = splitName[1];

                // create a user document
                await setDoc(doc(db, "users", res.user.uid), {
                    photoUrl: res.user.photoURL,
                    email: res.user.email,
                    firstName: firstName,
                    lastName: lastName,
                    headline: "",
                    online: true,
                    interests: [],
                });

                dispatch({ type: "LOGIN", payload: res.user });

                if(!isCancelled) {
                    setIsPending(false);
                    setError(null);
                }
            }
        } catch (err: any) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false);
            }
        }
    };

    const googleSignIn = async () => {
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);

            if (!res) {
                throw new Error("Could not complete sign-in");
            }

            //update user document
            await updateDoc(doc(db, "users", res.user.uid), {
                online: true,
            });

            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }catch (err: any) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        };
    }, []);

    return { googleSignUp, googleSignIn, error, isPending };
};

export default useGoogle;