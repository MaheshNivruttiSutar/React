import { useState } from 'react';

const Button = ({ children, variant = 'primary', onClick }) => {
  const styles = {
    primary: { background: '#667eea', color: 'white' },
    secondary: { background: '#e0e0e0', color: '#333' },
    danger: { background: '#f44336', color: 'white' },
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
};

const Card = ({ title, children }) => (
  <div style={{
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  }}>
    {title && <h4 style={{ marginTop: 0, color: '#333' }}>{title}</h4>}
    {children}
  </div>
);

const Alert = ({ type = 'info', children }) => {
  const styles = {
    info: { bg: '#e3f2fd', border: '#2196f3', color: '#1565c0' },
    success: { bg: '#e8f5e9', border: '#4caf50', color: '#2e7d32' },
    warning: { bg: '#fff3e0', border: '#ff9800', color: '#e65100' },
    error: { bg: '#ffebee', border: '#f44336', color: '#c62828' },
  };
  const s = styles[type];
  
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: s.bg,
      borderLeft: `4px solid ${s.border}`,
      borderRadius: '4px',
      color: s.color,
    }}>
      {children}
    </div>
  );
};

export const ImportingExportingComponentsExample = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [clickCount, setClickCount] = useState(0);

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Importing & Exporting Components</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['default', 'named', 'organize', 'demo'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? '#667eea' : 'white',
                color: activeTab === tab ? 'white' : '#333',
                border: '2px solid #667eea',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'default' ? 'Default Export' : tab === 'named' ? 'Named Export' : tab === 'organize' ? 'Organization' : 'Live Demo'}
            </button>
          ))}
        </div>

        {activeTab === 'default' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Default Export / Import</h3>
            
            <p style={{ color: '#666' }}>
              Each file can have <strong>one default export</strong>. The importer can choose any name.
            </p>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '1rem' }}>
              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Button.jsx (Export)</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                }}>
{`function Button({ children }) {
  return (
    <button className="btn">
      {children}
    </button>
  );
}

// Default export
export default Button;`}
                </pre>
              </div>
              
              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>App.jsx (Import)</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                }}>
{`// Can use any name
import Button from './Button';
import MyButton from './Button';
import Btn from './Button';

// All these work the same!
function App() {
  return <Button>Click</Button>;
}`}
                </pre>
              </div>
            </div>

            <Alert type="info">
              <strong>Key Point:</strong> Default exports let you rename on import, but only one per file.
            </Alert>
          </div>
        )}

        {activeTab === 'named' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Named Export / Import</h3>
            
            <p style={{ color: '#666' }}>
              A file can have <strong>multiple named exports</strong>. The importer must use the exact name (or alias).
            </p>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '1rem' }}>
              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>components.jsx (Export)</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                }}>
{`// Named exports
export function Button({ children }) {
  return <button>{children}</button>;
}

export function Card({ title }) {
  return <div>{title}</div>;
}

export const Alert = ({ message }) => (
  <div>{message}</div>
);`}
                </pre>
              </div>
              
              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>App.jsx (Import)</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                }}>
{`// Import specific components
import { Button, Card } from './components';

// Import with alias
import { Button as Btn } from './components';

// Import all as namespace
import * as UI from './components';
// Use: <UI.Button>

function App() {
  return (
    <>
      <Button>Click</Button>
      <Card title="Hello" />
    </>
  );
}`}
                </pre>
              </div>
            </div>

            <Alert type="success">
              <strong>Best Practice:</strong> Use named exports for utility components and helper functions.
            </Alert>
          </div>
        )}

        {activeTab === 'organize' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>File Organization</h3>
            
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div>
                <h4 style={{ color: '#667eea' }}>Folder Structure</h4>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                }}>
{`src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   └── index.js
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── index.js
│   └── index.js      # Barrel file
├── pages/
│   ├── Home.jsx
│   └── About.jsx
└── App.jsx`}
                </pre>
              </div>

              <div>
                <h4 style={{ color: '#667eea' }}>Barrel File (index.js)</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                }}>
{`// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Alert } from './Alert';

// Now you can import:
import { Button, Card, Alert } from './components';

// Instead of:
import Button from './components/Button';
import Card from './components/Card';
import Alert from './components/Alert';`}
                </pre>
              </div>
            </div>

            <Alert type="warning">
              <strong>Note:</strong> Barrel files can impact tree-shaking. Use them wisely for commonly imported components.
            </Alert>
          </div>
        )}

        {activeTab === 'demo' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Live Demo - Using Imported Components</h3>
            
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              These components are defined in this file and demonstrate how reusable components work:
            </p>

            <Card title="Button Variants">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => setClickCount(c => c + 1)}>
                  Primary ({clickCount})
                </Button>
                <Button variant="secondary" onClick={() => setClickCount(0)}>
                  Reset
                </Button>
                <Button variant="danger" onClick={() => alert('Danger!')}>
                  Danger
                </Button>
              </div>
            </Card>

            <Card title="Alert Variants">
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <Alert type="info">This is an info alert</Alert>
                <Alert type="success">This is a success alert</Alert>
                <Alert type="warning">This is a warning alert</Alert>
                <Alert type="error">This is an error alert</Alert>
              </div>
            </Card>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              marginTop: '1rem',
              fontSize: '0.85rem',
              overflow: 'auto',
            }}>
{`// Component definitions (would be in separate files)
const Button = ({ children, variant, onClick }) => {...};
const Card = ({ title, children }) => {...};
const Alert = ({ type, children }) => {...};

// Usage
<Card title="Button Variants">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</Card>

<Alert type="success">Success message</Alert>`}
            </pre>
          </div>
        )}

        {/* Summary */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Quick Reference</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#667eea', color: 'white' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Export</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Import</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem' }}>Default</td>
                  <td style={{ padding: '0.75rem' }}><code>export default Component</code></td>
                  <td style={{ padding: '0.75rem' }}><code>import AnyName from './file'</code></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem' }}>Named</td>
                  <td style={{ padding: '0.75rem' }}><code>export function Component</code></td>
                  <td style={{ padding: '0.75rem' }}><code>{'import { Component } from \'./file\''}</code></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem' }}>Alias</td>
                  <td style={{ padding: '0.75rem' }}>-</td>
                  <td style={{ padding: '0.75rem' }}><code>{'import { Component as C } from \'./file\''}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem' }}>All</td>
                  <td style={{ padding: '0.75rem' }}>-</td>
                  <td style={{ padding: '0.75rem' }}><code>import * as UI from './file'</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportingExportingComponentsExample;
