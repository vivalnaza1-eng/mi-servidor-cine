const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// ESTA LÍNEA ES LA MÁS IMPORTANTE PARA QUE SE VEAN LAS PELIS
app.use(cors({ origin: '*' })); 

app.use(express.json());

const TMDB_API_KEY = '93f066b6e40938456209b55231c5188f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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

app.get('/buscar', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query: query, language: 'es-MX' }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en búsqueda" });
    }
});

app.get('/get-ads', (req, res) => {
    res.json({ enabled: false }); // Desactivado por ahora para que pruebes tranquilo
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor Nazareth Pro en línea"));
