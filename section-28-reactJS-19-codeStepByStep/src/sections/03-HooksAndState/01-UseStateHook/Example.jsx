import { useState } from 'react';

export const UsestatehookExample = () => {
  // Different useState examples
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [todos, setTodos] = useState(['Learn React', 'Build projects']);
  const [newTodo, setNewTodo] = useState('');
  const [user, setUser] = useState({ name: '', age: 0, email: '' });

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>useState Hook Examples</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          {/* Counter Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔢 Counter Example</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Basic number state management</p>
            
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '1rem' }}>
                {count}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => setCount(count - 1)}
                  style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  -1
                </button>
                <button 
                  onClick={() => setCount(0)}
                  style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Reset
                </button>
                <button 
                  onClick={() => setCount(count + 1)}
                  style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  +1
                </button>
              </div>
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const [count, setCount] = useState(0);
setCount(count + 1); // Increment
setCount(count - 1); // Decrement
setCount(0); // Reset`}
            </div>
          </div>

          {/* String Input Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📝 Text Input Example</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>String state with input handling</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #667eea', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '4px', marginBottom: '1rem' }}>
              <strong>Hello, {name || 'Anonymous'}! 👋</strong>
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const [name, setName] = useState('');
<input 
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
            </div>
          </div>

          {/* Boolean Toggle Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔄 Boolean Toggle Example</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Boolean state for show/hide</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <button 
                onClick={() => setIsVisible(!isVisible)}
                style={{ padding: '0.75rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
              >
                {isVisible ? 'Hide' : 'Show'} Content
              </button>
            </div>
            
            {isVisible && (
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '4px', border: '2px solid #4caf50', marginBottom: '1rem' }}>
                🎉 This content is conditionally rendered based on boolean state!
              </div>
            )}
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const [isVisible, setIsVisible] = useState(true);
setIsVisible(!isVisible); // Toggle
{isVisible && <div>Conditional content</div>}`}
            </div>
          </div>

          {/* Array State Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📋 Array State Example</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Managing lists with useState</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo..."
                style={{ flex: 1, padding: '0.75rem', border: '2px solid #667eea', borderRadius: '4px', fontSize: '1rem' }}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <button 
                onClick={addTodo}
                style={{ padding: '0.75rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              {todos.map((todo, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: '#f5f5f5', marginBottom: '0.25rem', borderRadius: '4px' }}>
                  <span>{todo}</span>
                  <button 
                    onClick={() => removeTodo(index)}
                    style={{ padding: '0.25rem 0.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const [todos, setTodos] = useState(['Item 1']);
setTodos([...todos, newItem]); // Add
setTodos(todos.filter((_, i) => i !== index)); // Remove`}
            </div>
          </div>

          {/* Object State Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>👤 Object State Example</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Managing complex objects</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUser('name', e.target.value)}
                placeholder="Name"
                style={{ padding: '0.75rem', border: '2px solid #667eea', borderRadius: '4px', fontSize: '1rem' }}
              />
              <input
                type="number"
                value={user.age}
                onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
                placeholder="Age"
                style={{ padding: '0.75rem', border: '2px solid #667eea', borderRadius: '4px', fontSize: '1rem' }}
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => updateUser('email', e.target.value)}
                placeholder="Email"
                style={{ padding: '0.75rem', border: '2px solid #667eea', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '4px', marginBottom: '1rem' }}>
              <strong>User Profile:</strong><br/>
              Name: {user.name || 'Not set'}<br/>
              Age: {user.age || 'Not set'}<br/>
              Email: {user.email || 'Not set'}
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const [user, setUser] = useState({name: '', age: 0});
setUser(prev => ({...prev, name: 'John'})); // Update field`}
            </div>
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>🔑 Key useState Concepts</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>State Updates are Asynchronous</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>React batches state updates for performance</p>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
              <strong>Immutable Updates</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Always create new objects/arrays, don't mutate</p>
            </div>
            <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
              <strong>Functional Updates</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Use callbacks when new state depends on previous</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsestatehookExample;