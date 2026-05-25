import { useState } from 'react';

export const ClickEventAndFunctionCallExample = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addLog = (text) => {
    setLogs(prev => [...prev, { id: Date.now(), text, time: new Date().toLocaleTimeString() }]);
  };

  const handleClick = () => {
    addLog('Basic click handler called');
  };

  const handleClickWithArg = (name) => {
    addLog(`Hello, ${name}!`);
  };

  const handleClickWithEvent = (event) => {
    addLog(`Clicked at: (${event.clientX}, ${event.clientY})`);
  };

  const handleClickWithBoth = (name, event) => {
    addLog(`${name} clicked button at (${event.clientX}, ${event.clientY})`);
  };

  const handleDoubleClick = () => {
    addLog('Double click detected!');
  };

  const handleMouseEnter = () => {
    setMessage('Mouse entered!');
  };

  const handleMouseLeave = () => {
    setMessage('');
  };

  const clearLogs = () => setLogs([]);

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Click Events & Function Calls</h2>

        {/* Event Log Display */}
        <div style={{ ...cardStyle, background: '#1e1e1e', color: '#d4d4d4', position: 'sticky', top: '1rem', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, color: '#4caf50' }}>Event Log</h4>
            <button onClick={clearLogs} style={{ ...buttonStyle, padding: '0.25rem 0.75rem', fontSize: '0.85rem', background: '#f44336', margin: 0 }}>
              Clear
            </button>
          </div>
          <div style={{ maxHeight: '100px', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#666' }}>Click buttons below to see events...</div>
            ) : (
              logs.slice(-5).map(log => (
                <div key={log.id} style={{ padding: '0.25rem 0' }}>
                  <span style={{ color: '#666' }}>[{log.time}]</span> {log.text}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Basic onClick */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Basic onClick Handler</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={handleClick} style={buttonStyle}>
              Click Me
            </button>
            
            <button onClick={() => addLog('Inline arrow function')} style={{ ...buttonStyle, background: '#4caf50' }}>
              Inline Handler
            </button>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// Named function
const handleClick = () => {
  console.log('Button clicked!');
};
<button onClick={handleClick}>Click Me</button>

// Inline arrow function
<button onClick={() => console.log('Clicked!')}>
  Click
</button>`}
          </pre>
        </div>

        {/* Passing Arguments */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Passing Arguments to Handlers</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => handleClickWithArg('Alice')} style={buttonStyle}>
              Greet Alice
            </button>
            <button onClick={() => handleClickWithArg('Bob')} style={{ ...buttonStyle, background: '#9c27b0' }}>
              Greet Bob
            </button>
            <button onClick={() => handleClickWithArg(inputValue || 'Guest')} style={{ ...buttonStyle, background: '#ff9800' }}>
              Greet Custom
            </button>
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter name..."
            style={{ padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px', marginBottom: '1rem', width: '200px' }}
          />

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const handleGreet = (name) => {
  alert(\`Hello, \${name}!\`);
};

// ✅ Correct: Wrap in arrow function
<button onClick={() => handleGreet('Alice')}>
  Greet Alice
</button>

// ❌ Wrong: This calls immediately!
<button onClick={handleGreet('Alice')}>
  Greet Alice
</button>`}
          </pre>
        </div>

        {/* Event Object */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Accessing the Event Object</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={handleClickWithEvent} style={buttonStyle}>
              Click for Coordinates
            </button>
            <button onClick={(e) => handleClickWithBoth('User', e)} style={{ ...buttonStyle, background: '#00bcd4' }}>
              With Args + Event
            </button>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// Event is passed automatically
const handleClick = (event) => {
  console.log('X:', event.clientX);
  console.log('Y:', event.clientY);
  console.log('Target:', event.target);
};
<button onClick={handleClick}>Click</button>

// With additional arguments
const handleClick = (name, event) => {
  console.log(name, event.target);
};
<button onClick={(e) => handleClick('User', e)}>
  Click
</button>`}
          </pre>
        </div>

        {/* Other Mouse Events */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Other Mouse Events</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <button
              onDoubleClick={handleDoubleClick}
              style={{ ...buttonStyle, background: '#e91e63' }}
            >
              Double Click Me
            </button>
            
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ ...buttonStyle, background: message ? '#4caf50' : '#9e9e9e' }}
            >
              Hover Me {message && '✓'}
            </button>
          </div>

          {message && (
            <div style={{ padding: '0.75rem', background: '#e8f5e9', borderRadius: '6px', marginBottom: '1rem' }}>
              {message}
            </div>
          )}

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`// Double click
<button onDoubleClick={handleDoubleClick}>
  Double Click
</button>

// Hover events
<button 
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  Hover Me
</button>

// Other events: onMouseDown, onMouseUp, onMouseMove`}
          </pre>
        </div>

        {/* Counter Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Practical Example: Counter</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setCount(c => c - 1)}
              style={{ ...buttonStyle, background: '#f44336', width: '50px' }}
            >
              -
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
              {count}
            </span>
            <button
              onClick={() => setCount(c => c + 1)}
              style={{ ...buttonStyle, background: '#4caf50', width: '50px' }}
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              style={{ ...buttonStyle, background: '#9e9e9e' }}
            >
              Reset
            </button>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [count, setCount] = useState(0);

<button onClick={() => setCount(c => c - 1)}>-</button>
<span>{count}</span>
<button onClick={() => setCount(c => c + 1)}>+</button>
<button onClick={() => setCount(0)}>Reset</button>`}
          </pre>
        </div>

        {/* Common Mistakes */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#f44336' }}>Common Mistakes</h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
              <strong>Calling instead of passing function</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
{`// ❌ Wrong: Calls immediately on render
<button onClick={handleClick()}>

// ✅ Correct: Passes function reference
<button onClick={handleClick}>`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
              <strong>Not wrapping handler with arguments</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
{`// ❌ Wrong: Calls immediately
<button onClick={greet('Alice')}>

// ✅ Correct: Wrap in arrow function
<button onClick={() => greet('Alice')}>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickEventAndFunctionCallExample;
