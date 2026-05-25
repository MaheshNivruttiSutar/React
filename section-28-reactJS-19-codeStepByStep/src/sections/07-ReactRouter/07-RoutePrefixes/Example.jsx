import { useState } from 'react';

export const RoutePrefixesExample = () => {
  const [currentPath, setCurrentPath] = useState('/en/products');
  const [basePath, setBasePath] = useState('/api/v1');

  // Parse current path
  const pathParts = currentPath.split('/').filter(Boolean);
  const locale = pathParts[0] || 'en';
  const section = pathParts.slice(1).join('/') || 'home';

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Route Prefixes</h2>

        {/* What are Route Prefixes */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What are Route Prefixes?</h3>
          
          <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              Route prefixes are common path segments added to the beginning of routes.
              They're used for versioning, localization, multi-tenancy, and organizing route groups.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Common Use Cases</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                <li><strong>/en/</strong>, <strong>/es/</strong> - Localization</li>
                <li><strong>/v1/</strong>, <strong>/v2/</strong> - API versioning</li>
                <li><strong>/admin/</strong> - Admin section</li>
                <li><strong>/app/</strong> - App section</li>
                <li><strong>/:tenant/</strong> - Multi-tenancy</li>
              </ul>
            </div>
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Examples</h4>
              <code style={{ display: 'block', marginBottom: '0.25rem' }}>/en/products</code>
              <code style={{ display: 'block', marginBottom: '0.25rem' }}>/es/productos</code>
              <code style={{ display: 'block', marginBottom: '0.25rem' }}>/api/v1/users</code>
              <code style={{ display: 'block', marginBottom: '0.25rem' }}>/admin/dashboard</code>
              <code style={{ display: 'block' }}>/acme-corp/settings</code>
            </div>
          </div>
        </div>

        {/* Locale Prefix Demo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>1. Locale Prefix (Internationalization)</h3>
          
          {/* Locale Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['en', 'es', 'fr', 'de'].map(lang => (
              <button
                key={lang}
                onClick={() => setCurrentPath(`/${lang}/${section}`)}
                style={{
                  padding: '0.5rem 1rem',
                  background: locale === lang ? '#667eea' : '#e0e0e0',
                  color: locale === lang ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Page Links */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['products', 'about', 'contact'].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPath(`/${locale}/${page}`)}
                style={{
                  padding: '0.5rem 1rem',
                  background: section === page ? '#28a745' : '#f5f5f5',
                  color: section === page ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {page}
              </button>
            ))}
          </div>

          {/* URL Display */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            marginBottom: '1rem',
          }}>
            myapp.com<span style={{ color: '#e91e63' }}>/{locale}</span>
            <span style={{ color: '#667eea' }}>/{section}</span>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Locale prefix routes
<Routes>
  <Route path="/:locale" element={<LocaleLayout />}>
    <Route index element={<Home />} />
    <Route path="products" element={<Products />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>

// LocaleLayout.jsx
function LocaleLayout() {
  const { locale } = useParams();
  
  return (
    <LocaleProvider locale={locale}>
      <Header />
      <Outlet />
      <Footer />
    </LocaleProvider>
  );
}`}
          </pre>
        </div>

        {/* API Versioning */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>2. API Versioning Prefix</h3>
          
          {/* Version Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['/api/v1', '/api/v2', '/api/v3'].map(version => (
              <button
                key={version}
                onClick={() => setBasePath(version)}
                style={{
                  padding: '0.5rem 1rem',
                  background: basePath === version ? '#667eea' : '#e0e0e0',
                  color: basePath === version ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {version}
              </button>
            ))}
          </div>

          {/* Endpoints */}
          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Endpoints:</h4>
            <code style={{ display: 'block', marginBottom: '0.25rem' }}>{basePath}/users</code>
            <code style={{ display: 'block', marginBottom: '0.25rem' }}>{basePath}/products</code>
            <code style={{ display: 'block' }}>{basePath}/orders</code>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// API routes with version prefix
<Routes>
  <Route path="/api/v1/*" element={<ApiV1Routes />} />
  <Route path="/api/v2/*" element={<ApiV2Routes />} />
</Routes>

// Or using basename for entire app
<BrowserRouter basename="/api/v1">
  <Routes>
    <Route path="/users" element={<Users />} />
    <Route path="/products" element={<Products />} />
  </Routes>
</BrowserRouter>`}
          </pre>
        </div>

        {/* Basename */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>3. Using basename Prop</h3>
          
          <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              The <code>basename</code> prop on BrowserRouter adds a prefix to ALL routes in your app.
              Useful when deploying to a subdirectory.
            </p>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Deploying to https://example.com/my-app/
<BrowserRouter basename="/my-app">
  <Routes>
    <Route path="/" element={<Home />} />      {/* /my-app/       */}
    <Route path="/about" element={<About />} /> {/* /my-app/about  */}
  </Routes>
</BrowserRouter>

// All Links are automatically prefixed
<Link to="/">Home</Link>       {/* href="/my-app/"      */}
<Link to="/about">About</Link>  {/* href="/my-app/about" */}`}
          </pre>
        </div>

        {/* Multi-tenancy */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>4. Multi-tenancy Prefix</h3>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Multi-tenant routes
<Routes>
  {/* Tenant-specific routes */}
  <Route path="/:tenantSlug" element={<TenantLayout />}>
    <Route index element={<TenantDashboard />} />
    <Route path="settings" element={<TenantSettings />} />
    <Route path="users" element={<TenantUsers />} />
  </Route>

  {/* Public routes (no tenant) */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>

// TenantLayout.jsx
function TenantLayout() {
  const { tenantSlug } = useParams();
  const tenant = useTenant(tenantSlug);

  if (!tenant) {
    return <Navigate to="/login" />;
  }

  return (
    <TenantContext.Provider value={tenant}>
      <TenantHeader />
      <Outlet />
    </TenantContext.Provider>
  );
}

// URLs:
// /acme-corp/           → Acme Corp Dashboard
// /acme-corp/settings   → Acme Corp Settings
// /startup-xyz/users    → Startup XYZ Users`}
          </pre>

          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Tip: Route Priority</h4>
            <p style={{ margin: 0 }}>
              Place specific routes before dynamic segments. Otherwise <code>/login</code> 
              might be caught by <code>/:tenantSlug</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePrefixesExample;
