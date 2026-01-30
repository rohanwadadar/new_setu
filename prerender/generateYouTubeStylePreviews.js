// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { routesData, selfPacedCourses, workshopsData } from '../src/data/appData.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const DIST_DIR = path.resolve(__dirname, '../dist');

// // =====================
// // 🆓 100% FREE CONFIGURATION
// // =====================
// const GITHUB_USER = 'rohanwadadar';
// const REPO_NAME = 'new_setu';
// const BRANCH = 'main'; // or 'master'

// // FREE Image URLs (NO 404!) - Using GitHub Raw URLs
// const RAW_GITHUB_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH}`;
// const GITHUB_PAGES_URL = `https://${GITHUB_USER}.github.io/${REPO_NAME}`;

// // Thumbnail mapping - these exist in /public/previews/
// const THUMBNAILS = {
//     'default': 'default.png',
//     'course': 'courses.png',
//     'workshop': 'workshop.png',
//     'home': 'default.png' // Using default for home
// };

// /**
//  * 🎯 Main Generation Function
//  */
// async function generateYouTubeStylePreviews() {
//     console.log("🚀 Building YouTube-style previews (100% FREE)...\n");

//     // 1. Check if build exists
//     const templatePath = path.join(DIST_DIR, 'index.html');
//     if (!fs.existsSync(templatePath)) {
//         console.error("❌ Error: dist/index.html not found. Please run 'npm run build' first.");
//         process.exit(1);
//     }

//     const template = fs.readFileSync(templatePath, 'utf-8');

//     // 2. Generate ALL pages
//     const pages = [
//         // Homepage (special handling)
//         {
//             path: '/',
//             title: 'SETU School of AI - Master AI/ML • 100% Free',
//             description: 'Master Artificial Intelligence, Machine Learning, and Data Science with industry experts. Free courses, live workshops, hands-on projects.',
//             thumbnail: 'home',
//             type: 'WebSite'
//         },

//         // Static routes
//         ...routesData
//             .filter(route => !route.path.includes(':'))
//             .map(route => ({
//                 path: route.path,
//                 title: route.title,
//                 description: route.description || 'SETU School of AI',
//                 thumbnail: 'default',
//                 type: 'WebPage'
//             })),

//         // Course pages
//         ...selfPacedCourses.map(course => ({
//             path: `/course/${course.id}`,
//             title: `SETU Course: ${course.title}`,
//             description: course.description || `Learn ${course.title} with hands-on projects. Free AI/ML course.`,
//             thumbnail: 'course',
//             type: 'Course',
//             extraData: course
//         })),

//         // Workshop pages
//         ...workshopsData.map(workshop => ({
//             path: `/workshop/${workshop.id}`,
//             title: `SETU Workshop: ${workshop.title}`,
//             description: workshop.description || `Live ${workshop.category} workshop. Interactive session with experts.`,
//             thumbnail: 'workshop',
//             type: 'Event',
//             extraData: workshop
//         }))
//     ];

//     // 3. Generate each page
//     for (const page of pages) {
//         await generatePage(template, page);
//     }

//     // 4. Create essential FREE SEO files
//     createFreeSEOFiles(pages);

//     // 5. Create sitemap
//     createSitemap(pages);

//     console.log(`
//     ✅ YOUTUBE-STYLE PREVIEWS READY (100% FREE)

//     🔗 Test your links:
//     - Homepage: ${GITHUB_PAGES_URL}/
//     - Sample course: ${GITHUB_PAGES_URL}/course/llm/
//     - Sample workshop: ${GITHUB_PAGES_URL}/workshop/genai-app/

//     🖼️ Thumbnails (NO 404):
//     - ${getImageUrl('default.png')}
//     - ${getImageUrl('courses.png')}
//     - ${getImageUrl('workshop.png')}

//     📱 Platform Compatibility:
//     ✅ Google Chat/Android Messages
//     ✅ WhatsApp
//     ✅ Facebook
//     ✅ LinkedIn
//     ✅ Twitter/X
//     ✅ Telegram
//     ✅ Slack
//     ✅ Discord
//     ✅ iMessage
//     ✅ Google Search

//     📊 Next steps:
//     1. Deploy to GitHub Pages: npm run deploy
//     2. Test immediately on WhatsApp/Twitter/LinkedIn
//     3. Wait 24-48h for Google Chat (aggressive caching)
//     4. Verify in Google Search Console (FREE)
//     5. Submit sitemap.xml
//     `);
// }

