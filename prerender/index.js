import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routesData, selfPacedCourses, workshopsData } from '../src/data/appData.js';

// ============================================================================
// 🚀 SETU PRERENDER ENGINE  (single file — screenshots + OG meta injection)
// ============================================================================
// This script does TWO things automatically in sequence:
//
//  PHASE 1 — SCREENSHOTS
//  Launches a headless browser, visits every page on the live site,
//  takes a real 1200×630 screenshot, and saves it to public/previews/.
//  These become the og:image for each page — zero backend, zero ImageKit.
//
//  PHASE 2 — HTML PRERENDER
//  For every route, generates a static index.html in dist/ with fully
//  populated <meta og:*>, <meta twitter:*>, and JSON-LD tags so that
//  social-media crawlers (WhatsApp, Slack, Twitter, Google Chat) always
//  see the correct title, description, and real screenshot preview.
//
// Run manually : node prerender/index.js
// Run via npm  : npm run prerender
// Auto in deploy: npm run deploy  (screenshots → build → prerender → gh-pages)
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rohanwadadar.github.io/new_setu';
const PREVIEWS_DIR = path.resolve(__dirname, '../public/previews');
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE = path.join(DIST_DIR, 'index.html');

// OG image standard dimensions
const OG_W = 1200;
const OG_H = 630;

// ============================================================================
// 📋 ALL PAGES
// ============================================================================
function collectPages() {
    const pages = [];

    // Homepage
    pages.push({
        path: '/',
        screenshot: 'default.png',
        title: 'SETU | Master AI for Free',
        desc: 'Industry-led AI and Data Science courses and workshops.',
        type: 'WebSite',
    });

    // Static pages (About, Courses, Roadmap, Enterprise…)
    routesData
        .filter(r => !r.path.includes(':') && r.path !== '/')
        .forEach(r => {
            const name = r.path.replace(/^\//, '').replace(/\//g, '-');
            pages.push({
                path: r.path,
                screenshot: `${name}.png`,
                title: r.title,
                desc: r.description,
                type: 'WebPage',
            });
        });

    // Course detail pages
    selfPacedCourses.forEach(c => {
        pages.push({
            path: `/course/${c.id}`,
            screenshot: `course-${c.id}.png`,
            title: `SETU | ${c.title}`,
            desc: c.description,
            type: 'Course',
        });
    });

    // Workshop detail pages
    workshopsData.forEach(w => {
        pages.push({
            path: `/workshop/${w.id}`,
            screenshot: `workshop-${w.id}.png`,
            title: `SETU | ${w.title}`,
            desc: w.description,
            type: 'Event',
        });
    });

    return pages;
}

// ============================================================================
// 📸 PHASE 1  — TAKE REAL SCREENSHOTS OF EVERY PAGE
// ============================================================================
async function takeScreenshots(pages) {
    console.log('📸  Phase 1 — Taking screenshots of local build…\n');

    if (!fs.existsSync(PREVIEWS_DIR)) {
        fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
    }

    // Spin up a quick file server for dist/
    const MIME_TYPES = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.svg': 'image/svg+xml'
    };

    const server = http.createServer((req, res) => {
        let url = req.url.split('?')[0];
        if (url.startsWith('/new_setu')) {
            url = url.substring('/new_setu'.length);
        }
        if (url === '' || url === '/') url = '/index.html';

        let filePath = path.join(DIST_DIR, url);
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            filePath = path.join(DIST_DIR, 'index.html');
        }

        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
    });

    await new Promise((resolve) => {
        server.listen(0, resolve);
    });

    const localPort = server.address().port;
    const localBaseUrl = `http://localhost:${localPort}/new_setu`;

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const BATCH_SIZE = 5; // Process 5 pages at a time

    for (let i = 0; i < pages.length; i += BATCH_SIZE) {
        const batch = pages.slice(i, i + BATCH_SIZE);

        await Promise.all(batch.map(async (p) => {
            const page = await browser.newPage();
            await page.setViewport({ width: OG_W, height: OG_H });

            const url = `${localBaseUrl}${p.path === '/' ? '' : p.path}`;
            const outPath = path.join(PREVIEWS_DIR, p.screenshot);

            try {
                process.stdout.write(`  📷  ${p.title}  →  ${p.screenshot} … `);
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
                // Let fonts / animations settle
                await new Promise(r => setTimeout(r, 1500));

                // Hide the share button so it doesn't appear in Open Graph preview images
                await page.evaluate(() => {
                    const btn = document.getElementById('screenshot-share-btn-wrapper');
                    if (btn) btn.style.display = 'none';
                });

                await page.screenshot({
                    path: outPath,
                    type: 'png',
                    clip: { x: 0, y: 0, width: OG_W, height: OG_H },
                });
                console.log('✅');
            } catch (err) {
                console.log(`❌  ${err.message}`);
            }
            await page.close();
        }));
    }

    await browser.close();
    server.close();
    console.log(`\n  ✔  Screenshots saved to public/previews/\n`);
}

