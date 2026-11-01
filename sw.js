const CACHE='houle-v3';
const FILES=['./index.html','./figures.js','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isHTML=e.request.mode==='navigate'||e.request.url.indexOf('index.html')>-1||e.request.url.indexOf('figures.js')>-1;
  if(isHTML){
    e.respondWith(fetch(e.request).then(resp=>{const cl=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));return resp}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const cl=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));return resp})));
  }
});
