import { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem',
      background: todo.completed ? '#f5f5f5' : 'white',
      borderRadius: '6px',
      border: '1px solid #ddd',
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ transform: 'scale(1.2)' }}
      />
      
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ flex: 1, padding: '0.5rem', border: '1px solid #667eea', borderRadius: '4px' }}
          />
          <button onClick={handleSave} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Save
          </button>
        </>
      ) : (
        <>
          <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#333' }}>
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)} style={{ padding: '0.5rem 0.75rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
            Edit
          </button>
        </>
      )}
      
      <button onClick={() => onDelete(todo.id)} style={{ padding: '0.5rem 0.75rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
        Delete
      </button>
    </div>
  );
};

const Counter = ({ value, onIncrement, onDecrement, onReset }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <button onClick={onDecrement} style={{ width: '40px', height: '40px', background: '#f44336', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '50px', textAlign: 'center' }}>{value}</span>
    <button onClick={onIncrement} style={{ width: '40px', height: '40px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
    <button onClick={onReset} style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset</button>
  </div>
);

const SearchBox = ({ value, onChange, onSearch, onClear, placeholder }) => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ flex: 1, padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px', fontSize: '1rem' }}
    />
    <button onClick={onSearch} style={{ padding: '0.75rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Search</button>
    <button onClick={onClear} style={{ padding: '0.75rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Clear</button>
  </div>
);

export const PassFunctionAsPropsExample = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [logs, setLogs] = useState([]);

  const addLog = (action) => {
    setLogs(prev => [...prev, { id: Date.now(), action, time: new Date().toLocaleTimeString() }].slice(-5));
  };

  const handleToggle = (id) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    addLog(`Toggled todo #${id}`);
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    addLog(`Deleted todo #${id}`);
  };

  const handleEdit = (id, newText) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
    addLog(`Edited todo #${id}`);
  };

  const handleSearch = () => {
    setSearchResults(`Searched for: "${searchQuery}"`);
    addLog(`Searched: ${searchQuery}`);
  };

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Pass Function as Props</h2>

        {/* Action Log */}
        {logs.length > 0 && (
          <div style={{ ...cardStyle, background: '#1e1e1e', color: '#d4d4d4' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4caf50' }}>Action Log</h4>
            {logs.map(log => (
              <div key={log.id} style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#666' }}>[{log.time}]</span> {log.action}
              </div>
            ))}
          </div>
        )}

        {/* Counter Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Counter with Callback Props</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Functions passed as props allow child components to communicate with parents.
          </p>

          <Counter
            value={count}
            onIncrement={() => { setCount(c => c + 1); addLog('Incremented'); }}
            onDecrement={() => { setCount(c => c - 1); addLog('Decremented'); }}
            onReset={() => { setCount(0); addLog('Reset counter'); }}
          />

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`// Parent component
const [count, setCount] = useState(0);

<Counter
  value={count}
  onIncrement={() => setCount(c => c + 1)}
  onDecrement={() => setCount(c => c - 1)}
  onReset={() => setCount(0)}
/>

// Child component
const Counter = ({ value, onIncrement, onDecrement, onReset }) => (
  <div>
    <button onClick={onDecrement}>-</button>
    <span>{value}</span>
    <button onClick={onIncrement}>+</button>
    <button onClick={onReset}>Reset</button>
  </div>
);`}
          </pre>
        </div>

        {/* Todo List Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Todo List with Multiple Callbacks</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Complex interactions using multiple function props: onToggle, onDelete, onEdit.
          </p>

          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`<TodoItem
  todo={todo}
  onToggle={(id) => toggleTodo(id)}
  onDelete={(id) => deleteTodo(id)}
  onEdit={(id, text) => editTodo(id, text)}
/>`}
          </pre>
        </div>

        {/* Search Box Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Search Box with Value + Callbacks</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Controlled input with multiple action callbacks.
          </p>

          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            onClear={() => { setSearchQuery(''); setSearchResults(''); addLog('Cleared search'); }}
            placeholder="Search..."
          />

          {searchResults && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              {searchResults}
            </div>
          )}

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`<SearchBox
  value={searchQuery}
  onChange={(value) => setSearchQuery(value)}
  onSearch={() => performSearch(searchQuery)}
  onClear={() => setSearchQuery('')}
  placeholder="Search..."
/>`}
          </pre>
        </div>

        {/* Key Points */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Why Pass Functions as Props?</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { title: 'Child to Parent Communication', desc: 'Children can notify parents of events' },
              { title: 'Lift State Up', desc: 'Keep state in parent, control from children' },
              { title: 'Reusable Components', desc: 'Same component, different behaviors' },
              { title: 'Separation of Concerns', desc: 'Logic in parent, UI in child' },
            ].map(item => (
              <div key={item.title} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <strong>{item.title}</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassFunctionAsPropsExample;
