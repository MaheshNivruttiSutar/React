# What is React Router?

## Quick Overview

React Router is the standard routing library for React. It enables client-side navigation between views while keeping URLs synchronized with the UI.

## What You'll Learn

- Why SPAs need routing
- Core React Router components
- Essential routing hooks
- Basic setup and configuration
- Router types and when to use them

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Basic React components
- Props and state
- npm package installation

## Key Components

```jsx
// Wrap app with BrowserRouter
<BrowserRouter>
  <App />
</BrowserRouter>

// Define routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>

// Navigation links
<Link to="/about">About</Link>
```

## Key Hooks

- `useNavigate()` - Programmatic navigation
- `useParams()` - URL parameters
- `useLocation()` - Current location info
- `useSearchParams()` - Query string parameters

---

**Tip**: Always wrap your app with BrowserRouter at the top level, typically in main.jsx or index.js!