// // =====================
// // 🎨 CORE FUNCTIONS (FREE)
// // =====================

// async function generatePage(template, page) {
//     const { path: routePath, title, description, thumbnail, type, extraData } = page;

//     // 1. Prepare directory
//     const cleanPath = routePath === '/' ? '' : routePath.replace(/^\//, '');
//     const outDir = cleanPath ? path.join(DIST_DIR, cleanPath) : DIST_DIR;
//     const indexPath = path.join(outDir, 'index.html');

//     if (!fs.existsSync(outDir)) {
//         fs.mkdirSync(outDir, { recursive: true });
//     }

//     // 2. ABSOLUTE URLs (CRITICAL for Google)
//     const pageUrl = `${GITHUB_PAGES_URL}${routePath === '/' ? '' : routePath}`;
//     const imageUrl = getImageUrl(THUMBNAILS[thumbnail] || THUMBNAILS.default);

//     // 3. Generate YouTube-style meta tags
//     const metaTags = generateYouTubeStyleMetaTags(title, description, imageUrl, pageUrl, type, extraData);

//     // 4. Inject into HTML
//     let html = template;

//     // Replace title
//     html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

//     // Remove existing meta tags to avoid duplicates
//     html = html.replace(/<meta[^>]*(name|property|itemprop)=["'](description|title|og:|twitter:|image)["'][^>]*>/gi, '');

//     // Insert new tags before </head>
//     html = html.replace('</head>', `${metaTags}\n</head>`);

//     // 5. Write file
//     fs.writeFileSync(indexPath, html);
//     console.log(`✅ ${routePath || '/'}`);
// }

// function generateYouTubeStyleMetaTags(title, description, imageUrl, pageUrl, type = 'WebPage', extraData = null) {
//     const safeDesc = description
//         .replace(/"/g, '&quot;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .substring(0, 155);

//     // 1. JSON-LD Structured Data (YouTube's secret weapon)
//     const jsonLd = generateStructuredData(title, description, imageUrl, pageUrl, type, extraData);

//     // 2. Hidden content for crawlers (like YouTube does)
//     const hiddenContent = `
//     <!-- Hidden content for Google crawler (YouTube's technique) -->
//     <div style="display:none; position:absolute; left:-9999px;" aria-hidden="true">
//         <h1>${title}</h1>
//         <img src="${imageUrl}" alt="${title}" width="1200" height="630">
//         <p>${description}</p>
//         <p>SETU School of AI - Free AI/ML Courses and Workshops</p>
//         <a href="${pageUrl}">View ${type === 'Course' ? 'Course' : type === 'Event' ? 'Workshop' : 'Page'}</a>
//     </div>
//     `;

//     // 3. Complete meta tags (ALL platforms covered)
//     return `
//     <!-- Primary Meta Tags -->
//     <meta name="description" content="${safeDesc}">
//     <meta name="keywords" content="AI, Machine Learning, Data Science, SETU, Courses, Workshops, GenAI, LLM, MLOps">
//     <meta name="author" content="SETU School of AI">
//     <meta name="robots" content="index, follow">

//     <!-- CRITICAL: Google Chat/Messages requires itemprop Schema.org tags -->
//     <meta itemprop="name" content="${title}">
//     <meta itemprop="description" content="${safeDesc}">
//     <meta itemprop="image" content="${imageUrl}">
//     <meta itemprop="url" content="${pageUrl}">

//     <!-- Open Graph (Facebook, LinkedIn, WhatsApp, Telegram, iMessage) -->
//     <meta property="og:title" content="${title}">
//     <meta property="og:description" content="${safeDesc}">
//     <meta property="og:image" content="${imageUrl}">
//     <meta property="og:image:url" content="${imageUrl}">
//     <meta property="og:image:secure_url" content="${imageUrl}">
//     <meta property="og:image:type" content="image/png">
//     <meta property="og:image:width" content="1200">
//     <meta property="og:image:height" content="630">
//     <meta property="og:image:alt" content="${title}">
//     <meta property="og:url" content="${pageUrl}">
//     <meta property="og:type" content="website">
//     <meta property="og:site_name" content="SETU School of AI">
//     <meta property="og:locale" content="en_US">

//     <!-- Twitter Card (Twitter/X) -->
//     <meta name="twitter:card" content="summary_large_image">
//     <meta name="twitter:title" content="${title}">
//     <meta name="twitter:description" content="${safeDesc}">
//     <meta name="twitter:image" content="${imageUrl}">
//     <meta name="twitter:image:alt" content="${title}">
//     <meta name="twitter:site" content="@setuschool">
//     <meta name="twitter:creator" content="@setuschool">

