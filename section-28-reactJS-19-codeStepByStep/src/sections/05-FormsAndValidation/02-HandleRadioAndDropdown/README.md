# Handle Radio Buttons & Dropdowns

## Quick Overview

Learn to handle radio button groups and dropdown select elements in React forms.

## What You'll Learn

- Radio button groups with shared name
- Basic dropdown/select element
- Dynamic options from arrays
- Multiple select handling
- Dependent/cascading dropdowns
- Form integration patterns

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- useState hook
- Controlled components concept
- Array mapping

## Key Patterns

```jsx
// Radio buttons
<input
  type="radio"
  name="size"  // Groups radios together
  value="small"
  checked={selected === 'small'}
  onChange={(e) => setSelected(e.target.value)}
/>

// Dropdown
<select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
>
  <option value="">Select...</option>
  {options.map(opt => (
    <option key={opt} value={opt}>{opt}</option>
  ))}
</select>
```

---

**Tip**: Radio buttons need the same `name` attribute to work as a group!
