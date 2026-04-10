const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// TU LLAVE OFICIAL
const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';

// Ruta de prueba
app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo - Version Estable");
});

// Ruta para el catálogo de películas
app.get('/populares', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        console.error("Error en TMDB:", error.message);
        res.status(500).json({ error: "Error al obtener peliculas" });
    }
});

// Ruta para el buscador
app.get('/buscar', async (req, res) => {
    try {
        const query = req.query.q;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en la busqueda" });
    }
});

// Ruta para anuncios (vacía por ahora para no romper nada)
app.get('/get-ads', (req, res) => { 
    res.json({ enabled: false }); 
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor Nazareth Cinema Pro corriendo en puerto " + PORT);
});
