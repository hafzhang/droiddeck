import type { APIRoute } from 'astro';

const site = 'https://droiddeck-guide.gg';

function pathToUrl(filePath: string): string {
  const normalized = filePath
    .replace(/^\.\//, '')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '');
  return normalized === 'index' ? '' : normalized;
}

export const GET: APIRoute = async () => {
  const pages = import.meta.glob(['./*.astro', './**/*.astro'], { eager: true });
  const paths = Object.keys(pages)
    .map(pathToUrl)
    .filter(p => !p.includes('[') && !p.startsWith('_'));

  const uniquePaths = Array.from(new Set(['', 'zh', 'ja', ...paths]));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths
  .map(
    (p) => `  <url>
    <loc>${site}${p ? `/${p}/` : '/'}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
