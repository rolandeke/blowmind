import { useAuthContext } from "../context/AuthContext";
import { auth, db, storage } from "../utils/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, User as FirebaseUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react"



const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();


    const signup = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        thumbnail: File,
        category: string
    ) => {
        setError(null);
        setIsPending(true);

        try {
            //signup
            const res = await createUserWithEmailAndPassword(auth,email, password);

            if (!res) {
                throw new Error("Could not complete signup");
            }

            // upload user thumbnail
            const uploadPath = `thumbnails/${res.user?.uid}/${thumbnail.name}`;
            const storageRef = ref(storage, uploadPath);
            await uploadBytes(storageRef, thumbnail);
            const downloadURL = await getDownloadURL(storageRef);

            // add display and photo_url name to user
            await updateProfile(res.user,{
                displayName: `${firstName} ${lastName}`,
                photoURL: downloadURL,
            });

            // create a user document
            await setDoc(doc(db, "users", res.user?.uid), {
                online: true,
                firstName,
                photoUrl: downloadURL,
                interests: [],
                email,
                lastName,
                headline: "",
                category,
            });

            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }  catch (err: any) {
            if (!isCancelled) {
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

    return { signup, error, isPending };
};

export default useSignup;