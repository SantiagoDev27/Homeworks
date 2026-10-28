import { supabase } from "../lib/supabase";
import { Tareas } from "../tareas/crudTareas";
import { userLogin } from "../users/userLogin";
import { useEffect } from "react";

function App() {
    const subirAvatar = async (e) => {
        const file = e.target.files[0];
        const { data: { user } } = await supabase.auth.getUser();
        const ruta = `${user.id}/${Date.now()}-${file.name}`

        const { error } = await supabase.storage.from('avatars').upload(ruta, file, { upsert: true })
        if (error) console.error(error)
        const { data } = supabase.storage.from('avatars').getPublicUrl(ruta);
        setUrl(data.publicUrl)
    }

    return <>
        <input type="file" accept="image/*" onChange={subirAvatar} />
        {url && <img src={url} width={160} />}
    </>
}