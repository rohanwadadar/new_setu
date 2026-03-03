import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routesData, selfPacedCourses, workshopsData } from '../src/data/appData.js';

// ============================================================================
// 🚀 SETU PRERENDER ENGINE (Real-time Dynamic Previews)
// ============================================================================
// This script generates static HTML entry points for every route in 'dist/'.
// It injects Open Graph meta tags that point to Microlink's Real-time 
// Screenshot API.
//
// ZERO STORAGE: No images are saved in this repository.
// REAL-TIME: Screenshots are generated on-the-fly when a link is shared.
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rohanwadadar.github.io/new_setu';
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE = path.join(DIST_DIR, 'index.html');

// standard OG Dimensions
const OG_W = 1200;
const OG_H = 630;

function collectPages() {
    const pages = [];

    // Homepage
    pages.push({
        path: '/',
        title: 'SETU | Master AI for Free',
        desc: 'Industry-led AI and Data Science courses and workshops.',
        type: 'WebSite',
    });

    // Static pages
    routesData
        .filter(r => !r.path.includes(':') && r.path !== '/')
        .forEach(r => {
            pages.push({
                path: r.path,
                title: r.title,
                desc: r.description,
                type: 'WebPage',
            });
        });

    // Course detail pages
    selfPacedCourses.forEach(c => {
        pages.push({
            path: `/course/${c.id}`,
            title: `SETU | ${c.title}`,
            desc: c.description,
            type: 'Course',
        });
    });

    // Workshop detail pages
    workshopsData.forEach(w => {
        pages.push({
            path: `/workshop/${w.id}`,
            title: `SETU | ${w.title}`,
            desc: w.description,
            type: 'Event',
        });
    });

    return pages;
}

function buildMetaTags(title, desc, pageUrl, type) {
    const safeDesc = (desc || 'SETU School of AI').replace(/"/g, '&quot;').substring(0, 160);

    // Real-time Screenshot API URL (Microlink)
    // This takes a screenshot of the LIVE page on demand without storing it anywhere.
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(pageUrl)}&screenshot=true&embed=screenshot.url&waitFor=3000&meta=false`;

    return `
    <!-- Primary SEO -->
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${pageUrl}">

    <!-- Schema.org / Google -->
    <meta itemprop="name" content="${title}">
    <meta itemprop="description" content="${safeDesc}">
    <meta itemprop="image" content="${microlinkUrl}">
    <meta itemprop="url" content="${pageUrl}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${type}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${pageUrl}" },
      "headline": "${title}",
      "description": "${safeDesc}",
      "image": { "@type": "ImageObject", "url": "${microlinkUrl}", "width": ${OG_W}, "height": ${OG_H} },
      "url": "${pageUrl}",
      "publisher": {
        "@type": "Organization",
        "name": "SETU School of AI",
        "logo": { "@type": "ImageObject", "url": "${BASE_URL}/favicon.ico" }
      }
    }
    </script>

    <!-- Open Graph — WhatsApp, Facebook, LinkedIn -->
    <meta property="og:type"              content="website">
    <meta property="og:url"               content="${pageUrl}">
    <meta property="og:title"             content="${title}">
    <meta property="og:description"       content="${safeDesc}">
    <meta property="og:image"             content="${microlinkUrl}">
    <meta property="og:image:secure_url"  content="${microlinkUrl}">
    <meta property="og:image:type"        content="image/png">
    <meta property="og:image:width"       content="${OG_W}">
    <meta property="og:image:height"      content="${OG_H}">

    <!-- Twitter / X -->
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:url"         content="${pageUrl}">
    <meta name="twitter:title"       content="${title}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image"       content="${microlinkUrl}">
    `;
}

async function prerenderHTML(pages) {
    console.log('🛠️  Generating dynamic HTML entry points…\n');

    if (!fs.existsSync(TEMPLATE)) {
        throw new Error('dist/index.html not found — run "vite build" first.');
    }

    const template = fs.readFileSync(TEMPLATE, 'utf-8');

    for (const p of pages) {
        const pageUrl = `${BASE_URL}${p.path === '/' ? '' : p.path}`;
        const metaTags = buildMetaTags(p.title, p.desc, pageUrl, p.type);

        let html = template
            .replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`)
            .replace(/<meta name="description".*?>/gi, '')
            .replace('</head>', `${metaTags}\n</head>`);

        const cleanPath = p.path === '/' ? '' : p.path.replace(/^\//, '');
        const outDir = path.join(DIST_DIR, cleanPath);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        console.log(`  ✅  ${p.path}  →  Dynamic Preview Enabled`);
    }

    // System files
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
    fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));

    console.log('\n  ✔  All routes prerendered with Real-time Microlink OG tags.\n');
}

async function run() {
    console.log('='.repeat(60));
    console.log('  SETU Real-time Prerender Engine');
    console.log('  (Zero-Storage / No Puppeteer)');
    console.log('='.repeat(60) + '\n');

    const pages = collectPages();
    await prerenderHTML(pages);

    console.log('='.repeat(60));
    console.log('  🎉  Done! Everything is dynamic.');
    console.log('='.repeat(60));
}

run().catch(err => {
    console.error('\n🔥  Fatal error:', err.message);
    process.exit(1);
});
