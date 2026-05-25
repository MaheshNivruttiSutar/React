# Route Prefixes

## What are Route Prefixes?

Route prefixes are path segments added to the beginning of routes to organize and namespace your application's URLs.

## Common Use Cases

| Prefix Type | Example | Use Case |
|------------|---------|----------|
| Locale | `/en/`, `/es/` | Internationalization |
| Version | `/v1/`, `/v2/` | API versioning |
| Section | `/admin/`, `/app/` | App sections |
| Tenant | `/acme/`, `/startup/` | Multi-tenancy |
| Subdirectory | `/my-app/` | Deployment path |

## 1. Locale Prefix (i18n)

```jsx
<Routes>
  <Route path="/:locale" element={<LocaleLayout />}>
    <Route index element={<Home />} />
    <Route path="products" element={<Products />} />
    <Route path="about" element={<About />} />
  </Route>
  
  {/* Redirect root to default locale */}
  <Route path="/" element={<Navigate to="/en" replace />} />
</Routes>
```

### LocaleLayout Component

```jsx
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de'];

function LocaleLayout() {
  const { locale } = useParams();
  const { i18n } = useTranslation();

  // Validate locale
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return <Navigate to="/en" replace />;
  }

  // Set locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <LocaleContext.Provider value={locale}>
      <Header />
      <Outlet />
      <Footer />
    </LocaleContext.Provider>
  );
}
```

### Locale-aware Links

```jsx
import { Link, useParams } from 'react-router-dom';

function LocaleLink({ to, children, ...props }) {
  const { locale } = useParams();
  return (
    <Link to={`/${locale}${to}`} {...props}>
      {children}
    </Link>
  );
}

// Usage
<LocaleLink to="/products">Products</LocaleLink>
// In /en context → /en/products
// In /es context → /es/products
```

## 2. API Version Prefix

```jsx
<Routes>
  {/* Version 1 API */}
  <Route path="/api/v1/*" element={<V1Routes />} />
  
  {/* Version 2 API */}
  <Route path="/api/v2/*" element={<V2Routes />} />
</Routes>

function V1Routes() {
  return (
    <Routes>
      <Route path="users" element={<UsersV1 />} />
      <Route path="products" element={<ProductsV1 />} />
    </Routes>
  );
}

function V2Routes() {
  return (
    <Routes>
      <Route path="users" element={<UsersV2 />} />
      <Route path="products" element={<ProductsV2 />} />
    </Routes>
  );
}
```

## 3. Using basename

The `basename` prop adds a prefix to ALL routes:

```jsx
// For deployment at https://example.com/my-app/
<BrowserRouter basename="/my-app">
  <Routes>
    <Route path="/" element={<Home />} />      {/* /my-app/       */}
    <Route path="/about" element={<About />} /> {/* /my-app/about  */}
  </Routes>
</BrowserRouter>
```

### When to Use basename

- Deploying to a subdirectory
- Running multiple apps on same domain
- GitHub Pages with project name

```jsx
// Development
<BrowserRouter>

// Production on /app subdirectory
<BrowserRouter basename="/app">
```

## 4. Admin Section Prefix

```jsx
<Routes>
  {/* Public routes */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
  </Route>

  {/* Admin routes with prefix */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="users" element={<ManageUsers />} />
    <Route path="products" element={<ManageProducts />} />
    <Route path="settings" element={<AdminSettings />} />
  </Route>
</Routes>
```

## 5. Multi-tenancy Prefix

```jsx
<Routes>
  {/* Public routes first (higher priority) */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/pricing" element={<Pricing />} />

  {/* Tenant routes (catch-all for slugs) */}
  <Route path="/:tenantSlug" element={<TenantLayout />}>
    <Route index element={<TenantDashboard />} />
    <Route path="settings" element={<Settings />} />
    <Route path="team" element={<Team />} />
    <Route path="billing" element={<Billing />} />
  </Route>
</Routes>
```

### TenantLayout with Validation

```jsx
function TenantLayout() {
  const { tenantSlug } = useParams();
  const { data: tenant, isLoading, error } = useTenant(tenantSlug);

  if (isLoading) return <LoadingSpinner />;
  if (error || !tenant) return <Navigate to="/login" replace />;

  return (
    <TenantProvider value={tenant}>
      <TenantSidebar />
      <main>
        <Outlet />
      </main>
    </TenantProvider>
  );
}
```

## Route Priority

Routes are matched in order. Place specific routes before dynamic ones:

```jsx
<Routes>
  {/* Specific routes first */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/admin/*" element={<AdminRoutes />} />
  
  {/* Dynamic routes last */}
  <Route path="/:slug" element={<DynamicPage />} />
</Routes>
```

## Creating Prefixed Route Groups

```jsx
// routes/adminRoutes.jsx
export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);

// routes/publicRoutes.jsx
export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
);

// App.jsx
import { adminRoutes, publicRoutes } from './routes';

<Routes>
  {publicRoutes}
  {adminRoutes}
</Routes>
```

## Best Practices

1. **Use basename for deployment paths** - Not for app sections
2. **Validate dynamic prefixes** - Check locale/tenant exists
3. **Order routes by specificity** - Specific before dynamic
4. **Create helper components** - LocaleLink, TenantLink
5. **Consider SEO** - Locale prefixes help search engines
