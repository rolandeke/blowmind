import { useState } from "react";
import Confirm from "./Confirm";
import "@fortawesome/fontawesome-free/css/all.min.css";


interface OptionProps {
    post: any;
}

export default function Options({ post }: OptionProps) {
    const [isConfirm, setIsConfirm] = useState(false);


    return (
        <div className="flex items-center ml-4">
            <button 
                className="bg-none border-none text-gray-600 dark:text-red-600 hover:text-red-500"
                onClick={() => setIsConfirm(true)}
            >
               <i className="fas fa-times-circle"></i>
            </button>

            {isConfirm && (
                <Confirm 
                    title={`Post ${post.id}`} 
                    type="delete" 
                    item="post" 
                    setIsConfirm={setIsConfirm} 
                    post={post} />
            )}
        </div>
    )
}