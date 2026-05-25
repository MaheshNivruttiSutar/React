# React 19 - All New Features

## Overview

React 19 is a major release with significant improvements to the developer experience, performance, and built-in capabilities. This guide covers all major new features.

## 1. Actions

Actions are async functions that handle data mutations, especially in forms.

### useActionState

```jsx
const [state, action, isPending] = useActionState(
  async (prevState, formData) => {
    const result = await saveData(formData);
    return { success: true, data: result };
  },
  { success: null, data: null }
);

<form action={action}>
  <input name="field" />
  <button disabled={isPending}>Submit</button>
</form>
```

### useOptimistic

```jsx
const [optimisticMessages, addOptimistic] = useOptimistic(
  messages,
  (state, newMessage) => [...state, { ...newMessage, pending: true }]
);

async function send(text) {
  addOptimistic({ id: Date.now(), text });
  await sendToServer(text);
}
```

### useFormStatus

```jsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;
}
```

## 2. use() Hook

A new primitive for reading resources (Promises and Context).

### Key Feature: Conditional Calling

```jsx
function Profile({ userId, showDetails }) {
  // Can be called conditionally!
  if (!showDetails) return <Summary userId={userId} />;
  
  const user = use(fetchUser(userId));
  const posts = use(fetchPosts(userId));
  
  return <FullProfile user={user} posts={posts} />;
}
```

### Reading Context

```jsx
function ThemedButton() {
  const theme = use(ThemeContext);  // Same as useContext
  return <button className={theme}>Click</button>;
}
```

## 3. ref as Prop

No more `forwardRef` wrapper needed!

### Before React 19

```jsx
const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));
```

### React 19

```jsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Usage stays the same
<Input ref={myRef} />
```

## 4. Context as Provider

Context can be rendered directly without `.Provider`.

### Before

```jsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

### React 19

```jsx
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

Note: `.Provider` still works for backward compatibility.

## 5. Document Metadata

Native support for `<title>`, `<meta>`, and `<link>` tags.

```jsx
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />
      <link rel="canonical" href={post.url} />
      
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

Tags automatically hoist to `<head>` and deduplicate.

## 6. Stylesheet Support

Built-in stylesheet management with precedence control.

```jsx
function Component() {
  return (
    <>
      <link rel="stylesheet" href="/base.css" precedence="default" />
      <link rel="stylesheet" href="/theme.css" precedence="high" />
      <div>Content waits for stylesheets</div>
    </>
  );
}
```

### Features

- Stylesheets load before content renders
- Automatic deduplication
- Precedence-based ordering
- Works with Suspense

## 7. Async Scripts

Better async script handling.

```jsx
function Component() {
  return (
    <>
      <script async src="/analytics.js" />
      <div>Content</div>
    </>
  );
}
```

### Features

- Automatic deduplication across components
- Proper loading order
- Hoisting to document

## 8. Resource Preloading APIs

New APIs for preloading resources.

```jsx
import { 
  prefetchDNS, 
  preconnect, 
  preload, 
  preinit 
} from 'react-dom';

function App() {
  // DNS prefetch
  prefetchDNS('https://api.example.com');
  
  // Preconnect
  preconnect('https://cdn.example.com');
  
  // Preload resources
  preload('/fonts/main.woff2', { as: 'font' });
  preload('/hero.webp', { as: 'image' });
  
  // Preinit (download and execute)
  preinit('/critical.js', { as: 'script' });
  preinit('/critical.css', { as: 'style' });
}
```

## 9. Better Error Reporting

Improved error handling and logging.

### New Callbacks

```jsx
createRoot(container, {
  onCaughtError: (error, errorInfo) => {
    // Error caught by Error Boundary
    logError(error, errorInfo);
  },
  onUncaughtError: (error, errorInfo) => {
    // Uncaught rendering error
    showErrorDialog(error);
  },
  onRecoverableError: (error, errorInfo) => {
    // Recoverable errors (hydration mismatches)
    logRecoverable(error);
  }
});
```

### Improvements

- No more duplicate error logs in development
- Better stack traces
- More actionable error messages

## 10. Custom Elements Support

Full Web Components support.

```jsx
function App() {
  return (
    <my-element
      customProp={complexObject}    // Objects passed as properties
      oncustomevent={handleEvent}   // Custom events work
      class="styling"               // class attribute supported
    />
  );
}
```

## 11. Async Transitions

`startTransition` now accepts async functions.

```jsx
const [isPending, startTransition] = useTransition();

const handleSearch = (query) => {
  startTransition(async () => {
    const results = await searchAPI(query);
    setResults(results);
  });
};
```

## 12. Improved Hydration

- Better hydration error recovery
- Suspense boundaries during SSR hydration
- Third-party script compatibility

## Summary Table

| Feature | Hook/API | Purpose |
|---------|----------|---------|
| Actions | `useActionState` | Form state + pending |
| Optimistic UI | `useOptimistic` | Instant feedback |
| Resource reading | `use()` | Conditional Promise/Context |
| Form status | `useFormStatus` | Nested form state |
| Refs | `ref` prop | No forwardRef needed |
| Context | Direct render | Simpler provider syntax |
| Metadata | `<title>`, `<meta>` | Document head |
| Stylesheets | `precedence` | Load ordering |
| Preloading | `preload()`, etc. | Resource hints |
| Errors | `onCaughtError` | Better handling |
| Custom Elements | Native support | Web Components |

## Migration Tips

1. **Actions**: Replace `onSubmit` handlers with `action` prop
2. **use()**: Gradually replace `useContext` for conditional cases
3. **forwardRef**: Remove wrapper, add `ref` to props
4. **Context.Provider**: Can update to direct syntax
5. **Metadata**: Replace react-helmet for simple cases
