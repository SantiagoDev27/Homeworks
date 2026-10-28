import { supabase } from "../utils/supabase";

async function consultarTareas() {
    const queryParams = new URLSearchParams({
        estado: "pendiente",
        prioridad: "2",
    });

    const { data, error } = await supabase.functions.invoke(
        `hello-world?${queryParams.toString()}`,
        {
            method: "POST",
            headers: {
                "X-Idioma": "es",
                "X-Fuente": "ionic",
            },
            body: {
                usuarioId: "123",
                categoria: "universidad",
                incluirCompletadas: false,
            },
        },
    );

    if (error) {
        console.error("Error al llamar a la función:", error);
        return;
    }

    console.log("Respuesta:", data);
}
