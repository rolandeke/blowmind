import { useDocument } from "../hooks/useDocument";
import { useAuthContext } from "../context/AuthContext";
import { ReactElement } from "react";
import Avatar from "./Avatar";


const Aside = (): ReactElement => {
    const { user }: any = useAuthContext();
    const { error, document: currentUser } = useDocument("users", user?.uid);

    if (error) return <div className="text-red-600">{error}</div>;


    return (
        <aside className="w-72 p-6 text-sm">
            {currentUser && (
                <div className="fixed w-72 pr-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                        <div className="relative h-20 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-t-lg flex items-center justify-center">
                            <Avatar src={currentUser?.photoURL} className="absolute to-1/2 translate-y-1/2 w-16 h-16 bg-white rounded-full border-white" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                            <h2 className="text-lg font-semibold">{currentUser?.firstName} {currentUser?.lastName}</h2>
                            <p className="text-gray-600 dark:text-gray-400">Sierra Leone</p>
                            <ul className="flex flex-wrap justify-center gap-2 mt-2">
                                <li className="text-gray-600 dark:text-gray-400">@{currentUser?.firstName?.toLowerCase()}</li>
                                <span className="text-gray-600 dark:text-gray-400">.</span>
                                <li></li>
                                <span>.</span>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    )


}