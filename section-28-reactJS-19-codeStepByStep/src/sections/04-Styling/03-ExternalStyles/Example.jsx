import { useState } from 'react';

export const ExternalStylesExample = () => {
  const [activeTab, setActiveTab] = useState('import');

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>External Stylesheets</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['import', 'global', 'structure', 'example'].map(tab => (
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
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'import' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Importing CSS Files</h3>
            
            <p style={{ color: '#666' }}>
              Import CSS files directly into your React components. The styles become globally available.
            </p>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
            }}>
{`// In your component file
import './Button.css';
import '../styles/global.css';

// Or in main entry point (main.jsx or App.jsx)
import './index.css';
import './App.css';`}
            </pre>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Note:</strong> When you import a CSS file, all its styles are applied globally
              to the entire application, not just the component that imports it.
            </div>
          </div>
        )}

        {activeTab === 'global' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Global Styles (index.css)</h3>
            
            <p style={{ color: '#666' }}>
              Common patterns for your global stylesheet:
            </p>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
            }}>
{`/* index.css - Global styles */

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Root variables */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --bg-color: #fafafa;
  --border-radius: 8px;
}

/* Base styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center { text-align: center; }
.text-primary { color: var(--primary-color); }
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }`}
            </pre>
          </div>
        )}

        {activeTab === 'structure' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>File Structure</h3>
            
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
            }}>
{`src/
├── index.css          # Global resets & variables
├── App.css            # App-level styles
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.css
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── Card.css
│   └── Header/
│       ├── Header.jsx
│       └── Header.css
└── styles/
    ├── variables.css  # CSS custom properties
    ├── utilities.css  # Utility classes
    └── animations.css # Keyframe animations`}
            </pre>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <strong>Best Practice:</strong> Keep component-specific CSS next to the component file
              for better organization and maintainability.
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Example: Button Component</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <h4 style={{ color: '#667eea' }}>Button.css</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  height: '300px',
                }}>
{`.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5a67d8;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d0d0d0;
}

.btn-lg { padding: 16px 32px; }
.btn-sm { padding: 8px 16px; }`}
                </pre>
              </div>
              
              <div>
                <h4 style={{ color: '#667eea' }}>Button.jsx</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  height: '300px',
                }}>
{`import './Button.css';

function Button({ 
  variant = 'primary',
  size = 'md',
  children 
}) {
  const classes = [
    'btn',
    \`btn-\${variant}\`,
    size !== 'md' && \`btn-\${size}\`
  ].filter(Boolean).join(' ');

  return (
    <button className={classes}>
      {children}
    </button>
  );
}

// Usage
<Button>Default</Button>
<Button variant="secondary">
  Secondary
</Button>
<Button size="lg">Large</Button>`}
                </pre>
              </div>
            </div>

            {/* Live Demo */}
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Live Demo (simulated)</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  Primary
                </button>
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#e0e0e0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  Secondary
                </button>
                <button style={{
                  padding: '16px 32px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  Large
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}>
                  Small
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pros and Cons */}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ ...cardStyle, borderLeft: '4px solid #4caf50' }}>
            <h4 style={{ marginTop: 0, color: '#4caf50' }}>Advantages</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>Full CSS features (pseudo-classes, media queries)</li>
              <li>Familiar CSS syntax</li>
              <li>Browser caching</li>
              <li>DevTools support</li>
              <li>Separation of concerns</li>
            </ul>
          </div>
          
          <div style={{ ...cardStyle, borderLeft: '4px solid #f44336' }}>
            <h4 style={{ marginTop: 0, color: '#f44336' }}>Disadvantages</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>Global scope (naming conflicts)</li>
              <li>No automatic dead code removal</li>
              <li>Manual class name management</li>
              <li>Hard to pass dynamic values</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalStylesExample;
