import { useId, useState } from 'react';

const FormField = ({ label, type = 'text', placeholder }) => {
  const id = useId();
  
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '2px solid #ddd',
          borderRadius: '6px',
          boxSizing: 'border-box',
        }}
      />
      <small style={{ color: '#666' }}>ID: {id}</small>
    </div>
  );
};

const AccessibleCheckbox = ({ label, description }) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          id={id}
          type="checkbox"
          aria-describedby={descriptionId}
          style={{ transform: 'scale(1.2)' }}
        />
        <label htmlFor={id} style={{ fontWeight: 'bold' }}>{label}</label>
      </div>
      <p id={descriptionId} style={{ margin: '0.25rem 0 0 1.5rem', fontSize: '0.85rem', color: '#666' }}>
        {description}
      </p>
    </div>
  );
};

export const UseIdHookExample = () => {
  const [formCount, setFormCount] = useState(1);
  const titleId = useId();
  const descId = useId();

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useId Hook</h2>

        {/* What is useId */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useId?</h3>
          <p style={{ color: '#666' }}>
            useId generates unique IDs that are stable across server and client renders.
            Perfect for accessibility attributes like htmlFor, aria-labelledby, aria-describedby.
          </p>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const id = useId();

<label htmlFor={id}>Email</label>
<input id={id} type="email" />

// Generated ID looks like: :r1: or :r2:`}
          </pre>
        </div>

        {/* Basic Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Basic Example - Label + Input</h3>
          
          <FormField label="Email Address" type="email" placeholder="name@example.com" />
          <FormField label="Password" type="password" placeholder="Enter password" />
          <FormField label="Full Name" placeholder="John Doe" />
        </div>

        {/* Multiple IDs */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Multiple Related IDs</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Use a single useId as a prefix to generate multiple related IDs.
          </p>
          
          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '1rem' }}>
            <h4 id={titleId} style={{ marginTop: 0 }}>Settings Section</h4>
            <p id={descId} style={{ margin: '0.5rem 0' }}>Configure your preferences below.</p>
            <div role="group" aria-labelledby={titleId} aria-describedby={descId}>
              <AccessibleCheckbox 
                label="Enable notifications" 
                description="Receive email updates about your account" 
              />
              <AccessibleCheckbox 
                label="Dark mode" 
                description="Use dark theme across the app" 
              />
            </div>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const id = useId();
const titleId = \`\${id}-title\`;
const descId = \`\${id}-description\`;

<h4 id={titleId}>Settings</h4>
<p id={descId}>Description</p>
<div 
  role="group" 
  aria-labelledby={titleId}
  aria-describedby={descId}
>`}
          </pre>
        </div>

        {/* Multiple Components */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Multiple Instances</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Each component instance gets its own unique ID, even when rendered multiple times.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setFormCount(c => c + 1)}
              style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}
            >
              Add Form
            </button>
            <button
              onClick={() => setFormCount(c => Math.max(1, c - 1))}
              style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Remove Form
            </button>
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {Array.from({ length: formCount }).map((_, index) => (
              <div key={index} style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <strong>Form {index + 1}</strong>
                <FormField label="Name" placeholder="Enter name" />
              </div>
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Key Points</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { title: 'SSR Safe', desc: 'Same ID on server and client (no hydration mismatch)' },
              { title: 'Unique per component', desc: 'Each useId call generates a unique ID' },
              { title: 'Stable', desc: 'ID doesn\'t change between re-renders' },
              { title: 'Don\'t use for keys', desc: 'Use meaningful data as list keys instead' },
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

export default UseIdHookExample;
