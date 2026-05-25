# JSX with Curly Braces

## What Are Curly Braces in JSX?

Curly braces `{}` allow you to embed JavaScript expressions inside JSX. They create a "window" into JavaScript within your markup.

## Basic Usage

### Variables

```jsx
const name = 'John';
const age = 25;

<p>Hello, {name}!</p>
<p>Age: {age}</p>
```

### Object Properties

```jsx
const user = { firstName: 'John', lastName: 'Doe' };

<p>{user.firstName} {user.lastName}</p>
```

### Expressions

```jsx
{/* Math */}
<p>Sum: {10 + 5}</p>

{/* String methods */}
<p>{name.toUpperCase()}</p>

{/* Ternary operator */}
<p>{age >= 18 ? 'Adult' : 'Minor'}</p>

{/* Function calls */}
<p>{formatDate(new Date())}</p>
```

## Common Patterns

### Template Literals

```jsx
<p>{`${user.firstName} is ${user.age} years old`}</p>
<img alt={`Avatar for ${user.name}`} />
```

### Conditional Rendering

```jsx
{/* Show if true */}
{isLoggedIn && <WelcomeMessage />}

{/* Show one or the other */}
{isLoggedIn ? <Dashboard /> : <LoginForm />}
```

### Array Mapping

```jsx
const items = ['Apple', 'Banana', 'Cherry'];

{items.map((item, index) => (
  <li key={index}>{item}</li>
))}
```

### Dynamic Attributes

```jsx
<div className={isActive ? 'active' : 'inactive'}>
<input disabled={isLoading}>
<button onClick={handleClick}>
```

## Style Objects

```jsx
{/* Inline style object */}
<div style={{ color: 'red', fontSize: '16px' }}>

{/* Dynamic styles */}
<div style={{
  backgroundColor: isActive ? 'green' : 'gray',
  opacity: isVisible ? 1 : 0,
}}>

{/* Style variable */}
const cardStyle = { padding: '1rem', borderRadius: '8px' };
<div style={cardStyle}>
```

## Double Curly Braces Explained

```jsx
{/* First {} = JavaScript expression */}
{/* Second {} = Object literal */}
<div style={{ color: 'red' }}>

{/* It's like: */}
const styleObj = { color: 'red' };
<div style={styleObj}>
```

## What You CAN Put in Curly Braces

- Variables and constants
- Object properties
- Math expressions
- String operations
- Function calls
- Ternary expressions
- Array methods
- Template literals

## What You CAN'T Put in Curly Braces

### Statements

```jsx
// ❌ Wrong - if statements
{if (condition) { return <div>Yes</div> }}

// ✅ Use ternary
{condition ? <div>Yes</div> : null}
```

### Objects Directly

```jsx
// ❌ Wrong - Objects are not valid React children
{user}

// ✅ Access properties or stringify
{user.name}
{JSON.stringify(user)}
```

### Function Definitions

```jsx
// ❌ Wrong
{function sayHello() { return 'Hello' }}

// ✅ Call the function
{sayHello()}
```

## Best Practices

1. **Keep expressions simple** - Extract complex logic to functions
2. **Use meaningful variable names** - Code should be readable
3. **Format for readability** - Break long expressions across lines

```jsx
// ❌ Hard to read
<p>{items.filter(i => i.active).map(i => i.name).join(', ')}</p>

// ✅ Better
const activeNames = items
  .filter(item => item.active)
  .map(item => item.name)
  .join(', ');
<p>{activeNames}</p>
```
