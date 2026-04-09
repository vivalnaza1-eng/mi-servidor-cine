const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN PROFESIONAL
const TMDB_API_KEY = '93f066b6e40938456209b55231c5188f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// RUTA 1: OBTENER TENDENCIAS (Lo que sale al abrir la App)
app.get('/populares', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/day`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'es-MX'
            }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error al conectar con TMDB" });
    }
});

// RUTA 2: BUSCADOR (Cuando el usuario escribe un nombre)
app.get('/buscar', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Falta el texto de búsqueda" });

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: query,
                language: 'es-MX'
            }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en la búsqueda" });
    }
});

// RUTA 3: PUBLICIDAD (Controlada desde aquí)
app.get('/get-ads', (req, res) => {
    res.json({
        enabled: true,
        video_ad_start: "https://página-de-tu-anuncio.com", // Pon aquí tu link de monetización
    });
});

// ENCENDER SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Nazareth Pro activo en puerto ${PORT}`);
});
