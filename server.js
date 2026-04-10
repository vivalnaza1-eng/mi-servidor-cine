const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Esta es la llave que trae las películas
const API_KEY = '70093a2955f2b3ec3212871ef3b6d76d';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo");
});

app.get('/populares', async (req, res) => {
    try {
        const respuesta = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX`);
        res.json(respuesta.data.results);
    } catch (error) {
        console.error("Error en TMDB:", error.message);
        res.status(500).json({ mensaje: "Error al conectar con las películas", detalle: error.message });
    }
});

app.get('/buscar', async (req, res) => {
    try {
        const query = req.query.q;
        const respuesta = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en la búsqueda" });
    }
});

app.get('/get-ads', (req, res) => { res.json({ enabled: false }); });

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor corriendo perfectamente");
});
