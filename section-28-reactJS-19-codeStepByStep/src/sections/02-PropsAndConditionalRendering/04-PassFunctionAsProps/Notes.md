# Pass Function as Props

## Basic Concept

Passing functions as props allows child components to communicate with parents by calling the passed function.

```jsx
// Parent
const Parent = () => {
  const handleClick = () => console.log('Clicked!');
  return <Child onClick={handleClick} />;
};

// Child
const Child = ({ onClick }) => (
  <button onClick={onClick}>Click Me</button>
);
```

## Common Patterns

### Event Handlers

```jsx
<Button onClick={() => alert('Clicked!')} />
<Input onChange={(e) => setValue(e.target.value)} />
<Form onSubmit={handleSubmit} />
```

### With Arguments

```jsx
// Parent
const handleDelete = (id) => {
  setItems(items.filter(item => item.id !== id));
};

// Child
<DeleteButton onClick={() => onDelete(item.id)} />
```

### Multiple Callbacks

```jsx
<TodoItem
  todo={todo}
  onToggle={() => toggleTodo(todo.id)}
  onDelete={() => deleteTodo(todo.id)}
  onEdit={(newText) => editTodo(todo.id, newText)}
/>
```

## Naming Conventions

Use `on` prefix for props, `handle` for handlers:

```jsx
// Parent - handler functions use "handle"
const handleClick = () => { ... };
const handleChange = () => { ... };

// Passing to child - props use "on"
<Child onClick={handleClick} onChange={handleChange} />
```

## Lifting State Up

Keep state in parent, pass functions to children:

```jsx
const Parent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Display value={count} />
      <Controls
        onIncrement={() => setCount(c => c + 1)}
        onDecrement={() => setCount(c => c - 1)}
        onReset={() => setCount(0)}
      />
    </div>
  );
};
```

## Common Use Cases

1. **Form handling** - onChange, onSubmit
2. **List operations** - onDelete, onEdit, onSelect
3. **Modal control** - onClose, onConfirm
4. **Navigation** - onNavigate, onBack
5. **Data fetching** - onRefresh, onLoadMore

## Performance Consideration

Wrap callbacks with `useCallback` when passing to memoized children:

```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

<MemoizedChild onClick={handleClick} />
```

## Best Practices

1. **Name clearly** - `onItemDelete` not `callback1`
2. **Keep focused** - One purpose per function
3. **Document expected parameters**
4. **Handle errors gracefully**
