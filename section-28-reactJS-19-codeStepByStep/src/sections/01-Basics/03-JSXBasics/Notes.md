# JSX Basics

## ⏱️ Time to Learn: ~12 minutes

## 🎯 What You'll Learn
- What JSX is and why it's useful
- How JSX compiles to JavaScript
- The rules of JSX syntax
- How to use JSX in components
- Differences between JSX and HTML

## 💡 Why It Matters
JSX is the **syntax you'll use most** when writing React. It looks like HTML but gives you the full power of JavaScript. Understanding JSX is crucial because almost every React component uses it.

## 🔑 Key Concepts

### 1. What is JSX?
**JSX** stands for "JavaScript XML". It's a syntax extension that allows you to write HTML-like code inside JavaScript.

```javascript
// This is JSX:
const greeting = <h1>Hello, World!</h1>;

// This is what it compiles to:
const greeting = React.createElement('h1', null, 'Hello, World!');
```

### 2. Why Use JSX?
- **Familiar syntax** - Looks like HTML, easier to read
- **More expressive** - You can mix JavaScript and markup
- **Catches errors** - Invalid HTML is caught during development
- **Better performance** - React optimizes the final output

### 3. JSX Rules

**Rule 1: Single Root Element**
```javascript
// ❌ Wrong - Multiple root elements
return (
  <h1>Title</h1>
  <p>Content</p>
);

// ✅ Correct - Wrap in a div
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

**Rule 2: Close All Tags**
```javascript
// ❌ Wrong - Unclosed tag
<img src="image.jpg">

// ✅ Correct - Self-closing tag
<img src="image.jpg" />
```

**Rule 3: Use className instead of class**
```javascript
// ❌ Wrong - 'class' is reserved in JavaScript
<div class="container"></div>

// ✅ Correct - Use 'className'
<div className="container"></div>
```

### 4. Embedding JavaScript in JSX

You can use curly braces `{}` to embed JavaScript expressions:

```javascript
const name = "John";
const age = 25;

return (
  <div>
    <h1>{name}</h1>  {/* Variable */}
    <p>{age + 10}</p>  {/* Expression */}
    <p>{age > 18 ? "Adult" : "Minor"}</p>  {/* Ternary operator */}
  </div>
);
```

## 📖 How It Works - Step by Step

### Step 1: Write JSX
```javascript
function Welcome() {
  return <h1>Welcome to React!</h1>;
}
```

### Step 2: Babel Transforms It
Babel (a JavaScript compiler) converts JSX to React.createElement():
```javascript
function Welcome() {
  return React.createElement('h1', null, 'Welcome to React!');
}
```

### Step 3: React Renders It
React creates actual DOM elements:
```html
<h1>Welcome to React!</h1>
```

## 💻 Common JSX Patterns

### Pattern 1: Conditional Rendering
```javascript
function Message({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
    </div>
  );
}
```

### Pattern 2: Lists
```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}
```

### Pattern 3: Event Handlers
```javascript
function Button() {
  const handleClick = () => console.log('Clicked!');
  return <button onClick={handleClick}>Click me</button>;
}
```

### Pattern 4: Inline Styles
```javascript
function Styled() {
  const styles = { color: 'red', fontSize: '20px' };
  return <p style={styles}>Styled text</p>;
}
```

## ❌ Common Mistakes

### Mistake 1: Forgetting Curly Braces for Expressions
```javascript
// ❌ Wrong - Variables need curly braces
return <h1>Hello {name}</h1>;  // Shows "Hello" literally

// ✅ Correct
return <h1>Hello {name}</h1>;
```

Actually that was a trick - both are correct! Let me show the real mistake:

```javascript
// ❌ Wrong - Without braces it's just text
<p>My name is name</p>

// ✅ Correct - Use braces for variables
<p>My name is {name}</p>
```

### Mistake 2: Using `class` instead of `className`
```javascript
// ❌ Wrong
return <div class="container">Content</div>;

// ✅ Correct
return <div className="container">Content</div>;
```

### Mistake 3: Not Closing Self-Closing Tags
```javascript
// ❌ Wrong
<input type="text">

// ✅ Correct
<input type="text" />
```

### Mistake 4: Multiple Root Elements
```javascript
// ❌ Wrong - Will cause error
function Component() {
  return (
    <h1>Title</h1>
    <p>Content</p>
  );
}

// ✅ Correct - Wrap in div or Fragment
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}
```

### Mistake 5: Using Comments Wrong in JSX
```javascript
// ❌ Wrong - Comments inside JSX don't work
return <div>
  // This is a comment - will be displayed!
</div>;

// ✅ Correct - Use proper JSX comment syntax
return <div>
  {/* This is a comment - won't be displayed */}
</div>;
```

## ✅ Best Practices

1. **Always use self-closing tags for components without children**
   ```javascript
   <Component />  // ✅ Good
   <Component></Component>  // ❌ Unnecessary
   ```

2. **Use fragments for multiple elements without wrapper**
   ```javascript
   return (
     <>
       <Header />
       <Content />
       <Footer />
     </>
   );
   ```

3. **Keep JSX readable**
   ```javascript
   // ✅ Good - Properly formatted
   return (
     <div className="container">
       <h1>{title}</h1>
       <p>{description}</p>
     </div>
   );

   // ❌ Hard to read
   return <div className="container"><h1>{title}</h1><p>{description}</p></div>;
   ```

4. **Use descriptive variable names**
   ```javascript
   // ✅ Good
   const isUserLoggedIn = true;
   {isUserLoggedIn ? <Dashboard /> : <Login />}

   // ❌ Unclear
   const x = true;
   {x ? <Dashboard /> : <Login />}
   ```

5. **Avoid complex logic in JSX**
   ```javascript
   // ✅ Good - Logic outside JSX
   const message = users.length > 0 ? "Users found" : "No users";
   return <p>{message}</p>;

   // ❌ Too complex - Hard to read
   return <p>{users.length > 0 && users.filter(...).map(...).length > x ? "..." : "..."}</p>;
   ```

## 🚀 Performance Tips

1. **Don't create functions inside JSX**
   ```javascript
   // ❌ Bad - New function on every render
   <button onClick={() => handleClick()}>Click</button>

   // ✅ Good - Define outside
   const handleClick = () => { ... };
   <button onClick={handleClick}>Click</button>
   ```

2. **Use keys for lists**
   ```javascript
   // ✅ Good - Unique key helps React identify items
   {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
   ```

3. **Avoid inline objects**
   ```javascript
   // ❌ Bad - New object on every render
   <Component style={{ color: 'red' }} />

   // ✅ Good - Define outside
   const styles = { color: 'red' };
   <Component style={styles} />
   ```

## 🔗 Related Sections
- [What is a Component?](../01-WhatIsComponent/) - Components use JSX
- [JSX with Curly Braces](../04-JSXWithCurlyBraces/) - Advanced expressions
- [Click Event and Function Call](../05-ClickEventAndFunctionCall/) - Handling events in JSX

## 💪 Practice Challenge

1. **Create a product card component** that displays:
   - Product name (as variable)
   - Product price (with $ symbol)
   - A button with an onClick handler
   - Product image with alt text

2. **Create a user profile** component that:
   - Shows user name, email, and status
   - Shows different UI based on whether user is online or offline
   - Uses inline styles for the color

3. **Create a dynamic list** of items that:
   - Displays items from an array
   - Uses unique keys
   - Has an onclick handler for each item

## 📚 Resources
- [React Official Docs - Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [JSX in React](https://react.dev/learn/describing-the-ui)
- [Babel - JSX Compiler](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
