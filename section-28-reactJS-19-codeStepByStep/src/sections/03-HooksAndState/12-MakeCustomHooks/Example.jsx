import { useState, useEffect, useCallback, useRef } from 'react';

// =====================
// Custom Hook: useToggle
// =====================
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}

// =====================
// Custom Hook: useLocalStorage
// =====================
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// =====================
// Custom Hook: useFetch
// =====================
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// =====================
// Custom Hook: useDebounce
// =====================
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// =====================
// Custom Hook: usePrevious
// =====================
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const MakeCustomHooksExample = () => {
  const [activeDemo, setActiveDemo] = useState('toggle');
  
  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const demos = [
    { id: 'toggle', label: 'useToggle' },
    { id: 'localStorage', label: 'useLocalStorage' },
    { id: 'fetch', label: 'useFetch' },
    { id: 'debounce', label: 'useDebounce' },
    { id: 'previous', label: 'usePrevious' },
  ];

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Custom Hooks</h2>

        {/* What are Custom Hooks */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What are Custom Hooks?</h3>
          <p style={{ color: '#666' }}>
            Custom hooks are functions that start with "use" and can call other hooks.
            They let you extract and share stateful logic between components.
          </p>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// Custom hook pattern
function useCustomHook() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return { state, setState };
}

// Usage in component
function MyComponent() {
  const { state, setState } = useCustomHook();
}`}
          </pre>
        </div>

        {/* Demo Navigation */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Examples</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {demos.map(demo => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeDemo === demo.id ? '#667eea' : '#e0e0e0',
                  color: activeDemo === demo.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: activeDemo === demo.id ? 'bold' : 'normal',
                }}
              >
                {demo.label}
              </button>
            ))}
          </div>

          {activeDemo === 'toggle' && <UseToggleDemo />}
          {activeDemo === 'localStorage' && <UseLocalStorageDemo />}
          {activeDemo === 'fetch' && <UseFetchDemo />}
          {activeDemo === 'debounce' && <UseDebounceDemo />}
          {activeDemo === 'previous' && <UsePreviousDemo />}
        </div>

        {/* Rules for Custom Hooks */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Rules for Custom Hooks</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { title: 'Start with "use"', desc: 'useMyHook, useAuth, useFetch - required naming convention' },
              { title: 'Can call other hooks', desc: 'useState, useEffect, useRef, or other custom hooks' },
              { title: 'Pure functions', desc: 'Same inputs should produce same outputs' },
              { title: 'Isolated state', desc: 'Each component using the hook gets its own state copy' },
            ].map(item => (
              <div key={item.title} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <strong>{item.title}</strong>
                <span style={{ color: '#666', marginLeft: '0.5rem' }}>— {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================
// Demo Components
// =====================

function UseToggleDemo() {
  const { value: isOpen, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
      <h4 style={{ marginTop: 0 }}>useToggle Demo</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>State:</strong> {isOpen ? 'Open' : 'Closed'}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={toggle} style={{ padding: '0.5rem 1rem' }}>Toggle</button>
        <button onClick={setTrue} style={{ padding: '0.5rem 1rem' }}>Set True</button>
        <button onClick={setFalse} style={{ padding: '0.5rem 1rem' }}>Set False</button>
      </div>

      <pre style={{ marginTop: '1rem', padding: '0.75rem', background: '#e8e8e8', borderRadius: '4px', fontSize: '0.8rem' }}>
{`function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return { value, toggle, setTrue, setFalse };
}`}
      </pre>
    </div>
  );
}

function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '');

  return (
    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
      <h4 style={{ marginTop: 0 }}>useLocalStorage Demo</h4>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box', marginBottom: '0.5rem' }}
      />
      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        Value persists in localStorage. Refresh the page to verify!
      </p>

      <pre style={{ marginTop: '1rem', padding: '0.75rem', background: '#e8e8e8', borderRadius: '4px', fontSize: '0.8rem' }}>
{`function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  // ... setValue with localStorage.setItem
}`}
      </pre>
    </div>
  );
}

function UseFetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users/1');

  return (
    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
      <h4 style={{ marginTop: 0 }}>useFetch Demo</h4>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div style={{ padding: '0.75rem', background: '#e8e8e8', borderRadius: '4px' }}>
          <strong>{data.name}</strong><br />
          <span style={{ color: '#666' }}>{data.email}</span>
        </div>
      )}

      <pre style={{ marginTop: '1rem', padding: '0.75rem', background: '#e8e8e8', borderRadius: '4px', fontSize: '0.8rem' }}>
{`function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url).then(res => res.json())...
  }, [url]);
  
  return { data, loading, error };
}`}
      </pre>
    </div>
  );
}

function UseDebounceDemo() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
      <h4 style={{ marginTop: 0 }}>useDebounce Demo</h4>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type fast..."
        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box', marginBottom: '0.5rem' }}
      />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div style={{ padding: '0.5rem', background: '#e3f2fd', borderRadius: '4px' }}>
          <small>Immediate:</small> <strong>{inputValue}</strong>
        </div>
        <div style={{ padding: '0.5rem', background: '#e8f5e9', borderRadius: '4px' }}>
          <small>Debounced (500ms):</small> <strong>{debouncedValue}</strong>
        </div>
      </div>

      <pre style={{ marginTop: '1rem', padding: '0.75rem', background: '#e8e8e8', borderRadius: '4px', fontSize: '0.8rem' }}>
{`function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}`}
      </pre>
    </div>
  );
}

function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
      <h4 style={{ marginTop: 0 }}>usePrevious Demo</h4>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setCount(c => c + 1)} style={{ padding: '0.5rem 1rem' }}>Increment</button>
        <span>Current: <strong>{count}</strong></span>
        <span>Previous: <strong>{previousCount ?? 'undefined'}</strong></span>
      </div>

      <pre style={{ marginTop: '1rem', padding: '0.75rem', background: '#e8e8e8', borderRadius: '4px', fontSize: '0.8rem' }}>
{`function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current; // Returns old value during render
}`}
      </pre>
    </div>
  );
}

export default MakeCustomHooksExample;
