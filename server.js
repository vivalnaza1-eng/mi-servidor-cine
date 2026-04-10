const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TMDB_API_KEY = '93f066b6e40938456209b55231c5188f';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo");
});

app.get('/populares', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: { api_key: TMDB_API_KEY, language: 'es-MX' }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en TMDB" });
    }
});

app.get('/buscar', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: { api_key: TMDB_API_KEY, query: query, language: 'es-MX' }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en busqueda" });
    }
});

app.get('/get-ads', (req, res) => {
    res.json({ enabled: false });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
