import { useState, cloneElement, Children } from 'react';

const Card = ({ 
  children, 
  title, 
  footer,
  variant = 'default',
  ...restProps 
}) => {
  const variants = {
    default: { border: '1px solid #ddd', bg: 'white' },
    primary: { border: '2px solid #667eea', bg: '#f8f9ff' },
    success: { border: '2px solid #4caf50', bg: '#f1f8e9' },
  };
  const v = variants[variant];
  
  return (
    <div 
      style={{ 
        border: v.border, 
        background: v.bg, 
        borderRadius: '8px', 
        overflow: 'hidden',
        ...restProps.style 
      }}
      {...restProps}
    >
      {title && (
        <div style={{ padding: '1rem', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
          {title}
        </div>
      )}
      <div style={{ padding: '1rem' }}>{children}</div>
      {footer && (
        <div style={{ padding: '1rem', borderTop: '1px solid #eee', background: '#f5f5f5' }}>
          {footer}
        </div>
      )}
    </div>
  );
};

const Button = ({ 
  children, 
  size = 'medium', 
  variant = 'primary',
  leftIcon,
  rightIcon,
  ...props 
}) => {
  const sizes = {
    small: { padding: '0.5rem 1rem', fontSize: '0.85rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    large: { padding: '1rem 2rem', fontSize: '1.1rem' },
  };
  const variants = {
    primary: { bg: '#667eea', color: 'white' },
    secondary: { bg: '#e0e0e0', color: '#333' },
    outline: { bg: 'transparent', color: '#667eea', border: '2px solid #667eea' },
  };

  return (
    <button
      style={{
        ...sizes[size],
        background: variants[variant].bg,
        color: variants[variant].color,
        border: variants[variant].border || 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

const List = ({ items, renderItem, emptyMessage = 'No items' }) => {
  if (!items || items.length === 0) {
    return <div style={{ color: '#666', textAlign: 'center', padding: '1rem' }}>{emptyMessage}</div>;
  }
  return <div style={{ display: 'grid', gap: '0.5rem' }}>{items.map(renderItem)}</div>;
};

const TabContainer = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const tabs = Children.toArray(children);
  
  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: activeTab === index ? '#667eea' : 'transparent',
              color: activeTab === index ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: activeTab === index ? 'bold' : 'normal',
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '1rem' }}>
        {tabs[activeTab]}
      </div>
    </div>
  );
};

const Tab = ({ children }) => <div>{children}</div>;

export const PropsAdvancedExample = () => {
  const [users] = useState([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Carol', role: 'Editor' },
  ]);

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Advanced Props Patterns</h2>

        {/* Rest/Spread Props */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Rest & Spread Props</h3>
          
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Pass through additional props to underlying elements using rest/spread.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => alert('Clicked!')} data-testid="btn-1">
              Default Button
            </Button>
            <Button size="small" variant="outline">
              Small Outline
            </Button>
            <Button size="large" variant="secondary">
              Large Secondary
            </Button>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const Button = ({ children, size, variant, ...props }) => (
  <button
    style={{ ...sizeStyles[size], ...variantStyles[variant] }}
    {...props}  // Passes onClick, data-testid, etc.
  >
    {children}
  </button>
);

<Button onClick={handleClick} data-testid="my-btn">
  Click Me
</Button>`}
          </pre>
        </div>

        {/* Default Props */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Default Props</h3>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
            <Card>
              <p style={{ margin: 0 }}>Default variant card</p>
            </Card>
            <Card variant="primary" title="Primary Card">
              <p style={{ margin: 0 }}>With title prop</p>
            </Card>
            <Card 
              variant="success" 
              title="Success Card"
              footer={<span>Footer content</span>}
            >
              <p style={{ margin: 0 }}>With title and footer</p>
            </Card>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const Card = ({ 
  children, 
  title,
  footer,
  variant = 'default',  // Default value
}) => (
  <div className={\`card card-\${variant}\`}>
    {title && <div className="card-title">{title}</div>}
    {children}
    {footer && <div className="card-footer">{footer}</div>}
  </div>
);`}
          </pre>
        </div>

        {/* Render Props */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Render Props Pattern</h3>
          
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Pass a function as a prop to control how content is rendered.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <List
              items={users}
              renderItem={(user) => (
                <div 
                  key={user.id} 
                  style={{ 
                    padding: '0.75rem', 
                    background: '#f5f5f5', 
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{user.name}</span>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    background: '#667eea', 
                    color: 'white', 
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                  }}>
                    {user.role}
                  </span>
                </div>
              )}
              emptyMessage="No users found"
            />
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const List = ({ items, renderItem, emptyMessage }) => {
  if (items.length === 0) return <p>{emptyMessage}</p>;
  return <div>{items.map(renderItem)}</div>;
};

<List
  items={users}
  renderItem={(user) => (
    <div key={user.id}>
      <span>{user.name}</span>
      <span>{user.role}</span>
    </div>
  )}
  emptyMessage="No users found"
/>`}
          </pre>
        </div>

        {/* Compound Components */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Compound Components</h3>
          
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Components that work together to form a complete unit.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <TabContainer defaultTab={0}>
              <Tab label="Profile">
                <h4 style={{ marginTop: 0 }}>Profile Content</h4>
                <p>This is the profile tab content with user information.</p>
              </Tab>
              <Tab label="Settings">
                <h4 style={{ marginTop: 0 }}>Settings Content</h4>
                <p>Configure your preferences and account settings here.</p>
              </Tab>
              <Tab label="Notifications">
                <h4 style={{ marginTop: 0 }}>Notifications</h4>
                <p>Manage your notification preferences.</p>
              </Tab>
            </TabContainer>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`<TabContainer defaultTab={0}>
  <Tab label="Profile">
    <h4>Profile Content</h4>
    <p>User information here</p>
  </Tab>
  <Tab label="Settings">
    <h4>Settings Content</h4>
    <p>Configure preferences</p>
  </Tab>
</TabContainer>`}
          </pre>
        </div>

        {/* Icons as Props */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>JSX Elements as Props</h3>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Button leftIcon={<span>📧</span>}>
              Send Email
            </Button>
            <Button rightIcon={<span>→</span>} variant="outline">
              Next
            </Button>
            <Button leftIcon={<span>💾</span>} rightIcon={<span>✓</span>} variant="secondary">
              Save
            </Button>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const Button = ({ children, leftIcon, rightIcon }) => (
  <button>
    {leftIcon}
    {children}
    {rightIcon}
  </button>
);

<Button leftIcon={<EmailIcon />} rightIcon={<ArrowRight />}>
  Send
</Button>`}
          </pre>
        </div>

        {/* Summary */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Advanced Props Patterns Summary</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { pattern: '...restProps', desc: 'Pass extra props to underlying element' },
              { pattern: 'prop = default', desc: 'Default values using destructuring' },
              { pattern: 'renderItem={fn}', desc: 'Render props for custom rendering' },
              { pattern: '<Parent><Child /></Parent>', desc: 'Compound components pattern' },
              { pattern: 'icon={<JSX />}', desc: 'Pass JSX elements as props' },
            ].map(item => (
              <div key={item.pattern} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <code style={{ color: '#667eea' }}>{item.pattern}</code>
                <span style={{ color: '#666' }}> — {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropsAdvancedExample;
