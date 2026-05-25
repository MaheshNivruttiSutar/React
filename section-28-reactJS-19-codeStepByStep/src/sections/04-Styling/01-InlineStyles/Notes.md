# Inline Styles in React

## What are Inline Styles?

Inline styles in React are CSS styles written directly in JSX as JavaScript objects. Instead of using CSS class names, you apply styles directly to elements.

## Basic Syntax

```jsx
// Inline style object
<div style={{ backgroundColor: 'blue', padding: '20px' }}>
  Content
</div>
```

## Key Differences from CSS

| CSS | React Inline Style |
|-----|-------------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `margin-top` | `marginTop` |
| `border-radius` | `borderRadius` |
| `z-index` | `zIndex` |

## Style Object Variables

```jsx
const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
};

function Button() {
  return <button style={buttonStyle}>Click Me</button>;
}
```

## Dynamic Styles

### Using State

```jsx
function DynamicButton() {
  const [isActive, setIsActive] = useState(false);

  const style = {
    backgroundColor: isActive ? 'green' : 'blue',
    color: 'white',
    padding: '10px 20px',
  };

  return (
    <button 
      style={style}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}
```

### Using Props

```jsx
function ColoredBox({ color, size }) {
  const style = {
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`,
  };

  return <div style={style} />;
}

// Usage
<ColoredBox color="red" size={100} />
```

## Merging Styles

```jsx
const baseStyle = {
  padding: '10px',
  borderRadius: '4px',
};

const primaryStyle = {
  ...baseStyle,
  backgroundColor: 'blue',
  color: 'white',
};

const secondaryStyle = {
  ...baseStyle,
  backgroundColor: 'gray',
  color: 'black',
};
```

## Conditional Styles

```jsx
function Alert({ type, message }) {
  const style = {
    padding: '1rem',
    borderRadius: '4px',
    ...(type === 'error' && {
      backgroundColor: '#ffebee',
      color: '#c62828',
      border: '1px solid #f44336',
    }),
    ...(type === 'success' && {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      border: '1px solid #4caf50',
    }),
  };

  return <div style={style}>{message}</div>;
}
```

## Units in Inline Styles

```jsx
// Numbers default to pixels
{ width: 100 }     // becomes width: '100px'
{ fontSize: 16 }   // becomes fontSize: '16px'

// For other units, use strings
{ width: '50%' }
{ fontSize: '1.5rem' }
{ margin: '10px auto' }
```

## Handling Hover/Focus (Workaround)

Since inline styles don't support pseudo-selectors, use state:

```jsx
function HoverButton() {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: isHovered ? '#5a67d8' : '#667eea',
    color: 'white',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <button
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Hover Me
    </button>
  );
}
```

## When to Use Inline Styles

**Good for:**
- Quick prototyping
- Dynamic styles based on state/props
- Single-use styles
- Simple components

**Avoid for:**
- Complex styling with pseudo-selectors
- Responsive design (media queries)
- Animations and keyframes
- Large-scale applications

## Best Practices

1. **Extract style objects** - Don't inline complex objects in JSX
2. **Use constants** - Define color/size values as constants
3. **Combine approaches** - Use inline for dynamic, CSS for static
4. **Consider alternatives** - CSS Modules, Styled Components for complex needs

## Common Mistakes

```jsx
// ❌ Wrong: Using CSS syntax
<div style="background-color: blue;">

// ✅ Correct: Using object syntax
<div style={{ backgroundColor: 'blue' }}>

// ❌ Wrong: kebab-case
<div style={{ 'background-color': 'blue' }}>

// ✅ Correct: camelCase
<div style={{ backgroundColor: 'blue' }}>

// ❌ Wrong: Missing quotes for string values
<div style={{ color: blue }}>

// ✅ Correct: Quoted string values
<div style={{ color: 'blue' }}>
```
