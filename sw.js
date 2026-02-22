const CACHE_NAME = 'sobral-pinto-v6'; // Mude para v5 para forçar o celular a atualizar
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Tentativa de cachear um por um para não quebrar tudo se um falhar
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('Falha ao cachear:', url));
        })
      );
    })
  );
});
