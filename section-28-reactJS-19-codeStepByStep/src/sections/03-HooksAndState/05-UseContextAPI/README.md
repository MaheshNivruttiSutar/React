# useContext API

## Quick Overview

Context allows sharing data across components without prop drilling.

## What You'll Learn

- Creating context
- Provider and consumer pattern
- Multiple contexts
- Custom hook pattern

## Time to Complete

Approximately 20 minutes

## Key Pattern

```jsx
// Create
const ThemeContext = createContext('light');

// Provide
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// Consume
const theme = useContext(ThemeContext);
```

---

**Tip**: Create a custom hook (useTheme) to provide better error handling and cleaner API!
