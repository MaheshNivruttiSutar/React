# useRef Hook

## What is useRef?

useRef returns a mutable ref object with a `.current` property that:
- Persists across renders
- Does NOT trigger re-renders when changed
- Can hold any value (DOM node, timer ID, previous value, etc.)

## Basic Syntax

```jsx
const myRef = useRef(initialValue);

// Access value
console.log(myRef.current);

// Update value (no re-render!)
myRef.current = newValue;
```

## Use Case 1: DOM Access

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />

// Access DOM element
inputRef.current.focus();
inputRef.current.select();
inputRef.current.value;
```

## Use Case 2: Storing Mutable Values

```jsx
// Render count (without re-renders)
const renderCount = useRef(0);
renderCount.current += 1;

// Previous value
const prevValue = useRef(value);
useEffect(() => {
  prevValue.current = value;
}, [value]);

// Timer/Interval IDs
const timerId = useRef(null);
timerId.current = setInterval(() => {}, 1000);
clearInterval(timerId.current);
```

## useRef vs useState

| useRef | useState |
|--------|----------|
| No re-render | Triggers re-render |
| Access via `.current` | Access via state variable |
| Mutable | Immutable (replace) |
| Persists between renders | Persists between renders |
| For DOM/non-UI data | For UI data |

## Common Patterns

### Focus on Mount

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);
```

### Tracking Previous State

```jsx
const prevCount = useRef(count);

useEffect(() => {
  prevCount.current = count;
}, [count]);
```

### Storing Timer ID

```jsx
const intervalRef = useRef(null);

useEffect(() => {
  intervalRef.current = setInterval(() => { }, 1000);
  return () => clearInterval(intervalRef.current);
}, []);
```

## Important Notes

1. **Changing ref doesn't re-render** - UI won't update automatically
2. **Don't read/write ref during render** - Use in effects or handlers
3. **Ref is mutable** - Unlike state, you can directly assign
4. **Ref persists** - Value survives re-renders

## When to Use

- Access/manipulate DOM elements
- Store interval/timeout IDs
- Track previous values
- Store any mutable value that shouldn't trigger re-renders
