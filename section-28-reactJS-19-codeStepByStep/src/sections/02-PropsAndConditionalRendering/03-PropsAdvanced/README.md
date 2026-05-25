# Advanced Props Patterns

## Quick Overview

Learn advanced patterns for working with props in React.

## What You'll Learn

- Rest/spread props
- Default prop values
- Render props pattern
- Compound components
- JSX elements as props

## Time to Complete

Approximately 20 minutes

## Key Patterns

```jsx
// Rest/spread
const Button = ({ size, ...props }) => <button {...props} />

// Render props
<List items={data} renderItem={(item) => <Card {...item} />} />

// Compound components
<Tabs><Tab label="A">Content</Tab></Tabs>
```

---

**Tip**: Use rest props (...props) to make components more flexible!
