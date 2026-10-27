// After `vite build`: one HTML file per page with its own title, description,
// canonical URL, social tags, JSON-LD and readable text (so search engines and
// link previews see the page without running JavaScript), plus sitemap.xml.
// vercel.json cleanUrls serves dist/games.html at /games.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { SEO_PAGES, SITE_NAME, SITE_URL, dictionaryLetterSeo } from '../src/lib/seoPages.js';

const DIST = 'dist';
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const template = readFileSync(`${DIST}/index.html`, 'utf8');
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlOf = (path) => SITE_URL + path;

const pages = [
  ...Object.entries(SEO_PAGES),
  ...LETTERS.map((l) => [`/dictionary/${l}`, dictionaryLetterSeo(l)]),
];

// Links every pre-rendered page shows, so crawlers can reach the whole site.
const navLinks = Object.entries(SEO_PAGES)
  .filter(([path]) => !['/privacy-policy', '/terms', '/credits', '/contact', '/about', '/progress'].includes(path))
  .map(([path, p]) => `<li><a href="${path}">${esc(p.h1)}</a></li>`)
  .join('');

function jsonLd(path, page) {
  const crumbs = [{ name: SITE_NAME, path: '/' }];
  if (path.startsWith('/dictionary/')) crumbs.push({ name: SEO_PAGES['/dictionary'].h1, path: '/dictionary' });
  if (path !== '/') crumbs.push({ name: page.h1, path });

  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: urlOf(c.path) })),
    },
  ];
  if (page.type === 'game') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: page.h1,
      description: page.description,
      url: urlOf(path),
      learningResourceType: 'Game',
      educationalLevel: ['Beginner', 'Intermediate', 'Advanced'],
      teaches: 'English language',
      inLanguage: 'en',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    });
  }
  return data.map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join('\n    ');
}

function render(path, page) {
  const url = urlOf(path === '/' ? '/' : path);
  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    jsonLd(path, page),
  ].join('\n    ');

  const body = `<div id="root"><main style="max-width:72rem;margin:0 auto;padding:6rem 1rem 2rem;font-family:system-ui,sans-serif;color:#134E4A">
      <h1 style="font-size:2rem;font-weight:800">${esc(page.h1)}</h1>
      <p style="margin-top:.75rem;color:#64748B;max-width:42rem">${esc(page.text)}</p>
      <nav aria-label="LingoMitra"><ul style="margin-top:1.5rem;columns:2;color:#0F766E">${navLinks}</ul></nav>
    </main></div>`;

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/content="\/og-image\.png"/g, `content="${SITE_URL}/og-image.png"`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', body);
}

for (const [path, page] of pages) {
  const file = path === '/' ? `${DIST}/index.html` : `${DIST}${path}.html`;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(path, page));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(([path, page]) => `  <url><loc>${urlOf(path)}</loc><lastmod>${today}</lastmod><priority>${(page.priority ?? 0.5).toFixed(1)}</priority></url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(`${DIST}/sitemap.xml`, sitemap);

console.log(`SEO: ${pages.length} pages pre-rendered + sitemap.xml`);
