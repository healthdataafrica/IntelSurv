if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-8bc5d1c9"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/A9uO7TMcrfIFpMpBARH2o/_buildManifest.js",revision:"56e41a7f890f90bf44fe75b96efe7c01"},{url:"/_next/static/A9uO7TMcrfIFpMpBARH2o/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/347-a6373e648664ee11.js",revision:"a6373e648664ee11"},{url:"/_next/static/chunks/framework-5429a50ba5373c56.js",revision:"5429a50ba5373c56"},{url:"/_next/static/chunks/main-2bfa2249caca6595.js",revision:"2bfa2249caca6595"},{url:"/_next/static/chunks/pages/_app-cc9f26b0c78debe9.js",revision:"cc9f26b0c78debe9"},{url:"/_next/static/chunks/pages/_error-b6491f42fb2263bb.js",revision:"b6491f42fb2263bb"},{url:"/_next/static/chunks/pages/index-6ce33b79d1f562b0.js",revision:"6ce33b79d1f562b0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6ef43a8d4a395f49.js",revision:"6ef43a8d4a395f49"},{url:"/_next/static/css/1d603a2b92cf8d9f.css",revision:"1d603a2b92cf8d9f"},{url:"/arrow-up.png",revision:"fa620e8f3464814e74d0dcdb2e1d33f3"},{url:"/chat-loader.gif",revision:"a21746f5374859d98f7528e1857e3532"},{url:"/copy.png",revision:"35c7f9a727021d1b0ccc655cb00811fe"},{url:"/downward-arrow.png",revision:"9392d48a2b7d341da715b486b70b3a9b"},{url:"/favicon-old.ico",revision:"531a924b278aaa250ea9ebe9f7fe8bb5"},{url:"/favicon.ico",revision:"2b6e54bf357b39ae60e809c7a653d310"},{url:"/icon-192x192.png",revision:"3b953d7eac7489ec5ca76cf809305123"},{url:"/icon-256x256.png",revision:"e55c771ad4296ceffac59d4a27d14414"},{url:"/icon-384x384.png",revision:"90fa7f8f70b86c3fbfa407f9991d6781"},{url:"/icon-512x512.png",revision:"92059ef11f1ce5b01bbdb25118d65b5d"},{url:"/launcher.jpg",revision:"e7a8cee9b24388d894b9c16b13f03010"},{url:"/loader.gif",revision:"f0a5b699196ea8e4f97b422fa8fac66b"},{url:"/logo.png",revision:"c2c3347b09131ec7e5a7231873cb8257"},{url:"/manifest.json",revision:"f40572fdfc457030fa335b302ef4bee9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
