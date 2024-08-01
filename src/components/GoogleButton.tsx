import React, { useEffect, useState } from "react"
import '@fortawesome/fontawesome-free/css/all.min.css';


interface GoogleButtonProps {
    isPending: boolean;
    text: string;
    error: string | null;
    handleSign: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
    isPending,
    text,
    error,
    handleSign,
}) => {
    const [customError, setCustomError] = useState<string | null>(null);

    useEffect(() => {
        if (error && error.includes("No document to update")) {
            setCustomError("You don't have an account yet");
        } else {
            setCustomError(error);
        }
    }, [error]);

    return (
        <>
            <div 
                onClick={handleSign} 
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 "
            >
               <i className="fab fa-google mr-2"></i>
               {!isPending && <div>{text}</div>}
               {isPending && <div>Loading...</div>}
            </div>
            {customError && <div className="text-red-500 mt-2">{customError}</div>}
        </>
    );
};


export default GoogleButton;
