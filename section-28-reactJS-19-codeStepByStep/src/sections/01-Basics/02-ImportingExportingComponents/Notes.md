# Importing and Exporting Components

## Overview

In React, components are organized in separate files and shared using JavaScript's module system (import/export).

## Default Export

One default export per file. Importer can choose any name.

### Exporting

```jsx
// Button.jsx
function Button({ children }) {
  return <button>{children}</button>;
}

export default Button;

// Alternative syntax
export default function Button({ children }) {
  return <button>{children}</button>;
}
```

### Importing

```jsx
// Can use any name
import Button from './Button';
import MyButton from './Button';
import Btn from './Button';
```

## Named Exports

Multiple named exports per file. Must use exact name or alias.

### Exporting

```jsx
// components.jsx
export function Button({ children }) {
  return <button>{children}</button>;
}

export function Card({ title, children }) {
  return <div>{title}{children}</div>;
}

export const Alert = ({ message }) => <div>{message}</div>;
```

### Importing

```jsx
// Import specific components
import { Button, Card } from './components';

// Import with alias
import { Button as Btn } from './components';

// Import all as namespace
import * as UI from './components';
// Usage: <UI.Button>Click</UI.Button>
```

## Combining Default and Named

```jsx
// Button.jsx
export function ButtonIcon({ icon }) {
  return <span>{icon}</span>;
}

export default function Button({ children }) {
  return <button>{children}</button>;
}

// Import both
import Button, { ButtonIcon } from './Button';
```

## File Organization

### Recommended Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx      # Component
│   │   ├── Button.css      # Styles
│   │   └── index.js        # Re-export
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── index.js
│   └── index.js            # Barrel file
├── pages/
│   ├── Home.jsx
│   └── About.jsx
└── App.jsx
```

### Component Folder index.js

```jsx
// components/Button/index.js
export { default } from './Button';

// Now you can import:
import Button from './components/Button';
// Instead of:
import Button from './components/Button/Button';
```

### Barrel File

```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Alert } from './Alert';

// Clean imports in App.jsx
import { Button, Card, Alert } from './components';
```

## Best Practices

1. **One component per file** - Easier to maintain
2. **Match filename to component** - `Button.jsx` exports `Button`
3. **Use index.js for re-exports** - Cleaner import paths
4. **Default for main component** - Named for utilities
5. **Organize by feature** - Group related components

## Common Patterns

### Re-exporting

```jsx
// components/index.js
export { default as Button } from './Button';
export * from './Button'; // Re-export all named exports
```

### Lazy Loading

```jsx
import { lazy } from 'react';

const Button = lazy(() => import('./Button'));
```

## Common Mistakes

```jsx
// ❌ Wrong: Trying to rename default import with destructuring
import { Button } from './Button'; // Won't work if default export

// ✅ Correct
import Button from './Button';

// ❌ Wrong: Using default syntax for named export
import Card from './components'; // Won't work if named export

// ✅ Correct
import { Card } from './components';
```
