import { useState } from 'react';

export const LayoutAndIndexRoutesExample = () => {
  const [currentPath, setCurrentPath] = useState('/');

  // Get layout and content based on path
  const getPageInfo = () => {
    if (currentPath === '/') return { layout: 'main', content: 'Home', isIndex: true };
    if (currentPath === '/about') return { layout: 'main', content: 'About', isIndex: false };
    if (currentPath === '/admin') return { layout: 'admin', content: 'Admin Dashboard', isIndex: true };
    if (currentPath === '/admin/users') return { layout: 'admin', content: 'Manage Users', isIndex: false };
    if (currentPath === '/admin/settings') return { layout: 'admin', content: 'Admin Settings', isIndex: false };
    if (currentPath === '/auth/login') return { layout: 'auth', content: 'Login', isIndex: false };
    if (currentPath === '/auth/register') return { layout: 'auth', content: 'Register', isIndex: false };
    return { layout: 'main', content: '404', isIndex: false };
  };

  const pageInfo = getPageInfo();

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Layout & Index Routes</h2>

        {/* Concept Overview */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Understanding Layouts</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Main Layout</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Header + Footer for public pages</p>
            </div>
            <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Admin Layout</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Sidebar + Dashboard for admin</p>
            </div>
            <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Auth Layout</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Minimal layout for login/register</p>
            </div>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Different layouts for different sections
<Routes>
  {/* Main Layout - Public pages */}
  <Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>

  {/* Admin Layout - Admin pages */}
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<ManageUsers />} />
    <Route path="settings" element={<AdminSettings />} />
  </Route>

  {/* Auth Layout - Login/Register */}
  <Route path="auth" element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
</Routes>`}
          </pre>
        </div>

        {/* Interactive Demo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo</h3>
          
          {/* Navigation */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['/', '/about', '/admin', '/admin/users', '/admin/settings', '/auth/login', '/auth/register'].map(path => (
              <button
                key={path}
                onClick={() => setCurrentPath(path)}
                style={{
                  padding: '0.5rem 1rem',
                  background: currentPath === path ? '#667eea' : '#e0e0e0',
                  color: currentPath === path ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {path}
              </button>
            ))}
          </div>

          {/* URL Bar */}
          <div style={{
            padding: '0.5rem 1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
          }}>
            localhost:3000<span style={{ color: '#667eea', fontWeight: 'bold' }}>{currentPath}</span>
            <span style={{ marginLeft: '1rem', color: '#666' }}>
              Layout: <strong>{pageInfo.layout}</strong>
              {pageInfo.isIndex && <span style={{ color: '#e65100' }}> (index route)</span>}
            </span>
          </div>

          {/* Layout Preview */}
          <div style={{ border: '2px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
            {pageInfo.layout === 'main' && (
              <MainLayoutDemo content={pageInfo.content} isIndex={pageInfo.isIndex} />
            )}
            {pageInfo.layout === 'admin' && (
              <AdminLayoutDemo content={pageInfo.content} isIndex={pageInfo.isIndex} />
            )}
            {pageInfo.layout === 'auth' && (
              <AuthLayoutDemo content={pageInfo.content} />
            )}
          </div>
        </div>

        {/* Index Routes */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Index Routes Explained</h3>
          
          <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              An <strong>index route</strong> renders when the parent route's path is matched exactly.
              It's the "default" child route, like a homepage for that section.
            </p>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`<Route path="products" element={<ProductsLayout />}>
  {/* Index route - renders at /products */}
  <Route index element={<ProductsList />} />
  
  {/* Child routes */}
  <Route path=":id" element={<ProductDetail />} />
  <Route path="new" element={<NewProduct />} />
</Route>

// /products     → ProductsLayout + ProductsList (index)
// /products/123 → ProductsLayout + ProductDetail
// /products/new → ProductsLayout + NewProduct`}
          </pre>
        </div>

        {/* Pathless Layout Route */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Pathless Layout Routes</h3>
          
          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              A route with <code>element</code> but no <code>path</code> acts as a layout wrapper
              for its children without adding to the URL.
            </p>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Pathless layout - wraps children without affecting URL
<Routes>
  {/* This layout wraps all children at root level */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Route>
</Routes>

// The MainLayout renders for:
// /         → MainLayout + Home
// /about    → MainLayout + About
// /contact  → MainLayout + Contact`}
          </pre>
        </div>

        {/* Layout Components */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Layout Component Examples</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// MainLayout.jsx
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// AdminLayout.jsx
function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

// AuthLayout.jsx
function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <Logo />
        <Outlet />
      </div>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Layout Demo Components
const MainLayoutDemo = ({ content, isIndex }) => (
  <div>
    <header style={{ background: '#667eea', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 'bold' }}>MyApp Logo</span>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </nav>
    </header>
    <main style={{ padding: '2rem', minHeight: '150px', background: '#f8f9fa' }}>
      <h2 style={{ margin: '0 0 0.5rem 0' }}>{content}</h2>
      {isIndex && <span style={{ background: '#fff3e0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>Index Route</span>}
      <p style={{ color: '#666' }}>This is the main layout with header and footer.</p>
    </main>
    <footer style={{ background: '#333', color: 'white', padding: '1rem', textAlign: 'center' }}>
      © 2024 MyApp
    </footer>
  </div>
);

const AdminLayoutDemo = ({ content, isIndex }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr' }}>
    <aside style={{ background: '#2d3748', color: 'white', padding: '1rem', minHeight: '250px' }}>
      <h4 style={{ margin: '0 0 1rem 0' }}>Admin Panel</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
        <span>📊 Dashboard</span>
        <span>👥 Users</span>
        <span>⚙️ Settings</span>
      </div>
    </aside>
    <main style={{ padding: '1.5rem', background: '#f0f0f0' }}>
      <h2 style={{ margin: '0 0 0.5rem 0' }}>{content}</h2>
      {isIndex && <span style={{ background: '#e8f5e9', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', color: '#2e7d32' }}>Index Route</span>}
      <p style={{ color: '#666' }}>Admin layout with sidebar navigation.</p>
    </main>
  </div>
);

const AuthLayoutDemo = ({ content }) => (
  <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '3rem', minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '300px', textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#667eea' }}>MyApp</h3>
      <h4 style={{ margin: '0 0 1rem 0' }}>{content}</h4>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Minimal auth layout, no header/footer.</p>
    </div>
  </div>
);

export default LayoutAndIndexRoutesExample;
