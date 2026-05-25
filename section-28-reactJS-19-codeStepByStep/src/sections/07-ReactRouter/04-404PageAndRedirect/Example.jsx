import { useState, useEffect } from 'react';

export const NotFoundAndRedirectExample = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  const validPaths = ['/', '/about', '/products', '/contact'];

  // Simulate redirect countdown
  useEffect(() => {
    if (redirectCountdown !== null && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirectCountdown === 0) {
      setCurrentPath('/');
      setRedirectCountdown(null);
    }
  }, [redirectCountdown]);

  const navigate = (path) => {
    setCurrentPath(path);
    setRedirectCountdown(null);
  };

  const isValidPath = validPaths.includes(currentPath);

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>404 Page & Redirects</h2>

        {/* Example 1: 404 Page Setup */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>1. Setting Up a 404 Page</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginBottom: '1rem' }}>
{`import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// The "*" path matches any URL that doesn't match other routes`}
          </pre>

          <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Key Point</h4>
            <p style={{ margin: 0 }}>
              The <code>path="*"</code> acts as a wildcard and catches any unmatched routes. 
              Always place it <strong>last</strong> in your Routes.
            </p>
          </div>
        </div>

        {/* Interactive Demo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo</h3>
          
          {/* URL Input */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Try navigating to different paths:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['/', '/about', '/products', '/contact', '/invalid', '/xyz/123'].map(path => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: currentPath === path ? '#667eea' : '#e0e0e0',
                    color: currentPath === path ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {path}
                </button>
              ))}
            </div>
          </div>

          {/* Current Path Display */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}>
            Current Path: <strong>{currentPath}</strong>
            {!isValidPath && <span style={{ color: '#c62828', marginLeft: '1rem' }}>(Not Found)</span>}
          </div>

          {/* Page Content */}
          {isValidPath ? (
            <div style={{ padding: '2rem', background: '#e3f2fd', borderRadius: '6px', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#1976d2' }}>
                {currentPath === '/' ? 'Home Page' : `${currentPath.slice(1).charAt(0).toUpperCase() + currentPath.slice(2)} Page`}
              </h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#1565c0' }}>This is valid content!</p>
            </div>
          ) : (
            <div style={{ padding: '2rem', background: '#ffebee', borderRadius: '6px', textAlign: 'center' }}>
              <h1 style={{ margin: 0, fontSize: '4rem', color: '#c62828' }}>404</h1>
              <h3 style={{ margin: '0.5rem 0', color: '#c62828' }}>Page Not Found</h3>
              <p style={{ color: '#666' }}>The page "{currentPath}" doesn't exist.</p>
              <button
                onClick={() => navigate('/')}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Go to Home
              </button>
            </div>
          )}
        </div>

        {/* Example 2: NotFound Component */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>2. NotFound Component</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page <code>{location.pathname}</code> doesn't exist.
      </p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFound;`}
          </pre>
        </div>

        {/* Example 3: Redirects */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>3. Redirects with Navigate</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginBottom: '1rem' }}>
{`import { Navigate } from 'react-router-dom';

// Method 1: Redirect in Routes
<Routes>
  {/* Redirect old URL to new URL */}
  <Route path="/old-about" element={<Navigate to="/about" replace />} />
  
  {/* Redirect root to dashboard */}
  <Route path="/" element={<Navigate to="/dashboard" />} />
</Routes>

// Method 2: Conditional redirect in component
function ProtectedPage() {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <Dashboard />;
}`}
          </pre>

          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>The replace prop</h4>
            <p style={{ margin: 0 }}>
              Using <code>replace</code> replaces the current history entry instead of adding a new one.
              This prevents the back button from going to the redirect URL.
            </p>
          </div>
        </div>

        {/* Example 4: Programmatic Navigation */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>4. Programmatic Navigation (useNavigate)</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    
    if (success) {
      // Redirect to dashboard after login
      navigate('/dashboard');
      
      // Or with replace (can't go back to login)
      navigate('/dashboard', { replace: true });
      
      // Navigate back
      navigate(-1);
      
      // Navigate with state
      navigate('/dashboard', { state: { from: 'login' } });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}`}
          </pre>
        </div>

        {/* Example 5: Auto-redirect with Countdown */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>5. Auto-Redirect with Countdown</h3>

          <button
            onClick={() => {
              setCurrentPath('/nonexistent');
              setRedirectCountdown(5);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            Trigger 404 with Auto-Redirect
          </button>

          {redirectCountdown !== null && (
            <div style={{ padding: '1.5rem', background: '#fff3e0', borderRadius: '6px', textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Page Not Found</h3>
              <p style={{ margin: 0 }}>
                Redirecting to home in <strong>{redirectCountdown}</strong> seconds...
              </p>
            </div>
          )}

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to home in {countdown} seconds...</p>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NotFoundAndRedirectExample;
