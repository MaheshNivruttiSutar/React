import { useState } from 'react';

export const LoopWithMapFunctionExample = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  ]);

  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse', price: 29, inStock: true },
    { id: 3, name: 'Keyboard', price: 79, inStock: false },
    { id: 4, name: 'Monitor', price: 349, inStock: true },
  ]);

  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Loop with Map Function</h2>

        {/* Basic Array Map */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Basic Array Map</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
            marginBottom: '1rem',
          }}>
{`const fruits = ['Apple', 'Banana', 'Orange'];

{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
))}

// With unique IDs (preferred)
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}`}
          </pre>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'].map((fruit, index) => (
              <span key={index} style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e3f2fd',
                borderRadius: '20px',
                fontSize: '0.9rem',
              }}>
                {fruit}
              </span>
            ))}
          </div>
        </div>

        {/* Object Array - User List */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Object Array - User Cards</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {users.map(user => (
              <div key={user.id} style={{
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #eee',
              }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{user.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
                <span style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: user.role === 'Admin' ? '#e3f2fd' : '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                }}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
            marginTop: '1rem',
          }}>
{`{users.map(user => (
  <div key={user.id}>
    <div>{user.name}</div>
    <div>{user.email}</div>
    <span>{user.role}</span>
  </div>
))}`}
          </pre>
        </div>

        {/* Table with Map */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Table with Map</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.75rem' }}>{product.name}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>${product.price}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: product.inStock ? '#e8f5e9' : '#ffebee',
                        color: product.inStock ? '#2e7d32' : '#c62828',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                      }}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive List with Map */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive List (Todo)</h3>
          
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {todos.map(todo => (
              <label
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: todo.completed ? '#e8f5e9' : '#f5f5f5',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ width: '20px', height: '20px' }}
                />
                <span style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#999' : '#333',
                }}>
                  {todo.text}
                </span>
              </label>
            ))}
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
            marginTop: '1rem',
          }}>
{`const toggleTodo = (id) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id 
      ? { ...todo, completed: !todo.completed } 
      : todo
  ));
};

{todos.map(todo => (
  <label key={todo.id}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
    />
    {todo.text}
  </label>
))}`}
          </pre>
        </div>

        {/* Key Prop Explanation */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Why Keys Matter</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Bad Keys</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Using index when list can reorder</li>
                <li>Using Math.random()</li>
                <li>Missing key prop</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Good Keys</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Unique ID from data</li>
                <li>Database primary key</li>
                <li>UUID or stable identifier</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoopWithMapFunctionExample;
