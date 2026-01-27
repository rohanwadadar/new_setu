# Profile Setu - Frontend

A modern, responsive React application built with Vite, featuring a beautiful golden-themed UI, JWT authentication, and role-based access control.

## 🚀 Features

- **Modern React**: Built with React 18+ and Vite for fast development
- **Beautiful UI**: Golden-themed design with Tailwind CSS 4
- **Authentication**: JWT-based login/register with protected routes
- **Role-Based Access**: Different views for admin and regular users
- **Admin Dashboard**: Comprehensive user management interface
- **Responsive Design**: Mobile-first approach with smooth animations
- **Axios Integration**: Centralized API calls with interceptors

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Backend API running on `http://localhost:5000`

## 🛠️ Installation

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API endpoint
The API base URL is configured in `src/api/axios.js`. By default, it points to:
```javascript
baseURL: "http://localhost:5000"
```

Update this if your backend runs on a different port.

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary**: Golden yellow (#FBBF24 - #F59E0B)
- **Background**: Dark slate (#020617, #0F172A)
- **Accents**: Indigo and purple gradients
- **Text**: White and slate variations

### Key Design Features
- Glassmorphism effects
- Smooth gradient transitions
- Backdrop blur overlays
- Micro-animations on hover
- Premium, modern aesthetic

## 📱 Pages & Routes

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | Home | Landing page | No |
| `/about` | About | About us page | No |
| `/login` | Login | User login | No |
| `/register` | Register | User registration | No |
| `/profile` | Profile | User profile | Yes |
| `/admin` | Admin | Admin dashboard | Yes (Admin) |

## 🔐 Authentication Flow

1. **Login/Register**: User enters credentials
2. **Token Storage**: Access & refresh tokens stored in localStorage
3. **Auto-Refresh**: Axios interceptor refreshes expired tokens
4. **Protected Routes**: `ProtectedRoute` component guards authenticated pages
5. **Role Check**: Admin routes verify user role

## 🎯 Key Components

### AuthContext
Manages authentication state globally:
- `user`: Current user object
- `login()`: Authenticate user
- `logout()`: Clear session
- `isAuthenticated`: Boolean state

### ProtectedRoute
Wrapper component that:
- Checks authentication status
- Verifies user role for admin routes
- Redirects unauthorized users

### Admin Dashboard
Features:
- User list with summary info
- "View Details" modal for complete user profiles
- Beautiful modal with organized sections
- Contact and professional information display

## 📦 Dependencies

### Core
- **React**: UI library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client

### Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### UI Enhancements
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Build Tool
- **Vite (Rolldown)**: Next-generation frontend tooling

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js         # Axios configuration
│   ├── auth/
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Footer component
│   │   └── Hero.jsx         # Hero section
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state management
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── About.jsx        # About page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── Profile.jsx      # User profile
│   │   └── Admin.jsx        # Admin dashboard
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies
└── tailwind.config.js       # Tailwind configuration
```

## 🔧 Configuration Files

### `vite.config.js`
Vite configuration for development server and build settings.

### `tailwind.config.js`
Tailwind CSS customization including:
- Custom colors
- Extended spacing
- Animation utilities

### `postcss.config.js`
PostCSS plugins configuration for Tailwind processing.

## 🎭 Admin Features

### User Management
- View all registered users
- See user roles and organizations
- Click eye icon to view detailed profiles

### User Detail Modal
Displays:
- **Basic Info**: ID, Organization
- **Contact**: Email, Phone, LinkedIn
- **Professional**: Designation, Experience years

## 🐛 Troubleshooting

**Vite server won't start:**
- Delete `node_modules` and reinstall: `npm install`
- Clear Vite cache: `npm run dev -- --force`

**API calls failing:**
- Verify backend is running on port 5000
- Check CORS configuration in backend
- Inspect browser console for errors

**Tailwind styles not applying:**
- Restart dev server
- Check `tailwind.config.js` content paths
- Verify `@tailwindcss/postcss` is installed

**Authentication issues:**
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify API endpoints match backend

## 🚀 Deployment

### Build the application
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to hosting
Upload the `dist` folder to your hosting provider:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Use `gh-pages` package

### Environment Variables
For production, update the API base URL in `src/api/axios.js` to your production backend URL.

## 📝 Best Practices

- Keep components small and focused
- Use context for global state
- Implement error boundaries
- Add loading states for async operations
- Follow React hooks best practices

## 📄 License

This project is part of the Profile Setu platform.

## 👥 Support

For issues or questions, please contact the development team.
