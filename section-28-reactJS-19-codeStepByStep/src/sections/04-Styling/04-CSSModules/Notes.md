# CSS Modules

## What are CSS Modules?

CSS Modules are CSS files where class names are scoped locally by default. Each class gets a unique identifier, preventing naming conflicts.

## File Naming

```
Button.module.css  ✓
Card.module.css    ✓
styles.module.css  ✓
```

## Basic Usage

### CSS File (Button.module.css)

```css
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.primary {
  background-color: #667eea;
  color: white;
}

.secondary {
  background-color: #e0e0e0;
  color: #333;
}
```

### React Component

```jsx
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

## How It Works

```jsx
import styles from './Button.module.css';

console.log(styles);
// Output:
// {
//   button: "Button_button_x7d3f",
//   primary: "Button_primary_k9m2n",
//   secondary: "Button_secondary_p4q8r"
// }

// In browser DevTools:
// <button class="Button_button_x7d3f Button_primary_k9m2n">
```

## Combining Classes

### Template Literals

```jsx
<div className={`${styles.card} ${styles.active}`}>
```

### Array Join

```jsx
const className = [
  styles.card,
  isActive && styles.active,
  isHighlighted && styles.highlighted,
].filter(Boolean).join(' ');

<div className={className}>
```

### classnames Library

```jsx
import classNames from 'classnames';

<div className={classNames(styles.card, {
  [styles.active]: isActive,
  [styles.highlighted]: isHighlighted,
})}>
```

## Composition

Reuse styles with `composes`:

```css
/* shared.module.css */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Button.module.css */
.button {
  composes: flex-center from './shared.module.css';
  padding: 12px 24px;
}

/* Or compose within same file */
.base {
  padding: 12px 24px;
  border-radius: 8px;
}

.primary {
  composes: base;
  background: #667eea;
  color: white;
}
```

## Global Styles in CSS Modules

```css
/* Escape hatch for global styles */
:global(.body-no-scroll) {
  overflow: hidden;
}

/* Or wrap a block */
:global {
  .some-library-class {
    color: red;
  }
}
```

## Variables and Theming

```css
/* variables.module.css */
@value primary: #667eea;
@value secondary: #764ba2;
@value spacing-md: 16px;

/* Button.module.css */
@value primary, spacing-md from './variables.module.css';

.button {
  background: primary;
  padding: spacing-md;
}
```

## File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── index.js
│   └── Card/
│       ├── Card.jsx
│       ├── Card.module.css
│       └── index.js
└── styles/
    ├── shared.module.css
    └── variables.module.css
```

## TypeScript Support

```typescript
// Button.module.css.d.ts (auto-generated or manual)
declare const styles: {
  button: string;
  primary: string;
  secondary: string;
};
export default styles;

// Or use typed-css-modules package
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
```

## Animations

```css
.fadeIn {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Best Practices

1. **One module per component** - Keep styles co-located
2. **Use camelCase** for multi-word classes (`cardTitle` not `card-title`)
3. **Compose for reuse** - Don't duplicate styles
4. **Avoid :global** - Only when absolutely necessary
5. **Use classnames library** - For complex conditional classes

## CSS Modules vs Other Solutions

| Feature | CSS Modules | Regular CSS | Styled Components |
|---------|-------------|-------------|-------------------|
| Scoped styles | ✓ | ✗ | ✓ |
| No runtime | ✓ | ✓ | ✗ |
| Dynamic values | Limited | ✗ | ✓ |
| CSS syntax | ✓ | ✓ | Modified |
| Build required | ✓ | ✗ | ✓ |

## Common Patterns

### Variant Props

```jsx
function Button({ variant, size }) {
  return (
    <button className={classNames(
      styles.button,
      styles[variant],
      styles[size]
    )}>
      Click
    </button>
  );
}
```

### Extending Styles

```jsx
function CustomButton({ className, ...props }) {
  return (
    <button 
      className={classNames(styles.button, className)}
      {...props}
    />
  );
}

// Usage - allows parent to add additional classes
<CustomButton className={parentStyles.special}>
```
