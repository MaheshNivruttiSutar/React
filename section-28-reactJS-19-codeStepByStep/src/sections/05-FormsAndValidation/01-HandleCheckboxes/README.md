# Handle Checkboxes in React

## Quick Overview

Learn how to handle single and multiple checkboxes in React forms using controlled components.

## What You'll Learn

- Single checkbox with boolean state
- Multiple checkboxes with array state
- Object state for grouped preferences
- Select all / deselect all pattern
- Conditional form submission

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- useState hook
- Event handling
- Array methods (includes, filter)

## Key Patterns

```jsx
// Single checkbox
const [checked, setChecked] = useState(false);
<input
  type="checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Multiple checkboxes (array)
const handleChange = (item) => {
  setSelected(prev => 
    prev.includes(item)
      ? prev.filter(i => i !== item)
      : [...prev, item]
  );
};
```

---

**Tip**: Use `checked` prop (not `value`) and access `e.target.checked` for checkboxes!
