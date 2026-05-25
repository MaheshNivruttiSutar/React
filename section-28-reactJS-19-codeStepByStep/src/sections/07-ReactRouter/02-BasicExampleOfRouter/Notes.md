# Basic Example of React Router

## Step-by-Step Setup

### Step 1: Install React Router

```bash
npm install react-router-dom
```

### Step 2: Setup BrowserRouter

Wrap your entire application with `BrowserRouter` in your entry file:

```jsx
// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### Step 3: Create Page Components

```jsx
// pages/Home.jsx
function Home() {
  return (
    <div className="page">
      <h1>Welcome to Our Website</h1>
      <p>This is the home page of our application.</p>
    </div>
  );
}
export default Home;

// pages/About.jsx
function About() {
  return (
    <div className="page">
      <h1>About Us</h1>
      <p>We are a company dedicated to excellence.</p>
    </div>
  );
}
export default About;

// pages/Services.jsx
function Services() {
  return (
    <div className="page">
      <h1>Our Services</h1>
      <ul>
        <li>Web Development</li>
        <li>Mobile Apps</li>
        <li>Consulting</li>
      </ul>
    </div>
  );
}
export default Services;

// pages/Contact.jsx
function Contact() {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>Email: contact@example.com</p>
      <p>Phone: (123) 456-7890</p>
    </div>
  );
}
export default Contact;
```

### Step 4: Setup Routes in App.jsx

```jsx
// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* Route Definitions */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
```

## Understanding the Components

### BrowserRouter

- Wraps the entire application
- Provides routing context to all components
- Uses HTML5 History API for clean URLs
- Should only be used once, at the top level

### Routes

- Container for all Route components
- Only renders the first matching route
- Replaces the old `Switch` component from v5

### Route

- Defines a single route
- `path` - URL path to match
- `element` - Component to render when path matches

```jsx
<Route path="/about" element={<About />} />
```

### Link

- Creates navigation links
- Prevents full page reload (SPA behavior)
- `to` prop specifies the destination path

```jsx
<Link to="/about">Go to About</Link>
```

## Project Structure

```
my-react-app/
├── public/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## Basic CSS for Navigation

```css
/* App.css */
.app {
  min-height: 100vh;
}

.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: #667eea;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.content {
  padding: 2rem;
}

.page {
  max-width: 800px;
  margin: 0 auto;
}
```

## Common Patterns

### Exact Path Matching

In React Router v6, all paths are exact by default. In v5, you needed:

```jsx
// v5 (old)
<Route exact path="/" component={Home} />

// v6 (current) - exact by default
<Route path="/" element={<Home />} />
```

### Catch-All Route (404)

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />  {/* Catches all unmatched */}
</Routes>
```

### Active Link Styling

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  About
</NavLink>
```

## Summary

1. Install: `npm install react-router-dom`
2. Wrap app with `<BrowserRouter>`
3. Create page components
4. Define routes with `<Routes>` and `<Route>`
5. Use `<Link>` for navigation
