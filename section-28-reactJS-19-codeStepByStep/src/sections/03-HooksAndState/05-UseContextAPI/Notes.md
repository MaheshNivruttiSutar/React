# useContext API

## What is Context?

Context provides a way to share values between components without explicitly passing props through every level of the tree.

## Creating and Using Context

### Step 1: Create Context

```jsx
import { createContext } from 'react';

const ThemeContext = createContext('light'); // default value
```

### Step 2: Provide Context

```jsx
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ChildComponents />
    </ThemeContext.Provider>
  );
}
```

### Step 3: Consume Context

```jsx
import { useContext } from 'react';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

## Multiple Contexts

```jsx
<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <App />
  </UserContext.Provider>
</ThemeContext.Provider>

// Consume multiple
function Component() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
}
```

## Context with State and Functions

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Usage
const { theme, toggle } = useContext(ThemeContext);
```

## Custom Hook Pattern

```jsx
// Create custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
const { theme, toggle } = useTheme();
```

## When to Use Context

- Theme (dark/light mode)
- User authentication
- Language/Locale
- UI state (sidebar open/closed)
- Shopping cart

## When NOT to Use Context

- Prop drilling is only 2-3 levels
- State that only a few components need
- Frequently changing state (performance)

## React 19: Context as Provider

```jsx
// React 19 allows this:
<ThemeContext value={theme}>
  {children}
</ThemeContext>

// Instead of:
<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>
```

## Best Practices

1. **Keep contexts focused** - One context per concern
2. **Use custom hooks** - Cleaner API, error handling
3. **Memoize provider value** - Prevent unnecessary re-renders
4. **Default values** - Provide sensible defaults
