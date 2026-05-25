import { useState } from 'react';

export const InlineStylesExample = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [bgColor, setBgColor] = useState('#667eea');

  const baseButtonStyle = {
    padding: '12px 24px',
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: isHovered ? '#5a67d8' : bgColor,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isActive ? 'scale(0.95)' : 'scale(1)',
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Inline Styles in React</h2>

        {/* Basic Syntax */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Basic Syntax</h3>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            In React, inline styles are written as JavaScript objects with camelCase property names.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
              <strong style={{ color: '#f44336' }}>CSS:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
{`background-color: blue;
font-size: 16px;
margin-top: 10px;`}
              </pre>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>
              <strong style={{ color: '#4caf50' }}>React Inline:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
{`backgroundColor: 'blue',
fontSize: '16px',
marginTop: '10px'`}
              </pre>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Button Demo</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
            <button
              style={baseButtonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsActive(true)}
              onMouseUp={() => setIsActive(false)}
            >
              Hover & Click Me!
            </button>
            
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <div>Hovered: <strong style={{ color: isHovered ? '#4caf50' : '#f44336' }}>{isHovered ? 'Yes' : 'No'}</strong></div>
              <div>Active: <strong style={{ color: isActive ? '#4caf50' : '#f44336' }}>{isActive ? 'Yes' : 'No'}</strong></div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: '150px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Background Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['#667eea', '#4caf50', '#f44336', '#ff9800'].map(color => (
                  <button
                    key={color}
                    onClick={() => setBgColor(color)}
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: color,
                      border: bgColor === color ? '3px solid #333' : '2px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Style Object Variables */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Style Object Variables</h3>
          <p style={{ color: '#666' }}>Define styles as variables for reusability:</p>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

// Usage
<button style={buttonStyle}>Click Me</button>`}
          </pre>
        </div>

        {/* Dynamic Values */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Dynamic Values with Template Literals</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`const [size, setSize] = useState(16);
const [color, setColor] = useState('blue');

const dynamicStyle = {
  fontSize: \`\${size}px\`,
  color: color,
  padding: \`\${size / 2}px \${size}px\`,
};`}
          </pre>
        </div>

        {/* Pros and Cons */}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ ...cardStyle, borderLeft: '4px solid #4caf50' }}>
            <h4 style={{ marginTop: 0, color: '#4caf50' }}>Pros</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>Scoped to component (no conflicts)</li>
              <li>Dynamic values from state/props</li>
              <li>No separate CSS files</li>
              <li>Easy to understand</li>
              <li>No build configuration</li>
            </ul>
          </div>
          
          <div style={{ ...cardStyle, borderLeft: '4px solid #f44336' }}>
            <h4 style={{ marginTop: 0, color: '#f44336' }}>Cons</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>No pseudo-selectors (:hover, :focus)</li>
              <li>No media queries</li>
              <li>No keyframe animations</li>
              <li>Can clutter JSX</li>
              <li>No CSS caching</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineStylesExample;
