# Nested Navigation with React Router

## What is Nested Routing?

Nested routing allows child routes to render inside parent route components. This creates hierarchical navigation where the parent layout persists while child content changes.

## Use Cases

- Dashboard with sub-sections
- Settings pages with multiple tabs
- Product categories and details
- Admin panels with sidebar navigation
- Multi-step forms

## Basic Structure

```jsx
// Route Configuration
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="overview" element={<Overview />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="reports" element={<Reports />} />
  </Route>
</Routes>

// URL → Component mapping:
// /dashboard           → DashboardLayout + DashboardHome
// /dashboard/overview  → DashboardLayout + Overview
// /dashboard/analytics → DashboardLayout + Analytics
// /dashboard/reports   → DashboardLayout + Reports
```

## The Outlet Component

`<Outlet />` is where child routes render inside the parent.

```jsx
import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>
      
      <nav className="dashboard-nav">
        <NavLink to="/dashboard/overview">Overview</NavLink>
        <NavLink to="/dashboard/analytics">Analytics</NavLink>
        <NavLink to="/dashboard/reports">Reports</NavLink>
      </nav>
      
      <main className="dashboard-content">
        {/* Child route content renders here */}
        <Outlet />
      </main>
    </div>
  );
}
```

## Index Route

The `index` attribute defines the default child route:

```jsx
<Route path="/settings" element={<SettingsLayout />}>
  {/* Renders at /settings (exact match) */}
  <Route index element={<SettingsHome />} />
  
  {/* Renders at /settings/profile */}
  <Route path="profile" element={<Profile />} />
  
  {/* Renders at /settings/security */}
  <Route path="security" element={<Security />} />
</Route>
```

## Complete Example

### Route Setup

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import SettingsLayout from './layouts/SettingsLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        
        {/* Nested Dashboard Routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="overview" element={<Overview />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        
        {/* Nested Settings Routes */}
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<SettingsHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

### Main Layout

```jsx
// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### Dashboard Layout

```jsx
// layouts/DashboardLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';
import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <nav>
          <NavLink to="/dashboard" end>Home</NavLink>
          <NavLink to="/dashboard/overview">Overview</NavLink>
          <NavLink to="/dashboard/analytics">Analytics</NavLink>
          <NavLink to="/dashboard/reports">Reports</NavLink>
        </nav>
      </aside>
      
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
}
```

### CSS

```css
/* DashboardLayout.css */
.dashboard-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: calc(100vh - 120px);
}

.dashboard-sidebar {
  background: #2d3748;
  color: white;
  padding: 1.5rem;
}

.dashboard-sidebar h2 {
  margin: 0 0 1.5rem 0;
}

.dashboard-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dashboard-sidebar a {
  color: #a0aec0;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.dashboard-sidebar a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.dashboard-sidebar a.active {
  background: #667eea;
  color: white;
}

.dashboard-main {
  padding: 2rem;
  background: #f7fafc;
}
```

## Relative Links

In nested routes, use relative paths:

```jsx
function DashboardLayout() {
  return (
    <nav>
      {/* Relative paths work from current route */}
      <NavLink to="overview">Overview</NavLink>  {/* → /dashboard/overview */}
      <NavLink to="analytics">Analytics</NavLink> {/* → /dashboard/analytics */}
      
      {/* Absolute paths start with / */}
      <NavLink to="/dashboard/reports">Reports</NavLink>
    </nav>
  );
}
```

## Outlet Context

Pass data to child routes:

```jsx
// Parent
function DashboardLayout() {
  const [user, setUser] = useState(null);
  
  return (
    <div>
      <Outlet context={{ user, setUser }} />
    </div>
  );
}

// Child
import { useOutletContext } from 'react-router-dom';

function Overview() {
  const { user } = useOutletContext();
  return <div>Welcome, {user?.name}</div>;
}
```

## Best Practices

1. **Use layouts for shared UI** - Headers, sidebars, footers
2. **Keep route nesting logical** - Match URL structure to UI hierarchy
3. **Use index routes** - Define default child content
4. **Relative paths in nested routes** - Cleaner, more maintainable
5. **End prop for exact matching** - `<NavLink to="/dashboard" end>`
