# Dynamic and Conditional Styles

## Quick Overview

Learn to apply styles that change based on component state, props, or conditions using JavaScript expressions.

## What You'll Learn

- Ternary operators for conditional styles
- Object spread for optional styles
- Style maps for variants (size, theme, status)
- Hover/active states with useState
- Toggle animations
- Theme switching patterns

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- Inline styles basics
- useState hook
- JavaScript ternary operators

## Key Patterns

```jsx
// Ternary for condition
backgroundColor: isActive ? 'green' : 'gray'

// Spread for optional styles
...(isError && { color: 'red' })

// Style map lookup
...sizeStyles[size]
```

---

**Tip**: Use style object maps for clean variant handling instead of multiple ternary conditions!
