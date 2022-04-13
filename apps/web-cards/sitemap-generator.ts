import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export interface SitemapConfig {
  loc: string;
  lastmod: string;
  priority: string;
  changefreq: string;
}

config({ path: 'apps/store/.env' });

const routes = new Set<string>();

/**
 * Find file on folders
 */
export function fromDir(startPath: string, filter: string): string[] {
  if (!fs.existsSync(startPath)) {
    console.warn('no dir ', startPath);
    return [];
  }
  const founded = [];
  const files = fs.readdirSync(startPath);
  for (const file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      const foundedIn = fromDir(filename, filter);
      founded.push(...foundedIn);
    } else if (filename.indexOf(filter) >= 0) {
      founded.push(filename);
    }
  }

  return founded;
}

/**
 * Find sitemap config on file content
 */
export function parseSitemapConfig(source: string): Partial<SitemapConfig> {
  let sitemapConfig = source
    .slice(8)
    .replace(/\n|\t|\s/g, '')
    .replace(/'/g, '"')
    .trim();
  if (sitemapConfig[sitemapConfig.length - 1] === ',') {
    sitemapConfig = sitemapConfig.slice(0, sitemapConfig.length - 1);
  }
  sitemapConfig = sitemapConfig + '}';
  sitemapConfig = sitemapConfig.replace(
    /(\w+:)|(\w+ :)/g,
    (matchedStr: string) =>
      '"' + matchedStr.substring(0, matchedStr.length - 1) + '":'
  );

  return JSON.parse(sitemapConfig);
}

/**
 * Generate sitemap url
 */
export function getSitemapUrl(sitemap: Partial<SitemapConfig>): string {
  if (sitemap.loc) {
    routes.add(sitemap.loc.length > 0 ? sitemap.loc : '/');
  }
  // TODO: Add APP_HOST
  return `<url><loc>://APP_HOST${sitemap.loc}</loc><lastmod>${(sitemap.lastmod
    ? new Date(sitemap.lastmod)
    : new Date()
  ).toISOString()}</lastmod><changefreq>${
    sitemap.changefreq ?? 'daily'
  }</changefreq><priority>${sitemap.priority ?? 0.8}</priority></url>`;
}

export function getUrls(): string {
  let data = '';
  const files = [
    ...fromDir('./apps/web-cards/src', '-routing.module.ts'),
    ...fromDir('./libs/web', '-routing.module.ts'),
  ];

  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    const sources = fileContent.replace(/\s+/, ' ').match(/sitemap:\s{[^}]+/g);

    if (sources) {
      for (const source of sources) {
        data += getSitemapUrl(parseSitemapConfig(source));
      }
    }
  }

  return data;
}

export function generate(): void {
  const urls = getUrls();
  fs.writeFileSync(
    'apps/web-cards/src/sitemap.xml',
    // eslint-disable-next-line max-len
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  );
  const routePaths = [...Array.from(routes), '/not-found', '/server-error']
    .sort()
    .join('\n');
  fs.writeFileSync('apps/store/routes.txt', routePaths);
}

// generate
generate();
