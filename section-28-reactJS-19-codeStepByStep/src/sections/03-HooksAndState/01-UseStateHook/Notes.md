# useState Hook - Complete Guide

## Overview

The `useState` hook is the fundamental way to add state to functional components in React. It allows you to store and update values that can change over time, triggering re-renders when the state changes.

## Basic Syntax

```jsx
import { useState } from 'react';

const [state, setState] = useState(initialValue);
```

- **state**: The current state value
- **setState**: Function to update the state
- **initialValue**: The initial value for the state

## Common Use Cases

### 1. Number State (Counters)

```jsx
const [count, setCount] = useState(0);

// Increment
setCount(count + 1);

// Functional update (recommended when depending on previous state)
setCount(prevCount => prevCount + 1);
```

### 2. String State (Form Inputs)

```jsx
const [name, setName] = useState('');

// Handle input change
const handleChange = (e) => setName(e.target.value);

// Usage in JSX
<input value={name} onChange={handleChange} />
```

### 3. Boolean State (Toggles)

```jsx
const [isVisible, setIsVisible] = useState(true);

// Toggle
setIsVisible(!isVisible);

// Toggle function
const toggleVisibility = () => setIsVisible(prev => !prev);
```

### 4. Array State (Lists)

```jsx
const [items, setItems] = useState(['item1', 'item2']);

// Add item
setItems([...items, 'newItem']);

// Remove item by index
setItems(items.filter((_, index) => index !== indexToRemove));

// Update item
setItems(items.map((item, index) => 
  index === targetIndex ? newValue : item
));
```

### 5. Object State (Complex Data)

```jsx
const [user, setUser] = useState({ name: '', age: 0, email: '' });

// Update single field
setUser(prev => ({ ...prev, name: 'John' }));

// Update multiple fields
setUser(prev => ({ ...prev, name: 'John', age: 25 }));
```

## Important Rules

### 1. State Updates are Asynchronous

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Still 0! State hasn't updated yet
};
```

### 2. Immutable Updates

**DON'T** mutate state directly:
```jsx
// ❌ Wrong - mutating array
items.push('newItem');
setItems(items);

// ❌ Wrong - mutating object  
user.name = 'John';
setUser(user);
```

**DO** create new objects/arrays:
```jsx
// ✅ Correct - new array
setItems([...items, 'newItem']);

// ✅ Correct - new object
setUser({ ...user, name: 'John' });
```

### 3. Functional Updates

Use functional updates when new state depends on previous state:

```jsx
// ✅ Good - functional update
setCount(prevCount => prevCount + 1);

// ❌ Can be problematic in some scenarios
setCount(count + 1);
```

### 4. Batching State Updates

React batches multiple state updates in event handlers:

```jsx
const handleClick = () => {
  setCount(count + 1);  // Batched
  setName('John');      // Batched  
  setAge(25);          // Batched
  // Component re-renders once with all updates
};
```

## Best Practices

### 1. Keep State Minimal

Only store what you need in state. Derive other values in render:

```jsx
const [items, setItems] = useState([]);
// Don't store count separately - derive it
const itemCount = items.length;
```

### 2. Use Multiple State Variables

Split unrelated state into separate variables:

```jsx
// ✅ Good - separate concerns
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// ❌ Less ideal - unrelated data together
const [formData, setFormData] = useState({ name: '', email: '' });
```

### 3. Initialize State Properly

```jsx
// ✅ Simple initialization
const [count, setCount] = useState(0);

// ✅ Lazy initialization for expensive operations
const [data, setData] = useState(() => {
  return expensiveCalculation();
});
```

### 4. Handle Arrays and Objects Correctly

```jsx
// Adding to array
setTodos(prev => [...prev, newTodo]);

// Removing from array  
setTodos(prev => prev.filter(todo => todo.id !== id));

// Updating object
setUser(prev => ({ ...prev, name: 'New Name' }));
```

## Common Mistakes

### 1. Directly Mutating State

```jsx
// ❌ Wrong
const handleAddTodo = () => {
  todos.push(newTodo);
  setTodos(todos);
};

// ✅ Correct
const handleAddTodo = () => {
  setTodos([...todos, newTodo]);
};
```

### 2. Using State Immediately After Setting

```jsx
// ❌ Wrong - state hasn't updated yet
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Still old value
};

// ✅ Correct - use useEffect for side effects
useEffect(() => {
  console.log(count); // Updated value
}, [count]);
```

### 3. Forgetting Functional Updates

```jsx
// ❌ Can miss updates in rapid succession
const increment = () => setCount(count + 1);

// ✅ Always gets latest value
const increment = () => setCount(prev => prev + 1);
```

## Performance Considerations

### 1. Avoid Unnecessary Re-renders

```jsx
// ✅ Only update if value actually changed
const handleChange = (newValue) => {
  if (newValue !== currentValue) {
    setValue(newValue);
  }
};
```

### 2. Use Lazy Initial State

```jsx
// ❌ Runs expensive function on every render
const [data, setData] = useState(expensiveFunction());

// ✅ Only runs expensive function once
const [data, setData] = useState(() => expensiveFunction());
```

## Advanced Patterns

### 1. State Reducer Pattern

For complex state logic, consider useReducer:

```jsx
// Simple toggle with useState
const [isOpen, setIsOpen] = useState(false);

// Complex state logic might benefit from useReducer
const [state, dispatch] = useReducer(reducer, initialState);
```

### 2. Lifting State Up

Move state to common parent when multiple components need it:

```jsx
// Parent component manages shared state
const Parent = () => {
  const [sharedData, setSharedData] = useState('');
  
  return (
    <>
      <ChildA data={sharedData} onChange={setSharedData} />
      <ChildB data={sharedData} />
    </>
  );
};
```

## React 19 Improvements

React 19 includes automatic batching improvements and better TypeScript support for useState:

```jsx
// Better type inference in React 19
const [user, setUser] = useState<User | null>(null);
```

## Summary

useState is essential for:
- ✅ Managing component-local state
- ✅ Handling user input and form data  
- ✅ Controlling component behavior and appearance
- ✅ Storing temporary UI state (modals, dropdowns, etc.)

Remember: Always treat state as immutable and use functional updates when the new state depends on the previous state!