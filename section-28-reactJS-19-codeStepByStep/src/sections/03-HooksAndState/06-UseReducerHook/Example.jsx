import { useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET': return { count: 0 };
    case 'SET': return { count: action.payload };
    default: return state;
  }
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

export const UseReducerHookExample = () => {
  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 });
  const [todos, todosDispatch] = useReducer(todoReducer, [
    { id: 1, text: 'Learn useReducer', completed: false },
    { id: 2, text: 'Build a todo app', completed: true },
  ]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const input = e.target.elements.todoInput;
    if (input.value.trim()) {
      todosDispatch({ type: 'ADD', payload: input.value.trim() });
      input.value = '';
    }
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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useReducer Hook</h2>

        {/* What is useReducer */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useReducer?</h3>
          <p style={{ color: '#666' }}>
            useReducer is an alternative to useState for complex state logic. It takes a reducer function 
            and returns the current state paired with a dispatch method.
          </p>
          
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
}

// Dispatch an action
dispatch({ type: 'INCREMENT' });`}
          </pre>
        </div>

        {/* Counter Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Counter Example</h3>
          
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea', marginBottom: '1rem' }}>
              {counterState.count}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => counterDispatch({ type: 'DECREMENT' })} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-1</button>
              <button onClick={() => counterDispatch({ type: 'INCREMENT' })} style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+1</button>
              <button onClick={() => counterDispatch({ type: 'SET', payload: 10 })} style={{ padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Set to 10</button>
              <button onClick={() => counterDispatch({ type: 'RESET' })} style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset</button>
            </div>
          </div>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'SET': return { count: action.payload };
    case 'RESET': return { count: 0 };
    default: return state;
  }
};

const [state, dispatch] = useReducer(counterReducer, { count: 0 });

dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET', payload: 10 });`}
          </pre>
        </div>

        {/* Todo Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Todo List Example</h3>
          
          <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              name="todoInput"
              type="text"
              placeholder="Add a todo..."
              style={{ flex: 1, padding: '0.75rem', border: '2px solid #ddd', borderRadius: '6px' }}
            />
            <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Add
            </button>
          </form>

          <div style={{ marginBottom: '1rem' }}>
            {todos.map(todo => (
              <div key={todo.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                background: todo.completed ? '#f5f5f5' : '#fff',
                borderRadius: '6px',
                marginBottom: '0.5rem',
                border: '1px solid #ddd',
              }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todosDispatch({ type: 'TOGGLE', payload: todo.id })}
                  style={{ marginRight: '0.75rem', transform: 'scale(1.2)' }}
                />
                <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#333' }}>
                  {todo.text}
                </span>
                <button
                  onClick={() => todosDispatch({ type: 'DELETE', payload: todo.id })}
                  style={{ padding: '0.25rem 0.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => todosDispatch({ type: 'CLEAR_COMPLETED' })}
            style={{ padding: '0.5rem 1rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Completed
          </button>
        </div>

        {/* useState vs useReducer */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>useState vs useReducer</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Use useState when:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Simple state (string, number, boolean)</li>
                <li>Independent pieces of state</li>
                <li>Straightforward updates</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong>Use useReducer when:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Complex state objects</li>
                <li>State depends on previous state</li>
                <li>Multiple related state updates</li>
                <li>Want predictable state transitions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseReducerHookExample;
