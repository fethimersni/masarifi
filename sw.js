const V="masarifi-v6",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","icon-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("masarifi-")&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  e.respondWith(fetch(r,{cache:"no-cache"}).then(res=>{if(res.ok){const c=res.clone();e.waitUntil(caches.open(V).then(x=>x.put(r,c)).catch(()=>{}))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):Response.error()))))});
