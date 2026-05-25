# Custom Hooks

## Quick Overview

Custom hooks extract reusable stateful logic into functions starting with "use".

## What You'll Learn

- Creating custom hooks
- Common patterns (useToggle, useLocalStorage, useFetch, useDebounce)
- Rules and best practices

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
function useCustomHook() {
  const [state, setState] = useState(initial);
  
  useEffect(() => { /* side effects */ }, []);
  
  return { state, actions };
}
```

---

**Tip**: Custom hooks share logic, not state. Each component using a hook gets its own independent state!
