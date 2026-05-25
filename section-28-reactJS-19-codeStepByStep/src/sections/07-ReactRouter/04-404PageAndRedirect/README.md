# 404 Page & Redirects

## Quick Overview

Learn how to handle invalid routes with 404 pages and implement redirects for URL changes, authentication, and navigation flows.

## What You'll Learn

- Setting up a catch-all 404 route
- Creating a user-friendly NotFound component
- Navigate component for declarative redirects
- useNavigate hook for programmatic navigation
- Auto-redirect with countdown
- Protected routes pattern

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Basic Routes setup
- useEffect hook
- React Router basics

## Key Patterns

```jsx
// 404 catch-all route
<Route path="*" element={<NotFound />} />

// Declarative redirect
<Navigate to="/new-path" replace />

// Programmatic navigation
const navigate = useNavigate();
navigate('/dashboard');
navigate(-1);  // go back
```

## Features Covered

- 404 page with path display
- Redirect old URLs to new URLs
- Auth-based redirects
- Auto-redirect countdown
- Preserving intended destination

---

**Tip**: Always use `replace` prop when redirecting from login pages to prevent back button issues!
