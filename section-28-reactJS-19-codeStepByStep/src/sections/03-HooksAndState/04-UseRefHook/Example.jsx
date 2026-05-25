import { useState, useRef, useEffect } from 'react';

export const UseRefHookExample = () => {
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const renderCountRef = useRef(0);
  const previousValueRef = useRef('');
  const timerIdRef = useRef(null);
  
  const [inputValue, setInputValue] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  renderCountRef.current += 1;

  useEffect(() => {
    previousValueRef.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, [isRunning]);

  const focusInput = () => inputRef.current?.focus();
  const selectInput = () => inputRef.current?.select();
  const blurInput = () => inputRef.current?.blur();

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useRef Hook</h2>

        {/* What is useRef */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useRef?</h3>
          <p style={{ color: '#666' }}>
            useRef returns a mutable object that persists across renders. It has two main uses:
          </p>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>1. DOM Access</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                Reference DOM elements for direct manipulation
              </p>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>2. Mutable Storage</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                Store values without triggering re-renders
              </p>
            </div>
          </div>
        </div>

        {/* DOM Reference */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>DOM Reference Example</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Click buttons to control this input..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #667eea',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button onClick={focusInput} style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Focus Input
            </button>
            <button onClick={selectInput} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Select All
            </button>
            <button onClick={blurInput} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Blur Input
            </button>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const inputRef = useRef(null);

<input ref={inputRef} />

// Access DOM element
inputRef.current.focus();
inputRef.current.select();
inputRef.current.blur();`}
          </pre>
        </div>

        {/* Render Count */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Tracking Without Re-renders</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Render Count</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>{renderCountRef.current}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Stored in ref, no re-render on change</div>
            </div>
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Previous Value</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e65100' }}>{previousValueRef.current || '(empty)'}</div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type to see previous value..."
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
            />
            <div style={{ marginTop: '0.5rem', color: '#666' }}>
              Current: "{inputValue}" | Previous: "{previousValueRef.current}"
            </div>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const renderCountRef = useRef(0);
const previousValueRef = useRef('');

// Increment on every render (no re-render caused)
renderCountRef.current += 1;

// Store previous value
useEffect(() => {
  previousValueRef.current = value;
}, [value]);`}
          </pre>
        </div>

        {/* Timer with Ref */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Timer ID Storage</h3>
          
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea', marginBottom: '1rem' }}>
              {timerSeconds}s
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                onClick={() => setIsRunning(!isRunning)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: isRunning ? '#f44336' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {isRunning ? 'Stop' : 'Start'}
              </button>
              <button
                onClick={() => { setTimerSeconds(0); setIsRunning(false); }}
                style={{ padding: '0.75rem 1.5rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const timerIdRef = useRef(null);

useEffect(() => {
  if (isRunning) {
    timerIdRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }
  
  return () => {
    clearInterval(timerIdRef.current);
  };
}, [isRunning]);`}
          </pre>
        </div>

        {/* useRef vs useState */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>useRef vs useState</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>useState</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Triggers re-render on change</li>
                <li>Value via state variable</li>
                <li>For UI-related data</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>useRef</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>No re-render on change</li>
                <li>Value via .current</li>
                <li>For non-UI data, DOM access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseRefHookExample;
