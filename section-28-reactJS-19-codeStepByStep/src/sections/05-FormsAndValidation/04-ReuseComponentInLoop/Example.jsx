import { useState } from 'react';

const UserCard = ({ user, onEdit, onDelete }) => (
  <div style={{
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <div>
      <div style={{ fontWeight: 'bold', color: '#333' }}>{user.name}</div>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
      <span style={{
        display: 'inline-block',
        marginTop: '0.25rem',
        padding: '0.125rem 0.5rem',
        backgroundColor: user.role === 'Admin' ? '#e3f2fd' : '#f5f5f5',
        borderRadius: '4px',
        fontSize: '0.75rem',
      }}>
        {user.role}
      </span>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={() => onEdit(user)}
        style={{
          padding: '0.4rem 0.75rem',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user.id)}
        style={{
          padding: '0.4rem 0.75rem',
          backgroundColor: 'transparent',
          color: '#f44336',
          border: '1px solid #f44336',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

const ProductCard = ({ product, onAddToCart }) => (
  <div style={{
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  }}>
    <div style={{
      width: '100%',
      height: '120px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      marginBottom: '1rem',
    }}>
      {product.emoji}
    </div>
    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{product.name}</h4>
    <div style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.75rem' }}>
      ${product.price.toFixed(2)}
    </div>
    <button
      onClick={() => onAddToCart(product)}
      disabled={!product.inStock}
      style={{
        width: '100%',
        padding: '0.5rem',
        backgroundColor: product.inStock ? '#4caf50' : '#e0e0e0',
        color: product.inStock ? 'white' : '#999',
        border: 'none',
        borderRadius: '6px',
        cursor: product.inStock ? 'pointer' : 'not-allowed',
        fontWeight: 'bold',
      }}
    >
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  </div>
);

const FormField = ({ label, type = 'text', value, onChange, error, required }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
      {label} {required && <span style={{ color: '#f44336' }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '0.75rem',
        border: `2px solid ${error ? '#f44336' : '#ddd'}`,
        borderRadius: '6px',
        fontSize: '1rem',
        boxSizing: 'border-box',
      }}
    />
    {error && (
      <span style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
        {error}
      </span>
    )}
  </div>
);

export const ReuseComponentInLoopExample = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
  ]);

  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, inStock: true, emoji: '💻' },
    { id: 2, name: 'Headphones', price: 199, inStock: true, emoji: '🎧' },
    { id: 3, name: 'Keyboard', price: 79, inStock: false, emoji: '⌨️' },
    { id: 4, name: 'Mouse', price: 49, inStock: true, emoji: '🖱️' },
  ]);

  const [cart, setCart] = useState([]);

  const [formFields] = useState([
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel' },
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Reuse Component in Loop</h2>

        {/* User Cards */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>User Cards Component</h3>
          
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}>
{`// Reusable UserCard component
const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="user-card">
    <div>{user.name}</div>
    <button onClick={() => onEdit(user)}>Edit</button>
    <button onClick={() => onDelete(user.id)}>Delete</button>
  </div>
);

// Usage in loop
{users.map(user => (
  <UserCard
    key={user.id}
    user={user}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
))}`}
          </pre>
        </div>

        {/* Product Grid */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Product Grid Component</h3>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            Cart items: {cart.length}
          </div>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginBottom: '1.5rem' }}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}>
{`const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <h4>{product.name}</h4>
    <p>\${product.price}</p>
    <button 
      onClick={() => onAddToCart(product)}
      disabled={!product.inStock}
    >
      Add to Cart
    </button>
  </div>
);

{products.map(product => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={handleAddToCart}
  />
))}`}
          </pre>
        </div>

        {/* Dynamic Form Fields */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Dynamic Form Fields</h3>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {formFields.map(field => (
              <FormField
                key={field.name}
                label={field.label}
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                required={field.required}
              />
            ))}
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}>
{`const FormField = ({ label, type, value, onChange, required }) => (
  <div>
    <label>{label} {required && '*'}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

const formFields = [
  { name: 'firstName', label: 'First Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
];

{formFields.map(field => (
  <FormField
    key={field.name}
    label={field.label}
    type={field.type || 'text'}
    value={formData[field.name]}
    onChange={(e) => handleChange(field.name, e.target.value)}
    required={field.required}
  />
))}`}
          </pre>
        </div>

        {/* Benefits */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Benefits of Reusable Components</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '♻️', title: 'DRY Code', desc: 'Write once, use everywhere' },
              { icon: '🧩', title: 'Maintainability', desc: 'Update in one place' },
              { icon: '🧪', title: 'Testability', desc: 'Test component in isolation' },
              { icon: '📖', title: 'Readability', desc: 'Clear, focused components' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <span style={{ color: '#666' }}> - {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReuseComponentInLoopExample;
