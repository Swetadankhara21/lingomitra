// Notices a new deploy while a tab is open: the app is a single page, so
// moving between pages never reloads it and an open tab would keep running
// the old version. We compare the main script name in the live index.html
// with the one this tab loaded (Vite gives every build a new hashed name).

const CHECK_EVERY = 5 * 60 * 1000;
const RELOADED_KEY = 'lingomitra-chunk-reload';

const currentScript = () => document.querySelector('script[type="module"][src*="/assets/index-"]')?.getAttribute('src') || null;

let loadedScript = null;
let updateReady = false;
let lastCheck = 0;

async function check() {
  if (updateReady || !loadedScript || Date.now() - lastCheck < 30 * 1000) return;
  lastCheck = Date.now();
  try {
    const html = await (await fetch('/', { cache: 'no-store' })).text();
    const live = html.match(/\/assets\/index-[^"']+\.js/)?.[0];
    if (live && live !== loadedScript) updateReady = true;
  } catch {
    // offline - try again later
  }
}

export function startUpdateWatcher() {
  loadedScript = currentScript();
  if (!loadedScript) return; // dev server: no hashed bundle
  setInterval(check, CHECK_EVERY);
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check());
  window.addEventListener('focus', check);

  // A page chunk from an older deploy is gone: load the page fresh, once.
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    reloadOnce();
  });
}

/** Called on every route change: a full page load to the new route when a newer version is live. */
export function applyUpdateOn(pathname) {
  if (updateReady) window.location.assign(pathname + window.location.search);
}

/** Reload at most once per tab, so a real error can't loop. Returns false when already tried. */
export function reloadOnce() {
  try {
    if (sessionStorage.getItem(RELOADED_KEY)) return false;
    sessionStorage.setItem(RELOADED_KEY, '1');
  } catch {
    // storage blocked - still reload
  }
  window.location.reload();
  return true;
}
