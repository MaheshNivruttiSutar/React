# Loop with Map Function

## Why map()?

In React, we use `map()` to transform arrays into lists of elements. It's the standard way to render dynamic lists.

## Basic Syntax

```jsx
const items = ['Apple', 'Banana', 'Orange'];

{items.map((item, index) => (
  <li key={index}>{item}</li>
))}
```

## Map with Objects

```jsx
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

{users.map(user => (
  <div key={user.id}>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
))}
```

## Key Prop

Every element in a mapped array needs a unique `key` prop.

### Good Keys

```jsx
// Use unique ID from data
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// Use unique field
{products.map(product => (
  <Product key={product.sku} data={product} />
))}
```

### Bad Keys

```jsx
// ❌ Using index when list can change
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// ❌ Using Math.random()
{items.map(item => (
  <li key={Math.random()}>{item}</li>
))}
```

### When Index is OK

- Static lists that never change
- No reordering, adding, or removing
- Items have no stable ID

## Common Patterns

### Cards Grid

```jsx
<div className="grid">
  {products.map(product => (
    <div key={product.id} className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  ))}
</div>
```

### Table Rows

```jsx
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### List Items

```jsx
<ul>
  {items.map(item => (
    <li key={item.id}>
      {item.name}
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </li>
  ))}
</ul>
```

### Select Options

```jsx
<select>
  <option value="">Select...</option>
  {options.map(opt => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>
```

## Conditional Rendering in Map

```jsx
{items.map(item => (
  item.isVisible && (
    <div key={item.id}>{item.name}</div>
  )
))}

// Or with filter + map
{items
  .filter(item => item.isVisible)
  .map(item => (
    <div key={item.id}>{item.name}</div>
  ))
}
```

## Nested Maps

```jsx
{categories.map(category => (
  <div key={category.id}>
    <h2>{category.name}</h2>
    <ul>
      {category.items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
))}
```

## Map with Index

```jsx
{items.map((item, index) => (
  <div key={item.id}>
    <span>{index + 1}.</span>
    <span>{item.name}</span>
  </div>
))}
```

## Updating Items in a Mapped List

```jsx
const toggleComplete = (id) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
};

const updateItem = (id, newValue) => {
  setItems(prev => prev.map(item =>
    item.id === id
      ? { ...item, value: newValue }
      : item
  ));
};
```

## Empty State Handling

```jsx
{items.length === 0 ? (
  <p>No items found</p>
) : (
  items.map(item => (
    <Item key={item.id} data={item} />
  ))
)}
```

## Fragment with Key

```jsx
{items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))}
```

## Best Practices

1. **Always provide a key** - Unique and stable
2. **Avoid index as key** - When list can change
3. **Keep components pure** - Don't modify items in render
4. **Extract components** - For complex list items
5. **Use semantic elements** - `<ul>`, `<ol>`, `<table>`
