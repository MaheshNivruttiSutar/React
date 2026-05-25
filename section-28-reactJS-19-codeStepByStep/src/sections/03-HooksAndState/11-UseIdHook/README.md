# useId Hook

## Quick Overview

useId generates unique, SSR-safe IDs for accessibility attributes.

## What You'll Learn

- Generating unique IDs
- Accessibility patterns (label, aria-*)
- Multiple related IDs

## Time to Complete

Approximately 10 minutes

## Key Pattern

```jsx
const id = useId();

<label htmlFor={id}>Email</label>
<input id={id} type="email" />
```

---

**Tip**: Don't use useId for list keys - use meaningful data from your items instead!
