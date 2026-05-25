import { useState } from 'react';

// Child Components to demonstrate props
const Greeting = ({ name, age, isVip = false }) => (
  <div style={{ padding: '1rem', background: isVip ? '#fff3cd' : '#e3f2fd', borderRadius: '6px', marginBottom: '0.5rem' }}>
    <h4 style={{ margin: '0 0 0.5rem 0', color: isVip ? '#856404' : '#1976d2' }}>
      {isVip && '⭐'} Hello, {name}!
    </h4>
    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
      Age: {age} | Status: {isVip ? 'VIP Member' : 'Regular Member'}
    </p>
  </div>
);

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  const styles = {
    primary: { background: '#667eea', color: 'white' },
    success: { background: '#4caf50', color: 'white' },
    danger: { background: '#f44336', color: 'white' },
    secondary: { background: '#9e9e9e', color: 'white' }
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontSize: '1rem',
        ...styles[variant]
      }}
    >
      {children}
    </button>
  );
};

const ProductCard = ({ product, onAddToCart, onToggleFavorite }) => (
  <div style={{ 
    border: '2px solid #e0e0e0', 
    borderRadius: '8px', 
    padding: '1rem', 
    background: 'white',
    position: 'relative'
  }}>
    <div style={{ 
      position: 'absolute', 
      top: '0.5rem', 
      right: '0.5rem',
      cursor: 'pointer',
      fontSize: '1.2rem'
    }} onClick={() => onToggleFavorite(product.id)}>
      {product.isFavorite ? '❤️' : '🤍'}
    </div>
    
    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{product.name}</h4>
    <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>{product.description}</p>
    <p style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
      ${product.price}
    </p>
    
    <Button 
      onClick={() => onAddToCart(product)} 
      variant="success"
      disabled={product.outOfStock}
    >
      {product.outOfStock ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  </div>
);

const UserProfile = ({ user, children }) => (
  <div style={{ border: '2px solid #667eea', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        borderRadius: '50%', 
        background: '#667eea', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginRight: '1rem'
      }}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <h3 style={{ margin: 0, color: '#333' }}>{user.name}</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{user.email}</p>
      </div>
    </div>
    {children}
  </div>
);

// Main Component
export const WhatarepropsExample = () => {
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', age: 28, isVip: true },
    { id: 2, name: 'Bob Smith', age: 35, isVip: false },
    { id: 3, name: 'Carol Davis', age: 42, isVip: true }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999, isFavorite: false, outOfStock: false },
    { id: 2, name: 'Headphones', description: 'Noise-canceling headphones', price: 199, isFavorite: true, outOfStock: false },
    { id: 3, name: 'Tablet', description: 'Lightweight tablet', price: 449, isFavorite: false, outOfStock: true }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedUser] = useState({ name: 'John Doe', email: 'john@example.com' });

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const toggleFavorite = (productId) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>What Are Props? - Complete Examples</h2>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* Basic Props Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📝 Basic Props (String, Number, Boolean)</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Passing different data types as props to components
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              {users.map(user => (
                <Greeting 
                  key={user.id}
                  name={user.name}
                  age={user.age}
                  isVip={user.isVip}
                />
              ))}
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`<Greeting 
  name="Alice Johnson"    // String prop
  age={28}               // Number prop  
  isVip={true}           // Boolean prop
/>`}
            </div>
          </div>

          {/* Function Props Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔧 Function Props & Event Handling</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Passing functions as props to handle events and communicate back to parent
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <Button onClick={() => alert('Primary clicked!')} variant="primary">
                Primary Button
              </Button>
              <Button onClick={() => alert('Success!')} variant="success">
                Success Button  
              </Button>
              <Button onClick={() => alert('Danger!')} variant="danger">
                Danger Button
              </Button>
              <Button onClick={() => alert('Secondary!')} variant="secondary">
                Secondary Button
              </Button>
              <Button onClick={() => alert('Disabled')} disabled>
                Disabled Button
              </Button>
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`<Button 
  onClick={() => alert('Clicked!')}  // Function prop
  variant="primary"                  // String prop
  disabled={false}                   // Boolean prop
>
  Click Me                          // children prop
</Button>`}
            </div>
          </div>

          {/* Object Props & Complex Data */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📦 Object Props & Complex Data</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Passing objects and arrays as props, with callback functions
            </p>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '1rem' }}>
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}                    // Object prop
                  onAddToCart={handleAddToCart}       // Function prop
                  onToggleFavorite={toggleFavorite}   // Function prop
                />
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px', marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#388e3c' }}>
                  🛒 Shopping Cart ({cart.length} items)
                </h4>
                {cart.map((item, index) => (
                  <span key={index} style={{ 
                    display: 'inline-block', 
                    padding: '0.25rem 0.5rem', 
                    background: 'white', 
                    borderRadius: '4px', 
                    margin: '0.25rem 0.25rem 0 0',
                    fontSize: '0.9rem'
                  }}>
                    {item.name}
                  </span>
                ))}
                <Button onClick={clearCart} variant="danger" style={{ marginLeft: '1rem' }}>
                  Clear Cart
                </Button>
              </div>
            )}
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`<ProductCard
  product={{ id: 1, name: 'Laptop', price: 999 }}  // Object prop
  onAddToCart={(product) => addToCart(product)}     // Function prop
  onToggleFavorite={(id) => toggleFav(id)}          // Function prop
/>`}
            </div>
          </div>

          {/* Children Props Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>👶 Children Props & Composition</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Using children props to pass JSX content and create reusable wrapper components
            </p>
            
            <UserProfile user={selectedUser}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Profile Details</h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                  This content is passed as <code>children</code> prop to the UserProfile component.
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  The UserProfile component wraps this content with consistent styling and user info.
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="primary">Edit Profile</Button>
                <Button variant="secondary">View Posts</Button>
              </div>
            </UserProfile>

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`<UserProfile user={selectedUser}>
  <div>
    <h4>Profile Details</h4>
    <p>This content is the 'children' prop</p>
    <Button>Edit Profile</Button>
  </div>
</UserProfile>

// In UserProfile component:
const UserProfile = ({ user, children }) => (
  <div className="profile-wrapper">
    <UserHeader user={user} />
    {children}  {/* Rendered here */}
  </div>
);`}
            </div>
          </div>

          {/* Props Best Practices */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#667eea' }}>💡 Props Best Practices</h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
                <strong>✅ Default Props</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  Use default parameters: <code>variant = 'primary'</code>
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
                <strong>✅ Destructuring</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  Destructure props: <code>{'({ name, age })'}</code>
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
                <strong>✅ Meaningful Names</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  Use clear prop names like <code>onAddToCart</code>
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px' }}>
                <strong>✅ Immutable Props</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  Props are read-only - never modify them directly
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatarepropsExample;