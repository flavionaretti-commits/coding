// CODING LAB PWA · 52389b3d6f90
const PREFIX='coding-lab-'+encodeURIComponent(self.registration.scope)+'-';const CACHE=PREFIX+'52389b3d6f90';
const SHELL=["./","./index.html","./manifest.webmanifest","./assets/app-b9144b9ed349.js","./assets/app-cf8b2a736b43.css","./icons/icon.svg","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./icons/apple-touch-icon.png"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{const r=event.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==self.location.origin)return;if(r.mode==='navigate'){event.respondWith(fetch(r).catch(()=>caches.match('./index.html')));return}event.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(response=>{if(response.ok&&u.pathname.startsWith(new URL(self.registration.scope).pathname)){const copy=response.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{})}return response})));});
