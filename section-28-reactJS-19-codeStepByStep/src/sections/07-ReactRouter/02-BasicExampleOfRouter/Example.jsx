import { useState } from 'react';

export const BasicExampleOfRouterExample = () => {
  const [currentPath, setCurrentPath] = useState('/');

  // Simulated pages
  const pages = {
    '/': { title: 'Home', content: 'Welcome to our website! This is the home page.' },
    '/about': { title: 'About Us', content: 'Learn about our company and team.' },
    '/services': { title: 'Services', content: 'Explore our services and solutions.' },
    '/contact': { title: 'Contact', content: 'Get in touch with us today!' },
  };

  const currentPage = pages[currentPath] || { title: '404', content: 'Page not found!' };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Basic Example of React Router</h2>

        {/* Code Example */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Setting Up React Router</h3>
          
          <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Step 1: Install</h4>
            <code style={{ background: '#bbdefb', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>
              npm install react-router-dom
            </code>
          </div>

          <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Step 2: Wrap App with BrowserRouter (main.jsx)</h4>
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
{`import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`}
            </pre>
          </div>

          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Step 3: Define Routes (App.jsx)</h4>
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
{`import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        {/* Interactive Demo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo</h3>
          <p style={{ color: '#666' }}>Click the links below to see routing in action:</p>

          {/* URL Bar */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#666' }}>🔒</span>
            <span>localhost:3000</span>
            <span style={{ color: '#667eea', fontWeight: 'bold' }}>{currentPath}</span>
          </div>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '1rem',
            background: '#667eea',
            borderRadius: '6px 6px 0 0',
          }}>
            {Object.keys(pages).map(path => (
              <button
                key={path}
                onClick={() => setCurrentPath(path)}
                style={{
                  padding: '0.5rem 1rem',
                  background: currentPath === path ? 'white' : 'transparent',
                  color: currentPath === path ? '#667eea' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </button>
            ))}
          </nav>

          {/* Page Content */}
          <div style={{
            padding: '2rem',
            background: '#f8f9fa',
            borderRadius: '0 0 6px 6px',
            minHeight: '150px',
          }}>
            <h2 style={{ marginTop: 0, color: '#333' }}>{currentPage.title}</h2>
            <p style={{ color: '#666' }}>{currentPage.content}</p>
          </div>
        </div>

        {/* Page Components Example */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Creating Page Components</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// pages/Home.jsx
function Home() {
  return (
    <div>
      <h1>Welcome Home</h1>
      <p>This is the home page content.</p>
    </div>
  );
}
export default Home;

// pages/About.jsx
function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn about our company.</p>
    </div>
  );
}
export default About;

// pages/Contact.jsx
function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch!</p>
    </div>
  );
}
export default Contact;`}
          </pre>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Project Structure</h4>
            <pre style={{ margin: 0, color: '#333' }}>
{`src/
├── main.jsx          # BrowserRouter wrapper
├── App.jsx           # Routes & Navigation
└── pages/
    ├── Home.jsx
    ├── About.jsx
    ├── Services.jsx
    └── Contact.jsx`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicExampleOfRouterExample;
