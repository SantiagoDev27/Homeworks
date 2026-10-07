import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);

    const registerUser = async (
        email: string,
        password: string,
    ): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const loginUser = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const logoutUser = async (): Promise<void> => {
        await signOut(auth);
    };

    return { registerUser, loginUser, logoutUser, error };
};
