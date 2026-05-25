# Styled Components

## Quick Overview

Styled Components is a CSS-in-JS library that lets you write actual CSS to style React components with automatic scoping and theming support.

## What You'll Learn

- Basic styled component syntax
- Props-based dynamic styling
- Extending components
- ThemeProvider for theming
- Pseudo-classes and media queries
- Animations with keyframes
- Global styles

## Time to Complete

Approximately 25-30 minutes

## Prerequisites

- React components
- CSS fundamentals
- Template literals

## Installation

```bash
npm install styled-components
```

## Key Syntax

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 12px 24px;
  
  &:hover {
    opacity: 0.9;
  }
`;

<Button primary>Click Me</Button>
```

---

**Tip**: Use ThemeProvider to share colors and spacing values across all your styled components!
