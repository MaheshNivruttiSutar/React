# React Fragments

## Quick Overview

Fragments let you group multiple elements without adding extra DOM nodes. They solve React's single root element requirement cleanly.

## What You'll Learn

- Why Fragments exist
- Short syntax vs explicit Fragment
- When to use keys with Fragments
- Real-world use cases
- Avoiding CSS layout issues

## Time to Complete

Approximately 10-15 minutes

## Prerequisites

- Basic React components
- JSX syntax
- Understanding of DOM structure

## Key Syntax

```jsx
// Short syntax (most common)
<>
  <Child1 />
  <Child2 />
</>

// With key (for lists)
<Fragment key={id}>
  <Child1 />
  <Child2 />
</Fragment>
```

## When to Use

- Returning multiple elements from a component
- Mapping lists that need multiple elements per item
- Conditional rendering of multiple elements
- Avoiding extra wrapper divs that break CSS layouts

---

**Tip**: Default to the short syntax `<>...</>` and only use `<Fragment>` when you need a key prop!
