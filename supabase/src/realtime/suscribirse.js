import { supabase } from '../lib/supabase'
import { Tareas } from './Tareas'
import { Login } from './Login'
import { useEffect, useState } from 'react'

function App() {
    useEffect(() => {
        const canal = supabase
            .channel('cambios-tareas')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'tareas' },
                (payload) => {
                    if (payload.eventType === 'INSERT')
                        setTareas(t => [payload.new, ...t])
                    if (payload.eventType === 'UPDATE')
                        setTareas(t => t.map(x => x.id === payload.new.id ? payload.new : x))
                    if (payload.eventType === 'DELETE')
                        setTareas(t => t.filter(x => x.id !== payload.old.id))
                })
            .subscribe()

        return () => supabase.removeChannel(canal)
    }, [])
}