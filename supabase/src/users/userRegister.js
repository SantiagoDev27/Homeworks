import { supabase } from "../lib/supabase";

export const register = async () => {
    const registrar = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
                data: { nombre: "User" }
            }
        })
        if (error) return alert(error.message)
        alert('Revisa tu correo para confirmar la cuenta')
    }
}