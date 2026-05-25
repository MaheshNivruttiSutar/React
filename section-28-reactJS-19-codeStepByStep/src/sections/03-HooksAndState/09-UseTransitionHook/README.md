# useTransition Hook

## Quick Overview

useTransition marks updates as non-urgent, keeping UI responsive.

## What You'll Learn

- Marking transitions as non-urgent
- isPending state
- Keeping input responsive
- Common use cases

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setExpensiveState(value);
});

{isPending && <Loading />}
```

---

**Tip**: Use for expensive updates that user can wait for - not urgent interactions like typing!
