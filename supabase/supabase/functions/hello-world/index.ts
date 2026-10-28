import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-idioma, x-fuente",
};

Deno.serve(async (req: Request) => {
  // 1. Manejo obligatorio de la petición preflight del navegador (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);

    // 2. Parámetros de URL
    const estado = url.searchParams.get("estado");
    const prioridad = Number(url.searchParams.get("prioridad"));

    // 3. Encabezados personalizados
    const idioma = req.headers.get("X-Idioma");
    const fuente = req.headers.get("X-Fuente");

    // 4. Lectura segura del cuerpo (evita fallos si viene vacío)
    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { usuarioId, categoria, incluirCompletadas } = body as {
      usuarioId?: string;
      categoria?: string;
      incluirCompletadas?: boolean;
    };

    // 5. Retornar respuesta con encabezados CORS incluidos
    return Response.json(
      {
        recibido: {
          queryParams: {
            estado,
            prioridad,
          },
          headers: {
            idioma,
            fuente,
          },
          body: {
            usuarioId,
            categoria,
            incluirCompletadas,
          },
        },
      },
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return Response.json(
      { error: (error as Error).message },
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});