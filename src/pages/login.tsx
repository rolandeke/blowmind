'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useLogin from "../hooks/useLogin"
import useGoogle from "../hooks/useGoogle"
import GoogleButton from "../components/GoogleButton";
import BG from "../../public/img/bg.jpg"
import Logo from "../../public/img/Blow-Mind.png"
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [textType, setTextType] = useState<boolean>(false);
    const { login, isPending, error } = useLogin();
    const { googleSignIn, error: signinError, isPending: signinPending } = useGoogle();

    const handleInputType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTextType(!textType);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <nav className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center text-indigo-600 dark:text-white">
                    <Image src={Logo} alt="Background Image" width={100} height={100} className="font-bold" />
                </div>
                <Link href="/">
                    <button className="text-indigo-600 hover:text-indigo-800 dark:text-white dark:hover:text-gray-300">Back to Home</button>
                </Link>
            </nav>


            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 grid md:grid-cols-2 mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <h1 className="text-2xl md:text-4xl font-bold">Blowmind</h1>
                        <p className="mt-2 text-sm md:text-lg">Unleash the Power of Words, Connect with Like-minded Readers and Writers</p>
                    </div>
                    <Image src={BG} alt="intro" className=" h-full rounded-sm" />
                </div>

                <div className="p-6">
                    <div className="flex justify-between mb-4">
                        <Link href="/signup">
                            <button className="text-indigo-600 hover:text-indigo-800 dark:text-white dark:hover:text-gray-300">Register</button>
                        </Link>
                        <Link href="/login">
                            <button className="text-indigo-600 font-bold border-b-2 border-indigo-600">Login</button>
                        </Link>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">Welcome back!</h3>

                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg mb-4 p-2">
                        <label htmlFor="email" className="text-gray-600 dark:text-gray-400 mr-2">
                            <i className="fa fa-envelop"></i>
                        </label>
                        <input 
                            id="email"
                            required
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email Address"
                            className="flex-grow bg-transparent outline-none text-gray-800 dark:text-gray-200" 
                        />
                    </div>


                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg mb-4 p-2">
                        <label htmlFor="password" className="text-gray-600 dark:text-gray-400 mr-2">
                            <i className="fas fa-lock"></i>
                        </label>
                        <input 
                            id="password"
                            required
                            type={textType ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            className="flex-grow bg-transparent outline-none text-gray-800 dark:text-gray-200" 
                        />
                        <button type="button" onClick={handleInputType} className="text-gray-600 dark:text-gray-400 ml-2">
                            <i className={textType ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    {!isPending && <button className="bg-indigo-600 mb-2 text-white w-full py-2 rounded-lg hover:bg-indigo-700">Login</button>}
                    {isPending && (
                        <button className="bg-indigo-600 text-white w-full py-2 rounded-lg" disabled>
                            Logging In...
                        </button>
                    )}

                    <GoogleButton 
                        handleSign={googleSignIn}
                        error={signinError}
                        isPending={signinPending}
                        text="Sign in with Google"
                     />

                     {error && <div className="text-red-600 mt-4">{error}</div>}
                     {signinError && <div className="text-red-600 mt-4">{signinError}</div>}

                </div>

            </form>
        </div>
    )

}



export default Login;