// ============================================================================
// 🏷️  META TAG BUILDER
// ============================================================================
function buildMetaTags(title, desc, imageUrl, pageUrl, type) {
    const safeDesc = (desc || 'SETU School of AI').replace(/"/g, '&quot;').substring(0, 160);

    return `
    <!-- Primary SEO -->
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${pageUrl}">

    <!-- Schema.org / Google -->
    <meta itemprop="name" content="${title}">
    <meta itemprop="description" content="${safeDesc}">
    <meta itemprop="image" content="${imageUrl}">
    <meta itemprop="url" content="${pageUrl}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${type}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${pageUrl}" },
      "headline": "${title}",
      "description": "${safeDesc}",
      "image": { "@type": "ImageObject", "url": "${imageUrl}", "width": ${OG_W}, "height": ${OG_H} },
      "url": "${pageUrl}",
      "publisher": {
        "@type": "Organization",
        "name": "SETU School of AI",
        "logo": { "@type": "ImageObject", "url": "${BASE_URL}/previews/default.png" }
      }
    }
    </script>

    <!-- Open Graph — WhatsApp, Facebook, LinkedIn -->
    <meta property="og:type"              content="website">
    <meta property="og:url"               content="${pageUrl}">
    <meta property="og:title"             content="${title}">
    <meta property="og:description"       content="${safeDesc}">
    <meta property="og:image"             content="${imageUrl}">
    <meta property="og:image:secure_url"  content="${imageUrl}">
    <meta property="og:image:type"        content="image/png">
    <meta property="og:image:width"       content="${OG_W}">
    <meta property="og:image:height"      content="${OG_H}">

    <!-- Twitter / X -->
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:url"         content="${pageUrl}">
    <meta name="twitter:title"       content="${title}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image"       content="${imageUrl}">

    <!-- Hidden crawler hint (for Google Chat / Workspace link previews) -->
    <div style="display:none;position:absolute;left:-9999px;" aria-hidden="true">
        <h1>${title}</h1>
        <img src="${imageUrl}" alt="${title}">
        <p>${safeDesc}</p>
        <a href="${pageUrl}">Visit ${title}</a>
    </div>
    `;
}

// ============================================================================
// 🛠️  PHASE 2  — GENERATE STATIC HTML WITH INJECTED OG TAGS
// ============================================================================
async function prerenderHTML(pages) {
    console.log('🛠️   Phase 2 — Injecting OG meta tags into static HTML…\n');

    if (!fs.existsSync(TEMPLATE)) {
        throw new Error('dist/index.html not found — run "vite build" first.');
    }

    const template = fs.readFileSync(TEMPLATE, 'utf-8');

    for (const p of pages) {
        const imageUrl = `${BASE_URL}/previews/${p.screenshot}`;
        const pageUrl = `${BASE_URL}${p.path === '/' ? '' : p.path}`;
        const metaTags = buildMetaTags(p.title, p.desc, imageUrl, pageUrl, p.type);

        let html = template
            .replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`)
            .replace(/<meta name="description".*?>/gi, '')   // remove default to avoid duplicates
            .replace('</head>', `${metaTags}\n</head>`);

        const cleanPath = p.path === '/' ? '' : p.path.replace(/^\//, '');
        const outDir = path.join(DIST_DIR, cleanPath);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        console.log(`  ✅  ${p.path}`);
    }

    // System files
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
    fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
    fs.writeFileSync(
        path.join(DIST_DIR, 'robots.txt'),
        `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml`,
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);

    console.log('\n  ✔  All HTML files generated with correct OG tags.\n');
}

// ============================================================================
// 🎯  ENTRY POINT
// ============================================================================
async function run() {
    console.log('='.repeat(60));
    console.log('  SETU Prerender Engine');
    console.log('='.repeat(60) + '\n');

    const pages = collectPages();
    console.log(`  Found ${pages.length} pages to process.\n`);

    await takeScreenshots(pages);
    await prerenderHTML(pages);

    console.log('='.repeat(60));
    console.log('  🎉  Done! Run: gh-pages -d dist');
    console.log('='.repeat(60));
}

run().catch(err => {
    console.error('\n🔥  Fatal error:', err.message);
    process.exit(1);
});
