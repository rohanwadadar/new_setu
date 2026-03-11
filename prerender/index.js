import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// ============================================================================
// 🚀 DYNAMIC API-DRIVEN PRERENDER ENGINE
// ============================================================================
// NO HARDCODED DATA: Everything is fetched from the SETU API.
// ============================================================================


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_BASE_URL || 'https://rohanwadadar.github.io/new_setu';
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE = path.join(DIST_DIR, 'index.html');

// API ENDPOINTS       setuqverse.com
const COURSE_API = process.env.VITE_COURSE_API;

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
        apiCourses.forEach(course => {
            const slug = course.course_details?.slug || course.course_uid || course.course_id;
            pages.push({
                path: `/course/${slug}`,
                title: `SETU | ${course.course_name || course.course_details?.course_title}`,
                desc: course.course_short_description || course.course_details?.course_description,
                image: course.course_details?.course_image || process.env.VITE_DEFAULT_COURSE_IMAGE,
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

    return `
    <title>${title}</title>
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${pageUrl}">

    <meta property="og:type"        content="website">
    <meta property="og:url"         content="${pageUrl}">
    <meta property="og:title"       content="${title}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image"       content="${imageUrl}">
    <meta property="og:image:width"  content="1200">
    <meta property="og:image:height" content="630">

    <meta name="twitter:card"  content="summary_large_image">
    <meta name="twitter:image" content="${imageUrl}">
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
        const pageUrl = `${BASE_URL}${p.path === '/' ? '' : p.path}`;
        const metaTags = buildMetaTags(p.title, p.desc, pageUrl, p.image);

        let html = template
            .replace(/<title>.*?<\/title>/, '')
            .replace(/<meta name="description".*?>/gi, '')
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
