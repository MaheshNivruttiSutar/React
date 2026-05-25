# Validation with useActionState (React 19)

## Quick Overview

Learn React 19's `useActionState` hook for form validation with automatic pending states and server action support.

## What You'll Learn

- useActionState hook syntax
- Action function pattern
- Automatic isPending state
- FormData vs controlled inputs
- Server actions integration
- useFormStatus for nested components

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- React 19 basics
- Form handling concepts
- Async/await

## Key Pattern

```jsx
async function submitAction(prevState, formData) {
  const email = formData.get('email');
  if (!email) return { errors: { email: 'Required' } };
  return { errors: {}, success: true };
}

function Form() {
  const [state, action, isPending] = useActionState(
    submitAction,
    { errors: {}, success: false }
  );

  return (
    <form action={action}>
      <input name="email" />
      {state.errors.email && <span>{state.errors.email}</span>}
      <button disabled={isPending}>Submit</button>
    </form>
  );
}
```

---

**Tip**: useActionState provides automatic loading state via `isPending` - no more manual `setLoading(true/false)`!
