import { useState } from 'react';

// Functional Component Examples
const SimpleGreeting = () => {
  return <h3 style={{ color: '#4caf50' }}>👋 Hello from a Simple Functional Component!</h3>;
};

const GreetingWithProps = ({ name, age }) => {
  return (
    <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '4px', margin: '0.5rem 0' }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>Hello, {name}!</h4>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Age: {age}</p>
    </div>
  );
};

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);
  
  return (
    <div style={{ textAlign: 'center', padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
      <h4 style={{ margin: '0 0 1rem 0' }}>Interactive Counter Component</h4>
      <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#1976d2' }}>{count}</div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          -1
        </button>
        <button 
          onClick={() => setCount(initialValue)}
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
  );
};

const UserCard = ({ user, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(user)}
      style={{ 
        padding: '1rem', 
        background: 'white', 
        border: '2px solid #ddd',
        borderRadius: '4px', 
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = '#667eea';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = '#ddd';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#667eea', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white',
          fontWeight: 'bold',
          marginRight: '1rem'
        }}>
          {user.name.charAt(0)}
        </div>
        <div>
          <h4 style={{ margin: 0, color: '#333' }}>{user.name}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{user.role}</p>
        </div>
      </div>
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0.75rem', 
      background: todo.completed ? '#f5f5f5' : 'white',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '0.5rem'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '1rem', transform: 'scale(1.2)' }}
      />
      <span style={{ 
        flex: 1, 
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#999' : '#333'
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)}
        style={{ 
          padding: '0.25rem 0.5rem', 
          background: '#f44336', 
          color: 'white', 
          border: 'none', 
          borderRadius: '3px', 
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Delete
      </button>
    </div>
  );
};

export const WhatiscomponentExample = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React components', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master props and state', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const users = [
    { id: 1, name: 'Alice Johnson', role: 'Developer' },
    { id: 2, name: 'Bob Smith', role: 'Designer' },
    { id: 3, name: 'Carol Davis', role: 'Manager' }
  ];

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>What is a Component? - Live Examples</h2>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* Simple Components */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🧩 Simple Functional Components</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Components are the building blocks of React. Here are basic functional components:
            </p>
            
            <SimpleGreeting />
            <GreetingWithProps name="React Developer" age={25} />
            <GreetingWithProps name="JavaScript Learner" age={22} />
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`// Simple functional component
const SimpleGreeting = () => {
  return <h3>👋 Hello from a Component!</h3>;
};

// Component with props
const GreetingWithProps = ({ name, age }) => {
  return (
    <div>
      <h4>Hello, {name}!</h4>
      <p>Age: {age}</p>
    </div>
  );
};`}
            </div>
          </div>

          {/* Stateful Components */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>⚡ Components with State (Hooks)</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Components can have their own state and handle user interactions:
            </p>
            
            <Counter initialValue={0} />
            <Counter initialValue={10} />
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);
  
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};`}
            </div>
          </div>

          {/* Interactive Components */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🎯 Interactive Components with Props</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Components can communicate with parent components through props and callbacks:
            </p>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
              {users.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onSelect={setSelectedUser}
                />
              ))}
            </div>

            {selectedUser && (
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '4px' }}>
                <strong>Selected User:</strong> {selectedUser.name} - {selectedUser.role}
              </div>
            )}
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {`const UserCard = ({ user, onSelect }) => {
  return (
    <div onClick={() => onSelect(user)}>
      <h4>{user.name}</h4>
      <p>{user.role}</p>
    </div>
  );
};

// Usage:
<UserCard user={user} onSelect={setSelectedUser} />`}
            </div>
          </div>

          {/* Complex Component Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔧 Complex Component Example - Todo List</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Real-world components often manage multiple pieces of state and handle various events:
            </p>
            
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new todo..."
                style={{ 
                  flex: 1, 
                  padding: '0.75rem', 
                  border: '2px solid #ddd', 
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <button 
                onClick={handleAddTodo}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#4caf50', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer'
                }}
              >
                Add Todo
              </button>
            </div>

            <div>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  return (
    <div>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  );
};`}
            </div>
          </div>

          {/* Component Concepts */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#667eea' }}>💡 Key Component Concepts</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#1976d2' }}>🔧 Reusable</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Components can be used multiple times with different props
                </p>
              </div>
              
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#388e3c' }}>📦 Encapsulated</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Each component manages its own state and logic
                </p>
              </div>
              
              <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#856404' }}>🔄 Interactive</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Components can handle events and update based on user interaction
                </p>
              </div>
              
              <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#c2185b' }}>🎯 Composable</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Complex UIs are built by combining simple components
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatiscomponentExample;