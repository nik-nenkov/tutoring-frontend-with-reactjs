/// <reference types="vite/client" />

// In production, we register a service worker to serve assets from local cache.

// Extend ImportMeta interface to include 'env'
interface ImportMetaEnv {
  readonly PROD: boolean;
  // add other env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const isLocalhost: boolean =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(window.location.hostname);

export default function register(): void {
// Use import.meta.env for Vite, but TypeScript may not know about it by default.
// Vite provides types for import.meta.env via vite/client, so import them:
// Add this at the top of your file (outside any function):
// import.meta.env is typed by vite/client, so ensure vite/client is in your tsconfig types.

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = `/service-worker.js`;

        if (isLocalhost) {
            checkValidServiceWorker(swUrl);

            navigator.serviceWorker.ready.then(() => {
                console.log(
                    'This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ'
                );
            });
        } else {
            registerValidSW(swUrl);
        }
    });
}
}

function registerValidSW(swUrl: string): void {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string): void {
  fetch(swUrl)
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        !contentType ||
        contentType.indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}