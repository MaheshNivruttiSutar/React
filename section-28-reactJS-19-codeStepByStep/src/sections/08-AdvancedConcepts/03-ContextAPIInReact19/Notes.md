# Context API in React 19

## What is Context?

Context provides a way to pass data through the component tree without having to pass props manually at every level. It's designed for data that is considered "global" for a tree of React components.

## The Prop Drilling Problem

```jsx
// Without Context - "Prop Drilling"
function App() {
  const [user, setUser] = useState({ name: 'John' });
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />;  // Just passing through
}

function Sidebar({ user }) {
  return <UserInfo user={user} />;  // Just passing through
}

function UserInfo({ user }) {
  return <p>Hello, {user.name}</p>;  // Finally used here!
}
```

## Context Solution

```jsx
// With Context - No prop drilling
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({ name: 'John' });
  return (
    <UserContext.Provider value={user}>
      <Dashboard />  {/* No props needed! */}
    </UserContext.Provider>
  );
}

function UserInfo() {
  const user = useContext(UserContext);  // Direct access!
  return <p>Hello, {user.name}</p>;
}
```

## Creating and Using Context

### Step 1: Create Context

```jsx
import { createContext } from 'react';

// Create with optional default value
const ThemeContext = createContext('light');
const UserContext = createContext(null);
```

### Step 2: Provide Context

```jsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <MainContent />
    </ThemeContext.Provider>
  );
}
```

### Step 3: Consume Context

```jsx
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

## React 19 New Features

### 1. The `use()` Hook

React 19 introduces `use()`, a new hook that can read context (and Promises):

```jsx
import { use } from 'react';

function Component() {
  const theme = use(ThemeContext);
  return <div className={theme}>Content</div>;
}
```

### 2. Conditional Context Reading

Unlike `useContext`, `use()` can be called conditionally:

```jsx
// useContext - Must be at top level (ERROR if conditional)
function Component({ showUser }) {
  const user = useContext(UserContext); // Always called
  if (!showUser) return null;
  return <p>{user.name}</p>;
}

// use() - Can be conditional (React 19)
function Component({ showUser }) {
  if (!showUser) return null;
  const user = use(UserContext); // Only called when needed!
  return <p>{user.name}</p>;
}
```

### 3. Context as Provider (React 19)

In React 19, you can use Context directly without `.Provider`:

```jsx
// Before React 19
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// React 19 - Context as Provider directly
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

**Note**: `.Provider` still works for backward compatibility.

## Context Patterns

### Pattern 1: Context with State

```jsx
const CounterContext = createContext(null);

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  
  const value = {
    count,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

// Custom hook for easy access
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
}
```

### Pattern 2: Multiple Contexts

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Pattern 3: Context with Reducer

```jsx
const TodoContext = createContext(null);

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter(t => t.id !== action.payload);
    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
```

## Performance Considerations

### Problem: Context triggers re-renders

```jsx
// All consumers re-render when ANY value changes
const AppContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({});

  // When theme changes, ALL consumers re-render!
  return (
    <AppContext.Provider value={{ user, theme, settings }}>
      <App />
    </AppContext.Provider>
  );
}
```

### Solution: Split Contexts

```jsx
// Separate contexts for different concerns
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const SettingsContext = createContext({});

function App() {
  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <SettingsContext.Provider value={settings}>
          <App />
        </SettingsContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### Solution: Memoize Context Value

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## use() vs useContext Comparison

| Feature | useContext | use() (React 19) |
|---------|------------|------------------|
| Call location | Top level only | Anywhere |
| Conditional | No | Yes |
| In loops | No | Yes |
| Read Promises | No | Yes |
| Backward compatible | Yes | React 19+ |

## Best Practices

1. **Create custom hooks for context**
```jsx
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

2. **Keep context values small and focused**
```jsx
// Good - focused context
const ThemeContext = createContext('light');

// Avoid - too many unrelated things
const EverythingContext = createContext({ user, theme, cart, settings... });
```

3. **Provide meaningful default values**
```jsx
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => console.warn('No ThemeProvider'),
});
```

4. **Use TypeScript for type safety**
```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);
```

## Common Use Cases

- Theme (light/dark mode)
- Authentication state
- Language/Localization
- Shopping cart
- User preferences
- Feature flags