//     <!-- Canonical URL -->
//     <link rel="canonical" href="${pageUrl}">

//     <!-- Structured Data (JSON-LD) - Google's preferred format -->
//     ${jsonLd}

//     ${hiddenContent}
//     `;
// }

// function generateStructuredData(title, description, imageUrl, pageUrl, type, extraData) {
//     const baseData = {
//         "@context": "https://schema.org",
//         "@type": type,
//         "name": title,
//         "description": description.substring(0, 200),
//         "url": pageUrl,
//         "image": {
//             "@type": "ImageObject",
//             "url": imageUrl,
//             "width": 1200,
//             "height": 630
//         },
//         "publisher": {
//             "@type": "Organization",
//             "name": "SETU School of AI",
//             "url": GITHUB_PAGES_URL,
//             "logo": {
//                 "@type": "ImageObject",
//                 "url": getImageUrl('default.png')
//             }
//         },
//         "datePublished": new Date().toISOString().split('T')[0],
//         "inLanguage": "en-US"
//     };

//     // Add type-specific data (like YouTube does for videos)
//     if (type === 'Course' && extraData) {
//         baseData.provider = {
//             "@type": "Organization",
//             "name": "SETU School of AI"
//         };
//         baseData.offers = {
//             "@type": "Offer",
//             "price": "0",
//             "priceCurrency": "USD",
//             "availability": "https://schema.org/InStock"
//         };
//         baseData.educationalLevel = "Beginner to Advanced";
//         baseData.courseMode = "Online";
//     }

//     if (type === 'Event' && extraData) {
//         baseData.startDate = new Date().toISOString();
//         baseData.eventStatus = "https://schema.org/EventScheduled";
//         baseData.eventAttendanceMode = "https://schema.org/OnlineEventAttendanceMode";
//         baseData.location = {
//             "@type": "VirtualLocation",
//             "url": pageUrl
//         };
//         if (extraData.status === 'LIVE') {
//             baseData.eventStatus = "https://schema.org/EventScheduled";
//         } else if (extraData.status === 'CLASS FULL') {
//             baseData.eventStatus = "https://schema.org/EventScheduled";
//             baseData.maximumAttendeeCapacity = 0;
//         }
//     }

//     return `<script type="application/ld+json">${JSON.stringify(baseData, null, 2)}</script>`;
// }

// // =====================
// // 🆓 FREE UTILITIES
// // =====================

// function getImageUrl(filename) {
//     // ALWAYS use raw.githubusercontent.com - NO 404!
//     return `${RAW_GITHUB_URL}/public/previews/${filename}`;
// }

// function createFreeSEOFiles(pages) {
//     console.log('\n📄 Creating FREE SEO files...');

//     // 1. Create 404.html (SPA fallback)
//     if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
//         fs.copyFileSync(
//             path.join(DIST_DIR, 'index.html'),
//             path.join(DIST_DIR, '404.html')
//         );
//         console.log('   ✅ 404.html (SPA Fallback)');
//     }

//     // 2. .nojekyll (required for GitHub Pages)
//     fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
//     console.log('   ✅ .nojekyll');

//     // 3. _headers (for GitHub Pages - may not work, but doesn't hurt)
//     const headers = `/*
//   X-Content-Type-Options: nosniff
//   X-Frame-Options: SAMEORIGIN
//   Referrer-Policy: strict-origin-when-cross-origin
//   Cache-Control: public, max-age=0, must-revalidate

// /previews/*
//   Access-Control-Allow-Origin: *
//   Cache-Control: public, max-age=31536000, immutable

// /assets/*
//   Cache-Control: public, max-age=31536000, immutable
// `;

//     fs.writeFileSync(path.join(DIST_DIR, '_headers'), headers);
//     console.log('   ✅ _headers');

//     // 4. Robots.txt
//     const robots = `User-agent: *
// Allow: /

// Sitemap: ${GITHUB_PAGES_URL}/sitemap.xml

// # Googlebot specific
// User-agent: Googlebot
// Allow: /
// Crawl-delay: 0

// User-agent: Googlebot-Image
// Allow: /previews/
// `;

//     fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
//     console.log('   ✅ robots.txt');
// }

// function createSitemap(pages) {
//     console.log('   🗺️  Creating sitemap.xml...');

