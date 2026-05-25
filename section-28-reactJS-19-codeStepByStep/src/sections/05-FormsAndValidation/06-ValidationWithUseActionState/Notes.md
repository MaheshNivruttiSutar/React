# Validation with useActionState (React 19)

## What is useActionState?

`useActionState` is a React 19 hook (previously called `useFormState`) that manages form state and handles form submissions with automatic pending states.

## Basic Syntax

```jsx
const [state, formAction, isPending] = useActionState(
  actionFunction,
  initialState
);
```

- **state** - Current state returned by the action
- **formAction** - Function to pass to form's action prop
- **isPending** - Boolean indicating if action is running

## Action Function

```jsx
async function submitForm(prevState, formData) {
  // prevState - Previous state value
  // formData - Native FormData object
  
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Validate
  const errors = {};
  if (!email) errors.email = 'Required';
  if (!password) errors.password = 'Required';
  
  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }
  
  // Submit to server
  await fetch('/api/login', {
    method: 'POST',
    body: formData,
  });
  
  return { errors: {}, success: true };
}
```

## Complete Form Example

```jsx
'use client';
import { useActionState } from 'react';

async function registerAction(prevState, formData) {
  // Simulate server delay
  await new Promise(r => setTimeout(r, 1000));
  
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  
  const errors = {};
  
  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Valid email required';
  }
  
  if (!password || password.length < 8) {
    errors.password = 'Password must be 8+ characters';
  }
  
  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }
  
  return { errors: {}, success: true, message: 'Registered!' };
}

function RegistrationForm() {
  const [state, action, isPending] = useActionState(registerAction, {
    errors: {},
    success: false,
    message: ''
  });

  return (
    <form action={action}>
      <div>
        <label>Name</label>
        <input name="name" disabled={isPending} />
        {state.errors.name && <span>{state.errors.name}</span>}
      </div>
      
      <div>
        <label>Email</label>
        <input name="email" type="email" disabled={isPending} />
        {state.errors.email && <span>{state.errors.email}</span>}
      </div>
      
      <div>
        <label>Password</label>
        <input name="password" type="password" disabled={isPending} />
        {state.errors.password && <span>{state.errors.password}</span>}
      </div>
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>
      
      {state.success && <p>{state.message}</p>}
    </form>
  );
}
```

## Server Actions (Next.js)

```jsx
// actions.js (Server Action)
'use server';

export async function registerUser(prevState, formData) {
  const email = formData.get('email');
  
  // Server-side validation
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { errors: { email: 'Email already exists' }, success: false };
  }
  
  // Create user
  await db.user.create({
    data: { email, password: formData.get('password') }
  });
  
  return { errors: {}, success: true };
}

// Component
'use client';
import { useActionState } from 'react';
import { registerUser } from './actions';

function Form() {
  const [state, action, isPending] = useActionState(registerUser, {
    errors: {},
    success: false
  });
  
  return <form action={action}>...</form>;
}
```

## useFormStatus for Nested Components

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function Form() {
  const [state, action] = useActionState(submitAction, initialState);
  
  return (
    <form action={action}>
      <input name="email" />
      <SubmitButton />  {/* Gets pending state automatically */}
    </form>
  );
}
```

## Benefits

1. **Automatic pending state** - No manual loading state management
2. **Progressive enhancement** - Works without JavaScript
3. **Server actions** - Direct server-side validation
4. **FormData API** - Native browser form handling
5. **Less boilerplate** - Cleaner code

## Migration from useState

### Before (Traditional)
```jsx
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  // validate, submit...
  setLoading(false);
};
```

### After (useActionState)
```jsx
const [state, action, isPending] = useActionState(submitAction, {
  errors: {},
  success: false
});

// Form uses action={action} instead of onSubmit
```

## Best Practices

1. **Return consistent state shape** from action function
2. **Handle both client and server errors**
3. **Use useFormStatus** for nested submit buttons
4. **Consider progressive enhancement**
5. **Keep validation logic in action function**
