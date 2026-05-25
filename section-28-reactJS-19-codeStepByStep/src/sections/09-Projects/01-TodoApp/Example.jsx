import { useState, useEffect } from 'react';

export const TodoAppExample = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter(t => !t.completed).length;

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem', textAlign: 'center' }}>
          Todo App
        </h2>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Add
          </button>
        </form>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                background: filter === f ? '#667eea' : '#e0e0e0',
                color: filter === f ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {filteredTodos.length === 0 ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
              {filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos`}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: '1px solid #eee',
                  gap: '1rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span
                  style={{
                    flex: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#333',
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: '#ff4757',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}>
            <span style={{ color: '#666' }}>
              {remainingCount} item{remainingCount !== 1 ? 's' : ''} left
            </span>
            <button
              onClick={clearCompleted}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: '#667eea',
                border: '1px solid #667eea',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoAppExample;
