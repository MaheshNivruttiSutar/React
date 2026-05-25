import { useState } from 'react';

export const CSSModulesExample = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [isActive, setIsActive] = useState(false);

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>CSS Modules</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['intro', 'syntax', 'compose', 'dynamic'].map(tab => (
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

        {activeTab === 'intro' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>What are CSS Modules?</h3>
            
            <p style={{ color: '#666', lineHeight: 1.7 }}>
              CSS Modules are CSS files where class names are automatically scoped locally to the component.
              This prevents naming conflicts and makes styles truly modular.
            </p>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '8px' }}>
                <strong style={{ color: '#c62828' }}>Regular CSS</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  <code>.button</code> is global - can conflict with other <code>.button</code> classes
                </p>
              </div>
              <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>
                <strong style={{ color: '#2e7d32' }}>CSS Modules</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  <code>.button</code> becomes <code>.Button_button_x7d3f</code> - unique per component
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>File Naming:</strong> Use <code>.module.css</code> extension
              <br />
              <code>Button.module.css</code>, <code>Card.module.css</code>
            </div>
          </div>
        )}

        {activeTab === 'syntax' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Basic Usage</h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Button.module.css</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                }}>
{`.button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.primary {
  background-color: #667eea;
  color: white;
}

.secondary {
  background-color: #e0e0e0;
  color: #333;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}`}
                </pre>
              </div>

              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Button.jsx</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                }}>
{`import styles from './Button.module.css';

function Button({ variant = 'primary', size, children }) {
  return (
    <button 
      className={\`\${styles.button} \${styles[variant]} \${size === 'large' ? styles.large : ''}\`}
    >
      {children}
    </button>
  );
}

// styles object looks like:
// {
//   button: "Button_button_x7d3f",
//   primary: "Button_primary_k9m2n",
//   secondary: "Button_secondary_p4q8r"
// }`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compose' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Composition</h3>
            
            <p style={{ color: '#666' }}>
              CSS Modules support composition to reuse styles:
            </p>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}>
{`/* base.module.css */
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rounded {
  border-radius: 8px;
}

/* Button.module.css */
.button {
  composes: flexCenter rounded from './base.module.css';
  padding: 12px 24px;
  border: none;
  cursor: pointer;
}

/* Or compose from same file */
.baseButton {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
}

.primaryButton {
  composes: baseButton;
  background: #667eea;
  color: white;
}`}
            </pre>

            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <strong>Note:</strong> <code>composes</code> is a CSS Modules feature, not standard CSS.
              The composed class names are combined when the module is imported.
            </div>
          </div>
        )}

        {activeTab === 'dynamic' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Dynamic Class Names</h3>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
{`import styles from './Card.module.css';

function Card({ isActive, isHighlighted }) {
  // Method 1: Template literals
  const className = \`
    \${styles.card}
    \${isActive ? styles.active : ''}
    \${isHighlighted ? styles.highlighted : ''}
  \`.trim();

  // Method 2: Array join
  const className2 = [
    styles.card,
    isActive && styles.active,
    isHighlighted && styles.highlighted,
  ].filter(Boolean).join(' ');

  // Method 3: classnames library
  import classNames from 'classnames';
  const className3 = classNames(styles.card, {
    [styles.active]: isActive,
    [styles.highlighted]: isHighlighted,
  });

  return <div className={className}>...</div>;
}`}
            </pre>

            {/* Interactive Demo */}
            <h4 style={{ color: '#667eea' }}>Interactive Demo</h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span>Toggle active state</span>
            </label>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: isActive ? '#e3f2fd' : '#f5f5f5',
              border: `2px solid ${isActive ? '#2196f3' : '#ddd'}`,
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            }}>
              <p style={{ margin: 0 }}>
                This card has <strong>{isActive ? 'styles.active' : 'styles.card'}</strong> applied
              </p>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Why CSS Modules?</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '🔒', title: 'Scoped by Default', desc: 'No more naming conflicts' },
              { icon: '📦', title: 'Modular', desc: 'Styles live with components' },
              { icon: '🎯', title: 'Explicit Dependencies', desc: 'Import what you use' },
              { icon: '🧹', title: 'Dead Code Elimination', desc: 'Unused styles can be removed' },
              { icon: '⚡', title: 'No Runtime Cost', desc: 'All processing at build time' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <span style={{ color: '#666' }}> - {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModulesExample;
