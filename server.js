const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// TU LLAVE OFICIAL (La que sacaste hoy)
const API_KEY = '2519980fb2074bfdf5f7abce52b2e2d6';
const URL_MIA = 'https://mi-servidor-cine.onrender.com';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo");
});

app.get('/populares', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error en TMDB" });
    }
});

app.get('/buscar', async (req, res) => {
    try {
        const query = req.query.q;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`;
        const respuesta = await axios.get(url);
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ error: "Error de búsqueda" });
    }
});

// Esta ruta servirá para controlar la publicidad después
app.get('/get-ads', (req, res) => { 
    res.json({ enabled: false }); 
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Servidor funcionando");
    
    // DESPERTADOR SEGURO: Espera 1 minuto antes de empezar a dar "pulsos"
    setTimeout(() => {
        setInterval(() => {
            axios.get(URL_MIA).catch(() => console.log("Ping de despertar"));
        }, 800000); // Cada 13 minutos
    }, 60000); 
});
