# Click Events and Function Calls

## Quick Overview

Learn how to handle user interactions in React using event handlers and function calls.

## What You'll Learn

- onClick and other event handlers
- Passing arguments to handlers
- Accessing the event object
- Preventing default behavior
- Common patterns and mistakes

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- JSX basics
- JavaScript functions

## Key Patterns

```jsx
// Basic handler
<button onClick={handleClick}>Click</button>

// With arguments (wrap in arrow function)
<button onClick={() => handleClick('Alice')}>
  Greet
</button>

// With event object
<button onClick={(e) => handleClick('Alice', e)}>
  Click
</button>
```

---

**Tip**: Never call the function directly in onClick (`onClick={fn()}`), pass the reference (`onClick={fn}`) or wrap in arrow function (`onClick={() => fn(arg)}`)!
