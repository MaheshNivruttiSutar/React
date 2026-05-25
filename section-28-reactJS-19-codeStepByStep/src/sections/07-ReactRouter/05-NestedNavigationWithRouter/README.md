# Nested Navigation with React Router

## Quick Overview

Learn how to create hierarchical navigation where parent layouts persist while child content changes, perfect for dashboards and settings pages.

## What You'll Learn

- Nested route configuration
- Outlet component for child rendering
- Index routes for default content
- Layout components with sub-navigation
- Relative paths in nested routes
- Outlet context for data passing

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- Basic React Router setup
- Routes and Route components
- NavLink usage

## Key Concepts

```jsx
// Nested route structure
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Home />} />
  <Route path="overview" element={<Overview />} />
  <Route path="analytics" element={<Analytics />} />
</Route>

// Layout with Outlet
function DashboardLayout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />  {/* Child routes render here */}
    </div>
  );
}
```

## Features

- Parent layouts with persistent UI
- Sub-navigation for sections
- Default index routes
- Shared context between routes

---

**Tip**: The Outlet component is like `{children}` but specifically for nested routes - it renders whichever child route matches the URL!
