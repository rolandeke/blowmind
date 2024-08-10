import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function NavbarOption() {
    return (
        <div className="flex gap-2 sm:gap-4">
            <button 
                type="button"  
                className="p-2 ml-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100" 
                aria-label="Comments"
            >
                <i className="fas fa-comments"></i>
            </button>
            <button 
                type="button"  
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100" 
                aria-label="Notification"
            >
                <i className="fas fa-bell"></i>
            </button>
        </div>
    );
}
