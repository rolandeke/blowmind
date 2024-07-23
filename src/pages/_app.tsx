import type { AppProps } from "next/app"; 
import '../../styles/globals.css';
import { AuthContextProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default MyApp;