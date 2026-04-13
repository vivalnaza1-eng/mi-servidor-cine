const express = require('express');
const axios = require('axios');
const cors = require('cors');
const compression = require('compression'); // Para que el servidor sea más rápido

const app = express();

// --- 1. CONFIGURACIÓN DE SEGURIDAD (CORS) ---
// Cuando tengas tu dominio, cambia '*' por 'https://tu-dominio.com'
app.use(cors({
    origin: '*', 
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}));

app.use(compression()); // Reduce el tamaño de los datos enviados para que la app cargue veloz
app.use(express.json());

const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo 🚀 - Guyana Digital Edition - Ready for Scale");
});

// Películas populares
app.get('/populares', async (req, res) => {
    try {
        const r = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
        res.json(r.data.results);
    } catch (e) { res.status(500).json({error: "Error al obtener populares"}); }
});

// Series populares
app.get('/series', async (req, res) => {
    try {
        const r = await axios.get(`${TMDB_BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`);
        res.json(r.data.results);
    } catch (e) { res.status(500).json({error: "Error al obtener series"}); }
});

// Próximamente (Filtrado para la región de Guyana)
app.get('/proximamente', async (req, res) => {
    try {
        const r = await axios.get(`${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&region=GY`);
        res.json(r.data.results);
    } catch (e) { res.status(500).json({error: "Error en estrenos"}); }
});

// Buscador
app.get('/buscar', async (req, res) => {
    const { q, type } = req.query;
    if (!q) return res.status(400).json({error: "Query faltante"});
    
    const searchType = type === 'tv' ? 'tv' : 'movie';
    try {
        const r = await axios.get(`${TMDB_BASE_URL}/search/${searchType}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(q)}`);
        res.json(r.data.results);
    } catch (e) { res.status(500).json({error: "Error en búsqueda"}); }
});

// Categorías/Géneros
app.get('/genero/:id', async (req, res) => {
    const { type } = req.query;
    const genreId = req.params.id;
    const searchType = type === 'tv' ? 'tv' : 'movie';
    try {
        const r = await axios.get(`${TMDB_BASE_URL}/discover/${searchType}?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc`);
        res.json(r.data.results);
    } catch (e) { res.status(500).json({error: "Error al filtrar por género"}); }
});

// --- CONFIGURACIÓN DE ANUNCIOS ---
app.get('/get-ads', (req, res) => {
    res.json({
        enabled: true,
        // Tu link de ProfitableCPM configurado para abrir en pestaña aparte en la App
        video_ad_start: "https://www.profitablecpmratenetwork.com/jpp1ah70?key=2362ad52be7ddb0ad6207c0ceb1443af"
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send("Ruta no encontrada en Guyana Digital Server");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ===========================================
    🚀 SERVIDOR NAZARETH PRO FUNCIONANDO
    🌐 Puerto: ${PORT}
    🛡️ CORS: Activo
    ⚡ Compresión: Activada
    ===========================================
    `);
});
