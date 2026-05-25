# External Stylesheets

## Quick Overview

Learn to use traditional CSS files with React components, including file organization, class naming, and CSS features.

## What You'll Learn

- Importing CSS files
- Global vs component CSS
- File structure patterns
- CSS variables
- Conditional class names
- Media queries and animations
- BEM naming convention

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Basic CSS knowledge
- React components
- className attribute

## Key Syntax

```jsx
// Import CSS
import './Button.css';

// Use classes
<button className="btn btn-primary btn-lg">
  Click Me
</button>

// Conditional classes
className={`btn ${isActive ? 'btn-active' : ''}`}
```

---

**Tip**: Use CSS variables (custom properties) in `:root` for easy theming and consistency!
