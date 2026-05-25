# Context API in React 19

## Quick Overview

Context provides a way to share data across components without prop drilling. React 19 introduces the `use()` hook and simplified Provider syntax.

## What You'll Learn

- What is Context and why use it
- Creating and consuming Context
- React 19's new `use()` hook
- Context as Provider (React 19 syntax)
- Performance optimization patterns
- Custom hooks for Context

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- useState and useEffect hooks
- Component composition
- Props and state management

## Key React 19 Changes

```jsx
// 1. use() hook - conditional context reading
const user = use(UserContext);  // Can be in conditions!

// 2. Context as Provider directly
<ThemeContext value={theme}>  // No .Provider needed
  <App />
</ThemeContext>
```

## When to Use Context

- Global state (theme, auth, language)
- Deeply nested component communication
- Avoiding prop drilling
- Sharing state across unrelated components

---

**Tip**: Start with prop drilling for simple cases. Use Context when you find yourself passing props through many levels!
