import { useState, useMemo } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 249.99, image: '⌚' },
  { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻' },
  { id: 4, name: 'USB-C Hub', price: 79.99, image: '🔌' },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️' },
  { id: 6, name: 'Wireless Mouse', price: 59.99, image: '🖱️' },
];

export const ShoppingCartExample = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem', textAlign: 'center' }}>
          Shopping Cart
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Products Section */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Products</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {PRODUCTS.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                    {product.image}
                  </div>
                  <h4 style={{ margin: '0.5rem 0', color: '#333' }}>{product.name}</h4>
                  <p style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem 1.5rem',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            height: 'fit-content',
            position: 'sticky',
            top: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                Cart ({cartItemCount})
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: '#ff4757',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>
                Your cart is empty
              </p>
            ) : (
              <>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem 0',
                        borderBottom: '1px solid #eee',
                        gap: '1rem',
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{item.image}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>
                          {item.name}
                        </p>
                        <p style={{ margin: 0, color: '#667eea', fontSize: '0.85rem' }}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: '#f0f0f0',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: '#f0f0f0',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ff4757',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid #eee',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Total:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#2ed573',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartExample;
