# Reuse Component in Loop

## Why Reuse Components?

Instead of writing JSX directly in map(), extract reusable components for cleaner, more maintainable code.

## Basic Pattern

### Before (Inline JSX)

```jsx
{users.map(user => (
  <div key={user.id} className="user-card">
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    <button onClick={() => handleEdit(user)}>Edit</button>
    <button onClick={() => handleDelete(user.id)}>Delete</button>
  </div>
))}
```

### After (Reusable Component)

```jsx
// Extract component
const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    <button onClick={() => onEdit(user)}>Edit</button>
    <button onClick={() => onDelete(user.id)}>Delete</button>
  </div>
);

// Use in loop
{users.map(user => (
  <UserCard
    key={user.id}
    user={user}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
))}
```

## Component Design Patterns

### Props Object vs Individual Props

```jsx
// Pass entire object
<UserCard user={user} />

// Or spread individual props
<UserCard 
  name={user.name}
  email={user.email}
  role={user.role}
/>

// Or destructure in component
const UserCard = ({ user: { name, email, role } }) => (
  // ...
);
```

### Callback Props

```jsx
const ProductCard = ({ product, onAddToCart, onViewDetails }) => (
  <div>
    <h3>{product.name}</h3>
    <button onClick={() => onAddToCart(product)}>
      Add to Cart
    </button>
    <button onClick={() => onViewDetails(product.id)}>
      Details
    </button>
  </div>
);

// Parent handles the logic
const handleAddToCart = (product) => {
  setCart(prev => [...prev, product]);
};

{products.map(product => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={handleAddToCart}
    onViewDetails={handleViewDetails}
  />
))}
```

## Dynamic Form Fields

```jsx
const FormField = ({ 
  name, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error,
  required 
}) => (
  <div className="form-field">
    <label>
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'error' : ''}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

// Field configuration
const fields = [
  { name: 'firstName', label: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel' },
];

// Render dynamically
{fields.map(field => (
  <FormField
    key={field.name}
    {...field}
    value={formData[field.name]}
    onChange={handleChange}
    error={errors[field.name]}
  />
))}
```

## List Item with Actions

```jsx
const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
    />
    <span>{todo.text}</span>
    <div className="actions">
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  </li>
);

// Parent component
function TodoList() {
  const [todos, setTodos] = useState([...]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      ))}
    </ul>
  );
}
```

## Conditional Rendering in Components

```jsx
const StatusBadge = ({ status }) => {
  const styles = {
    active: { bg: '#e8f5e9', color: '#2e7d32' },
    pending: { bg: '#fff3e0', color: '#e65100' },
    inactive: { bg: '#ffebee', color: '#c62828' },
  };

  const style = styles[status] || styles.pending;

  return (
    <span style={{
      padding: '4px 12px',
      backgroundColor: style.bg,
      color: style.color,
      borderRadius: '12px',
    }}>
      {status}
    </span>
  );
};

// Use in list
{users.map(user => (
  <tr key={user.id}>
    <td>{user.name}</td>
    <td><StatusBadge status={user.status} /></td>
  </tr>
))}
```

## When to Extract a Component

Extract when:
- JSX is getting long (>10-15 lines)
- Same structure is used multiple times
- Has its own behavior/state
- Could be tested independently
- Improves readability

## Best Practices

1. **Name meaningfully** - `UserCard`, not `Item1`
2. **Single responsibility** - One purpose per component
3. **Pass callbacks** - Don't embed business logic
4. **Use prop types** - Document expected props
5. **Keep it focused** - Small, composable components
