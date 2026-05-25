# Derived State

## Quick Overview

Learn to compute values from existing state instead of storing redundant data.

## What You'll Learn

- Deriving values from source state
- Avoiding state duplication
- Using useMemo for performance
- Common patterns (filter, sort, calculate)

## Time to Complete

Approximately 15 minutes

## Key Pattern

```jsx
// Source state (single source of truth)
const [items, setItems] = useState([]);

// Derived values (computed, not stored)
const total = items.reduce((sum, i) => sum + i.price, 0);
const count = items.length;
const filtered = items.filter(i => i.active);
```

---

**Tip**: If a value can be calculated from existing state, derive it instead of storing it separately!
