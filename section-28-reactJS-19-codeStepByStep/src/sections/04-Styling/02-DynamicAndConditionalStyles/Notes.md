# Dynamic and Conditional Styles

## Overview

Dynamic styles change based on component state or props. Conditional styles apply different CSS based on certain conditions.

## Ternary Operator (Most Common)

```jsx
<div style={{
  backgroundColor: isActive ? 'green' : 'gray',
  color: isError ? 'red' : 'black',
  opacity: isDisabled ? 0.5 : 1,
}}>
```

## Logical AND for Optional Styles

```jsx
<div style={{
  padding: '1rem',
  ...(isHighlighted && { backgroundColor: 'yellow' }),
  ...(isBold && { fontWeight: 'bold' }),
}}>
```

## Style Object Maps

```jsx
const themes = {
  light: { bg: '#fff', text: '#000' },
  dark: { bg: '#000', text: '#fff' },
};

function App({ theme }) {
  return (
    <div style={{
      backgroundColor: themes[theme].bg,
      color: themes[theme].text,
    }}>
      Content
    </div>
  );
}
```

## Size Variants Pattern

```jsx
const sizeStyles = {
  small: { padding: '4px 8px', fontSize: '12px' },
  medium: { padding: '8px 16px', fontSize: '14px' },
  large: { padding: '12px 24px', fontSize: '16px' },
};

function Button({ size = 'medium', children }) {
  return (
    <button style={{
      ...sizeStyles[size],
      backgroundColor: 'blue',
      color: 'white',
    }}>
      {children}
    </button>
  );
}
```

## Status-based Styling

```jsx
const statusStyles = {
  pending: { bg: '#fff3e0', color: '#e65100' },
  success: { bg: '#e8f5e9', color: '#2e7d32' },
  error: { bg: '#ffebee', color: '#c62828' },
};

function StatusBadge({ status }) {
  const style = statusStyles[status];
  
  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '12px',
      backgroundColor: style.bg,
      color: style.color,
    }}>
      {status}
    </span>
  );
}
```

## Computed Styles from Props

```jsx
function ProgressBar({ percent }) {
  return (
    <div style={{ width: '100%', height: '8px', backgroundColor: '#eee' }}>
      <div style={{
        width: `${Math.min(100, Math.max(0, percent))}%`,
        height: '100%',
        backgroundColor: percent >= 100 ? 'green' : 'blue',
        transition: 'width 0.3s ease',
      }} />
    </div>
  );
}
```

## Multiple Conditions

```jsx
function Button({ variant, size, disabled }) {
  const baseStyle = {
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyle = {
    primary: { backgroundColor: 'blue', color: 'white' },
    secondary: { backgroundColor: 'gray', color: 'white' },
    outline: { backgroundColor: 'transparent', border: '2px solid blue' },
  };

  const sizeStyle = {
    sm: { padding: '4px 8px', fontSize: '12px' },
    md: { padding: '8px 16px', fontSize: '14px' },
    lg: { padding: '12px 24px', fontSize: '16px' },
  };

  return (
    <button
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variantStyle[variant],
        ...sizeStyle[size],
      }}
    >
      Button
    </button>
  );
}
```

## Hover State with useState

```jsx
function HoverCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '1rem',
        backgroundColor: isHovered ? '#f0f0f0' : 'white',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 8px 16px rgba(0,0,0,0.2)' 
          : '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      Hover me!
    </div>
  );
}
```

## Toggle Visibility

```jsx
function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▼' : '▶'}
      </button>
      <div style={{
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        {children}
      </div>
    </div>
  );
}
```

## Theme Switching

```jsx
const themes = {
  light: {
    background: '#ffffff',
    text: '#333333',
    primary: '#667eea',
  },
  dark: {
    background: '#1a1a2e',
    text: '#eaeaea',
    primary: '#7c3aed',
  },
};

function App() {
  const [theme, setTheme] = useState('light');
  const currentTheme = themes[theme];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.background,
      color: currentTheme.text,
      transition: 'all 0.3s ease',
    }}>
      <button 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        style={{ backgroundColor: currentTheme.primary }}
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

## Best Practices

1. **Use style maps** for variants (size, color, status)
2. **Keep conditions simple** - extract complex logic to functions
3. **Use transitions** for smooth visual changes
4. **Define constants** for reusable values
5. **Consider CSS-in-JS** for complex conditional styling
