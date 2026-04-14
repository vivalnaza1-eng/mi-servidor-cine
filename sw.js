// Este es el Service Worker
self.addEventListener('install', (event) => {
  console.log('SW instalado');
});

self.addEventListener('fetch', (event) => {
  // Esto permite que la app cargue contenido online sin errores en iOS
});
