import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routesData } from '../src/routesData.js';
import { selfPacedCourses, workshopsData } from '../src/data/courses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

// Configuration - Absolute URLs for Google Chat compatibility
const BASE_URL = "https://rohanwadadar.github.io/new_setu";
const BASE_PATH = "/new_setu"; // For images


async function generatePreviews() {
    console.log("🚀 Starting Pre-render Generation...");

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error("❌ Error: dist/index.html not found. Please run 'npm run build' first.");
        process.exit(1);
    }

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // Helper to write HTML file
    const writeHtml = (routePath, title, description, image) => {
        // 1. Prepare Directory
        const cleanPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
        let outDir = DIST_DIR;
        let fileName = 'index.html';

        if (cleanPath !== "") {
            outDir = path.join(DIST_DIR, cleanPath);
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }
        }

        // 2. Inject Meta Tags
        let html = template;

        // Ensure image has full path if it's relative
        const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

        // Replace Title
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

        // Replace Description (if exists, else append)
        const descTag = `<meta name="description" content="${description}" />`;
        if (html.includes('<meta name="description"')) {
            html = html.replace(/<meta name="description".*?>/, descTag);
        } else {
            html = html.replace('</head>', `${descTag}\n</head>`);
        }

        // Sanitize description for meta tags
        const safeDesc = description
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .substring(0, 155);

        // Add Complete Meta Tags (Google Chat + Open Graph + Twitter)
        const ogTags = `
        <!-- CRITICAL: Google Chat/Messages requires itemprop Schema.org tags -->
        <meta itemprop="name" content="${title}" />
        <meta itemprop="description" content="${safeDesc}" />
        <meta itemprop="image" content="${fullImage}" />
        <meta itemprop="url" content="${BASE_URL}${routePath}" />
        
        <!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${safeDesc}" />
        <meta property="og:image" content="${fullImage}" />
        <meta property="og:image:url" content="${fullImage}" />
        <meta property="og:image:secure_url" content="${fullImage}" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="${title}" />
        <meta property="og:url" content="${BASE_URL}${routePath}" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SETU School of AI" />
        <meta property="og:locale" content="en_US" />
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${safeDesc}" />
        <meta name="twitter:image" content="${fullImage}" />
        <meta name="twitter:image:alt" content="${title}" />
        
        <!-- Additional SEO -->
        <meta name="keywords" content="AI, Machine Learning, Data Science, SETU, Courses, Workshops" />
        <meta name="author" content="SETU School of AI" />
        <link rel="canonical" href="${BASE_URL}${routePath}" />
        `;

        // Inject before </head>
        html = html.replace('</head>', `${ogTags}\n</head>`);

        // 3. Write index.html in the folder
        const outPath = path.join(outDir, fileName);
        fs.writeFileSync(outPath, html);
        console.log(`✅ Generated: ${routePath} -> ${outPath}`);
    };

    // --- GENERATION LOOP ---

    // 1. Static Routes
    routesData.forEach(route => {
        if (route.path.includes(':')) return; // Skip dynamic routes here

        writeHtml(
            route.path,
            route.title,
            route.description || "SETU School of AI",
            "/previews/default.png" // FORCED AS REQUESTED
        );
    });

    // 2. Dynamic Course Routes (/course/:courseId)
    const courseRoute = routesData.find(r => r.id === 'course-detail');
    if (courseRoute) {
        selfPacedCourses.forEach(course => {
            const path = `/course/${course.id}`;
            const title = `SETU | ${course.title}`;
            const desc = course.description || courseRoute.description || "Detailed course curriculum and outcomes.";
            const image = "/previews/default.png"; // FORCED AS REQUESTED

            writeHtml(path, title, desc, image);
        });
    }

    // 3. Dynamic Workshop Routes (/workshop/:workshopId)
    const workshopRoute = routesData.find(r => r.id === 'workshop-detail');
    if (workshopRoute) {
        workshopsData.forEach(workshop => {
            const path = `/workshop/${workshop.id}`;
            const title = `SETU | Workshop: ${workshop.title}`;
            const desc = workshop.description || `Join our ${workshop.category} Live Workshop on ${workshop.title}. Status: ${workshop.status}.`;
            const image = "/previews/default.png"; // FORCED AS REQUESTED

            writeHtml(path, title, desc, image);
        });
    }

    // 4. Create 404.html (Copy of root index.html)
    // This ensures that unknown routes are handled by React instead of GitHub's 404
    if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
        fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
        console.log("✅ Generated: 404.html (SPA Fallback)");
    }

    // 5. Create .nojekyll
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
    console.log("✅ Generated: .nojekyll");

    // 6. Create _headers file for proper Content-Type (helps Google Chat)
    const headersContent = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  
/previews/*
  Cache-Control: public, max-age=31536000, immutable
  
/*.html
  Cache-Control: public, max-age=0, must-revalidate
`;
    fs.writeFileSync(path.join(DIST_DIR, '_headers'), headersContent);
    console.log("✅ Generated: _headers");

    // 7. Create robots.txt for SEO
    const robotsContent = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsContent);
    console.log("✅ Generated: robots.txt");

    console.log("🎉 Pre-rendering complete!");
    console.log("\n📱 Google Chat Preview Tips:");
    console.log("- Wait 24-48 hours for Google's cache to update");
    console.log("- Test with: https://cards-dev.twitter.com/validator");
    console.log("- Clear Google Chat cache if needed");
}

generatePreviews();
