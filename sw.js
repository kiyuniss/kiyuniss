// Kiyuni Secondary School - Service Worker
var CACHE = 'kiyuniss-v2';
var FILES = [
  '/kiyuniss/index.html',
  '/kiyuniss/style.css',
  '/kiyuniss/about.html',
  '/kiyuniss/academics.html',
  '/kiyuniss/library.html',
  '/kiyuniss/fees.html',
  '/kiyuniss/timetable.html',
  '/kiyuniss/notices.html',
  '/kiyuniss/student.html',
  '/kiyuniss/contact.html',
  '/kiyuniss/admissions.html',
  '/kiyuniss/staff.html'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}));
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).catch(function(){
        return caches.match('/kiyuniss/index.html');
      });
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }));
});
