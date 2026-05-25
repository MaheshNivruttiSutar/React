# Styled Components

## What is Styled Components?

Styled Components is a CSS-in-JS library that lets you write actual CSS in your JavaScript. It creates React components with styles attached.

## Installation

```bash
npm install styled-components
```

## Basic Syntax

```jsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 12px 24px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #5a67d8;
  }
`;

function App() {
  return <Button>Click Me</Button>;
}
```

## Styling Any Element

```jsx
const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Card = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
`;

const StyledLink = styled.a`
  color: blue;
  text-decoration: none;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
`;
```

## Props-Based Styling

```jsx
const Button = styled.button`
  padding: ${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  background-color: ${props => props.primary ? '#667eea' : '#e0e0e0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
`;

// Usage
<Button primary>Primary</Button>
<Button>Secondary</Button>
<Button primary size="large">Large</Button>
```

## Conditional Styles

```jsx
const Alert = styled.div`
  padding: 1rem;
  border-radius: 4px;

  ${props => props.type === 'error' && `
    background-color: #ffebee;
    color: #c62828;
  `}

  ${props => props.type === 'success' && `
    background-color: #e8f5e9;
    color: #2e7d32;
  `}
`;

<Alert type="error">Error message</Alert>
<Alert type="success">Success message</Alert>
```

## Extending Styles

```jsx
const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
`;

const PrimaryButton = styled(Button)`
  background: #667eea;
  color: white;
`;

const OutlineButton = styled(Button)`
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
`;
```

## Theming

```jsx
import styled, { ThemeProvider } from 'styled-components';

// Define themes
const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#667eea',
};

const darkTheme = {
  background: '#1a1a2e',
  text: '#eaeaea',
  primary: '#7c3aed',
};

// Use theme in components
const Container = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const Button = styled.button`
  background: ${props => props.theme.primary};
  color: white;
`;

// Provide theme
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Container>
        <Button onClick={() => setIsDark(!isDark)}>
          Toggle Theme
        </Button>
      </Container>
    </ThemeProvider>
  );
}
```

## Pseudo-elements & Pseudo-classes

```jsx
const Button = styled.button`
  position: relative;

  &:hover {
    background: #5a67d8;
  }

  &:focus {
    outline: 2px solid blue;
  }

  &:active {
    transform: scale(0.98);
  }

  &::before {
    content: '';
    position: absolute;
    /* ... */
  }

  &::after {
    content: '';
    /* ... */
  }
`;
```

## Media Queries

```jsx
const Container = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;
```

## Animations

```jsx
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const FadeInDiv = styled.div`
  animation: ${fadeIn} 0.3s ease-in;
`;
```

## Styling Existing Components

```jsx
// Style a React component
const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
`;

// The component must accept className prop
function MyComponent({ className }) {
  return <div className={className}>Content</div>;
}

const StyledMyComponent = styled(MyComponent)`
  background: red;
`;
```

## Global Styles

```jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <MainContent />
    </>
  );
}
```

## Attrs for Default Props

```jsx
const Input = styled.input.attrs(props => ({
  type: props.type || 'text',
  placeholder: props.placeholder || 'Enter text...',
}))`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// type="text" and placeholder are set automatically
<Input />
<Input type="password" placeholder="Password" />
```

## Best Practices

1. **Name components descriptively** - `PrimaryButton` not `StyledButton1`
2. **Keep components focused** - One styled component per concern
3. **Use theming** - For consistent colors and spacing
4. **Extract reusable styles** - Use `css` helper for shared styles
5. **Consider performance** - Avoid creating styled components inside render

## Common Patterns

### Button Variants

```jsx
const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  
  ${props => {
    switch(props.variant) {
      case 'primary':
        return `background: blue; color: white;`;
      case 'secondary':
        return `background: gray; color: white;`;
      case 'outline':
        return `background: transparent; border: 2px solid blue;`;
      default:
        return `background: #eee;`;
    }
  }}
`;
```
