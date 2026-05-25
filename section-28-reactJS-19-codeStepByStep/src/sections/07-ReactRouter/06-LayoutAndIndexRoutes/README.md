# Layout & Index Routes

## Quick Overview

Learn how to create different layouts for different sections of your app (public, admin, auth) and use index routes for default content.

## What You'll Learn

- Multiple layout patterns
- Pathless layout routes
- Index routes for defaults
- Main, Admin, and Auth layouts
- Protected layout patterns
- CSS layout structures

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Nested routes understanding
- Outlet component
- Basic CSS layout

## Key Patterns

```jsx
// Pathless layout (wraps without affecting URL)
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
</Route>

// Index route (default child)
<Route path="/products" element={<Layout />}>
  <Route index element={<List />} />  {/* /products */}
  <Route path=":id" element={<Detail />} />
</Route>
```

## Common Layouts

- **Main Layout**: Header + Footer for public pages
- **Admin Layout**: Sidebar + Dashboard for admin
- **Auth Layout**: Minimal centered card for login/register

---

**Tip**: Use pathless layout routes at the root level to wrap all public pages with the same header/footer without adding to the URL!
