import { useState } from 'react';

export const JSXWithCurlyBracesExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React Developer');
  
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    age: 28,
    role: 'Developer',
    avatar: 'https://i.pravatar.cc/100',
  };

  const items = ['Apple', 'Banana', 'Cherry', 'Date'];
  const today = new Date();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>JSX with Curly Braces</h2>

        {/* Variables */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Embedding Variables</h3>
          
          <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>Hello, <strong>{name}</strong>!</p>
            <p style={{ margin: '0.5rem 0 0 0' }}>You have clicked <strong>{count}</strong> times.</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1, padding: '0.75rem', border: '2px solid #667eea', borderRadius: '6px' }}
              placeholder="Enter your name"
            />
            <button
              onClick={() => setCount(c => c + 1)}
              style={{ padding: '0.75rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Click Me
            </button>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [name, setName] = useState('React Developer');
const [count, setCount] = useState(0);

<p>Hello, {name}!</p>
<p>You clicked {count} times.</p>`}
          </pre>
        </div>

        {/* Object Properties */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Object Properties</h3>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '1rem' }}>
            <img
              src={user.avatar}
              alt={`${user.firstName}'s avatar`}
              style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {user.firstName} {user.lastName}
              </div>
              <div style={{ color: '#666' }}>{user.role}, Age: {user.age}</div>
            </div>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const user = { firstName: 'John', lastName: 'Doe', age: 28 };

<p>{user.firstName} {user.lastName}</p>
<p>Age: {user.age}</p>
<img src={user.avatar} alt={\`\${user.firstName}'s avatar\`} />`}
          </pre>
        </div>

        {/* Expressions */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>JavaScript Expressions</h3>
          
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>Math:</strong> 10 + 5 = {10 + 5}
            </div>
            <div style={{ padding: '0.75rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>String Method:</strong> {user.firstName.toUpperCase()}
            </div>
            <div style={{ padding: '0.75rem', background: '#fff3e0', borderRadius: '6px' }}>
              <strong>Template Literal:</strong> {`${user.firstName} is ${user.age} years old`}
            </div>
            <div style={{ padding: '0.75rem', background: '#fce4ec', borderRadius: '6px' }}>
              <strong>Ternary:</strong> {user.age >= 18 ? 'Adult' : 'Minor'}
            </div>
            <div style={{ padding: '0.75rem', background: '#f3e5f5', borderRadius: '6px' }}>
              <strong>Function Call:</strong> {getGreeting()}!
            </div>
            <div style={{ padding: '0.75rem', background: '#e0f7fa', borderRadius: '6px' }}>
              <strong>Date:</strong> {today.toLocaleDateString()} ({today.toLocaleTimeString()})
            </div>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`{/* Math expressions */}
<p>10 + 5 = {10 + 5}</p>

{/* String methods */}
<p>{name.toUpperCase()}</p>

{/* Template literals */}
<p>{\`\${firstName} is \${age} years old\`}</p>

{/* Ternary operator */}
<p>{age >= 18 ? 'Adult' : 'Minor'}</p>

{/* Function calls */}
<p>{getGreeting()}</p>

{/* Date object */}
<p>{new Date().toLocaleDateString()}</p>`}
          </pre>
        </div>

        {/* Array Methods */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Array Methods</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Array.join():</h4>
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
              {items.join(' • ')}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Array.map():</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {items.map((item, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Array.length:</h4>
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
              Total items: {items.length}
            </div>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const items = ['Apple', 'Banana', 'Cherry'];

{/* Join array */}
<p>{items.join(', ')}</p>

{/* Map to elements */}
{items.map((item, index) => (
  <span key={index}>{item}</span>
))}

{/* Array length */}
<p>Total: {items.length}</p>`}
          </pre>
        </div>

        {/* Style Objects */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Dynamic Styles</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginBottom: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: count % 2 === 0 ? '#e3f2fd' : '#fce4ec',
              borderRadius: '8px',
              textAlign: 'center',
              transition: 'background-color 0.3s',
            }}>
              <div style={{ fontWeight: 'bold' }}>Dynamic BG</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Based on count</div>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: `${Math.min(1 + count * 0.1, 2)}rem`,
            }}>
              <div style={{ fontWeight: 'bold' }}>Dynamic Size</div>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textAlign: 'center',
              opacity: Math.max(0.3, 1 - count * 0.1),
            }}>
              <div style={{ fontWeight: 'bold' }}>Dynamic Opacity</div>
            </div>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`{/* Dynamic background */}
<div style={{
  backgroundColor: isActive ? 'green' : 'gray'
}}>

{/* Computed values */}
<div style={{
  fontSize: \`\${1 + count * 0.1}rem\`,
  opacity: Math.max(0.3, 1 - count * 0.1)
}}>`}
          </pre>
        </div>

        {/* What You CAN'T Do */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#f44336' }}>What You CAN'T Put in Curly Braces</h3>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
              <strong>Statements (if/else, for, while)</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
{`// ❌ Wrong
{if (condition) { return <div>Yes</div> }}

// ✅ Use ternary instead
{condition ? <div>Yes</div> : <div>No</div>}`}
              </pre>
            </div>
            <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
              <strong>Objects directly (except for style)</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
{`// ❌ Wrong - Objects are not valid as React child
{user}

// ✅ Access properties
{user.name}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSXWithCurlyBracesExample;
