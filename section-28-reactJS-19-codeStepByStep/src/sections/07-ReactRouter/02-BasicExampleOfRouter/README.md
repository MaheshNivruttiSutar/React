# Basic Example of React Router

## Quick Overview

Learn how to set up React Router from scratch with a complete working example including navigation, routes, and page components.

## What You'll Learn

- Installing react-router-dom
- Setting up BrowserRouter
- Creating page components
- Defining routes with Routes and Route
- Navigation with Link component
- Project structure best practices

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- React basics
- Component creation
- npm package management

## Quick Setup

```bash
# 1. Install
npm install react-router-dom

# 2. main.jsx - wrap with BrowserRouter
# 3. App.jsx - define Routes
# 4. Create page components
```

## Key Code

```jsx
// Navigation
<Link to="/about">About</Link>

// Routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

---

**Tip**: Keep BrowserRouter in main.jsx and routes in App.jsx for clean separation!
