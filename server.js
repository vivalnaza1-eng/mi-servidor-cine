const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Permite que tu App se conecte sin bloqueos
app.use(cors({ origin: '*' })); 

app.use(express.json());

const TMDB_API_KEY = '93f066b6e40938456209b55231c5188f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Ruta para ver las películas populares en la pantalla principal
app.get('/populares', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/day`, {
            params: { api_key: TMDB_API_KEY, language: 'es-MX' }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en TMDB" });
    }
});

// Ruta para el buscador
app.get('/buscar', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Falta consulta" });
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query: query, language: 'es-MX' }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en búsqueda" });
    }
});

// Ruta para los anuncios
app.get('/get-ads', (req, res) => {
    res.json({ enabled: false }); 
});

// CONFIGURACIÓN CRÍTICA PARA RENDER
// Usamos el puerto que da Render o el 10000 por defecto
const PORT = process.env.PORT || 10000;

// Escuchamos en 0.0.0.0 para que el "Port Scan" de Render nos encuentre
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Nazareth Pro en línea en puerto ${PORT}`);
});
