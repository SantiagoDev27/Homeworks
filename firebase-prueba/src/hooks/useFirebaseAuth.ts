import { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const useFirebaseAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = (email: string, pass: string) =>
        signInWithEmailAndPassword(auth, email, pass);
    const register = (email: string, pass: string) =>
        createUserWithEmailAndPassword(auth, email, pass);
    const logout = () => signOut(auth);

    return { user, loading, login, register, logout };
};
