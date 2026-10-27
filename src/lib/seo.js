import { useEffect } from 'react';

export const SITE = 'LingoMitra';
export const SITE_TAG = 'Free English Learning Games';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Per-page title, description, social tags and canonical URL. */
export function useSeo(title, description) {
  useEffect(() => {
    const full = title ? `${title} – ${SITE} | ${SITE_TAG}` : `${SITE} – ${SITE_TAG} in Gujarati, Hindi & more`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', window.location.href);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    setCanonical(window.location.origin + window.location.pathname);
  }, [title, description]);
}
