const CACHE_NAME = 'sobral-pinto-test-v4'; // Mude esse v1 sempre que atualizar o código
const ASSETS = [
  './',
  'index.html',
  'manifest.json', // Certifique-se de que o nome aqui seja o mesmo do index.html
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80',
  'icon-512.png'
];

// Instalação: Cacheia os arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); 
});

// Ativação: Deleta caches de versões antigas imediatamente
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// Estratégia: Network First (Tenta internet, se falhar, usa cache)
// Isso evita que o usuário veja a versão velha se ele estiver online
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