//     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
// ${pages.map(page => {
//         const imageUrl = getImageUrl(THUMBNAILS[page.thumbnail] || THUMBNAILS.default);
//         return `    <url>
//         <loc>${GITHUB_PAGES_URL}${page.path}</loc>
//         <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//         <changefreq>${page.path === '/' ? 'daily' : 'weekly'}</changefreq>
//         <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
//         <image:image>
//             <image:loc>${imageUrl}</image:loc>
//             <image:title>${page.title}</image:title>
//         </image:image>
//     </url>`;
//     }).join('\n')}
// </urlset>`;

//     fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
//     console.log('   ✅ sitemap.xml');
// }

// // =====================
// // 🚀 RUN THE GENERATOR
// // =====================

// generateYouTubeStylePreviews().catch(error => {
//     console.error('❌ Error generating previews:', error);
//     process.exit(1);
// });
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routesData, selfPacedCourses, workshopsData } from '../src/data/appData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');

// =====================
// 🆓 100% FREE CONFIGURATION
// =====================
const GITHUB_USER = 'rohanwadadar';
const REPO_NAME = 'new_setu';
const BRANCH = 'main'; // or 'master'

// FREE Image URLs (NO 404!) - Using GitHub Raw URLs
const RAW_GITHUB_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH}`;
const GITHUB_PAGES_URL = `https://${GITHUB_USER}.github.io/${REPO_NAME}`;

// Helper to extract final filename from any path
const getFilenameFromPath = (imagePath) => {
    if (!imagePath) return 'default.png';
    return imagePath.split('/').pop(); // extracts filename from path like "previews/courses.png"
};

/**
 * 🎯 Main Generation Function
 */
async function generateYouTubeStylePreviews() {
    console.log("🚀 Building YouTube-style previews with DYNAMIC IMAGES (100% FREE)...\n");

    // 1. Check if build exists
    const templatePath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(templatePath)) {
        console.error("❌ Error: dist/index.html not found. Please run 'npm run build' first.");
        process.exit(1);
    }

    const template = fs.readFileSync(templatePath, 'utf-8');

    // 2. Generate ALL pages with VALIDATED IMAGES (Fallback architecture)
    const PUBLIC_PREVIEWS_DIR = path.resolve(__dirname, '../public/previews');

    // Helper to validate valid image or return fallback
    const getValidImage = (filename, type) => {
        const filePath = path.join(PUBLIC_PREVIEWS_DIR, filename);
        if (fs.existsSync(filePath)) {
            return filename;
        }

        // Fallback logic
        if (type === 'Course') return 'courses.jpg';
        if (type === 'Event') return 'workshop.jpg'; // Workshop type is 'Event'
        return 'default.jpg';
    };

    const pages = [
        // Homepage (special handling)
        {
            path: '/',
            title: 'SETU School of AI - Master AI/ML • 100% Free',
            description: 'Master Artificial Intelligence, Machine Learning, and Data Science with industry experts. Free courses, live workshops, hands-on projects.',
            imageFile: getValidImage('default.png', 'WebSite'),
            type: 'WebSite'
        },

        // Static routes - USING route.previewImage from appData
        ...routesData
            .filter(route => !route.path.includes(':'))
            .map(route => {
                const intendedImage = getFilenameFromPath(route.previewImage);
                return {
                    path: route.path,
                    title: route.title,
                    description: route.description || 'SETU School of AI',
                    imageFile: getValidImage(intendedImage || 'default.png', 'WebPage'),
                    type: 'WebPage'
                };
            }),

        // Course pages - USING course.image or course.previewImage from appData
        ...selfPacedCourses.map(course => {
            const intendedImage = getFilenameFromPath(course.image || course.previewImage);
            return {
                path: `/course/${course.id}`,
                title: `SETU Course: ${course.title}`,
                description: course.description || `Learn ${course.title} with hands-on projects. Free AI/ML course.`,
                imageFile: getValidImage(intendedImage, 'Course'),
                type: 'Course',
                extraData: course
            };
        }),

        // Workshop pages - USING workshop.image or workshop.previewImage from appData
        ...workshopsData.map(workshop => {
            const intendedImage = getFilenameFromPath(workshop.image || workshop.previewImage);
            return {
                path: `/workshop/${workshop.id}`,
                title: `SETU Workshop: ${workshop.title}`,
                description: workshop.description || `Live ${workshop.category} workshop. Interactive session with experts.`,
                imageFile: getValidImage(intendedImage, 'Event'),
                type: 'Event',
                extraData: workshop
            };
        })
    ];

    // 3. Generate each page
    for (const page of pages) {
        await generatePage(template, page);
    }

    // 4. Create essential FREE SEO files
    createFreeSEOFiles(pages);

    // 5. Create sitemap with specific images
    createSitemap(pages);

    console.log(`
    ✅ YOUTUBE-STYLE PREVIEWS READY (100% FREE + DYNAMIC IMAGES)
    
    🔗 Test your links:
    - Homepage: ${GITHUB_PAGES_URL}/
    - Sample course: ${GITHUB_PAGES_URL}/course/llm/
    - Sample workshop: ${GITHUB_PAGES_URL}/workshop/genai-app/
    
    🖼️ Images being used per page:
    - Routes use: route.previewImage from appData
    - Courses use: course.image → courses.png
    - Workshops use: workshop.image → workshop.png
    
    📱 Platform Compatibility:
    ✅ Google Chat/Android Messages
    ✅ WhatsApp
    ✅ Facebook
    ✅ LinkedIn
    ✅ Twitter/X
    ✅ Telegram
    ✅ Slack
    ✅ Discord
    ✅ iMessage
    ✅ Google Search
    
    📊 Next steps:
    1. Deploy to GitHub Pages: npm run deploy
    2. Test immediately on WhatsApp/Twitter/LinkedIn
    3. Wait 24-48h for Google Chat (aggressive caching)
    4. Verify in Google Search Console (FREE)
    5. Submit sitemap.xml
    `);
}

