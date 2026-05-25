# Click Events and Function Calls

## Basic onClick Handler

```jsx
function Button() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

## Inline vs Named Handlers

### Named Handler (Recommended)

```jsx
const handleClick = () => {
  console.log('Clicked!');
};

<button onClick={handleClick}>Click</button>
```

### Inline Handler

```jsx
<button onClick={() => console.log('Clicked!')}>
  Click
</button>
```

## Passing Arguments

```jsx
const handleGreet = (name) => {
  alert(`Hello, ${name}!`);
};

// ✅ Correct: Wrap in arrow function
<button onClick={() => handleGreet('Alice')}>
  Greet Alice
</button>

// ❌ Wrong: Calls immediately on render!
<button onClick={handleGreet('Alice')}>
  Greet Alice
</button>
```

## Event Object

React automatically passes a synthetic event object.

```jsx
const handleClick = (event) => {
  console.log('Event type:', event.type);
  console.log('Target:', event.target);
  console.log('Mouse X:', event.clientX);
  console.log('Mouse Y:', event.clientY);
};

<button onClick={handleClick}>Click</button>
```

### With Arguments AND Event

```jsx
const handleClick = (name, event) => {
  console.log(name, event.target);
};

<button onClick={(e) => handleClick('Alice', e)}>
  Click
</button>
```

## Prevent Default Behavior

```jsx
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent form submission
  console.log('Form submitted');
};

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

## Stop Propagation

```jsx
const handleInnerClick = (event) => {
  event.stopPropagation(); // Don't trigger parent's onClick
  console.log('Inner clicked');
};

<div onClick={() => console.log('Outer')}>
  <button onClick={handleInnerClick}>Inner</button>
</div>
```

## Common Mouse Events

```jsx
<button onClick={handleClick}>Click</button>
<button onDoubleClick={handleDoubleClick}>Double Click</button>
<div onMouseEnter={handleMouseEnter}>Hover Enter</div>
<div onMouseLeave={handleMouseLeave}>Hover Leave</div>
<div onMouseMove={handleMouseMove}>Mouse Move</div>
<div onMouseDown={handleMouseDown}>Mouse Down</div>
<div onMouseUp={handleMouseUp}>Mouse Up</div>
```

## Other Common Events

### Keyboard Events

```jsx
<input onKeyDown={handleKeyDown} />
<input onKeyUp={handleKeyUp} />
<input onKeyPress={handleKeyPress} /> // Deprecated
```

### Form Events

```jsx
<input onChange={handleChange} />
<input onFocus={handleFocus} />
<input onBlur={handleBlur} />
<form onSubmit={handleSubmit} />
```

## Best Practices

### 1. Name handlers descriptively

```jsx
// ✅ Good
const handleSubmitForm = () => { };
const handleDeleteUser = () => { };

// ❌ Bad
const handler = () => { };
const click = () => { };
```

### 2. Use functional updates for state

```jsx
// ✅ Good: Uses previous state
setCount(prev => prev + 1);

// ⚠️ Might be stale in async scenarios
setCount(count + 1);
```

### 3. Extract complex logic

```jsx
// ✅ Clean and testable
const handleSubmit = (event) => {
  event.preventDefault();
  validateForm();
  submitData();
};
```

## Common Mistakes

### Calling function instead of passing reference

```jsx
// ❌ Wrong: Calls immediately
<button onClick={handleClick()}>

// ✅ Correct: Passes reference
<button onClick={handleClick}>
```

### Forgetting arrow function for arguments

```jsx
// ❌ Wrong: Calls immediately
<button onClick={greet('Alice')}>

// ✅ Correct
<button onClick={() => greet('Alice')}>
```

### Using `this` in functional components

```jsx
// ❌ Wrong: No 'this' in functional components
<button onClick={this.handleClick}>

// ✅ Correct
<button onClick={handleClick}>
```
