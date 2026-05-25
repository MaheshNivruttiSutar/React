# useEffect in React 19

## What is useEffect?

`useEffect` is a React Hook that lets you synchronize a component with external systems (APIs, DOM, subscriptions, timers, etc.). It runs after render and can optionally clean up.

## Basic Syntax

```jsx
useEffect(() => {
  // Effect code (runs after render)
  
  return () => {
    // Cleanup code (runs before next effect or unmount)
  };
}, [dependencies]);
```

## The Three Dependency Patterns

### 1. No Dependency Array - Runs Every Render

```jsx
useEffect(() => {
  console.log('Runs after EVERY render');
});
```

**Use Case**: Rarely needed, usually indicates a problem.

### 2. Empty Dependency Array - Runs Once

```jsx
useEffect(() => {
  console.log('Runs once on mount');
  
  return () => {
    console.log('Runs once on unmount');
  };
}, []);
```

**Use Case**: Initial data fetching, setting up subscriptions.

### 3. With Dependencies - Runs When Dependencies Change

```jsx
useEffect(() => {
  console.log('Runs when userId changes');
  fetchUser(userId);
}, [userId]);
```

**Use Case**: Syncing with external system based on specific values.

## Cleanup Function

The cleanup function runs:
1. Before the effect runs again (when dependencies change)
2. When the component unmounts

```jsx
useEffect(() => {
  const subscription = subscribeToEvents(userId);
  
  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, [userId]);
```

### Common Cleanup Scenarios

```jsx
// Timer
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer);
}, []);

// Event Listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Subscription
useEffect(() => {
  const unsubscribe = store.subscribe(handleChange);
  return () => unsubscribe();
}, []);

// Fetch with AbortController
useEffect(() => {
  const controller = new AbortController();
  
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData);
    
  return () => controller.abort();
}, [url]);
```

## Data Fetching Pattern

### Basic Pattern

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        
        if (!isCancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{user.name}</div>;
}
```

### With AbortController (Recommended)

```jsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, [userId]);
```

## React 19 Changes

### 1. No More Double Effects in Development

In React 18 Strict Mode, effects run twice in development to help find bugs. React 19 improves this behavior and provides better developer warnings instead.

### 2. Better Error Handling

Effects that throw errors are now caught by error boundaries more reliably.

### 3. Consider Alternatives

React 19 encourages using:
- **use() hook** for data fetching with Suspense
- **Event handlers** instead of effects for user interactions
- **useSyncExternalStore** for external store subscriptions

## When NOT to Use useEffect

### 1. For Derived State - Use useMemo

```jsx
// BAD
const [filteredItems, setFilteredItems] = useState([]);
useEffect(() => {
  setFilteredItems(items.filter(i => i.active));
}, [items]);

// GOOD
const filteredItems = useMemo(
  () => items.filter(i => i.active),
  [items]
);
```

### 2. For User Events - Use Event Handlers

```jsx
// BAD
useEffect(() => {
  if (submitted) {
    sendAnalytics('form_submitted');
  }
}, [submitted]);

// GOOD
const handleSubmit = () => {
  submitForm();
  sendAnalytics('form_submitted');
};
```

### 3. For Resetting State - Use Key

```jsx
// BAD
useEffect(() => {
  setInput('');
}, [userId]);

// GOOD
<UserForm key={userId} />  // Component resets automatically
```

## Effect Lifecycle

```
Component Mounts
      │
      ▼
Effect Runs (after first render)
      │
      ▼
Dependencies Change?
      │
      ├── Yes ──► Cleanup Runs ──► Effect Runs Again
      │
      └── No ──► Wait for change
      
Component Unmounts
      │
      ▼
Final Cleanup Runs
```

## Common Mistakes

### 1. Missing Dependencies

```jsx
// BAD - count is used but not in dependencies
useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1);  // Stale closure!
  }, 1000);
  return () => clearInterval(interval);
}, []); // Missing 'count'

// GOOD - use functional update
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1);  // Always uses latest
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

### 2. Object/Array Dependencies

```jsx
// BAD - object recreated every render
useEffect(() => {
  fetchData(options);
}, [options]); // { page: 1 } !== { page: 1 }

// GOOD - use primitive values
useEffect(() => {
  fetchData({ page, limit });
}, [page, limit]);
```

### 3. Infinite Loops

```jsx
// BAD - sets state unconditionally
useEffect(() => {
  setData(transformData(rawData));
}); // No dependencies = runs every render = infinite loop

// GOOD - add proper dependencies
useEffect(() => {
  setData(transformData(rawData));
}, [rawData]);
```

## Best Practices Summary

1. **Always cleanup** subscriptions, timers, event listeners
2. **Use AbortController** for fetch requests
3. **Include all dependencies** used inside the effect
4. **Use functional updates** to avoid stale closures
5. **Consider alternatives** (useMemo, event handlers, key prop)
6. **Keep effects focused** - one effect per concern
