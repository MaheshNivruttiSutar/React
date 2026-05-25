# What is React Router?

## Overview

React Router is the standard routing library for React applications. It enables navigation between different views/components while keeping the UI synchronized with the URL.

## Why Do We Need Routing?

### Single Page Applications (SPAs)

React apps are SPAs - they load once and dynamically update content without full page reloads. This creates challenges:

| Without Router | With Router |
|----------------|-------------|
| URL doesn't change | URL reflects current view |
| Back button doesn't work | Full browser history support |
| Can't bookmark pages | Every view is bookmarkable |
| Can't share specific pages | Shareable URLs |
| Manual "page" state management | Declarative route configuration |

## Installation

```bash
# Using npm
npm install react-router-dom

# Using yarn
yarn add react-router-dom
```

## Core Components

### 1. BrowserRouter

Wraps your entire application and enables routing functionality.

```jsx
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app components */}
    </BrowserRouter>
  );
}
```

**Note**: Usually placed in `index.js` or `main.jsx`, wrapping `<App />`.

### 2. Routes and Route

Define which component renders for which URL path.

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

### 3. Link

Navigate between routes without page reload. Replaces `<a>` tags.

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

### 4. NavLink

Like Link, but with active state styling.

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```

## Essential Hooks

### useNavigate

Programmatic navigation (redirect after form submit, etc.).

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    navigate('/dashboard');  // Redirect after login
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### useParams

Access URL parameters from dynamic routes.

```jsx
import { useParams } from 'react-router-dom';

// Route: <Route path="/users/:id" element={<UserProfile />} />
// URL: /users/123

function UserProfile() {
  const { id } = useParams();  // id = "123"
  return <div>User ID: {id}</div>;
}
```

### useLocation

Access current location object.

```jsx
import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();
  
  console.log(location.pathname);  // "/about"
  console.log(location.search);    // "?query=react"
  console.log(location.hash);      // "#section1"
  
  return <div>Current path: {location.pathname}</div>;
}
```

### useSearchParams

Work with URL query parameters.

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');  // ?q=react
  
  return (
    <div>
      <input
        value={query || ''}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />
      <p>Searching for: {query}</p>
    </div>
  );
}
```

## Basic App Structure

```jsx
// main.jsx or index.js
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// App.jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
```

## Router Types

| Router | Use Case |
|--------|----------|
| `BrowserRouter` | Web apps with server support for all URLs |
| `HashRouter` | Static file hosting (GitHub Pages) |
| `MemoryRouter` | Testing, non-browser environments |
| `StaticRouter` | Server-side rendering |

## React Router v6 vs v5

| Feature | v5 | v6 |
|---------|----|----|
| Route rendering | `component` or `render` prop | `element` prop |
| Switch | `<Switch>` | `<Routes>` |
| Nested routes | Complex setup | Built-in with `<Outlet>` |
| Relative paths | Manual | Automatic |
| Navigation | `useHistory` | `useNavigate` |

## Summary

React Router provides:
- **Declarative routing** - Routes as components
- **URL synchronization** - URL always matches the view
- **History management** - Browser navigation works
- **Dynamic routing** - Routes with parameters
- **Nested routing** - Complex layouts made simple
- **Programmatic navigation** - Navigate via code
