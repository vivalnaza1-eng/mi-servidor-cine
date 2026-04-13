const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo 🚀 - Guyana Digital Edition");
});

// Películas populares (Títulos en Inglés)
app.get('/populares', async (req, res) => {
    try {
        // Quitamos language=es-MX para que el título por defecto sea el original/inglés
        const r = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// Series populares (Títulos en Inglés)
app.get('/series', async (req, res) => {
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// NUEVA RUTA: Próximamente (Upcoming)
app.get('/proximamente', async (req, res) => {
    try {
        // region=GY asegura que sean estrenos relevantes para Guyana
        const r = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&region=GY`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// Buscador (Títulos en Inglés)
app.get('/buscar', async (req, res) => {
    const { q, type } = req.query;
    const searchType = type === 'tv' ? 'tv' : 'movie';
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(q)}`);
        res.json(r.data.results);
    } catch (e) { res.status(500).send("Error"); }
});

// Categorías
app.get('/genero/:id', async (req, res) => {
    const { type } = req.query;
    const genreId = req.params.id;
    const searchType = type === 'tv' ? 'tv' : 'movie';
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/discover/${searchType}?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc`);
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
