import { useState, useActionState, useOptimistic, useTransition } from 'react';

export const React19UseActionHookExample = () => {
  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>React 19 useActionState Hook</h2>

        {/* Example 1: Basic useActionState */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>1. Basic useActionState (Form Submission)</h3>
          <BasicActionStateDemo />
        </div>

        {/* Example 2: Form Validation */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>2. Form Validation with Actions</h3>
          <FormValidationDemo />
        </div>

        {/* Example 3: useOptimistic with Actions */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>3. useOptimistic - Instant UI Feedback</h3>
          <OptimisticDemo />
        </div>

        {/* Example 4: Actions with useTransition */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>4. Actions with useTransition</h3>
          <TransitionActionsDemo />
        </div>

        {/* Example 5: Complete CRUD Example */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>5. Complete CRUD with Actions</h3>
          <CRUDActionsDemo />
        </div>
      </div>
    </div>
  );
};

// Example 1: Basic useActionState
const BasicActionStateDemo = () => {
  // Action function receives (previousState, formData)
  async function submitAction(prevState, formData) {
    const name = formData.get('name');
    
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!name || name.trim() === '') {
      return { success: false, message: 'Name is required!' };
    }
    
    return { success: true, message: `Hello, ${name}! Form submitted successfully.` };
  }

  const [state, formAction, isPending] = useActionState(submitAction, {
    success: null,
    message: ''
  });

  return (
    <div>
      <form action={formAction}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Your Name:
          </label>
          <input
            name="name"
            type="text"
            disabled={isPending}
            placeholder="Enter your name"
            style={{
              padding: '0.75rem',
              border: '2px solid #e0e0e0',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '0.75rem 1.5rem',
            background: isPending ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {state.message && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '6px',
          background: state.success ? '#e8f5e9' : '#ffebee',
          color: state.success ? '#2e7d32' : '#c62828',
        }}>
          {state.message}
        </div>
      )}

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// useActionState returns [state, action, isPending]
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const name = formData.get('name');
    await saveToServer(name);
    return { success: true, message: 'Saved!' };
  },
  { success: null, message: '' }  // Initial state
);

<form action={formAction}>
  <input name="name" />
  <button disabled={isPending}>
    {isPending ? 'Saving...' : 'Save'}
  </button>
</form>`}
      </pre>
    </div>
  );
};

// Example 2: Form Validation
const FormValidationDemo = () => {
  async function validateAndSubmit(prevState, formData) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const errors = {};
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!email || !email.includes('@')) {
      errors.email = 'Valid email is required';
    }

    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true, errors: {}, message: 'Account created successfully!' };
  }

  const [state, formAction, isPending] = useActionState(validateAndSubmit, {
    success: null,
    errors: {},
    message: ''
  });

  return (
    <div>
      <form action={formAction}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            style={{
              padding: '0.75rem',
              border: `2px solid ${state.errors?.email ? '#c62828' : '#e0e0e0'}`,
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          {state.errors?.email && (
            <p style={{ color: '#c62828', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
              {state.errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="At least 6 characters"
            style={{
              padding: '0.75rem',
              border: `2px solid ${state.errors?.password ? '#c62828' : '#e0e0e0'}`,
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          {state.errors?.password && (
            <p style={{ color: '#c62828', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
              {state.errors.password}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Repeat password"
            style={{
              padding: '0.75rem',
              border: `2px solid ${state.errors?.confirmPassword ? '#c62828' : '#e0e0e0'}`,
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          {state.errors?.confirmPassword && (
            <p style={{ color: '#c62828', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
              {state.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '0.75rem 1.5rem',
            background: isPending ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isPending ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {state.success && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '6px',
          background: '#e8f5e9',
          color: '#2e7d32',
        }}>
          {state.message}
        </div>
      )}
    </div>
  );
};

// Example 3: useOptimistic
const OptimisticDemo = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sending: false },
    { id: 2, text: 'How are you?', sending: false },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newMessage) => [
      ...currentMessages,
      { ...newMessage, sending: true }
    ]
  );

  async function sendMessage(formData) {
    const text = formData.get('message');
    if (!text.trim()) return;

    const newMessage = { id: Date.now(), text };
    
    // Optimistically add message
    addOptimisticMessage(newMessage);

    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Actually add message
    setMessages(prev => [...prev, { ...newMessage, sending: false }]);
  }

  return (
    <div>
      <p style={{ color: '#666', marginTop: 0 }}>
        Messages appear instantly (optimistic), then confirm after "server" responds:
      </p>

      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        maxHeight: '200px',
        overflow: 'auto',
      }}>
        {optimisticMessages.map(msg => (
          <div
            key={msg.id}
            style={{
              padding: '0.5rem 1rem',
              background: msg.sending ? '#fff3e0' : '#e3f2fd',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              opacity: msg.sending ? 0.7 : 1,
            }}
          >
            {msg.text}
            {msg.sending && <span style={{ marginLeft: '0.5rem', color: '#f57c00' }}>(sending...)</span>}
          </div>
        ))}
      </div>

      <form action={sendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          name="message"
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '2px solid #e0e0e0',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`const [optimisticItems, addOptimistic] = useOptimistic(
  items,
  (current, newItem) => [...current, { ...newItem, pending: true }]
);

async function addItem(formData) {
  addOptimistic(newItem);  // Show immediately
  await saveToServer(newItem);  // Then save
  setItems(prev => [...prev, newItem]);  // Update real state
}`}
      </pre>
    </div>
  );
};

// Example 4: useTransition with Actions
const TransitionActionsDemo = () => {
  const [isPending, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  async function search(searchQuery) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const allItems = [
      'React', 'Redux', 'Router', 'Remix',
      'Angular', 'Vue', 'Svelte', 'Next.js',
      'Node.js', 'Express', 'Nest.js', 'Fastify',
    ];
    
    return allItems.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(async () => {
      if (value.trim()) {
        const results = await search(value);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    });
  };

  return (
    <div>
      <p style={{ color: '#666', marginTop: 0 }}>
        startTransition can now wrap async functions in React 19:
      </p>

      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search frameworks..."
        style={{
          padding: '0.75rem',
          border: '2px solid #667eea',
          borderRadius: '4px',
          width: '100%',
          boxSizing: 'border-box',
          marginBottom: '1rem',
        }}
      />

      {isPending && (
        <p style={{ color: '#667eea', fontStyle: 'italic' }}>Searching...</p>
      )}

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
        {searchResults.length === 0 && query && !isPending ? (
          <p style={{ margin: 0, color: '#999' }}>No results found</p>
        ) : searchResults.length === 0 ? (
          <p style={{ margin: 0, color: '#999' }}>Type to search...</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {searchResults.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// React 19: startTransition accepts async functions!
const [isPending, startTransition] = useTransition();

const handleSearch = (query) => {
  startTransition(async () => {
    const results = await searchAPI(query);
    setResults(results);
  });
};`}
      </pre>
    </div>
  );
};

