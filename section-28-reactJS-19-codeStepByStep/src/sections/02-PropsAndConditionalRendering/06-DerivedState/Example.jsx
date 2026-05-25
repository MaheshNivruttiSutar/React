import { useState, useMemo } from 'react';

export const DerivedStateExample = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 2, category: 'Electronics' },
    { id: 2, name: 'Headphones', price: 199, quantity: 1, category: 'Electronics' },
    { id: 3, name: 'Desk Chair', price: 299, quantity: 1, category: 'Furniture' },
    { id: 4, name: 'Monitor', price: 399, quantity: 2, category: 'Electronics' },
    { id: 5, name: 'Keyboard', price: 79, quantity: 1, category: 'Electronics' },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredItems = useMemo(() => {
    let result = [...items];
    
    if (filter !== 'all') {
      result = result.filter(item => item.category === filter);
    }
    
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'quantity') return b.quantity - a.quantity;
      return a.name.localeCompare(b.name);
    });
    
    return result;
  }, [items, filter, searchTerm, sortBy]);

  const totalValue = useMemo(() => 
    items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [items]
  );

  const filteredTotalValue = useMemo(() =>
    filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [filteredItems]
  );

  const categories = useMemo(() => 
    ['all', ...new Set(items.map(item => item.category))],
    [items]
  );

  const itemCount = items.length;
  const filteredCount = filteredItems.length;

  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Derived State</h2>

        {/* Explanation */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is Derived State?</h3>
          <p style={{ color: '#666' }}>
            Derived state is data calculated from existing state rather than stored separately.
            Instead of syncing multiple state values, compute values on render.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
              <strong>Bad: Duplicate State</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
{`const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
// Must keep in sync!`}
              </pre>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px', borderLeft: '4px solid #4caf50' }}>
              <strong>Good: Derived</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
{`const [items, setItems] = useState([]);
const total = items.reduce(
  (sum, i) => sum + i.price, 0
);`}
              </pre>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Live Derived Values</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Total Items</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>{itemCount}</div>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Total Value</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#388e3c' }}>${totalValue.toLocaleString()}</div>
            </div>
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Filtered Items</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e65100' }}>{filteredCount}</div>
            </div>
            <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Filtered Value</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c2185b' }}>${filteredTotalValue.toLocaleString()}</div>
            </div>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// All these are DERIVED from the single "items" state
const itemCount = items.length;
const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const filteredItems = items.filter(item => ...);
const categories = [...new Set(items.map(item => item.category))];`}
          </pre>
        </div>

        {/* Filters */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Filter & Sort (Derived from Source State)</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items..."
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px' }}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
            </div>
          </div>

          {/* Items List */}
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: '#f5f5f5',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                    ({item.category})
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#667eea', fontWeight: 'bold' }}>${item.price}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ width: '30px', height: '30px', border: 'none', background: '#e0e0e0', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                    <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ width: '30px', height: '30px', border: 'none', background: '#e0e0e0', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                  </div>
                  <span style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* useMemo for Performance */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>useMemo for Expensive Derivations</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Use useMemo when computing derived state is expensive (filtering large lists, complex calculations).
          </p>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// Without useMemo - recalculates on EVERY render
const filteredItems = items.filter(item => item.category === filter);

// With useMemo - only recalculates when dependencies change
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === filter);
}, [items, filter]);  // Only recompute when these change`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DerivedStateExample;