// =====================
// 🎨 CORE FUNCTIONS (FREE)
// =====================

async function generatePage(template, page) {
    const { path: routePath, title, description, imageFile, type, extraData } = page;

    // 1. Prepare directory
    const cleanPath = routePath === '/' ? '' : routePath.replace(/^\//, '');
    const outDir = cleanPath ? path.join(DIST_DIR, cleanPath) : DIST_DIR;
    const indexPath = path.join(outDir, 'index.html');

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // 2. ABSOLUTE URLs (CRITICAL for Google)
    const pageUrl = `${GITHUB_PAGES_URL}${routePath === '/' ? '' : routePath}`;

    // CHANGE: Use Production URL (GitHub Pages) instead of Raw GitHub
    // Files in /public/previews/ at build time move to /previews/ in dist
    // Added ?v=3 to force cache refresh on WhatsApp
    const imageUrl = `${GITHUB_PAGES_URL}/previews/${imageFile}?v=3`;

    // 3. Generate YouTube-style meta tags with SPECIFIC image
    const metaTags = generateYouTubeStyleMetaTags(title, description, imageUrl, pageUrl, type, extraData);

    // 4. Inject into HTML
    let html = template;

    // Replace title
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

    // Remove existing meta tags to avoid duplicates
    html = html.replace(/<meta[^>]*(name|property|itemprop)=["'](description|title|og:|twitter:|image)["'][^>]*>/gi, '');

    // Insert new tags before </head>
    html = html.replace('</head>', `${metaTags}\n</head>`);

    // 5. Write file
    fs.writeFileSync(indexPath, html);

    // Log which image is being used
    console.log(`✅ ${routePath || '/'} → ${imageFile}`);
}

function generateYouTubeStyleMetaTags(title, description, imageUrl, pageUrl, type = 'WebPage', extraData = null) {
    const safeDesc = description
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .substring(0, 155);

    // 1. JSON-LD Structured Data (YouTube's secret weapon)
    const jsonLd = generateStructuredData(title, description, imageUrl, pageUrl, type, extraData);

    // 2. Hidden content for crawlers (like YouTube does)
    const hiddenContent = `
    <!-- Hidden content for Google crawler (YouTube's technique) -->
    <div style="display:none; position:absolute; left:-9999px;" aria-hidden="true">
        <h1>${title}</h1>
        <img src="${imageUrl}" alt="${title}" width="1200" height="630">
        <p>${description}</p>
        <p>SETU School of AI - Free AI/ML Courses and Workshops</p>
        <a href="${pageUrl}">View ${type === 'Course' ? 'Course' : type === 'Event' ? 'Workshop' : 'Page'}</a>
    </div>
    `;

    // 3. Complete meta tags (ALL platforms covered)
    return `
    <!-- Primary Meta Tags -->
    <meta name="description" content="${safeDesc}">
    <meta name="keywords" content="AI, Machine Learning, Data Science, SETU, Courses, Workshops, GenAI, LLM, MLOps">
    <meta name="author" content="SETU School of AI">
    <meta name="robots" content="index, follow">
    
    <!-- CRITICAL: Google Chat/Messages requires itemprop Schema.org tags -->
    <meta itemprop="name" content="${title}">
    <meta itemprop="description" content="${safeDesc}">
    <meta itemprop="image" content="${imageUrl}">
    <meta itemprop="url" content="${pageUrl}">
    
    <!-- Open Graph (Facebook, LinkedIn, WhatsApp, Telegram, iMessage) -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:url" content="${imageUrl}">
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${title}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="SETU School of AI">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card (Twitter/X) -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="${title}">
    <meta name="twitter:site" content="@setuschool">
    <meta name="twitter:creator" content="@setuschool">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">
    
    <!-- Structured Data (JSON-LD) - Google's preferred format -->
    ${jsonLd}
    
    ${hiddenContent}
    `;
}

function generateStructuredData(title, description, imageUrl, pageUrl, type, extraData) {
    const baseData = {
        "@context": "https://schema.org",
        "@type": type,
        "name": title,
        "description": description.substring(0, 200),
        "url": pageUrl,
        "image": {
            "@type": "ImageObject",
            "url": imageUrl,
            "width": 1200,
            "height": 630
        },
        "publisher": {
            "@type": "Organization",
            "name": "SETU School of AI",
            "url": GITHUB_PAGES_URL,
            "logo": {
                "@type": "ImageObject",
                "url": `${RAW_GITHUB_URL}/public/previews/default.png`
            }
        },
        "datePublished": new Date().toISOString().split('T')[0],
        "inLanguage": "en-US"
    };

    // Add type-specific data (like YouTube does for videos)
    if (type === 'Course' && extraData) {
        baseData.provider = {
            "@type": "Organization",
            "name": "SETU School of AI"
        };
        baseData.offers = {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        };
        baseData.educationalLevel = "Beginner to Advanced";
        baseData.courseMode = "Online";
    }

    if (type === 'Event' && extraData) {
        baseData.startDate = new Date().toISOString();
        baseData.eventStatus = "https://schema.org/EventScheduled";
        baseData.eventAttendanceMode = "https://schema.org/OnlineEventAttendanceMode";
        baseData.location = {
            "@type": "VirtualLocation",
            "url": pageUrl
        };
        if (extraData.status === 'LIVE') {
            baseData.eventStatus = "https://schema.org/EventScheduled";
        } else if (extraData.status === 'CLASS FULL') {
            baseData.eventStatus = "https://schema.org/EventScheduled";
            baseData.maximumAttendeeCapacity = 0;
        }
    }

    return `<script type="application/ld+json">${JSON.stringify(baseData, null, 2)}</script>`;
}

// =====================
// 🆓 FREE UTILITIES
// =====================

function createFreeSEOFiles(pages) {
    console.log('\n📄 Creating FREE SEO files...');

    // 1. Create 404.html (SPA fallback)
    if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
        fs.copyFileSync(
            path.join(DIST_DIR, 'index.html'),
            path.join(DIST_DIR, '404.html')
        );
        console.log('   ✅ 404.html (SPA Fallback)');
    }

    // 2. .nojekyll (required for GitHub Pages)
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
    console.log('   ✅ .nojekyll');

    // 3. _headers (for GitHub Pages - may not work, but doesn't hurt)
    const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

/previews/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

    fs.writeFileSync(path.join(DIST_DIR, '_headers'), headers);
    console.log('   ✅ _headers');

    // 4. Robots.txt
    const robots = `User-agent: *
Allow: /

Sitemap: ${GITHUB_PAGES_URL}/sitemap.xml

# Googlebot specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Googlebot-Image
Allow: /previews/
`;

    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
    console.log('   ✅ robots.txt');
}

function createSitemap(pages) {
    console.log('   🗺️  Creating sitemap.xml...');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => {
        // EQUALLY CRITICAL: Use Production URL for sitemap images too
        const imageUrl = `${GITHUB_PAGES_URL}/previews/${page.imageFile}?v=3`;
        return `    <url>
        <loc>${GITHUB_PAGES_URL}${page.path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${page.path === '/' ? 'daily' : 'weekly'}</changefreq>
        <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
        <image:image>
            <image:loc>${imageUrl}</image:loc>
            <image:title>${page.title}</image:title>
        </image:image>
    </url>`;
    }).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log('   ✅ sitemap.xml');
}

// =====================
// 🚀 RUN THE GENERATOR
// =====================

generateYouTubeStylePreviews().catch(error => {
    console.error('❌ Error generating previews:', error);
    process.exit(1);
});