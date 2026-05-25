# Layout & Index Routes

## What are Layout Routes?

Layout routes wrap multiple pages with shared UI elements (headers, sidebars, footers) without repeating them in each page component.

## Multiple Layouts Pattern

Different sections of your app can have different layouts:

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Auth Layout (minimal) */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
```

## Pathless Layout Routes

A route without a `path` prop acts as a wrapper without affecting the URL:

```jsx
<Routes>
  {/* No path - just wraps children */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />        {/* /       */}
    <Route path="/about" element={<About />} />   {/* /about  */}
  </Route>
</Routes>
```

This is perfect for applying a common layout to multiple routes at the root level.

## Index Routes

The `index` prop defines the default child route when the parent path matches exactly:

```jsx
<Route path="/products" element={<ProductsLayout />}>
  <Route index element={<ProductsList />} />      {/* /products      */}
  <Route path=":id" element={<ProductDetail />} /> {/* /products/123  */}
  <Route path="new" element={<AddProduct />} />    {/* /products/new  */}
</Route>
```

### Index vs path="/"

```jsx
// These are different!

// Index - matches parent path exactly
<Route index element={<Home />} />

// path="/" - only matches literal "/"
<Route path="/" element={<Home />} />
```

## Layout Component Examples

### Main Layout (Header + Footer)

```jsx
import { Outlet, Link } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="main-layout">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main>
        <Outlet />  {/* Page content */}
      </main>

      <footer>
        <p>© 2024 MyApp</p>
      </footer>
    </div>
  );
}
```

### Admin Layout (Sidebar)

```jsx
import { Outlet, NavLink } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Admin</h1>
          <UserMenu />
        </header>
        
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
```

### Auth Layout (Minimal)

```jsx
import { Outlet, Link } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          MyApp
        </Link>
        
        <div className="auth-card">
          <Outlet />
        </div>
        
        <p className="auth-footer">
          © 2024 MyApp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
```

## CSS for Layouts

```css
/* Main Layout */
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-layout main {
  flex: 1;
  padding: 2rem;
}

/* Admin Layout */
.admin-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #2d3748;
  color: white;
  padding: 1.5rem;
}

.admin-main {
  display: flex;
  flex-direction: column;
}

.admin-content {
  flex: 1;
  padding: 1.5rem;
  background: #f7fafc;
}

/* Auth Layout */
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
```

## Protected Layout Pattern

```jsx
function ProtectedLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="protected-layout">
      <Sidebar user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Usage
<Route element={<ProtectedLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
</Route>
```

## Best Practices

1. **Separate layouts by purpose** - Main, Admin, Auth, etc.
2. **Use pathless routes for root layouts** - Cleaner URL structure
3. **Index routes for default content** - Landing pages for sections
4. **Keep layouts focused** - Only shared UI, not business logic
5. **Consider protected layouts** - Auth checks at layout level
