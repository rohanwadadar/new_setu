# 📦 Customer Handover: Dynamic SEO Prerender Engine

This project uses a custom-built **Prerender Engine** to ensure that dynamic course pages have rich social media previews (WhatsApp, Google Chat, LinkedIn, etc.) and are indexable by search engines.

---

## 🚀 Key Feature: Prerender Engine

The prerender engine is a Node.js script that runs at build time. It:
1.  Fetches all live courses from your backend API.
2.  Generates a physical `index.html` file for every single course.
3.  Injects the correct Meta Tags (Open Graph, Twitter Cards) directly into the HTML so that bots can see them.

### 📂 File Location
The engine and its detailed documentation are located in:  
`[prerender/index.js](file:///c:/Users/Admin/Desktop/setu%20all/profile_setu/specificforntend/prerender/index.js)`

---

## 🛠️ How to Handover to a New Developer

To give this to a new developer, they only need to follow the **Standalone Prerender Guide**:

### 👉 [View Prerender Integration Guide (README.md)](file:///c:/Users/Admin/Desktop/setu%20all/profile_setu/specificforntend/prerender/README.md)

---

## ⚙️ Quick Start for New Devs

1.  **Copy the `prerender/` folder** to the new project.
2.  **Configure `.env`**: Set `VITE_BASE_URL` to their new Home URL.
3.  **Update `package.json`**: Add the build hook:
    `"build": "vite build && node prerender/index.js"`
4.  **Install Deps**: `npm install axios dotenv`

---

## ✅ Platform Support (Google Chat, etc.)

The engine has been optimized with enhanced Open Graph tags to work across:
- **Google Chat (G-Chat)**
- **WhatsApp**
- **LinkedIn / Facebook**
- **Twitter (X)**

The meta tags include `og:site_name`, `og:image`, and canonical links to ensure previews appear instantly.
