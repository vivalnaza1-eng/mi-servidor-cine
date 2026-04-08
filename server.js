const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

const TMDB_API_KEY = "815494fc4383563e19ec5e448b783207";
const OPENAI_API_KEY = "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"; 

// --- CONFIGURACIÓN DE MONETIZACIÓN ---
const ADS_CONFIG = {
    show_ads: true,
    // Aquí pondrás los "Direct Links" que te de Adsterra o Monetag
    video_ad_start: "https://www.ejemplo-anuncio.com/video-inicio", 
    video_ad_end: "https://www.ejemplo-anuncio.com/video-final",
    probability: 1.0 // 1.0 significa que siempre pedirá anuncio para maximizar ganancias
};

function filtrarPeliculas(lista) {
    if (!lista) return [];
    return lista.filter(p => p.poster_path && p.vote_average >= 0).slice(0, 20);
}

/* ==========================================
    💰 ENDPOINT DE PUBLICIDAD
   Este le dirá a la App qué links abrir
========================================== */
app.get("/get-ads", (req, res) => {
    res.json({
        enabled: ADS_CONFIG.show_ads,
        start_link: ADS_CONFIG.video_ad_start,
        end_link: ADS_CONFIG.video_ad_end,
        must_wait: 5000 // Tiempo en milisegundos que obligaremos a esperar
    });
});

/* =========================
    🚀 SERVIDORES DE VIDEO
========================= */
app.get("/limpiar-video/:id", async (req, res) => {
    const movieId = req.params.id;
    
    const servers = [
        { name: "Latino Premium 1", url: `https://vidsrc.xyz/embed/movie/${movieId}` },
        { name: "Latino Premium 2", url: `https://vidsrc.net/embed/movie/${movieId}` },
        { name: "Servidor Ultra (Directo)", url: `https://api.mundoverse.club/embed/movie/${movieId}` }
    ];

    res.json({ 
        success: true,
        primary: servers[0].url,
        alternatives: servers
    });
});

/* =========================
    🤖 IA Y POPULARES
========================= */
app.get("/populares", async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES`);
        res.json(filtrarPeliculas(response.data.results));
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

app.get("/ai", async (req, res) => {
    const pregunta = req.query.q;
    if (!pregunta) return res.json([]);
    let queryBusqueda;
    try {
        const aiResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Solo responde con el título de la película o keywords en inglés, sin explicaciones." }, 
                { role: "user", content: pregunta }
            ],
            max_tokens: 15
        }, { headers: { "Authorization": `Bearer ${OPENAI_API_KEY}` }, timeout: 4000 });
        queryBusqueda = aiResponse.data.choices[0].message.content.trim();
    } catch (error) { 
        queryBusqueda = pregunta; 
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(queryBusqueda)}&language=es-ES`);
        res.json(filtrarPeliculas(response.data.results));
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("-----------------------------------------");
    console.log("💰 ENGINE MONETIZADO LISTO");
    console.log(`📡 Puerto: ${PORT}`);
    console.log("-----------------------------------------");
});