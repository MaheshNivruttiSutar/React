# React 19 useActionState Hook

## What is useActionState?

`useActionState` (formerly `useFormState`) is a React 19 hook that manages form state with server actions. It provides built-in pending state, error handling, and progressive enhancement support.

## Basic Syntax

```jsx
const [state, formAction, isPending] = useActionState(actionFunction, initialState);
```

### Parameters

- **actionFunction**: Async function receiving `(previousState, formData)`
- **initialState**: Initial state value

### Returns

- **state**: Current state (returned by action)
- **formAction**: Action to pass to form
- **isPending**: Boolean indicating if action is running

## Basic Example

```jsx
async function submitForm(prevState, formData) {
  const name = formData.get('name');
  
  try {
    await saveToServer({ name });
    return { success: true, message: 'Saved!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    success: null,
    message: ''
  });

  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

## Form Validation Pattern

```jsx
async function validateForm(prevState, formData) {
  const errors = {};
  
  const email = formData.get('email');
  const password = formData.get('password');
  
  if (!email?.includes('@')) {
    errors.email = 'Invalid email address';
  }
  
  if (password?.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  
  await registerUser({ email, password });
  return { success: true, errors: {} };
}

function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(validateForm, {
    success: null,
    errors: {}
  });

  return (
    <form action={formAction}>
      <input 
        name="email" 
        style={{ borderColor: state.errors.email ? 'red' : 'gray' }}
      />
      {state.errors.email && <span>{state.errors.email}</span>}
      
      <input 
        name="password" 
        type="password"
        style={{ borderColor: state.errors.password ? 'red' : 'gray' }}
      />
      {state.errors.password && <span>{state.errors.password}</span>}
      
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  );
}
```

## useOptimistic Hook

Shows optimistic UI while async action completes.

### Syntax

```jsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

### Basic Example

```jsx
function MessageList({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newMessage) => [
      ...currentMessages,
      { ...newMessage, sending: true }
    ]
  );

  async function send(formData) {
    const text = formData.get('message');
    const newMessage = { id: Date.now(), text };
    
    // Show immediately
    addOptimisticMessage(newMessage);
    
    // Then send to server
    await sendMessage(newMessage);
  }

  return (
    <div>
      {optimisticMessages.map(msg => (
        <div 
          key={msg.id} 
          style={{ opacity: msg.sending ? 0.5 : 1 }}
        >
          {msg.text}
          {msg.sending && ' (sending...)'}
        </div>
      ))}
      <form action={send}>
        <input name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## CRUD Pattern with useOptimistic

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, { action, payload }) => {
      switch (action) {
        case 'add':
          return [...state, { ...payload, pending: true }];
        case 'update':
          return state.map(t => 
            t.id === payload.id ? { ...payload, pending: true } : t
          );
        case 'delete':
          return state.filter(t => t.id !== payload);
        default:
          return state;
      }
    }
  );

  async function addTodo(formData) {
    const text = formData.get('text');
    const newTodo = { id: Date.now(), text, done: false };
    
    updateOptimistic({ action: 'add', payload: newTodo });
    await saveTodo(newTodo);
    setTodos(prev => [...prev, newTodo]);
  }

  async function toggleTodo(todo) {
    const updated = { ...todo, done: !todo.done };
    
    updateOptimistic({ action: 'update', payload: updated });
    await updateTodoOnServer(updated);
    setTodos(prev => prev.map(t => t.id === todo.id ? updated : t));
  }

  async function deleteTodo(id) {
    updateOptimistic({ action: 'delete', payload: id });
    await deleteTodoOnServer(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  return (/* render UI */);
}
```

## Async Actions in useTransition

React 19 allows async functions in `startTransition`:

```jsx
function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    // Now supports async!
    startTransition(async () => {
      const data = await searchAPI(query);
      setResults(data);
    });
  };

  return (
    <div>
      <input onChange={e => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  );
}
```

## useFormStatus Hook

Get form status from within form components:

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Must be used inside a <form>
function MyForm() {
  return (
    <form action={myAction}>
      <input name="email" />
      <SubmitButton />  {/* Automatically knows form state */}
    </form>
  );
}
```

## Comparison Table

| Feature | Traditional | useActionState |
|---------|-------------|----------------|
| Pending state | Manual useState | Built-in isPending |
| Form submission | onSubmit handler | action prop |
| Progressive enhancement | Needs extra work | Automatic |
| Error handling | try/catch + state | Return from action |
| Server actions | Not supported | Native support |

## Best Practices

### 1. Always Handle Errors

```jsx
async function action(prevState, formData) {
  try {
    await submitData(formData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 2. Provide Loading Feedback

```jsx
<button disabled={isPending}>
  {isPending ? (
    <>
      <Spinner /> Saving...
    </>
  ) : (
    'Save'
  )}
</button>
```

### 3. Use Optimistic Updates for Better UX

```jsx
// Show change immediately, revert on error
addOptimisticMessage(newMessage);
try {
  await sendToServer(newMessage);
} catch {
  // Optimistic state automatically reverts
}
```

### 4. Combine with Validation

```jsx
async function action(prevState, formData) {
  const validation = validateForm(formData);
  if (!validation.valid) {
    return { errors: validation.errors };
  }
  // Proceed with submission
}
```

## Summary

- **useActionState**: Form state + pending + progressive enhancement
- **useOptimistic**: Instant UI feedback while action runs
- **useTransition**: Now supports async functions
- **useFormStatus**: Form awareness for nested components
