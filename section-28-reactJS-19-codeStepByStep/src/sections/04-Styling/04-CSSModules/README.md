# CSS Modules

## Quick Overview

CSS Modules provide locally scoped CSS by automatically generating unique class names, preventing style conflicts between components.

## What You'll Learn

- CSS Modules file naming (.module.css)
- Importing and using styles object
- Combining multiple classes
- Composition with `composes`
- Global escape hatch (:global)
- Best practices and patterns

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- External CSS basics
- className in React
- JavaScript object property access

## Key Syntax

```jsx
// Import
import styles from './Button.module.css';

// Use
<button className={styles.button}>

// Combine
<div className={`${styles.card} ${styles.active}`}>
```

---

**Tip**: CSS Modules combine the familiarity of CSS with automatic scoping - best of both worlds!
