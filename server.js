const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// TU NUEVA LLAVE OFICIAL
const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo y con Llave Nueva");
});

app.get('/populares', async (req, res) => {
    try {
        // Usamos tu llave para pedir las películas populares
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        console.error("Error con la nueva llave:", error.message);
        res.status(500).json({ error: "La llave no funcionó", detalle: error.message });
    }
});

app.get('/buscar', async (req, res) => {
    try {
        const query = req.query.q;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en búsqueda" });
    }
});

app.get('/get-ads', (req, res) => { res.json({ enabled: false }); });

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor listo con la llave de Nazareth");
});
