import { useState } from 'react';

export const HeaderWithReactRouterExample = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Header/Navbar with React Router</h2>

        {/* Example 1: Basic Header with NavLink */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>1. Basic Header with NavLink</h3>
          <p style={{ color: '#666' }}>NavLink provides active state styling automatically:</p>

          {/* Demo Header */}
          <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            background: '#667eea',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
              MyApp
            </div>
            <nav style={{ display: 'flex', gap: '0.5rem' }}>
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => setCurrentPath(item.path)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: currentPath === item.path ? 'white' : 'transparent',
                    color: currentPath === item.path ? '#667eea' : 'white',
                    border: currentPath === item.path ? 'none' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: currentPath === item.path ? 'bold' : 'normal',
                    transition: 'all 0.2s',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </header>

          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>Current path: <strong>{currentPath}</strong></p>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">MyApp</div>
      <nav className="nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}`}
          </pre>
        </div>

        {/* Example 2: Reusable NavLink Component */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>2. Reusable NavLink Component</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// components/CustomNavLink.jsx
import { NavLink } from 'react-router-dom';

function CustomNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) => 
        \`nav-link \${isActive ? 'active' : ''} \${isPending ? 'pending' : ''}\`
      }
    >
      {children}
    </NavLink>
  );
}

// Usage
<CustomNavLink to="/about">About</CustomNavLink>`}
          </pre>
        </div>

        {/* Example 3: Header with Dropdown */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>3. Header with Dropdown Menu</h3>
          
          <HeaderWithDropdown currentPath={currentPath} setCurrentPath={setCurrentPath} />

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`function DropdownMenu({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropdown-trigger">
        {title} ▼
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map(item => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}`}
          </pre>
        </div>

        {/* Example 4: Mobile Responsive Header */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>4. Mobile Responsive Header</h3>

          {/* Mobile Header Demo */}
          <header style={{
            padding: '1rem 1.5rem',
            background: '#333',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                MyApp
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
            
            {mobileMenuOpen && (
              <nav style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                {navItems.map(item => (
                  <button
                    key={item.path}
                    onClick={() => {
                      setCurrentPath(item.path);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      background: currentPath === item.path ? '#667eea' : 'transparent',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </header>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">MyApp</Link>
        <button 
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {isOpen && (
        <nav className="mobile-nav">
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        </nav>
      )}
    </header>
  );
}`}
          </pre>
        </div>

        {/* Example 5: Header CSS */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>5. Complete Header CSS</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`/* Header.css */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #667eea;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background: white;
  color: #667eea;
  font-weight: bold;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-nav {
    display: flex;
    flex-direction: column;
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Dropdown Header Component
const HeaderWithDropdown = ({ currentPath, setCurrentPath }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const productSubItems = [
    { path: '/products/software', label: 'Software' },
    { path: '/products/hardware', label: 'Hardware' },
    { path: '/products/services', label: 'Services' },
  ];

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
    }}>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
        TechCorp
      </div>
      <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          onClick={() => setCurrentPath('/')}
          style={{
            padding: '0.5rem 1rem',
            background: currentPath === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Home
        </button>

        {/* Dropdown */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            style={{
              padding: '0.5rem 1rem',
              background: currentPath.includes('/products') ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Products ▼
          </button>
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '150px',
              zIndex: 10,
            }}>
              {productSubItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => setCurrentPath(item.path)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: currentPath === item.path ? '#f0f0f0' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setCurrentPath('/about')}
          style={{
            padding: '0.5rem 1rem',
            background: currentPath === '/about' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          About
        </button>
      </nav>
    </header>
  );
};

export default HeaderWithReactRouterExample;
