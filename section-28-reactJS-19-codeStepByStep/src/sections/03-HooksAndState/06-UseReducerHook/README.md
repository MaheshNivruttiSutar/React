# useReducer Hook

## Quick Overview

useReducer is an alternative to useState for complex state logic.

## What You'll Learn

- Reducer pattern
- Action dispatching
- When to use vs useState
- Complex state management

## Time to Complete

Approximately 20 minutes

## Key Pattern

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': return { ...state, items: [...state.items, action.payload] };
    default: return state;
  }
}

dispatch({ type: 'ADD', payload: newItem });
```

---

**Tip**: Use useReducer when state updates are complex or related!
