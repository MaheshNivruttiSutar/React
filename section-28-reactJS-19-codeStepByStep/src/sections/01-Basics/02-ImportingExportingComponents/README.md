# Importing and Exporting Components

## Quick Overview

Learn how to organize React components across files using JavaScript's module system.

## What You'll Learn

- Default exports (one per file)
- Named exports (multiple per file)
- Import syntax variations
- File organization patterns
- Barrel files for clean imports

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Basic React components
- JavaScript modules

## Key Patterns

```jsx
// Default export
export default function Button() { ... }
import Button from './Button';

// Named export  
export function Card() { ... }
import { Card } from './components';

// Barrel file
export { default as Button } from './Button';
import { Button, Card } from './components';
```

---

**Tip**: Use default export for the main component and named exports for related utilities!
