import { useState } from 'react';

export const StyledComponentsExample = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [theme, setTheme] = useState('light');
  const [size, setSize] = useState('medium');

  const themes = {
    light: { bg: '#ffffff', text: '#333', primary: '#667eea' },
    dark: { bg: '#1a1a2e', text: '#eaeaea', primary: '#7c3aed' },
  };

  const currentTheme = themes[theme];

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
    color: currentTheme.text,
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  return (
    <div style={{
      padding: '2rem',
      background: currentTheme.bg,
      minHeight: '100vh',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: currentTheme.primary, marginBottom: '1.5rem' }}>Styled Components</h2>

        {/* Theme Toggle */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{
              padding: '0.5rem 1rem',
              background: currentTheme.primary,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Toggle Theme ({theme})
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['intro', 'syntax', 'props', 'theming'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? currentTheme.primary : 'transparent',
                color: activeTab === tab ? 'white' : currentTheme.text,
                border: `2px solid ${currentTheme.primary}`,
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
            <h3 style={{ marginTop: 0, color: currentTheme.primary }}>What is Styled Components?</h3>
            
            <p style={{ lineHeight: 1.7 }}>
              Styled Components is a CSS-in-JS library that allows you to write actual CSS code 
              to style your components. It creates unique class names automatically.
            </p>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              marginTop: '1rem',
            }}>
{`npm install styled-components`}
            </pre>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                { icon: '🎨', title: 'Real CSS', desc: 'Write actual CSS syntax with all features' },
                { icon: '🔒', title: 'Scoped', desc: 'Automatic unique class names' },
                { icon: '⚡', title: 'Dynamic', desc: 'Access props directly in styles' },
                { icon: '🎭', title: 'Theming', desc: 'Built-in theme support via Context' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <span style={{ color: theme === 'dark' ? '#aaa' : '#666' }}> - {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'syntax' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: currentTheme.primary }}>Basic Syntax</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
            }}>
{`import styled from 'styled-components';

// Create a styled button
const Button = styled.button\`
  padding: 12px 24px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a67d8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
\`;

// Create a styled div
const Card = styled.div\`
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
\`;

// Usage
function App() {
  return (
    <Card>
      <h2>Hello</h2>
      <Button>Click Me</Button>
      <Button disabled>Disabled</Button>
    </Card>
  );
}`}
            </pre>

            {/* Demo */}
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: currentTheme.primary }}>Result Preview</h4>
              <div style={{
                padding: '1.5rem',
                background: theme === 'dark' ? '#1a1a2e' : '#f5f5f5',
                borderRadius: '8px',
              }}>
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginRight: '1rem',
                }}>
                  Click Me
                </button>
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  opacity: 0.6,
                  cursor: 'not-allowed',
                }}>
                  Disabled
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'props' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: currentTheme.primary }}>Dynamic Props</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
{`import styled from 'styled-components';

// Props-based styling
const Button = styled.button\`
  padding: \${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  background-color: \${props => props.primary ? '#667eea' : '#e0e0e0'};
  color: \${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
\`;

// Usage
<Button primary>Primary</Button>
<Button>Secondary</Button>
<Button primary size="large">Large Primary</Button>

// With default props
Button.defaultProps = {
  size: 'medium',
  primary: false,
};

// Conditional styling
const Alert = styled.div\`
  padding: 1rem;
  border-radius: 4px;
  
  \${props => props.type === 'error' && \`
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #f44336;
  \`}
  
  \${props => props.type === 'success' && \`
    background-color: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #4caf50;
  \`}
\`;`}
            </pre>

            {/* Interactive Demo */}
            <h4 style={{ color: currentTheme.primary }}>Interactive Demo</h4>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ marginRight: '1rem' }}>Size:</label>
              {['small', 'medium', 'large'].map(s => (
                <label key={s} style={{ marginRight: '1rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="size"
                    checked={size === s}
                    onChange={() => setSize(s)}
                  />
                  {' '}{s}
                </label>
              ))}
            </div>
            <button style={{
              padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
              fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
              backgroundColor: currentTheme.primary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {size.charAt(0).toUpperCase() + size.slice(1)} Button
            </button>
          </div>
        )}

        {activeTab === 'theming' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: currentTheme.primary }}>Theming</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem',
            }}>
{`import styled, { ThemeProvider } from 'styled-components';

// Define themes
const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#667eea',
};

const darkTheme = {
  background: '#1a1a2e',
  text: '#eaeaea',
  primary: '#7c3aed',
};

// Access theme in styled components
const Container = styled.div\`
  background-color: \${props => props.theme.background};
  color: \${props => props.theme.text};
  min-height: 100vh;
  padding: 2rem;
\`;

const Button = styled.button\`
  background-color: \${props => props.theme.primary};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
\`;

// App with theme provider
function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Container>
        <Button onClick={() => setIsDark(!isDark)}>
          Toggle Theme
        </Button>
      </Container>
    </ThemeProvider>
  );
}`}
            </pre>

            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: theme === 'dark' ? '#1a1a2e' : '#e3f2fd',
              borderRadius: '6px',
            }}>
              <strong>Current theme:</strong> {theme}
              <br />
              <code>props.theme.primary = "{currentTheme.primary}"</code>
            </div>
          </div>
        )}

        {/* Comparison */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: currentTheme.primary }}>Styled Components vs Other Solutions</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: currentTheme.primary, color: 'white' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Feature</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Styled Comp.</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>CSS Modules</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Inline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Scoped styles', '✓', '✓', '✓'],
                  ['Full CSS features', '✓', '✓', '✗'],
                  ['Dynamic props', '✓', 'Limited', '✓'],
                  ['Theming built-in', '✓', '✗', '✗'],
                  ['No runtime cost', '✗', '✓', '✓'],
                  ['Server rendering', '✓', '✓', '✓'],
                ].map(([feature, sc, cm, inline], i) => (
                  <tr key={feature} style={{ background: i % 2 === 0 ? (theme === 'dark' ? '#2d2d44' : '#f5f5f5') : 'transparent' }}>
                    <td style={{ padding: '0.75rem' }}>{feature}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>{sc}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>{cm}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>{inline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyledComponentsExample;
