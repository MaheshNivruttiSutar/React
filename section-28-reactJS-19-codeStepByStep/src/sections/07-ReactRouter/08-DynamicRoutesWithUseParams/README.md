# Dynamic Routes with useParams

## Quick Overview

Dynamic routes use URL parameters (`:id`, `:slug`) to render different content. The `useParams` hook extracts these values for use in your components.

## What You'll Learn

- Defining dynamic route parameters
- useParams hook usage
- Multiple and optional parameters
- Catch-all routes with splat (*)
- Query parameters with useSearchParams
- Data fetching patterns with params

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- Basic Routes setup
- useEffect hook
- Data fetching concepts

## Key Concepts

```jsx
// Define dynamic route
<Route path="/products/:id" element={<ProductDetail />} />

// Access parameters
const { id } = useParams();

// Multiple params
<Route path="/blog/:year/:month/:slug" element={<Post />} />
const { year, month, slug } = useParams();

// Query params
const [searchParams, setSearchParams] = useSearchParams();
const page = searchParams.get('page');
```

## Param Types

- **`:id`** - Required parameter
- **`:id?`** - Optional parameter
- **`*`** - Catch-all (splat)

---

**Tip**: Always handle the case when a dynamic resource isn't found - show a 404 or redirect to a list page!
