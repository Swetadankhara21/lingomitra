import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_PAGES, SITE_URL } from './seoPages.js';

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

/**
 * Title, description, social tags and canonical URL for the current page.
 * Text comes from seoPages.js by path; pass { title, description } for pages
 * that build their own (dictionary letters, 404).
 */
export function useSeo(override) {
  const { pathname } = useLocation();
  const page = override || SEO_PAGES[pathname] || SEO_PAGES['/'];
  const { title, description } = page;

  useEffect(() => {
    const url = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setCanonical(url);
  }, [title, description, pathname]);
}
