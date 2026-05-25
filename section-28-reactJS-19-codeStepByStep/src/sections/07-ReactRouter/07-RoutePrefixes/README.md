# Route Prefixes

## Quick Overview

Route prefixes are path segments added to organize URLs for localization, versioning, multi-tenancy, and app sections.

## What You'll Learn

- Locale prefixes for i18n
- API versioning with prefixes
- basename prop for deployment
- Admin section prefixes
- Multi-tenancy routing
- Route priority rules

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Dynamic route parameters
- Nested routes
- useParams hook

## Key Patterns

```jsx
// Locale prefix
<Route path="/:locale" element={<Layout />}>
  <Route path="products" element={<Products />} />
</Route>

// basename for deployment
<BrowserRouter basename="/my-app">

// Multi-tenancy
<Route path="/:tenantSlug" element={<TenantLayout />}>
```

## Common Prefixes

- `/en/`, `/es/` - Localization
- `/v1/`, `/v2/` - API versions
- `/admin/` - Admin section
- `/:tenant/` - Multi-tenancy

---

**Tip**: Always place specific routes before dynamic ones to prevent `/login` from being caught by `/:tenantSlug`!
