const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';
const URL_DE_MI_SERVIDOR = 'https://mi-servidor-cine.onrender.com';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo y Despierto");
});

app.get('/populares', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en TMDB" });
    }
});

// --- CÓDIGO DEL DESPERTADOR (PING) ---
setInterval(() => {
    console.log("Enviando pulso de vida...");
    axios.get(URL_DE_MI_SERVIDOR)
        .then(() => console.log("El servidor sigue despierto"))
        .catch((err) => console.log("Error en el pulso, pero sigo intentando"));
}, 600000); // Se ejecuta cada 10 minutos
// -------------------------------------

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor iniciado");
});
