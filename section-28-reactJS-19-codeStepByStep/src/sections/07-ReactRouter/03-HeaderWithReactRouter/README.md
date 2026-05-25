# Header/Navbar with React Router

## Quick Overview

Build navigation headers with active link styling using NavLink, dropdowns, and mobile-responsive menus.

## What You'll Learn

- NavLink vs Link components
- Active state styling
- Dropdown menus with routing
- Mobile responsive headers
- Reusable navigation components

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- Basic React Router setup
- Link component usage
- CSS flexbox basics

## Key Concepts

```jsx
// NavLink with active styling
<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>

// Exact match for home
<NavLink to="/" end>Home</NavLink>
```

## Features Covered

- Basic header with NavLink
- Reusable CustomNavLink component
- Dropdown menus
- Mobile hamburger menu
- Sticky header positioning

---

**Tip**: Use NavLink instead of Link when you need to highlight the current page in your navigation!
