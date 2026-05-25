# Uncontrolled Components

## Quick Overview

Learn about uncontrolled components where DOM manages form values instead of React state.

## What You'll Learn

- Controlled vs uncontrolled comparison
- Using refs to access DOM values
- File input handling
- When to use each approach

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
// Uncontrolled
const inputRef = useRef(null);
<input ref={inputRef} defaultValue="initial" />
// Access: inputRef.current.value

// Controlled
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

---

**Tip**: File inputs are always uncontrolled - use refs to access their values!
