/* SPORTIVE — offline shell */
var C='sportive-v1';
var FILES=["./", "index.html", "app.css", "fonts.css", "app.js", "data.js", "manifest.webmanifest", "assets/alpha-black.png", "assets/alpha-white.png", "assets/ed-wide.webp", "assets/hero-16x9.webp", "assets/hero-9x16.webp", "assets/icon-192.png", "assets/icon-512.png", "assets/logo.png", "assets/p-af1gum.webp", "assets/p-leopard.webp", "assets/p-sbdunk.webp", "assets/p-tsmocha.webp", "fonts/05480dc5b4.woff2", "fonts/133bced69b.woff2", "fonts/3cfec04e56.woff2", "fonts/4f27ba08a4.woff2", "fonts/4f52d62547.woff2", "fonts/67318afba5.woff2", "fonts/6cc5d6e405.woff2", "fonts/7e4b16eb8a.woff2", "fonts/82b5af4b06.woff2", "fonts/8739727e3c.woff2", "fonts/b3908b518e.woff2", "fonts/baab286a17.woff2"];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES).catch(function(){});}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.filter(function(n){return n!==C;}).map(function(n){return caches.delete(n);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET') return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r || fetch(e.request).then(function(res){
      var copy=res.clone();
      caches.open(C).then(function(c){c.put(e.request,copy);});
      return res;
    }).catch(function(){ return caches.match('index.html'); });
  }));
});