// Example 5: Complete CRUD
const CRUDActionsDemo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Build an app', completed: false },
  ]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, { type, payload }) => {
      switch (type) {
        case 'add':
          return [...state, { ...payload, pending: true }];
        case 'toggle':
          return state.map(t => t.id === payload ? { ...t, completed: !t.completed, pending: true } : t);
        case 'delete':
          return state.filter(t => t.id !== payload);
        default:
          return state;
      }
    }
  );

  async function addTodo(formData) {
    const text = formData.get('todo');
    if (!text.trim()) return;

    const newTodo = { id: Date.now(), text, completed: false };
    addOptimisticTodo({ type: 'add', payload: newTodo });

    await new Promise(resolve => setTimeout(resolve, 500));
    setTodos(prev => [...prev, newTodo]);
  }

  async function toggleTodo(id) {
    addOptimisticTodo({ type: 'toggle', payload: id });
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  async function deleteTodo(id) {
    addOptimisticTodo({ type: 'delete', payload: id });
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <form action={addTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          name="todo"
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '2px solid #e0e0e0',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
        {optimisticTodos.length === 0 ? (
          <p style={{ margin: 0, color: '#999' }}>No todos yet</p>
        ) : (
          optimisticTodos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'white',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                opacity: todo.pending ? 0.7 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#333',
              }}>
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
                  fontSize: '0.85rem',
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React19UseActionHookExample;
