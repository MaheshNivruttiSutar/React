import { useState } from 'react';

export const WhatIsReactRouterExample = () => {
  const [currentView, setCurrentView] = useState('intro');

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>What is React Router?</h2>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['intro', 'problem', 'solution', 'concepts'].map(view => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              style={{
                padding: '0.5rem 1rem',
                background: currentView === view ? '#667eea' : 'white',
                color: currentView === view ? 'white' : '#333',
                border: '2px solid #667eea',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {view === 'intro' ? 'Introduction' : view}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          
          {currentView === 'intro' && (
            <div>
              <h3 style={{ marginTop: 0, color: '#333' }}>Introduction to React Router</h3>
              
              <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                <p style={{ margin: 0, color: '#1565c0' }}>
                  <strong>React Router</strong> is the standard routing library for React. It enables navigation between different components/views in a React application while keeping the UI in sync with the URL.
                </p>
              </div>

              <h4 style={{ color: '#667eea' }}>Key Features:</h4>
              <ul style={{ lineHeight: '1.8' }}>
                <li><strong>Declarative Routing</strong> - Define routes as React components</li>
                <li><strong>Dynamic Routing</strong> - Routes are configured as your app renders</li>
                <li><strong>Nested Routes</strong> - Routes can be nested inside other routes</li>
                <li><strong>URL Parameters</strong> - Extract dynamic values from URLs</li>
                <li><strong>Programmatic Navigation</strong> - Navigate using JavaScript</li>
                <li><strong>History Management</strong> - Browser back/forward button support</li>
              </ul>

              <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Current Version</h4>
                <p style={{ margin: 0 }}>
                  React Router v6+ is the current major version, with significant improvements over v5.
                </p>
              </div>
            </div>
          )}

          {currentView === 'problem' && (
            <div>
              <h3 style={{ marginTop: 0, color: '#333' }}>The Problem: SPAs Need Routing</h3>
              
              <div style={{ background: '#ffebee', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Without Router</h4>
                <p style={{ margin: 0 }}>
                  Single Page Applications (SPAs) load once and dynamically update content. Without a router:
                </p>
              </div>

              <ul style={{ lineHeight: '1.8' }}>
                <li>No URL changes when navigating between views</li>
                <li>Browser back/forward buttons don't work</li>
                <li>Can't bookmark or share specific pages</li>
                <li>No SEO-friendly URLs</li>
                <li>Manual state management for "current page"</li>
              </ul>

              <h4 style={{ color: '#667eea', marginTop: '1.5rem' }}>Manual Approach (Don't Do This!)</h4>
              <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Without React Router - Manual approach
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <div>
      <nav>
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('about')}>About</button>
      </nav>
      
      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <About />}
    </div>
  );
}
// Problems: No URL sync, no browser history, no bookmarking`}
              </pre>
            </div>
          )}

          {currentView === 'solution' && (
            <div>
              <h3 style={{ marginTop: 0, color: '#333' }}>The Solution: React Router</h3>
              
              <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>With React Router</h4>
                <p style={{ margin: 0 }}>
                  React Router handles URL synchronization, history management, and navigation seamlessly.
                </p>
              </div>

              <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginBottom: '1rem' }}>
{`// With React Router
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
// URL syncs automatically, browser history works, bookmarkable!`}
              </pre>

              <h4 style={{ color: '#667eea' }}>Installation</h4>
              <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`# Install React Router
npm install react-router-dom

# or
yarn add react-router-dom`}
              </pre>
            </div>
          )}

          {currentView === 'concepts' && (
            <div>
              <h3 style={{ marginTop: 0, color: '#333' }}>Core Concepts</h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <ConceptCard
                  title="BrowserRouter"
                  description="Wraps your app and enables routing. Uses HTML5 history API."
                  code="<BrowserRouter><App /></BrowserRouter>"
                  color="#667eea"
                />
                <ConceptCard
                  title="Routes & Route"
                  description="Define which component renders for which URL path."
                  code='<Routes><Route path="/about" element={<About />} /></Routes>'
                  color="#e91e63"
                />
                <ConceptCard
                  title="Link"
                  description="Navigate without page reload. Replaces <a> tags."
                  code='<Link to="/about">About</Link>'
                  color="#00bcd4"
                />
                <ConceptCard
                  title="useNavigate"
                  description="Programmatic navigation hook."
                  code="const navigate = useNavigate(); navigate('/home');"
                  color="#4caf50"
                />
                <ConceptCard
                  title="useParams"
                  description="Access URL parameters from dynamic routes."
                  code="const { id } = useParams(); // from /users/:id"
                  color="#ff9800"
                />
                <ConceptCard
                  title="Outlet"
                  description="Placeholder for nested route content."
                  code="<Layout><Outlet /></Layout>"
                  color="#9c27b0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Interactive Demo */}
        <div style={{ marginTop: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo: Simulated Routing</h3>
          <p style={{ color: '#666' }}>This simulates how React Router navigation works:</p>
          <SimulatedRouter />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ConceptCard = ({ title, description, code, color }) => (
  <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', borderLeft: `4px solid ${color}` }}>
    <h4 style={{ margin: '0 0 0.5rem 0', color }}>{title}</h4>
    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>{description}</p>
    <code style={{ background: '#e0e0e0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
      {code}
    </code>
  </div>
);

// Simulated Router Demo
const SimulatedRouter = () => {
  const [path, setPath] = useState('/');
  const [history, setHistory] = useState(['/']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (newPath) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newPath];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setPath(newPath);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPath(history[historyIndex + 1]);
    }
  };

  return (
    <div>
      {/* Browser-like URL bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
        <button onClick={goBack} disabled={historyIndex === 0} style={{ padding: '0.5rem', cursor: 'pointer' }}>
          ←
        </button>
        <button onClick={goForward} disabled={historyIndex === history.length - 1} style={{ padding: '0.5rem', cursor: 'pointer' }}>
          →
        </button>
        <div style={{
          flex: 1,
          padding: '0.5rem 1rem',
          background: '#f5f5f5',
          borderRadius: '4px',
          fontFamily: 'monospace',
        }}>
          localhost:3000{path}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: '#667eea', borderRadius: '6px' }}>
        {['/', '/about', '/contact'].map(p => (
          <button
            key={p}
            onClick={() => navigate(p)}
            style={{
              padding: '0.5rem 1rem',
              background: path === p ? 'white' : 'transparent',
              color: path === p ? '#667eea' : 'white',
              border: '2px solid white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {p === '/' ? 'Home' : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '6px', minHeight: '100px' }}>
        {path === '/' && <div><h4 style={{ margin: 0 }}>Home Page</h4><p>Welcome to our site!</p></div>}
        {path === '/about' && <div><h4 style={{ margin: 0 }}>About Page</h4><p>Learn more about us.</p></div>}
        {path === '/contact' && <div><h4 style={{ margin: 0 }}>Contact Page</h4><p>Get in touch with us.</p></div>}
      </div>

      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
        History: {history.map((h, i) => (
          <span key={i} style={{ fontWeight: i === historyIndex ? 'bold' : 'normal' }}>
            {h}{i < history.length - 1 ? ' → ' : ''}
          </span>
        ))}
      </p>
    </div>
  );
};

export default WhatIsReactRouterExample;
