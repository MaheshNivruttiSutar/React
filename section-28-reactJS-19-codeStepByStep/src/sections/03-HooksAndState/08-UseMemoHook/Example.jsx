import { useState, useMemo } from 'react';

const expensiveCalculation = (num) => {
  console.log('Running expensive calculation...');
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += num;
  }
  return result;
};

export const UseMemoHookExample = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  const [items] = useState([
    { id: 1, name: 'Apple', price: 1.5, category: 'fruit' },
    { id: 2, name: 'Banana', price: 0.75, category: 'fruit' },
    { id: 3, name: 'Carrot', price: 0.5, category: 'vegetable' },
    { id: 4, name: 'Milk', price: 2.0, category: 'dairy' },
    { id: 5, name: 'Cheese', price: 4.5, category: 'dairy' },
  ]);
  const [filterCategory, setFilterCategory] = useState('all');

  const expensiveResult = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return filterCategory === 'all'
      ? items
      : items.filter(item => item.category === filterCategory);
  }, [items, filterCategory]);

  const totalPrice = useMemo(() => {
    console.log('Calculating total...');
    return filteredItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [filteredItems]);

  const sortedItems = useMemo(() => {
    console.log('Sorting items...');
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useMemo Hook</h2>

        {/* What is useMemo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useMemo?</h3>
          <p style={{ color: '#666' }}>
            useMemo memoizes the result of a computation. It only recalculates when dependencies change,
            preventing expensive calculations on every render.
          </p>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]); // Only recomputes when a or b changes`}
          </pre>
        </div>

        {/* Expensive Calculation Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Expensive Calculation Demo</h3>
          
          <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px', marginBottom: '1rem' }}>
            <strong>Check console</strong> - The expensive calculation only runs when the number changes, not when count changes.
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Number (changes expensive calc)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => setNumber(n => Math.max(1, n - 1))} style={{ padding: '0.25rem 0.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{number}</span>
                <button onClick={() => setNumber(n => n + 1)} style={{ padding: '0.25rem 0.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
              </div>
            </div>
            
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Count (doesn't trigger calc)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => setCount(c => c - 1)} style={{ padding: '0.25rem 0.5rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{count}</span>
                <button onClick={() => setCount(c => c + 1)} style={{ padding: '0.25rem 0.5rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Expensive Result:</strong> {expensiveResult.toLocaleString()}
          </div>
        </div>

        {/* Filtering/Sorting Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Filter & Derived Values</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ padding: '0.5rem', border: '2px solid #ddd', borderRadius: '4px' }}
            >
              <option value="all">All</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="dairy">Dairy</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            {sortedItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#f5f5f5', marginBottom: '0.25rem', borderRadius: '4px' }}>
                <span>{item.name}</span>
                <span style={{ color: '#666' }}>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '0.75rem', background: '#e8f5e9', borderRadius: '6px', fontWeight: 'bold' }}>
            Total: ${totalPrice}
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`const filteredItems = useMemo(() => {
  return items.filter(item => item.category === filter);
}, [items, filter]);

const total = useMemo(() => {
  return filteredItems.reduce((sum, i) => sum + i.price, 0);
}, [filteredItems]);`}
          </pre>
        </div>

        {/* When to Use */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>When to Use useMemo</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>Good use cases:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Expensive calculations</li>
                <li>Filtering/sorting large arrays</li>
                <li>Creating objects for context</li>
                <li>Derived state from props/state</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px' }}>
              <strong>Avoid when:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Simple calculations</li>
                <li>Operations that are already fast</li>
                <li>Every render (adds overhead)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseMemoHookExample;
