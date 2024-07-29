'use client'

import React, { useState } from "react";
import { UserCategoryProps } from "../Types";
import useSignup from "@/hooks/useSignup";
import useGoogle from "@/hooks/useGoogle";
import Image from "next/image";
import BG from "../../public/img/bg.jpg"
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";
import Select from "react-select"; 


const userCategories: UserCategoryProps[] = [
    { value: "writer", label: "Writer" },
    { value: "reader", label: "Reader" },
];

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [userCategory, setUserCategory] = useState<string>("");

    const [thumbnailError, setThumbnailError] = useState<string | null>(null);
    const [textType, setTextType] = useState<boolean>(false);

    const { signup, isPending, error } = useSignup();
    const {
        googleSignUp,
        error: signupError,
        isPending: signupPending,
    } = useGoogle();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!thumbnail) {
            setThumbnailError("Thumbnail is required")
            return
        }
        signup(firstName, lastName, email, password, thumbnail, userCategory);
    };

    const handleInputType = (e:  React.MouseEvent<HTMLButtonElement>) => {
        setTextType(!textType);
        const inputElement = e.currentTarget.previousElementSibling as HTMLInputElement;
        inputElement.type = textType ? "password" : "text";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThumbnail(null);
        const selected = e.target.files?.[0];

        if (!selected) {
            setThumbnailError("Please select a file");
            return;
        }

        if (!selected.type.includes("image")) {
            setThumbnailError("Select file must be an image");
            return;
        }
        if (selected.size > 1000000) {
            setThumbnailError("Image file size must less than 1MB");
            return;
        }

        setThumbnailError(null);
        setThumbnail(selected);
    };

    const handleUserCategoryChange = (option: any) => {
        setUserCategory((option as UserCategoryProps).value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row text-center bg-indigo-200 dark: bg-gray-950">
            <div className="relative bg-black text-white flex-1">
                <div className="absolute top-1/2 transform  -transale-y-1/2 px-6 z-10">
                    <h1 className="text-4xl font-bold mb-4">Blowmind</h1>
                    <p className="text-xl">Unleash the Power of Words, Connect with Like-minded Readers and Writers</p>
                </div>
                <Image src={BG} alt="Background Image" className="w-full h-full object-cover opacity-50" />
            </div>

            <div className="flex-1 p-6">
                <div className="flex justify-between mb-4">
                    <Link href="/#signup">
                        <button className="text-indigo-600 border-b-2 border-indigo-600">Register</button>
                    </Link>
                    <Link href="/#login">
                        <button className="text-gray-600">Login</button>
                    </Link>
                </div>

                <h3 className="text-2xl font-semibold mb-4;">Register as a Writer/Reader</h3>

                <div className="space-y-4">
                    <div className="">
                        <i className="fas fa-id-card-alt text-gray-600"></i>
                        <input 
                            type="text" 
                            placeholder="First name" 
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none" 
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <i className="fas fa-user text-gray-600"></i>
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none" 
                        />
                    </div>

                    <div>
                        <label></label>
                        <Select 
                            options={userCategories} 
                            value={userCategories.find((option) => option.value === userCategory)} 
                            className="w-full" 
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <i className="fas fa-envelope text-gray-600"></i>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none" 
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <i className="fas fa-lock text-gray-600"></i>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none" 
                        />
                        <button type="button" onClick={handleInputType} className="text-gray-600">
                            <i className={`fas ${textType ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
                    </div>

                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <i className="fas fa-image text-gray-600"></i>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none" 
                        />
                        {thumbnailError && <div className="text-red-500">{thumbnailError}</div>}
                    </div>
                </div>

                {!isPending && <button className="w-full bg-indigo-600 text-white py-2 mt-4 rounded hover:bg-indigo-700">Sign up</button>}
                {isPending && <button className="w-full bg-indigo-600 text-white py-2 mt-4 rounded disabled">Signing Up...</button>}


                <GoogleButton 
                    handleSign={googleSignUp} 
                    error={signupError} 
                    isPending={signupPending} 
                    text="Sign up with Google" 
                />

                {error && <div className="text-red-500">{error}</div>}

            </div>

        </form>
    );



};

export default Signup;