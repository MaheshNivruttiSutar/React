# JSX with Curly Braces

## Quick Overview

Learn how to embed JavaScript expressions inside JSX using curly braces `{}`.

## What You'll Learn

- Embedding variables and expressions
- Accessing object properties
- Using array methods
- Dynamic attributes and styles
- What can/can't go in curly braces

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- JSX basics
- JavaScript expressions

## Key Patterns

```jsx
{/* Variables */}
<p>Hello, {name}!</p>

{/* Expressions */}
<p>{10 + 5}</p>
<p>{isAdult ? 'Yes' : 'No'}</p>

{/* Object properties */}
<p>{user.firstName}</p>

{/* Dynamic styles */}
<div style={{ color: isActive ? 'green' : 'gray' }}>
```

---

**Tip**: Curly braces let you write any JavaScript expression - but not statements like if/else!
