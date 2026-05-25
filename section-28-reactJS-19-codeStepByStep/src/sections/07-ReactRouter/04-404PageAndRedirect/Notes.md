# 404 Page & Redirects

## Setting Up a 404 Page

The catch-all route `path="*"` matches any URL that doesn't match other defined routes.

### Basic Setup

```jsx
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      
      {/* 404 - Must be last! */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### NotFound Component

```jsx
import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Sorry, the page <code>{location.pathname}</code> doesn't exist.
      </p>
      <Link to="/" className="home-link">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
```

### NotFound CSS

```css
.not-found {
  text-align: center;
  padding: 4rem 2rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.not-found h1 {
  font-size: 8rem;
  color: #667eea;
  margin: 0;
}

.not-found h2 {
  color: #333;
  margin: 0.5rem 0;
}

.not-found p {
  color: #666;
  margin: 1rem 0;
}

.not-found code {
  background: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.home-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

## Redirects

### Method 1: Navigate Component

```jsx
import { Navigate } from 'react-router-dom';

// In Routes - redirect old URLs
<Routes>
  <Route path="/old-page" element={<Navigate to="/new-page" replace />} />
  <Route path="/new-page" element={<NewPage />} />
</Routes>

// Redirect home to dashboard
<Route path="/" element={<Navigate to="/dashboard" />} />
```

### Method 2: Conditional Redirect in Component

```jsx
import { Navigate } from 'react-router-dom';

function PrivatePage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <div>Protected Content</div>;
}
```

### Method 3: useNavigate Hook (Programmatic)

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await performLogin();
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
}
```

## useNavigate Options

```jsx
const navigate = useNavigate();

// Basic navigation
navigate('/about');

// Replace current history entry
navigate('/dashboard', { replace: true });

// Go back
navigate(-1);

// Go forward
navigate(1);

// Navigate with state
navigate('/profile', { 
  state: { from: 'login', userId: 123 } 
});

// Access state in destination
import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  console.log(location.state); // { from: 'login', userId: 123 }
}
```

## Auto-Redirect 404 Page

```jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    // Countdown timer
    const countdown = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const redirect = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Redirecting to home in {seconds} seconds...</p>
      <Link to="/">Go now</Link>
    </div>
  );
}
```

## Protected Routes Pattern

```jsx
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, save attempted URL
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  return children;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Redirect Back After Login

```jsx
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    await login();
    
    // Redirect to original destination or home
    const from = location.state?.from || '/';
    navigate(from, { replace: true });
  };
}
```

## Common Redirect Patterns

| Pattern | Code |
|---------|------|
| Simple redirect | `<Navigate to="/new" />` |
| Replace history | `<Navigate to="/new" replace />` |
| Programmatic | `navigate('/path')` |
| Go back | `navigate(-1)` |
| With state | `navigate('/path', { state: data })` |
| Conditional | `if (!auth) return <Navigate to="/login" />` |

## Best Practices

1. **Always use `replace` for auth redirects** - Prevents back button issues
2. **Place 404 route last** - Catch-all after all valid routes
3. **Provide useful 404 page** - Help users get back on track
4. **Consider auto-redirect** - Improve UX for lost users
5. **Save intended destination** - Redirect back after login
