import { useState } from 'react';

export const JsxbasicsExample = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const user = { name: 'John Doe', age: 25, isActive: true };
  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>JSX Basics - Syntax & Features</h2>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* JSX vs HTML */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🆚 JSX vs HTML Differences</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <h4 style={{ color: '#f44336', marginBottom: '0.5rem' }}>❌ HTML (Won't work in JSX)</h4>
                <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {`<div class="container">
  <label for="username">Name</label>
  <input type="text" autofocus>
  <img src="image.jpg">
  <div style="color: red;">Text</div>
</div>`}
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#4caf50', marginBottom: '0.5rem' }}>✅ JSX (Correct syntax)</h4>
                <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {`<div className="container">
  <label htmlFor="username">Name</label>
  <input type="text" autoFocus />
  <img src="image.jpg" alt="description" />
  <div style={{color: 'red'}}>Text</div>
</div>`}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '4px' }}>
              <strong>Key Differences:</strong>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                <li><code>class</code> → <code>className</code></li>
                <li><code>for</code> → <code>htmlFor</code></li>
                <li><code>style="string"</code> → <code>style={'{'}object{'}'}</code></li>
                <li>Self-closing tags must end with <code>/&gt;</code></li>
                <li>Attributes use camelCase</li>
              </ul>
            </div>
          </div>

          {/* JavaScript Expressions */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔧 JavaScript Expressions in JSX</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, color: '#333' }}>Live Example:</h4>
              </div>
              
              <div style={{ padding: '1.5rem', background: '#e3f2fd', borderRadius: '6px', marginBottom: '1rem' }}>
                {/* Variables */}
                <p>👤 User: <strong>{user.name}</strong> (Age: {user.age})</p>
                
                {/* Expressions */}
                <p>🔢 Math: 2 + 3 = <strong>{2 + 3}</strong></p>
                <p>📅 Date: <strong>{new Date().toLocaleDateString()}</strong></p>
                
                {/* Conditional */}
                <p>📊 Status: <span style={{ color: user.isActive ? '#4caf50' : '#f44336' }}>
                  {user.isActive ? '🟢 Active' : '🔴 Inactive'}
                </span></p>
                
                {/* Array mapping */}
                <p>🍎 Items: {items.join(', ')}</p>
                
                {/* Function call */}
                <p>📝 Uppercase Name: <strong>{user.name.toUpperCase()}</strong></p>
              </div>
              
              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {`{/* Variables */}
<p>User: {user.name} (Age: {user.age})</p>

{/* Expressions */}
<p>Math: 2 + 3 = {2 + 3}</p>
<p>Date: {new Date().toLocaleDateString()}</p>

{/* Conditional expressions */}
<p>Status: {user.isActive ? '🟢 Active' : '🔴 Inactive'}</p>

{/* Array methods */}
<p>Items: {items.join(', ')}</p>

{/* Function calls */}
<p>Uppercase: {user.name.toUpperCase()}</p>`}
              </div>
            </div>
          </div>

          {/* JSX Attributes */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🏷️ Dynamic JSX Attributes</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
                {/* Dynamic className */}
                <div style={{ 
                  padding: '1rem', 
                  borderRadius: '4px',
                  backgroundColor: user.isActive ? '#e8f5e8' : '#ffebee',
                  border: `2px solid ${user.isActive ? '#4caf50' : '#f44336'}`,
                  textAlign: 'center'
                }}>
                  <strong>Dynamic Background</strong>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                    Color based on user.isActive
                  </p>
                </div>

                {/* Dynamic style */}
                <div style={{
                  padding: '1rem',
                  borderRadius: '4px',
                  backgroundColor: '#f0f0f0',
                  border: '2px solid #ddd',
                  textAlign: 'center',
                  fontSize: user.age > 18 ? '1.1rem' : '0.9rem',
                  fontWeight: user.age > 18 ? 'bold' : 'normal'
                }}>
                  <strong>Dynamic Font Size</strong>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                    Size based on age &gt; 18
                  </p>
                </div>

                {/* Dynamic src/alt */}
                <div style={{ padding: '1rem', borderRadius: '4px', backgroundColor: '#fff3cd', border: '2px solid #ffc107', textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    backgroundColor: '#667eea', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}>
                    {user.name.charAt(0)}
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                    Dynamic Initial
                  </p>
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {`{/* Dynamic className */}
<div className={user.isActive ? 'active' : 'inactive'}>
  Status dependent styling
</div>

{/* Dynamic style object */}
<div style={{
  backgroundColor: user.isActive ? '#e8f5e8' : '#ffebee',
  fontSize: user.age > 18 ? '1.1rem' : '0.9rem'
}}>
  Conditional styles
</div>

{/* Dynamic attributes */}
<img 
  src={\`/avatar/\${user.id}.jpg\`}
  alt={\`Avatar for \${user.name}\`}
  title={user.name}
/>`}
              </div>
            </div>
          </div>

          {/* JSX Lists and Keys */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📋 JSX Lists and Keys</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Simple List:</h4>
                <ul style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}>
                  {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Complex List with Objects:</h4>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {[
                    { id: 1, name: 'React', difficulty: 'Medium', color: '#61dafb' },
                    { id: 2, name: 'JavaScript', difficulty: 'Easy', color: '#f7df1e' },
                    { id: 3, name: 'TypeScript', difficulty: 'Hard', color: '#3178c6' }
                  ].map(tech => (
                    <div 
                      key={tech.id}
                      style={{ 
                        padding: '0.75rem', 
                        backgroundColor: 'white', 
                        border: `2px solid ${tech.color}`,
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>{tech.name}</span>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: tech.color, 
                        color: 'white', 
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        {tech.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {`{/* Simple array mapping */}
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

{/* Object array mapping */}
{technologies.map(tech => (
  <div key={tech.id}>
    <span>{tech.name}</span>
    <span>{tech.difficulty}</span>
  </div>
))}`}
              </div>
            </div>
          </div>

          {/* JSX Fragments */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🧩 JSX Fragments</h3>
            
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#667eea', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              {showAdvanced ? 'Hide' : 'Show'} Fragment Examples
            </button>

            {showAdvanced && (
              <>
                <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px', marginBottom: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Fragment with React.Fragment:</h4>
                  <p style={{ margin: 0 }}>This content is wrapped in React.Fragment</p>
                  <p style={{ margin: '0.5rem 0 0 0' }}>Multiple elements without extra DOM wrapper</p>
                </div>

                <div style={{ padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '4px', marginBottom: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Fragment with short syntax {'<></>'}: </h4>
                  <p style={{ margin: 0 }}>This uses the shorter fragment syntax</p>
                  <p style={{ margin: '0.5rem 0 0 0' }}>Same result, cleaner syntax</p>
                </div>
              </>
            )}
            
            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`{/* Long syntax */}
<React.Fragment>
  <h1>Title</h1>
  <p>Paragraph</p>
</React.Fragment>

{/* Short syntax */}
<>
  <h1>Title</h1>
  <p>Paragraph</p>
</>

{/* Use React.Fragment when you need key prop */}
{items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.name}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
))}`}
            </div>
          </div>

          {/* JSX Transformation */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#667eea' }}>⚙️ How JSX Works (Transformation)</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>JSX Code:</h4>
                <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {`<div className="container">
  <h1>Hello, {name}!</h1>
  <button onClick={handleClick}>
    Click me
  </button>
</div>`}
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#4caf50', marginBottom: '0.5rem' }}>Compiles to:</h4>
                <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {`React.createElement(
  'div',
  { className: 'container' },
  React.createElement(
    'h1',
    null,
    'Hello, ', name, '!'
  ),
  React.createElement(
    'button',
    { onClick: handleClick },
    'Click me'
  )
)`}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '4px' }}>
              <strong>💡 Key Point:</strong> JSX is just syntactic sugar for React.createElement calls. 
              The browser doesn't understand JSX - it gets compiled to regular JavaScript.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JsxbasicsExample;