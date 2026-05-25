# Header/Navbar with React Router

## Overview

Building a navigation header is one of the most common uses of React Router. This section covers creating reusable, responsive headers with active link styling.

## NavLink vs Link

### Link
Basic navigation without active state:

```jsx
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

### NavLink
Navigation with built-in active state:

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```

## Basic Header Component

```jsx
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        MyApp
      </NavLink>
      
      <nav className="nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          About
        </NavLink>
        <NavLink 
          to="/services" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Services
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
```

## Reusable NavLink Component

```jsx
// components/CustomNavLink.jsx
import { NavLink } from 'react-router-dom';

function CustomNavLink({ to, children, exact = false }) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive, isPending }) => {
        let className = 'nav-link';
        if (isActive) className += ' active';
        if (isPending) className += ' pending';
        return className;
      }}
    >
      {children}
    </NavLink>
  );
}

// Usage
function Header() {
  return (
    <nav>
      <CustomNavLink to="/" exact>Home</CustomNavLink>
      <CustomNavLink to="/about">About</CustomNavLink>
      <CustomNavLink to="/contact">Contact</CustomNavLink>
    </nav>
  );
}
```

## NavLink Props

| Prop | Type | Description |
|------|------|-------------|
| `to` | string | Destination path |
| `end` | boolean | Only active when path matches exactly |
| `className` | string/function | CSS classes (function receives {isActive, isPending}) |
| `style` | object/function | Inline styles (function receives {isActive, isPending}) |
| `children` | ReactNode/function | Content (function receives {isActive, isPending}) |

## Header with Dropdown

```jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function HeaderWithDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <NavLink to="/" className="logo">MyApp</NavLink>
      
      <nav className="nav">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        
        {/* Dropdown */}
        <div 
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="dropdown-trigger">
            Products ▼
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <NavLink to="/products/software">Software</NavLink>
              <NavLink to="/products/hardware">Hardware</NavLink>
              <NavLink to="/products/services">Services</NavLink>
            </div>
          )}
        </div>
        
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
      </nav>
    </header>
  );
}

const navLinkClass = ({ isActive }) => 
  `nav-link ${isActive ? 'active' : ''}`;
```

## Mobile Responsive Header

```jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-top">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          MyApp
        </NavLink>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </nav>
    </header>
  );
}
```

## Complete CSS

```css
/* Header.css */
.header {
  background: #667eea;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background: white;
  color: #667eea;
  font-weight: 600;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  padding: 0.5rem 0;
}

.dropdown-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background: #f5f5f5;
}

/* Mobile Toggle */
.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
  
  .nav-open {
    display: flex;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
  }
}
```

## Best Practices

1. **Use NavLink for navigation** - Built-in active state handling
2. **Close mobile menu on navigation** - Better UX
3. **Use `end` prop for home** - Prevents always-active state
4. **Sticky header** - `position: sticky` for scroll behavior
5. **Accessible** - Include aria-labels for toggle buttons
6. **Semantic HTML** - Use `<header>`, `<nav>` elements

## Common Patterns

### Exact Match for Home

```jsx
// Home link is active only on exact "/" path
<NavLink to="/" end className={navLinkClass}>
  Home
</NavLink>
```

### Active Parent Route

```jsx
// Products link active for /products and /products/*
<NavLink 
  to="/products"
  className={({ isActive }) => 
    location.pathname.startsWith('/products') ? 'active' : ''
  }
>
  Products
</NavLink>
```
