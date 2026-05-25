# useId Hook

## What is useId?

useId generates unique IDs that are stable across server and client. Perfect for accessibility attributes.

## Syntax

```jsx
const id = useId();
```

## Basic Example

```jsx
function FormField({ label }) {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}
```

## Multiple Related IDs

```jsx
function Component() {
  const id = useId();
  
  return (
    <>
      <h2 id={`${id}-title`}>Section Title</h2>
      <p id={`${id}-description`}>Description text</p>
      <div
        role="region"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
      >
        Content
      </div>
    </>
  );
}
```

## Accessibility Use Cases

### Label + Input

```jsx
<label htmlFor={id}>Email</label>
<input id={id} type="email" />
```

### aria-describedby

```jsx
<input id={inputId} aria-describedby={helpId} />
<p id={helpId}>Help text for the input</p>
```

### aria-labelledby

```jsx
<h2 id={headingId}>Settings</h2>
<ul aria-labelledby={headingId}>...</ul>
```

## Why Not Use UUID or Random?

- **SSR Mismatch** - Random IDs differ server vs client
- **Hydration Errors** - React needs matching IDs
- **Performance** - useId is optimized for React

## Rules

1. **Call at top level** - Like all hooks
2. **Don't use for list keys** - Use data-based keys
3. **Use for DOM IDs only** - Not for data identification

## ID Format

Generated IDs look like: `:r1:`, `:r2:`, etc.
They're unique per component instance and stable.
