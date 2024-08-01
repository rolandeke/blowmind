import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import Logo from "../../public/img/Blow-Mind.png"
import Image from "next/image";
import Avatar from "./Avatar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarOption from "../components/NavbarOption";

interface NavbarProps {
    screenWidth: number;
    mobileMenu: boolean;
    setMobileMenu: (value: boolean) => void;
}


export default function Navbar({ screenWidth, mobileMenu, setMobileMenu }: NavbarProps) {
    const { user } = useAuthContext();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setMobileMenu(false);
            }
        };

        if (mobileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileMenu, setMobileMenu])



    return (
        <nav className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md">
            {!mobileMenu && screenWidth < 549 && (
                <button 
                    className="text-indigo-600 dark:text-white" 
                    onClick={() => setMobileMenu(true)}
                    aria-label="Open mobile menu" 
                >
                    <i className="fas fa-bars text-xl"></i>
                </button>
            )}
            <div className="flex items-center text-indigo-600 dark:text-white mr-6">
                <Link href="/">
                    <button className="flex items-center" aria-label="Home">
                        <Image src={Logo} alt="Logo" width={40} height={40} />
                    </button>
                </Link>
            </div>
            <ul className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
                <li>
                    <Link href="/#explore">
                        <button className="text-gray-800 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300">
                            Explore
                        </button>
                    </Link>
                </li>
            </ul>
            <div className="ml-auto flex items-center">
                {screenWidth > 404 && <NavbarOption />}
                {user && (
                    <Link href="/#profile">
                    <button className="flex items-center ml-4" aria-label="Profile">
                        <span className="text-gray-800 dark:text-gray-300">{user.displayName}</span>
                        <Avatar src={user.photoURL || "/path/to/default/avatar.png"} alt={user.displayName || "Userr Avatar"} />
                    </button>
                </Link>
                )}
            </div>
            {mobileMenu && screenWidth < 549 && (
                <div ref={mobileMenuRef} className="absolute top-0 left-0 w-full bg-white dark:bg-gray-800 z-50 p-4">
                    <button 
                        className="text-indigo-600 dark:text-white" 
                        onClick={() => setMobileMenu(false)} 
                        aria-label="Close mobile menu"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                    <ul className="flex flex-col items-start mt-4 gap-4">
                        <li>
                            <Link href="/#explore">
                                <button className="text-gray-800 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300">
                                    Explore
                                </button>
                            </Link>
                        </li>
                        {user && (
                            <Link href="/#profile">
                                <button className="flex items-center mt-4" aria-label="Profile">
                                    <span className="text-gray-800 dark:text-gray-300">{user.displayName}</span>
                                    <Avatar src={user.photoURL || "/path/to/default/avatar.png"}  alt={user.displayName || "User Avatar"} />
                                </button>
                            </Link>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}