import { useState } from 'react';

export const DynamicAndConditionalStylesExample = () => {
  const [theme, setTheme] = useState('light');
  const [size, setSize] = useState('medium');
  const [isDisabled, setIsDisabled] = useState(false);
  const [status, setStatus] = useState('pending');
  const [isExpanded, setIsExpanded] = useState(false);

  const themes = {
    light: { bg: '#ffffff', text: '#333333', accent: '#667eea' },
    dark: { bg: '#1a1a2e', text: '#eaeaea', accent: '#7c3aed' },
    nature: { bg: '#f0fff4', text: '#22543d', accent: '#38a169' },
  };

  const sizes = {
    small: { padding: '8px 16px', fontSize: '14px' },
    medium: { padding: '12px 24px', fontSize: '16px' },
    large: { padding: '16px 32px', fontSize: '18px' },
  };

  const statusColors = {
    pending: { bg: '#fff3e0', color: '#e65100', border: '#ff9800' },
    approved: { bg: '#e8f5e9', color: '#2e7d32', border: '#4caf50' },
    rejected: { bg: '#ffebee', color: '#c62828', border: '#f44336' },
  };

  const currentTheme = themes[theme];

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: currentTheme.accent, marginBottom: '1.5rem' }}>
          Dynamic & Conditional Styles
        </h2>

        {/* Theme Switcher */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, color: currentTheme.accent }}>Theme Switcher</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {Object.keys(themes).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: theme === t ? currentTheme.accent : 'transparent',
                  color: theme === t ? 'white' : currentTheme.text,
                  border: `2px solid ${currentTheme.accent}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontWeight: theme === t ? 'bold' : 'normal',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Size Variants */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, color: currentTheme.accent }}>Dynamic Size</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {Object.keys(sizes).map(s => (
              <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="size"
                  checked={size === s}
                  onChange={() => setSize(s)}
                />
                <span style={{ textTransform: 'capitalize' }}>{s}</span>
              </label>
            ))}
          </div>
          <button style={{
            ...sizes[size],
            backgroundColor: currentTheme.accent,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            {size.charAt(0).toUpperCase() + size.slice(1)} Button
          </button>
        </div>

        {/* Conditional Disabled State */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, color: currentTheme.accent }}>Conditional Disabled State</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            <span>Disable button</span>
          </label>
          <button
            disabled={isDisabled}
            style={{
              padding: '12px 24px',
              backgroundColor: isDisabled ? '#9e9e9e' : currentTheme.accent,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              opacity: isDisabled ? 0.6 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {isDisabled ? 'Disabled' : 'Enabled'}
          </button>
        </div>

        {/* Status Badge */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, color: currentTheme.accent }}>Status-based Styling</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {Object.keys(statusColors).map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: status === s ? statusColors[s].bg : 'transparent',
                  color: status === s ? statusColors[s].color : currentTheme.text,
                  border: `2px solid ${statusColors[s].border}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: statusColors[status].bg,
            color: statusColors[status].color,
            border: `2px solid ${statusColors[status].border}`,
            borderRadius: '20px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
          }}>
            {status}
          </div>
        </div>

        {/* Expandable Card */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, color: currentTheme.accent }}>Toggle Animation</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: currentTheme.accent,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <div style={{
            maxHeight: isExpanded ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            backgroundColor: theme === 'dark' ? '#1a1a2e' : '#f5f5f5',
            borderRadius: '8px',
          }}>
            <div style={{ padding: '1rem' }}>
              <p style={{ margin: 0 }}>
                This content is conditionally shown with smooth height transition.
                The maxHeight property changes from 0 to 200px based on state.
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d44' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ marginTop: 0, color: currentTheme.accent }}>Code Pattern</h3>
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}>
{`// Conditional styles with ternary
<button style={{
  backgroundColor: isActive ? 'green' : 'gray',
  opacity: isDisabled ? 0.5 : 1,
}}>

// Object spread for variants
const sizes = {
  small: { padding: '8px', fontSize: '14px' },
  large: { padding: '16px', fontSize: '18px' },
};
<button style={{ ...sizes[size] }}>

// Conditional object spread
<div style={{
  padding: '1rem',
  ...(isError && { backgroundColor: 'red' }),
  ...(isSuccess && { backgroundColor: 'green' }),
}}>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DynamicAndConditionalStylesExample;
