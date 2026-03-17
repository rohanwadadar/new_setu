import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// ============================================================================
// 🚀 DYNAMIC API-DRIVEN PRERENDER ENGINE (PRODUCTION VERSION)
// ============================================================================
// NO HARDCODED DATA: Everything is fetched from the SETU API.
// ============================================================================


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_BASE_URL || 'https://setuqverse.com';
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE = path.join(DIST_DIR, 'index.html');

// API & ROUTE CONFIG
const COURSE_API = process.env.VITE_COURSE_API;
const COURSE_ROUTE_PREFIX = process.env.VITE_COURSE_ROUTE_PREFIX || '/dap-course'; // e.g. /dap-course or /courses

/**
 * Main Data Collector
 */
async function collectAllPages() {
    const pages = [];

    try {
        console.log('📡 Fetching all data from API...');

        // 1. Fetch Courses
        const courseRes = await axios.get(COURSE_API);
        const apiCourses = courseRes.data?.courses || [];

        // 2. Map Dynamic Courses
        // Cache-buster: forces social platforms (WhatsApp, LinkedIn etc.) to re-fetch new images
        const cacheBuster = `v=${Date.now()}`;

        apiCourses.forEach(course => {
            const uid = course.course_uid || course.course_details?.course_uid || '';
            const title = course.course_details?.course_title || course.course_name || '';
            // Convert title to slug e.g. "Vibe Coding: Build" → "Vibe_Coding:_Build"
            const slug = course.course_details?.slug || title.replace(/\s+/g, '_') || uid;

            // Raw image URL from backend
            const rawImage = course.course_details?.course_image || process.env.VITE_DEFAULT_COURSE_IMAGE;
            // Append cache-buster so social preview refreshes when image changes
            const imageWithBust = rawImage.includes('?')
                ? `${rawImage}&${cacheBuster}`
                : `${rawImage}?${cacheBuster}`;

            pages.push({
                path: `${COURSE_ROUTE_PREFIX}/${uid}/${slug}`,
                title: `SETU | ${title}`,
                desc: course.course_short_description || course.course_details?.course_description,
                image: imageWithBust,
                type: 'Course'
            });
        });

        // 3. Homepage Metadata (Static)
        // Since site config API is deprecated/invalid, we use the default fallback.
        let homepageInfo = {
            path: '/',
            title: 'SETU | Empowering AI Innovation',
            desc: 'Your gateway to Data Science and AI mastery.',
            image: process.env.VITE_DEFAULT_COURSE_IMAGE
        };

        pages.push(homepageInfo);

    } catch (error) {
        console.error('❌ Critical Error in data collection:', error.message);
    }

    return pages;
}

/**
 * Meta Tag Builder
 */
function buildMetaTags(title, desc, pageUrl, imageUrl) {
    const safeDesc = (desc || 'SETU School of AI').replace(/"/g, '&quot;').substring(0, 160);
    const siteName = "SETU School of AI";

    return `
    <title>${title}</title>
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${pageUrl}">

    <!-- Open Graph / Facebook / Google Chat -->
    <meta property="og:type"        content="website">
    <meta property="og:url"         content="${pageUrl}">
    <meta property="og:title"       content="${title}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image"       content="${imageUrl}">
    <meta property="og:site_name"   content="${siteName}">
    <meta property="og:image:width"  content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter / X -->
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:url"         content="${pageUrl}">
    <meta name="twitter:title"       content="${title}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image"       content="${imageUrl}">
    `;
}

/**
 * Prerender Loop
 */
async function generatePages(pages) {
    if (!fs.existsSync(TEMPLATE)) {
        throw new Error('dist/index.html not found — run "npm run build" first.');
    }

    const template = fs.readFileSync(TEMPLATE, 'utf-8');

    for (const p of pages) {
        // Clean URL joining
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const pageUrl = `${cleanBaseUrl}${p.path === '/' ? '' : p.path}`;

        const metaTags = buildMetaTags(p.title, p.desc, pageUrl, p.image);

        // PRODUCTION FIX: Cleans the template before injecting new tags
        let html = template
            .replace(/<title>.*?<\/title>/gi, '')         // Remove old title
            .replace(/<meta name="description".*?>/gi, '') // Remove old description
            .replace(/<link rel="canonical".*?>/gi, '')    // Remove old canonical
            .replace(/<meta property="og:.*?".*?>/gi, '')     // Remove ALL old Open Graph tags
            .replace(/<meta name="twitter:.*?".*?>/gi, '')  // Remove ALL old Twitter tags
            .replace('</head>', `${metaTags}\n</head>`);

        const cleanPath = p.path === '/' ? '' : p.path.replace(/^\//, '');
        const outDir = path.join(DIST_DIR, cleanPath);

        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        console.log(`✅ ${p.path}`);
    }

    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
    fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
}

async function run() {
    const pages = await collectAllPages();
    if (pages.length === 0) throw new Error('No pages were collected!');
    await generatePages(pages);
    console.log('\n🚀 Dynamic Prerendering Complete!');
}

run().catch(err => {
    console.error('🔥 Fatal Error:', err.message);
    process.exit(1);
});
