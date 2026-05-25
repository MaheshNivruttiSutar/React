import { useState } from 'react';

export const NestedNavigationExample = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  // Simulate nested route structure
  const getContent = () => {
    if (currentPath === '/dashboard') return { main: 'Dashboard', sub: null };
    if (currentPath === '/dashboard/overview') return { main: 'Dashboard', sub: 'Overview' };
    if (currentPath === '/dashboard/analytics') return { main: 'Dashboard', sub: 'Analytics' };
    if (currentPath === '/dashboard/reports') return { main: 'Dashboard', sub: 'Reports' };
    if (currentPath === '/settings') return { main: 'Settings', sub: null };
    if (currentPath === '/settings/profile') return { main: 'Settings', sub: 'Profile' };
    if (currentPath === '/settings/security') return { main: 'Settings', sub: 'Security' };
    if (currentPath === '/settings/notifications') return { main: 'Settings', sub: 'Notifications' };
    return { main: 'Unknown', sub: null };
  };

  const content = getContent();

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Nested Navigation with React Router</h2>

        {/* Concept Explanation */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is Nested Routing?</h3>
          
          <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              Nested routes allow you to render child components inside parent components based on the URL.
              This is perfect for layouts like dashboards, settings pages, or any UI with sub-navigation.
            </p>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Route Structure
/dashboard              → Dashboard Layout
/dashboard/overview     → Dashboard Layout + Overview
/dashboard/analytics    → Dashboard Layout + Analytics
/dashboard/reports      → Dashboard Layout + Reports

/settings               → Settings Layout  
/settings/profile       → Settings Layout + Profile
/settings/security      → Settings Layout + Security`}
          </pre>
        </div>

        {/* Interactive Demo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo</h3>
          
          {/* URL Bar */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}>
            localhost:3000<span style={{ color: '#667eea', fontWeight: 'bold' }}>{currentPath}</span>
          </div>

          {/* Main Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', minHeight: '400px' }}>
            
            {/* Main Sidebar */}
            <div style={{ background: '#667eea', borderRadius: '8px', padding: '1rem' }}>
              <h4 style={{ color: 'white', margin: '0 0 1rem 0' }}>Main Menu</h4>
              
              <button
                onClick={() => setCurrentPath('/dashboard')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  background: currentPath.startsWith('/dashboard') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                📊 Dashboard
              </button>
              
              <button
                onClick={() => setCurrentPath('/settings')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  background: currentPath.startsWith('/settings') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                ⚙️ Settings
              </button>
            </div>

            {/* Content Area with Sub-navigation */}
            <div style={{ background: '#f8f9fa', borderRadius: '8px', overflow: 'hidden' }}>
              
              {/* Sub Navigation */}
              <div style={{ background: '#e9ecef', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                {currentPath.startsWith('/dashboard') && (
                  <>
                    <SubNavButton path="/dashboard/overview" current={currentPath} onClick={setCurrentPath}>Overview</SubNavButton>
                    <SubNavButton path="/dashboard/analytics" current={currentPath} onClick={setCurrentPath}>Analytics</SubNavButton>
                    <SubNavButton path="/dashboard/reports" current={currentPath} onClick={setCurrentPath}>Reports</SubNavButton>
                  </>
                )}
                {currentPath.startsWith('/settings') && (
                  <>
                    <SubNavButton path="/settings/profile" current={currentPath} onClick={setCurrentPath}>Profile</SubNavButton>
                    <SubNavButton path="/settings/security" current={currentPath} onClick={setCurrentPath}>Security</SubNavButton>
                    <SubNavButton path="/settings/notifications" current={currentPath} onClick={setCurrentPath}>Notifications</SubNavButton>
                  </>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{content.main}</h3>
                {content.sub ? (
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '6px' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>{content.sub}</h4>
                    <p style={{ margin: 0, color: '#666' }}>
                      This is the {content.sub.toLowerCase()} section inside {content.main}.
                    </p>
                  </div>
                ) : (
                  <p style={{ color: '#666' }}>Select a sub-section above to see nested content.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Route Configuration</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Parent route with nested children */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="overview" element={<Overview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="/settings" element={<SettingsLayout />}>
        <Route index element={<SettingsHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="security" element={<Security />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}`}
          </pre>
        </div>

        {/* Layout Component Example */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Layout Component with Outlet</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <h1>Dashboard</h1>
      
      {/* Sub-navigation */}
      <nav className="sub-nav">
        <NavLink to="/dashboard/overview">Overview</NavLink>
        <NavLink to="/dashboard/analytics">Analytics</NavLink>
        <NavLink to="/dashboard/reports">Reports</NavLink>
      </nav>
      
      {/* Child route content renders here */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

// The <Outlet /> component renders the matched child route`}
          </pre>

          <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Key Concept: Outlet</h4>
            <p style={{ margin: 0 }}>
              <code>&lt;Outlet /&gt;</code> is a placeholder that renders the matched child route component.
              It's like <code>{'{children}'}</code> but specifically for nested routes.
            </p>
          </div>
        </div>

        {/* Index Route */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Index Route</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`<Route path="/dashboard" element={<DashboardLayout />}>
  {/* Index route - renders at /dashboard */}
  <Route index element={<DashboardHome />} />
  
  {/* Child routes */}
  <Route path="overview" element={<Overview />} />
  <Route path="analytics" element={<Analytics />} />
</Route>

// /dashboard        → DashboardLayout + DashboardHome
// /dashboard/overview → DashboardLayout + Overview`}
          </pre>

          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Index Route</h4>
            <p style={{ margin: 0 }}>
              The <code>index</code> attribute defines the default child route that renders
              when the parent path is matched exactly (no sub-path).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component
const SubNavButton = ({ path, current, onClick, children }) => (
  <button
    onClick={() => onClick(path)}
    style={{
      padding: '0.5rem 1rem',
      background: current === path ? '#667eea' : 'white',
      color: current === path ? 'white' : '#333',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: current === path ? 'bold' : 'normal',
    }}
  >
    {children}
  </button>
);

export default NestedNavigationExample;
