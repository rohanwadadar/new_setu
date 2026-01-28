# 🎓 SETU - School of AI

> **Your gateway to Data Science and AI**

A modern, SEO-optimized React application for SETU School of AI, featuring self-paced courses and live workshops.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate SEO preview files
node prerender/generatePreviewHtml.js

# Deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
specificforntend/
├── src/
│   ├── config/
│   │   └── routing.jsx          # 🚀 ALL ROUTING (MasterRoutes + routeConfig)
│   ├── data/
│   │   └── appData.js            # 📊 ALL DATA (routes + courses + workshops)
│   ├── components/
│   │   ├── Layout.jsx            # Page wrapper (Navbar + Footer)
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx     # Handles ALL course pages
│   │   ├── WorkshopDetail.jsx   # Handles ALL workshop pages
│   │   ├── Roadmap.jsx
│   │   └── ForEnterprise.jsx
│   ├── App.jsx                   # Entry point
│   ├── main.jsx
│   └── index.css
├── prerender/
│   └── generatePreviewHtml.js    # SEO & social media preview generator
├── public/
│   └── previews/                 # Social media preview images
└── dist/                         # Build output (generated)
```

---

## 🎯 Key Features

### ✅ **Simplified Architecture**
- **Single data file** (`appData.js`) for all routes, courses, and workshops
- **Unified routing** (`routing.jsx`) combining all routing logic
- **Beginner-friendly** with extensive inline comments

### ✅ **SEO Optimized**
- Pre-rendered HTML for all pages
- Open Graph tags for social media
- Google Chat/Messages compatible with `itemprop` Schema.org tags
- Dynamic meta titles and descriptions
- Sitemap and robots.txt generation

### ✅ **Modern Tech Stack**
- React 19 with React Router
- Vite for fast builds
- Tailwind CSS for styling
- Framer Motion for animations

---

## 📝 Common Tasks

### **Add a New Course**

Just add to `src/data/appData.js`:

```javascript
export const selfPacedCourses = [
    // ... existing courses
    {
        id: "my-course",
        title: "My Amazing Course",
        description: "Learn amazing things"
    }
];
```

**Done!** Course is now available at `/course/my-course`

### **Add a New Workshop**

Add to `src/data/appData.js`:

```javascript
export const workshopsData = [
    // ... existing workshops
    {
        id: "my-workshop",
        title: "My Workshop",
        category: "Category",
        status: "UPCOMING",
        description: "Workshop description"
    }
];
```

**Done!** Workshop is now available at `/workshop/my-workshop`

### **Add a New Static Page**

1. Create component in `src/pages/MyPage.jsx`:
```javascript
export default function MyPage() {
    return (
        <div>
            <h1>My New Page</h1>
            <p>Content here</p>
        </div>
    );
}
```

2. Import in `src/config/routing.jsx`:
```javascript
import MyPage from "../pages/MyPage";
```

3. Add to componentMap:
```javascript
const componentMap = {
    // ... existing mappings
    "my-page": <MyPage />
};
```

4. Add route data in `src/data/appData.js`:
```javascript
{
    id: "my-page",
    path: "/my-page",
    label: "My Page",
    showInNav: true,
    title: "SETU | My Page",
    description: "Description for SEO",
    previewImage: "/previews/default.png",
    protected: false
}
```

---

## 🔧 Configuration

### **Base URL**
Update in `src/config/routing.jsx`:
```javascript
<BrowserRouter basename="/new_setu">
```

### **SEO Settings**
Update in `prerender/generatePreviewHtml.js`:
```javascript
const BASE_URL = "https://rohanwadadar.github.io/new_setu";
```

### **Social Media Previews**
- Images located in: `public/previews/`
- Recommended size: 1200x630px
- Format: PNG or JPG

---

## 🌐 Deployment

### **GitHub Pages**

1. Build the project:
```bash
npm run build
```

2. Generate preview files:
```bash
node prerender/generatePreviewHtml.js
```

3. Deploy:
```bash
npm run deploy
```

### **Custom Domain**

Update `package.json`:
```json
{
    "homepage": "https://yourdomain.com"
}
```

---

## 📊 SEO & Social Media

### **Google Chat/Messages Support**

The site includes special `itemprop` Schema.org tags for Google Chat:

```html
<meta itemprop="name" content="Page Title" />
<meta itemprop="description" content="Description" />
<meta itemprop="image" content="https://..." />
<meta itemprop="url" content="https://..." />
```

### **Open Graph Tags**

Full Open Graph support for Facebook, LinkedIn, WhatsApp:
- `og:title`, `og:description`, `og:image`
- Image dimensions (`og:image:width`, `og:image:height`)
- Secure URLs (`og:image:secure_url`)

### **Twitter Cards**

Twitter card support with `summary_large_image`:
- `twitter:card`, `twitter:title`, `twitter:description`
- `twitter:image` with alt text

### **Testing Your Previews**

- **OpenGraph.io**: https://www.opengraph.io/
- **Google Rich Results**: https://search.google.com/test/rich-results
- **Twitter Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

---

## 🎨 Customization

### **Colors**

Update in `src/index.css` or Tailwind config:
```css
/* Primary color */
--color-primary: #ffcc33;

/* Background */
--color-bg: #020617;
```

### **Layout**

Edit `src/components/Layout.jsx` to change:
- Background effects
- Navbar position
- Footer content
- Page wrapper styles

### **Navigation**

Update `showInNav` in route data (`src/data/appData.js`):
```javascript
{
    showInNav: true,  // Shows in navigation
    label: "Menu Text"
}
```

---

## 🐛 Troubleshooting

### **Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### **Pages Not Loading**
- Check route is in `src/data/appData.js`
- Verify component is imported in `src/config/routing.jsx`
- Check componentMap has the route ID

### **SEO Previews Not Showing**
- Wait 24-48 hours for cache to clear
- Use cache-busting URLs: `?v=2`
- Verify image is accessible
- Check meta tags in page source

---

## 📚 Documentation

### **Detailed Guides**
- `PROJECT_STRUCTURE.md` - Complete architecture guide
- `GOOGLE_CHAT_TESTING.md` - Social media preview testing
- Inline comments in all source files

### **Key Files**
- `src/data/appData.js` - All data with helper functions
- `src/config/routing.jsx` - Complete routing system
- `prerender/generatePreviewHtml.js` - SEO generation

---

## 🔄 Version History

### **v2.0 (Current)** - Restructured
- Unified data file (`appData.js`)
- Unified routing (`routing.jsx`)
- Simplified architecture
- Enhanced documentation

### **v1.0** - Initial
- Separate route and data files
- Multiple routing files
- Basic structure

---

## 🛠️ Tech Stack

- **Framework**: React 19.2.4
- **Router**: React Router DOM 7.12.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: Framer Motion 12.26.2
- **HTTP Client**: Axios 1.13.2
- **Deployment**: GitHub Pages (gh-pages 6.3.0)

---

## 📞 Support

### **For Developers**
- Read inline comments in source files
- Check `PROJECT_STRUCTURE.md` for detailed guides
- Review usage examples in `appData.js`

### **For Beginners**
- Start with `PROJECT_STRUCTURE.md`
- Follow the "Common Tasks" section above
- Check the Quick Reference in `routing.jsx`

---

## 📄 License

This project is private and proprietary to SETU School of AI.

---

## 🙏 Credits

Built with ❤️ for SETU School of AI

**Live Site**: https://rohanwadadar.github.io/new_setu/

---

**Last Updated**: 2026-01-28  
**Version**: 2.0  
**Status**: ✅ Production Ready
