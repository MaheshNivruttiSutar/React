# Todo App Project

## What You'll Build

A fully functional Todo application with CRUD operations, filtering, and local storage persistence.

## Key Concepts Covered

### 1. State Management with useState

```jsx
const [todos, setTodos] = useState([]);
const [input, setInput] = useState('');
const [filter, setFilter] = useState('all');
```

Multiple state variables manage different aspects of the application.

### 2. Local Storage Persistence

```jsx
// Initialize state from localStorage
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});

// Sync to localStorage on changes
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

**Lazy initialization**: Passing a function to useState prevents reading localStorage on every render.

### 3. CRUD Operations

| Operation | Method | Description |
|-----------|--------|-------------|
| **Create** | `addTodo` | Add new todo with unique ID |
| **Read** | `filteredTodos` | Display todos based on filter |
| **Update** | `toggleTodo` | Toggle completion status |
| **Delete** | `deleteTodo` | Remove todo from list |

### 4. Immutable State Updates

```jsx
// Adding - spread operator creates new array
setTodos([...todos, newTodo]);

// Updating - map returns new array
setTodos(todos.map(todo =>
  todo.id === id ? { ...todo, completed: !todo.completed } : todo
));

// Deleting - filter returns new array
setTodos(todos.filter(todo => todo.id !== id));
```

**Never mutate state directly** - always create new arrays/objects.

### 5. Array Filter Method for Filtering

```jsx
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true; // 'all'
});
```

### 6. Computed Values

```jsx
const remainingCount = todos.filter(t => !t.completed).length;
```

Derive values from state instead of storing redundant data.

### 7. Form Handling

```jsx
const addTodo = (e) => {
  e.preventDefault(); // Prevent page refresh
  if (!input.trim()) return; // Validate input
  // ... add todo
  setInput(''); // Clear input
};
```

## Project Structure

```
01-TodoApp/
├── Example.jsx    # Main component with all logic
├── Notes.md       # This file - detailed explanations
└── README.md      # Quick overview
```

## Features Implemented

- Add new todos
- Mark todos as complete/incomplete
- Delete individual todos
- Filter by All/Active/Completed
- Clear all completed todos
- Persist data in localStorage
- Show remaining items count

## Common Patterns Used

### Conditional Rendering
```jsx
{todos.length === 0 ? (
  <p>No todos yet</p>
) : (
  todos.map(todo => <TodoItem key={todo.id} />)
)}
```

### Conditional Styling
```jsx
style={{
  textDecoration: todo.completed ? 'line-through' : 'none',
  color: todo.completed ? '#999' : '#333',
}}
```

## Best Practices Demonstrated

1. **Unique Keys**: Using `Date.now()` for unique IDs
2. **Controlled Components**: Input value controlled by state
3. **Single Source of Truth**: All data flows from state
4. **Separation of Concerns**: Clear functions for each operation

## Extension Ideas

- Edit existing todos
- Add due dates
- Drag and drop reordering
- Categories/tags
- Search functionality
- useReducer for complex state
