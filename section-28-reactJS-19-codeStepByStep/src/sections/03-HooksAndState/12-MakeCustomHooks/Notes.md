# Custom Hooks

## What are Custom Hooks?

Custom hooks are functions that start with "use" and can call other React hooks. They allow you to extract and reuse stateful logic.

## Basic Structure

```jsx
function useCustomHook(params) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return { state, actions };
}
```

## Example: useToggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse };
}

// Usage
const { value: isOpen, toggle } = useToggle();
```

## Example: useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
```

## Example: useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    fetch(url)
      .then(res => res.json())
      .then(data => !cancelled && setData(data))
      .catch(err => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
```

## Example: useDebounce

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## Example: usePrevious

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}
```

## Rules for Custom Hooks

1. **Name starts with "use"** - Required convention
2. **Can call other hooks** - useState, useEffect, etc.
3. **Isolated state** - Each component gets its own copy
4. **Follow hook rules** - Only call at top level

## Benefits

- **Reusability** - Share logic across components
- **Separation of concerns** - Keep components focused
- **Testability** - Test hook logic independently
- **Composition** - Combine hooks for complex features
