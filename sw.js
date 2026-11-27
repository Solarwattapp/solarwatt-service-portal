/* SOLARWATT Service Portal — service worker
   Keeps the app shell on disk so the installed app opens offline.
   Network first for the page itself (so an updated HTML shows up on reload),
   cache first for icons and the manifest. Documents cache the first time they
   are opened, so the manual you used yesterday is still there offline.
   Cross-origin requests (fonts) are left to the browser. */
const CACHE = 'solarwatt-service-portal-v2';
const CORE = [
  './',
  './Service-Portal.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE).catch(() => c.add('./Service-Portal.html')))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function store(req, res) {
  if (!res || res.status !== 200 || res.type === 'opaque') return res;
  const copy = res.clone();
  caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
  return res;
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;   /* fonts */

  const isPage = req.mode === 'navigate' || /\.html?$/i.test(url.pathname) || url.pathname === '/';

  if (isPage) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => store(req, res))
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('./Service-Portal.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => store(req, res)))
  );
});
