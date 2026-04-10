const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo 🚀");
});

// Películas populares
app.get('/populares', async (req, res) => {
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// Series populares
app.get('/series', async (req, res) => {
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-MX`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// Buscador
app.get('/buscar', async (req, res) => {
    const { q, type } = req.query;
    const searchType = type === 'tv' ? 'tv' : 'movie';
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(q)}`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// RUTA DE CATEGORÍAS (La que nos faltaba)
app.get('/genero/:id', async (req, res) => {
    const { type } = req.query;
    const genreId = req.params.id;
    const searchType = type === 'tv' ? 'tv' : 'movie';
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/discover/${searchType}?api_key=${API_KEY}&language=es-MX&with_genres=${genreId}&sort_by=popularity.desc`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

app.get('/get-ads', (req, res) => {
    res.json({
        enabled: true,
        video_ad_start: "https://www.profitablecpmratenetwork.com/jpp1ah70?key=2362ad52be7ddb0ad6207c0ceb1443af"
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor Nazareth Cinema corriendo en puerto " + PORT);
});
