import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useTareas = () => {
    const [tareas, setTareas] = useState([])

    const cargar = async () => {
        const { data, error } = await supabase
            .from('tareas')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) console.error(error)
        else setTareas(data)
    }

    const crear = (titulo) => supabase.from('tareas').insert({ titulo })

    const completar = (id, valor) => supabase.from('tareas')
        .update({ completada: valor })
        .eq('id', id)

    const borrar = (id) => supabase.from('tareas').delete().eq('id', id)

    useEffect(() => {
        cargar()
    }, [])

    return { tareas, cargar, crear, completar, borrar }
}

export const tareas = useTareas

