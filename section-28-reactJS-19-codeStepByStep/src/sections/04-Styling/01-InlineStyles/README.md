# Inline Styles in React

## Quick Overview

Learn how to apply CSS styles directly in JSX using JavaScript objects with camelCase properties.

## What You'll Learn

- Inline style syntax in React
- camelCase property names
- Style object variables
- Dynamic styles with state/props
- Merging and conditional styles
- Pros and cons of inline styles

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Basic React components
- JavaScript objects
- CSS fundamentals

## Key Syntax

```jsx
// Direct inline
<div style={{ backgroundColor: 'blue', padding: '20px' }}>

// Style object variable
const myStyle = {
  backgroundColor: 'blue',
  fontSize: '16px',
};
<div style={myStyle}>
```

---

**Tip**: Use inline styles for dynamic values from state/props, but consider CSS Modules or Styled Components for complex styling needs!
