const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo - Series y Películas Sincronizadas");
});

// --- RUTA PELÍCULAS POPULARES ---
app.get('/populares', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener peliculas" });
    }
});

// --- RUTA SERIES POPULARES (NUEVA) ---
app.get('/series', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-MX&page=1`;
        const respuesta = await axios.get(url);
        // TMDB usa 'name' para series y 'title' para pelis. 
        // Normalizamos un poco para que el frontend no sufra.
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener series" });
    }
});

// --- BUSCADOR HÍBRIDO (ACTUALIZADO) ---
app.get('/buscar', async (req, res) => {
    try {
        const query = req.query.q;
        const type = req.query.type || 'movie'; // Recibe 'movie' o 'tv' del frontend
        const url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en la busqueda" });
    }
});

// --- FILTRO POR GÉNERO (NUEVA) ---
app.get('/genero/:id', async (req, res) => {
    try {
        const genreId = req.params.id;
        const type = req.query.type || 'movie';
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=es-MX&with_genres=${genreId}&sort_by=popularity.desc`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar por genero" });
    }
});

// --- PUBLICIDAD ---
app.get('/get-ads', (req, res) => { 
    res.json({ 
        enabled: true, 
        video_ad_start: "https://www.profitablecpmratenetwork.com/jpp1ah70?key=2362ad52be7ddb0ad6207c0ceb1443af" 
    }); 
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor Nazareth Cinema Pro: Nivel App Desbloqueado");
});
