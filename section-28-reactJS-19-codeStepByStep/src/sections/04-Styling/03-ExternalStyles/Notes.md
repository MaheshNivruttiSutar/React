# External Stylesheets

## Overview

External CSS files are traditional stylesheets imported into React components. Styles are globally scoped by default.

## Importing CSS

```jsx
// Import in component
import './Button.css';

// Import in entry point (main.jsx)
import './index.css';
```

## Global Styles (index.css)

```css
/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* CSS Variables */
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --text: #333;
  --bg: #fafafa;
  --radius: 8px;
}

/* Base styles */
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

## Component CSS

```css
/* Button.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5a67d8;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

/* Sizes */
.btn-sm { padding: 8px 16px; font-size: 0.875rem; }
.btn-lg { padding: 16px 32px; font-size: 1.125rem; }
```

## Using Classes in React

```jsx
import './Button.css';

function Button({ variant = 'primary', size, disabled, children }) {
  // Build class string
  const className = [
    'btn',
    `btn-${variant}`,
    size && `btn-${size}`,
  ].filter(Boolean).join(' ');

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
```

## Conditional Classes

```jsx
// Method 1: Array join
const className = [
  'card',
  isActive && 'card-active',
  isHighlighted && 'card-highlighted',
].filter(Boolean).join(' ');

// Method 2: Template literal
const className = `card ${isActive ? 'card-active' : ''} ${isHighlighted ? 'card-highlighted' : ''}`.trim();

// Method 3: classnames library
import classNames from 'classnames';

const className = classNames('card', {
  'card-active': isActive,
  'card-highlighted': isHighlighted,
});
```

## File Structure

```
src/
├── index.css           # Global resets, variables
├── App.css             # App-level styles
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.css
│   └── Card/
│       ├── Card.jsx
│       └── Card.css
└── styles/
    ├── variables.css
    ├── utilities.css
    └── animations.css
```

## CSS Variables (Custom Properties)

```css
/* Define in :root */
:root {
  --color-primary: #667eea;
  --color-success: #4caf50;
  --color-error: #f44336;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}

/* Use anywhere */
.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* With fallback */
.text {
  color: var(--custom-color, #333);
}
```

## Media Queries

```css
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## Pseudo-classes and States

```css
.button:hover {
  background: #5a67d8;
}

.button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.button:active {
  transform: scale(0.98);
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.link:visited {
  color: purple;
}
```

## Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease;
}

.slide-up {
  animation: slideUp 0.4s ease;
}
```

## Naming Conventions

### BEM (Block Element Modifier)

```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--compact { }
```

### Utility-first prefixes

```css
.u-text-center { text-align: center; }
.u-mt-1 { margin-top: 0.5rem; }
.u-hidden { display: none; }
```

## Best Practices

1. **Use CSS variables** for theming
2. **Follow naming convention** (BEM recommended)
3. **Organize by component** or feature
4. **Keep specificity low** to avoid conflicts
5. **Use utility classes** for common patterns
6. **Consider CSS Modules** to avoid global scope issues
