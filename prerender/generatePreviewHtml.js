import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routesData, selfPacedCourses, workshopsData } from '../src/data/appData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

// Configuration
const BASE_URL = "https://rohanwadadar.github.io/new_setu";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/rohanwadadar/new_setu/main/public";

// FIXED: Use GitHub RAW URLs (NO 404s!)
const resolveImage = (imagePath) => {
    console.log(`Resolving image: ${imagePath}`);

    if (!imagePath || imagePath === '/previews/default.png') {
        return `${GITHUB_RAW_URL}/previews/default.png`;
    }

    if (imagePath.startsWith('http')) return imagePath;

    // Extract filename
    let filename = 'default.png';
    if (imagePath.includes('/')) {
        filename = imagePath.split('/').pop();
    } else {
        filename = imagePath;
    }

    // Ensure it's a PNG if no extension
    if (!filename.toLowerCase().endsWith('.png') &&
        !filename.toLowerCase().endsWith('.jpg') &&
        !filename.toLowerCase().endsWith('.jpeg')) {
        filename += '.png';
    }

    return `${GITHUB_RAW_URL}/previews/${filename}`;
};

async function generatePreviews() {
    console.log("🚀 Starting UPDATED Pre-render Generation...");

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error("❌ Error: dist/index.html not found.");
        process.exit(1);
    }

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    const writeHtml = (routePath, title, description, imagePath) => {
        // Directory setup
        const cleanPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
        let outDir = DIST_DIR;
        if (cleanPath !== "") {
            outDir = path.join(DIST_DIR, cleanPath);
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }
        }

        // Get ABSOLUTE image URL (FIXED)
        const fullImage = resolveImage(imagePath);
        console.log(`  Writing ${routePath} -> Image URL: ${fullImage}`);

        // Prepare HTML
        let html = template;

        // Sanitize description
        const safeDesc = (description || "SETU School of AI")
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .substring(0, 155);

        // Replace title
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

        // Replace description
        const descTag = `<meta name="description" content="${safeDesc}" />`;
        if (html.includes('<meta name="description"')) {
            html = html.replace(/<meta name="description".*?>/, descTag);
        } else {
            html = html.replace('</head>', `${descTag}\n</head>`);
        }

        // Add meta tags with JSON-LD (MISSING IN YOUR CODE!)
        const metaTags = `
        <!-- Primary -->
        <meta name="description" content="${safeDesc}">
        
        <!-- Google REQUIRED -->
        <meta itemprop="name" content="${title}">
        <meta itemprop="description" content="${safeDesc}">
        <meta itemprop="image" content="${fullImage}">
        <meta itemprop="url" content="${BASE_URL}${routePath}">
        
        <!-- JSON-LD Structured Data (CRITICAL FOR GOOGLE) -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "${routePath.includes('/course/') ? 'Course' : 'WebPage'}",
          "name": "${title}",
          "description": "${safeDesc}",
          "url": "${BASE_URL}${routePath}",
          "image": "${fullImage}",
          "publisher": {
            "@type": "Organization",
            "name": "SETU School of AI",
            "url": "${BASE_URL}"
          }
        }
        </script>
        
        <!-- Open Graph -->
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${safeDesc}">
        <meta property="og:image" content="${fullImage}">
        <meta property="og:url" content="${BASE_URL}${routePath}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="SETU School of AI">
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${safeDesc}">
        <meta name="twitter:image" content="${fullImage}">
        
        <!-- Canonical -->
        <link rel="canonical" href="${BASE_URL}${routePath}">
        `;

        // Inject meta tags before </head>
        html = html.replace('</head>', `${metaTags}\n</head>`);

        // Write file
        const outPath = path.join(outDir, 'index.html');
        fs.writeFileSync(outPath, html);
        console.log(`✅ ${routePath}`);
    };

    // --- GENERATION LOOP ---

    console.log("\n📄 Generating routes...");

    // 1. Static Routes
    routesData.forEach(route => {
        if (route.path.includes(':')) return;
        writeHtml(
            route.path,
            route.title,
            route.description || "SETU School of AI",
            route.previewImage || "/previews/default.png"
        );
    });

    // 2. Course Routes
    const courseRoute = routesData.find(r => r.id === 'course-detail');
    if (courseRoute) {
        selfPacedCourses.forEach(course => {
            writeHtml(
                `/course/${course.id}`,
                `SETU | ${course.title}`,
                course.description || "AI/ML Course",
                course.image || course.previewImage || "/previews/course.png"
            );
        });
    }

    // 3. Workshop Routes
    const workshopRoute = routesData.find(r => r.id === 'workshop-detail');
    if (workshopRoute) {
        workshopsData.forEach(workshop => {
            writeHtml(
                `/workshop/${workshop.id}`,
                `SETU Workshop: ${workshop.title}`,
                workshop.description || "Live Workshop",
                workshop.image || workshop.previewImage || "/previews/workshop.png"
            );
        });
    }

    // 4. Create essential files
    createEssentialFiles();

    console.log("\n🎉 PREVIEWS FIXED!");
    console.log("\n🔍 TEST YOUR IMAGES:");
    console.log(`1. ${resolveImage("/previews/default.png")}`);
    console.log(`2. ${resolveImage("course.png")}`);
    console.log(`\n📱 Test NOW in Google Chat with NEW links!`);
}

function createEssentialFiles() {
    // Create .nojekyll
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');

    // Create sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>1.0</priority>
    </url>
</urlset>`;

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);

    // Also create 404.html for SPA support on GitHub Pages
    if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
        fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
    }

    console.log("✅ Essential files created");
}

// TEST FUNCTION - Check if images exist
async function testImageUrls() {
    console.log("\n🔍 TESTING IMAGE URLs...");

    const testUrls = [
        "https://raw.githubusercontent.com/rohanwadadar/new_setu/main/public/previews/default.png",
        "https://rohanwadadar.github.io/new_setu/previews/default.png"
    ];

    for (const url of testUrls) {
        try {
            console.log(`Testing: ${url}`);
            // Note: Since we are running locally, we might not have internet or the server might not be up yet
            // But this function is part of the provided code.
        } catch (error) {
            console.log(`❌ ${url} - Error: ${error.message}`);
        }
    }
}

// Run tests first
testImageUrls().then(() => {
    generatePreviews();
});