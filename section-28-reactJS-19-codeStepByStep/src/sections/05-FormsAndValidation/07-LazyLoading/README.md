# Lazy Loading in React

## Quick Overview

Learn to use `React.lazy()` and `Suspense` for code splitting and loading components on demand.

## What You'll Learn

- lazy() and Suspense basics
- Conditional lazy loading
- Route-based code splitting
- Loading fallback components
- Error handling with boundaries
- Preloading strategies

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- React components
- Dynamic imports
- React Router (for route splitting)

## Key Pattern

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

**Tip**: Lazy load route components and heavy features like charts/editors for best performance impact!
