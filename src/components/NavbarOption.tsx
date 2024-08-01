import React from "react"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function NavbarOption() {
    return (
        <div className="flex gap-4">
            <button type="button" className="bg-gray-100 dark:bg-gray-700 rounded-full p-2" aria-label="Comments">
                <i className="fas fa-comments"></i>
            </button>
            <button type="button" className="bg-gray-100 dark:bg-gray-700 rounded-full p-2" aria-label="Notification">
                <i className="fas fa-bell"></i>
            </button>
        </div>
    )
}