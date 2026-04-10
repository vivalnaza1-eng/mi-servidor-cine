const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Configuración de CORS mejorada
app.use(cors({
    origin: '*',
    methods: ['GET']
}));

// Llave de TMDB (Asegúrate de que esta sea válida en tu cuenta de TMDB)
const API_KEY = '70093a2955f2b3ec3212871ef3b6d76d';

app.get('/', (req, res) => {
    res.send("Servidor de Nazareth Activo y Funcionando");
});

// Ruta para películas populares
app.get('/populares', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
        const respuesta = await axios.get(url, { timeout: 5000 });
        
        // Enviamos los resultados al frontend
        res.json(respuesta.data.results);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        console.error(`Error en TMDB (${status}):`, error.message);
        
        res.status(status).json({ 
            mensaje: "Error al conectar con las películas", 
            codigo: status,
            detalle: error.message 
        });
    }
});

// Ruta para el buscador
app.get('/buscar', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ mensaje: "Debes proporcionar un término de búsqueda" });
    }

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`;
        const respuesta = await axios.get(url, { timeout: 5000 });
        res.json(respuesta.data.results);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en la búsqueda", detalle: error.message });
    }
});

// Ruta para anuncios (desactivada por ahora)
app.get('/get-ads', (req, res) => { 
    res.json({ enabled: false }); 
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
