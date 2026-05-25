import { useState, memo, useCallback, useMemo } from 'react';

export const PureComponentExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Pure Components & React.memo</h2>

        {/* Example 1: Without Memo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>1. Without React.memo (Unnecessary Re-renders)</h3>
          <p style={{ color: '#666' }}>Open console to see render logs. Both components re-render on ANY state change:</p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setCount(c => c + 1)}
              style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Count: {count}
            </button>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type here..."
              style={{ padding: '0.5rem', border: '2px solid #e0e0e0', borderRadius: '4px', flex: 1 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#fff5f5', padding: '1rem', borderRadius: '6px', border: '1px solid #dc3545' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc3545' }}>Regular Component</h4>
              <RegularChild name="Regular" count={count} />
            </div>
            <div style={{ background: '#fff5f5', padding: '1rem', borderRadius: '6px', border: '1px solid #dc3545' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc3545' }}>Also Regular</h4>
              <RegularChild name="Also Regular" count={count} />
            </div>
          </div>
        </div>

        {/* Example 2: With Memo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>2. With React.memo (Optimized)</h3>
          <p style={{ color: '#666' }}>Memoized components only re-render when their props change:</p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setCount(c => c + 1)}
              style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Increment Count
            </button>
            <button
              onClick={() => setItems([...items, `Item ${items.length + 1}`])}
              style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add Item
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#f0fff4', padding: '1rem', borderRadius: '6px', border: '1px solid #28a745' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>Memoized (count prop)</h4>
              <MemoizedChild name="Counter" value={count} />
            </div>
            <div style={{ background: '#f0fff4', padding: '1rem', borderRadius: '6px', border: '1px solid #28a745' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>Memoized (items prop)</h4>
              <MemoizedList items={items} />
            </div>
          </div>
        </div>

        {/* Example 3: Memo with Callbacks */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>3. useCallback with React.memo</h3>
          <p style={{ color: '#666' }}>Functions create new references each render. Use useCallback to maintain reference:</p>

          <CallbackDemo />
        </div>

        {/* Example 4: Custom Comparison */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>4. Custom Comparison Function</h3>
          <p style={{ color: '#666' }}>React.memo accepts a custom comparison function:</p>

          <CustomComparisonDemo />

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`const MemoizedComponent = memo(MyComponent, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props are different (re-render)
  return prevProps.user.id === nextProps.user.id;
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Regular component - re-renders every time parent renders
const RegularChild = ({ name, count }) => {
  console.log(`${name} rendered`);
  return (
    <div>
      <p style={{ margin: 0 }}>Count: <strong>{count}</strong></p>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
        (Check console for render logs)
      </p>
    </div>
  );
};

// Memoized component - only re-renders when props change
const MemoizedChild = memo(({ name, value }) => {
  console.log(`Memoized ${name} rendered`);
  return (
    <div>
      <p style={{ margin: 0 }}>Value: <strong>{value}</strong></p>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
        (Only renders when value changes)
      </p>
    </div>
  );
});

const MemoizedList = memo(({ items }) => {
  console.log('MemoizedList rendered');
  return (
    <div>
      <p style={{ margin: '0 0 0.5rem 0' }}>Items: {items.length}</p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
        {items.slice(-3).map((item, i) => (
          <li key={i} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
});

// Callback Demo Component
const CallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Without useCallback - new function every render
  const handleClickBad = () => {
    console.log('Clicked!');
  };

  // With useCallback - same function reference
  const handleClickGood = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Count: {count}
        </button>
        <button
          onClick={() => setOtherState(s => s + 1)}
          style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Other: {otherState}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: '#fff5f5', padding: '1rem', borderRadius: '6px', border: '1px solid #dc3545' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc3545' }}>Without useCallback</h4>
          <ButtonWithoutCallback onClick={handleClickBad} label="Click Me" />
        </div>
        <div style={{ background: '#f0fff4', padding: '1rem', borderRadius: '6px', border: '1px solid #28a745' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>With useCallback</h4>
          <ButtonWithCallback onClick={handleClickGood} label="Click Me" />
        </div>
      </div>
    </div>
  );
};

const ButtonWithoutCallback = memo(({ onClick, label }) => {
  console.log('ButtonWithoutCallback rendered (always re-renders)');
  return (
    <button onClick={onClick} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
      {label}
    </button>
  );
});

const ButtonWithCallback = memo(({ onClick, label }) => {
  console.log('ButtonWithCallback rendered (only when props change)');
  return (
    <button onClick={onClick} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
      {label}
    </button>
  );
});

// Custom Comparison Demo
const CustomComparisonDemo = () => {
  const [user, setUser] = useState({ id: 1, name: 'John', visits: 0 });

  const incrementVisits = () => {
    setUser(prev => ({ ...prev, visits: prev.visits + 1 }));
  };

  const changeName = () => {
    setUser(prev => ({ ...prev, name: prev.name === 'John' ? 'Jane' : 'John' }));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={incrementVisits}
          style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Increment Visits ({user.visits})
        </button>
        <button
          onClick={changeName}
          style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Change Name
        </button>
      </div>

      <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px' }}>
        <UserCard user={user} />
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
          (Only re-renders when name changes, ignores visits)
        </p>
      </div>
    </div>
  );
};

const UserCard = memo(
  ({ user }) => {
    console.log('UserCard rendered');
    return (
      <div>
        <p style={{ margin: 0 }}>
          <strong>Name:</strong> {user.name} | <strong>Visits:</strong> {user.visits}
        </p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if name changes (ignore visits)
    return prevProps.user.name === nextProps.user.name;
  }
);

export default PureComponentExample;
