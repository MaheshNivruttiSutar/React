# useReducer Hook

## What is useReducer?

useReducer is an alternative to useState for managing complex state logic. It's inspired by Redux patterns.

## Basic Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## Reducer Function

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
}
```

## Dispatching Actions

```jsx
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET', payload: 10 });
```

## Complex State Example

```jsx
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload 
          ? { ...todo, done: !todo.done } 
          : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const [todos, dispatch] = useReducer(todoReducer, []);
```

## useState vs useReducer

| useState | useReducer |
|----------|------------|
| Simple state | Complex state |
| Independent updates | Related state updates |
| Direct value update | Action-based updates |
| Less boilerplate | More predictable |

## When to Use useReducer

- Multiple sub-values in state
- Next state depends on previous
- Complex state transitions
- Want to centralize state logic
- Testing state logic separately

## Lazy Initialization

```jsx
function init(initialCount) {
  return { count: initialCount };
}

const [state, dispatch] = useReducer(reducer, initialArg, init);
```

## Best Practices

1. **Keep reducers pure** - No side effects
2. **Return new state** - Never mutate
3. **Use action types constants** - Prevent typos
4. **Keep actions simple** - Minimal payload
