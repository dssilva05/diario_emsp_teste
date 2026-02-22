const CACHE_NAME = 'sobral-pinto-v5'; // Aumente a versão para forçar atualização
const ASSETS = [
  './',
  'index.html',
  'manifest.json', // Certifique-se que o arquivo existe com este nome exato
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
