import { useState, Fragment } from 'react';

export const ReactJSFragmentExample = () => {
  const [showTable, setShowTable] = useState(true);
  const [items] = useState([
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.5 },
    { id: 2, name: 'Carrot', category: 'Vegetable', price: 0.8 },
    { id: 3, name: 'Banana', category: 'Fruit', price: 1.2 },
  ]);

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>React Fragments</h2>

        {/* Example 1: Short Syntax */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>1. Short Syntax (Empty Tags)</h3>
          <p style={{ color: '#666' }}>Using <code>&lt;&gt;...&lt;/&gt;</code> to return multiple elements:</p>
          
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <ShortSyntaxDemo />
          </div>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// Without Fragment (ERROR - must have single root)
return (
  <h1>Title</h1>
  <p>Description</p>  // Error!
);

// With Fragment Short Syntax
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);`}
          </pre>
        </div>

        {/* Example 2: Fragment with Key */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>2. Fragment with Key (for Lists)</h3>
          <p style={{ color: '#666' }}>When mapping lists, use <code>&lt;Fragment key=...&gt;</code>:</p>
          
          <button
            onClick={() => setShowTable(!showTable)}
            style={{
              padding: '0.5rem 1rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            {showTable ? 'Hide' : 'Show'} Table
          </button>

          {showTable && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#667eea', color: 'white' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <Fragment key={item.id}>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}>{item.name}</td>
                      <td style={{ padding: '0.75rem' }}>{item.category}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`import { Fragment } from 'react';

// Fragment with key for list rendering
{items.map(item => (
  <Fragment key={item.id}>
    <tr>
      <td>{item.name}</td>
      <td>{item.category}</td>
    </tr>
  </Fragment>
))}

// Note: Short syntax <> cannot have key prop`}
          </pre>
        </div>

        {/* Example 3: Avoiding Extra DOM Nodes */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>3. Why Fragments? Cleaner DOM</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#dc3545', margin: '0 0 0.5rem 0' }}>With Extra Div</h4>
              <div style={{ background: '#fff5f5', padding: '1rem', borderRadius: '6px', border: '1px solid #dc3545' }}>
                <WithDivWrapper />
              </div>
              <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginTop: '0.5rem' }}>
{`<div>  <!-- Extra! -->
  <dt>Term</dt>
  <dd>Definition</dd>
</div>`}
              </pre>
            </div>
            
            <div>
              <h4 style={{ color: '#28a745', margin: '0 0 0.5rem 0' }}>With Fragment</h4>
              <div style={{ background: '#f0fff4', padding: '1rem', borderRadius: '6px', border: '1px solid #28a745' }}>
                <WithFragment />
              </div>
              <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginTop: '0.5rem' }}>
{`<>  <!-- No extra node -->
  <dt>Term</dt>
  <dd>Definition</dd>
</>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Example 4: Conditional Fragments */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>4. Conditional Rendering with Fragments</h3>
          
          <ConditionalFragmentDemo />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ShortSyntaxDemo = () => {
  return (
    <>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Welcome to React!</h4>
      <p style={{ margin: 0, color: '#666' }}>This heading and paragraph are siblings wrapped in a Fragment.</p>
    </>
  );
};

const WithDivWrapper = () => {
  return (
    <dl style={{ margin: 0 }}>
      <div>
        <dt style={{ fontWeight: 'bold' }}>React</dt>
        <dd style={{ margin: '0 0 0.5rem 1rem' }}>A JavaScript library</dd>
      </div>
    </dl>
  );
};

const WithFragment = () => {
  return (
    <dl style={{ margin: 0 }}>
      <>
        <dt style={{ fontWeight: 'bold' }}>React</dt>
        <dd style={{ margin: '0 0 0.5rem 1rem' }}>A JavaScript library</dd>
      </>
    </dl>
  );
};

const ConditionalFragmentDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({ name: 'John', role: 'Admin' });

  return (
    <div>
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        style={{
          padding: '0.5rem 1rem',
          background: isLoggedIn ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>

      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px' }}>
        {isLoggedIn ? (
          <>
            <p style={{ margin: '0 0 0.5rem 0' }}>Welcome, <strong>{user.name}</strong>!</p>
            <p style={{ margin: 0, color: '#666' }}>Role: {user.role}</p>
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 0.5rem 0' }}>Please log in to continue.</p>
            <p style={{ margin: 0, color: '#666' }}>Click the button above.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ReactJSFragmentExample;
