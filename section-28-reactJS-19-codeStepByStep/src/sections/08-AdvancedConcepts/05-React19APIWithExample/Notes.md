# React 19 APIs with Examples

## Overview

React 19 introduces several new APIs that make building responsive, data-driven applications easier. This section covers the most important ones with practical examples.

## 1. use() Hook

The `use()` hook is a new React 19 primitive that can read Promises and Context.

### Reading Promises

```jsx
function UserProfile({ userPromise }) {
  const user = use(userPromise);  // Suspends until Promise resolves
  return <div>{user.name}</div>;
}

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>
```

### Reading Context (Conditionally!)

Unlike `useContext`, `use()` can be called conditionally:

```jsx
function ConditionalTheme({ showTheme }) {
  if (!showTheme) {
    return <p>Theme hidden</p>;
  }
  
  // This is allowed with use()!
  const theme = use(ThemeContext);
  return <div className={theme}>Themed content</div>;
}
```

### Key Differences: use() vs useContext

| Feature | useContext | use() |
|---------|------------|-------|
| Call in conditions | No | Yes |
| Call in loops | No | Yes |
| Read Promises | No | Yes |
| Must be top-level | Yes | No |

## 2. useTransition()

Marks state updates as non-urgent, allowing urgent updates (like typing) to interrupt them.

### Basic Usage

```jsx
function SearchPage() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    // Urgent: Update input immediately
    setQuery(value);
    
    // Non-urgent: Can be interrupted
    startTransition(() => {
      setResults(searchItems(value));
    });
  };

  return (
    <div>
      <input 
        value={query} 
        onChange={e => handleSearch(e.target.value)} 
      />
      {isPending && <Spinner />}
      <Results items={results} />
    </div>
  );
}
```

### When to Use

- Heavy computations that could block typing
- Tab switching with expensive content
- Navigation with data fetching
- Any update that shouldn't block user input

## 3. useDeferredValue()

Defers updating a value until more urgent updates complete.

### Basic Usage

```jsx
function SearchResults({ query }) {
  // query updates immediately
  // deferredQuery updates with lower priority
  const deferredQuery = useDeferredValue(query);
  
  // Check if we're showing stale data
  const isStale = query !== deferredQuery;
  
  // Heavy computation uses deferred value
  const results = useMemo(
    () => filterItems(deferredQuery),
    [deferredQuery]
  );

  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>
      {results.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
}
```

### useTransition vs useDeferredValue

| useTransition | useDeferredValue |
|---------------|------------------|
| Wraps state updates | Wraps a value |
| You control what's deferred | React controls timing |
| Returns isPending | Compare values for stale check |
| For owned state | For values you receive |

## 4. Suspense (Enhanced in React 19)

Suspense lets you show fallback UI while content loads.

### With use() Hook

```jsx
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserDashboard />
    </Suspense>
  );
}

function UserDashboard() {
  const user = use(fetchUser());  // Suspends!
  const posts = use(fetchPosts(user.id));  // Suspends!
  
  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

### Nested Suspense

```jsx
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </Suspense>
  );
}
```

## 5. useOptimistic()

Shows optimistic UI while an async action is in progress.

### Basic Usage

```jsx
function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [...currentTodos, { ...newTodo, pending: true }]
  );

  async function handleSubmit(formData) {
    const newTodo = { text: formData.get('text'), id: Date.now() };
    
    // Show immediately (optimistic)
    addOptimisticTodo(newTodo);
    
    // Actually add (server)
    await addTodo(newTodo);
  }

  return (
    <form action={handleSubmit}>
      <input name="text" />
      <button type="submit">Add</button>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  );
}
```

## 6. useActionState() (formerly useFormState)

Manages form state with actions, including pending state.

### Basic Usage

```jsx
async function submitForm(prevState, formData) {
  const name = formData.get('name');
  
  try {
    await saveToServer(name);
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
      {state.message && (
        <p style={{ color: state.success ? 'green' : 'red' }}>
          {state.message}
        </p>
      )}
    </form>
  );
}
```

## 7. useFormStatus()

Access form status from inside form components.

```jsx
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function MyForm() {
  return (
    <form action={handleSubmit}>
      <input name="email" />
      <SubmitButton />  {/* Automatically knows form state */}
    </form>
  );
}
```

## Practical Patterns

### Pattern 1: Search with Deferred Results

```jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

### Pattern 2: Tab Navigation with Transitions

```jsx
function Tabs() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();
  
  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };
  
  return (
    <>
      <TabButtons selected={tab} onSelect={selectTab} />
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        <Suspense fallback={<TabSkeleton />}>
          <TabContent tab={tab} />
        </Suspense>
      </div>
    </>
  );
}
```

### Pattern 3: Optimistic Updates with Forms

```jsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setOptimisticLikes] = useOptimistic(initialLikes);
  
  async function handleLike() {
    setOptimisticLikes(likes + 1);
    await likePost(postId);
  }
  
  return (
    <button onClick={handleLike}>
      ❤️ {likes}
    </button>
  );
}
```

## Summary

| API | Purpose | Key Benefit |
|-----|---------|-------------|
| `use()` | Read Promises/Context | Conditional calling |
| `useTransition()` | Non-blocking updates | Responsive UI |
| `useDeferredValue()` | Defer value updates | Input responsiveness |
| `useOptimistic()` | Optimistic UI | Instant feedback |
| `useActionState()` | Form state management | Built-in pending state |
| `useFormStatus()` | Form component status | Automatic form awareness |
