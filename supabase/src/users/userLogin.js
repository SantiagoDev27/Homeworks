import { supabase } from "../lib/supabase";

export const userLogin = async () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //login
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    //usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    //sesion guardada localmente
    const { data: { session } } = await supabase.auth.getSession();

    //logout
    await supabase.auth.signOut();

    return {
        user,
        session,
        error
    };
};