import { useState, useRef } from 'react';

export const UncontrolledComponentExample = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const fileRef = useRef(null);
  const [controlledValue, setControlledValue] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      name: nameRef.current.value,
      email: emailRef.current.value,
    });
  };

  const handleFileChange = () => {
    const file = fileRef.current.files[0];
    if (file) {
      setUploadedFile({ name: file.name, size: file.size, type: file.type });
    }
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Uncontrolled Components</h2>

        {/* Explanation */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Controlled vs Uncontrolled</h3>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Controlled</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>React manages value via state</li>
                <li>value + onChange</li>
                <li>Instant validation possible</li>
                <li>More React-idiomatic</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Uncontrolled</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>DOM manages value</li>
                <li>useRef to access value</li>
                <li>Less re-renders</li>
                <li>Simpler for basic forms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Controlled Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Controlled Input (For Comparison)</h3>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              placeholder="Type here (controlled)..."
              style={inputStyle}
            />
          </div>

          <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px', marginBottom: '1rem' }}>
            <strong>Live value:</strong> {controlledValue || '(empty)'}
            <br />
            <strong>Length:</strong> {controlledValue.length} characters
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
            {`// Controlled - React manages the value
const [value, setValue] = useState('');

<input
  value={value}                    // React controls value
  onChange={(e) => setValue(e.target.value)}  // Update on every keystroke
/>`}
          </pre>
        </div>

        {/* Uncontrolled Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Uncontrolled Form (useRef)</h3>

          <form onSubmit={handleUncontrolledSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name:</label>
              <input
                type="text"
                ref={nameRef}
                defaultValue="John Doe"
                placeholder="Enter name..."
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
              <input
                type="email"
                ref={emailRef}
                defaultValue=""
                placeholder="Enter email..."
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Submit (Get Values via Ref)
            </button>
          </form>

          {submittedData && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>Submitted:</strong>
              <br />Name: {submittedData.name}
              <br />Email: {submittedData.email}
            </div>
          )}

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
            {`// Uncontrolled - DOM manages the value
const nameRef = useRef(null);
const emailRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(nameRef.current.value);  // Access via ref
  console.log(emailRef.current.value);
};

<input ref={nameRef} defaultValue="John" />
<input ref={emailRef} />`}
          </pre>
        </div>

        {/* File Input */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>File Input (Always Uncontrolled)</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            File inputs are always uncontrolled because their value is read-only for security.
          </p>

          <input
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
            style={{ marginBottom: '1rem' }}
          />

          {uploadedFile && (
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', marginBottom: '1rem' }}>
              <strong>Selected File:</strong>
              <br />Name: {uploadedFile.name}
              <br />Size: {(uploadedFile.size / 1024).toFixed(2)} KB
              <br />Type: {uploadedFile.type}
            </div>
          )}

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
            {`const fileRef = useRef(null);

const handleFileChange = () => {
  const file = fileRef.current.files[0];
  console.log(file.name, file.size);
};

<input type="file" ref={fileRef} onChange={handleFileChange} />`}
          </pre>
        </div>

        {/* When to Use */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>When to Use Each</h3>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Use Controlled When:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Need instant validation</li>
                <li>Formatting input on change</li>
                <li>Conditional disable/enable</li>
                <li>Multiple inputs depend on each other</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Use Uncontrolled When:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Simple forms</li>
                <li>File inputs</li>
                <li>Third-party non-React code</li>
                <li>Performance is critical</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UncontrolledComponentExample;
