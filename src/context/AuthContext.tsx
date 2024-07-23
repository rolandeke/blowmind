import { auth } from "../utils/firebaseConfig";
import firebase from "firebase/compat/app";
import React, { createContext, ReactNode, useEffect, useReducer, Dispatch } from "react";


interface AuthState {
    user: firebase.User | null;
    authIsReady: boolean;
}

interface AuthAction {
    type: "LOGIN" | "LOGOUT" | "AUTH_IS_READY";
    payload: firebase.User | null;
}

interface AuthContextValue extends AuthState {
    dispatch: React.Dispatch<AuthAction>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT": 
            return { ...state, user: null };
        case "AUTH_IS_READY":
            return { user: action.payload, authIsReady: true };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    });

    useEffect(() => {
        // Subscribe to authentication state changes
        const unsub = auth.onAuthStateChanged((user) => {
            dispatch({ type: "AUTH_IS_READY", payload: user as firebase.User | null});
        });
        // Unsubscribe on unmount
        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}