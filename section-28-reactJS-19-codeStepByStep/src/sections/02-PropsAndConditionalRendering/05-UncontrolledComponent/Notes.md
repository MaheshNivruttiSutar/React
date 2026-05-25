# Uncontrolled Components

## Controlled vs Uncontrolled

| Controlled | Uncontrolled |
|------------|--------------|
| React manages value | DOM manages value |
| `value` + `onChange` | `ref` + `defaultValue` |
| Every keystroke → re-render | No re-renders on input |
| Instant validation | Access value on submit |

## Controlled Component

```jsx
const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## Uncontrolled Component

```jsx
const inputRef = useRef(null);

const handleSubmit = () => {
  console.log(inputRef.current.value);
};

<input ref={inputRef} defaultValue="initial" />
```

## File Inputs (Always Uncontrolled)

```jsx
const fileRef = useRef(null);

const handleChange = () => {
  const file = fileRef.current.files[0];
  console.log(file.name, file.size);
};

<input type="file" ref={fileRef} onChange={handleChange} />
```

## defaultValue vs value

```jsx
// Uncontrolled - use defaultValue
<input defaultValue="initial" ref={inputRef} />
<textarea defaultValue="initial text" ref={textRef} />
<select defaultValue="option1" ref={selectRef}>
  <option value="option1">Option 1</option>
</select>

// Controlled - use value
<input value={state} onChange={handleChange} />
```

## When to Use Uncontrolled

- Simple forms without validation
- File inputs (required)
- Integrating with non-React code
- Performance-critical scenarios
- Quick prototypes

## When to Use Controlled

- Real-time validation
- Formatting input (e.g., phone numbers)
- Conditional submit button
- Multiple dependent inputs
- Complex form logic

## Hybrid Approach

Use uncontrolled with validation on submit:

```jsx
const formRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formRef.current);
  const name = formData.get('name');
  const email = formData.get('email');
  // Validate and submit
};

<form ref={formRef} onSubmit={handleSubmit}>
  <input name="name" defaultValue="" />
  <input name="email" type="email" />
  <button type="submit">Submit</button>
</form>
```

## Best Practices

1. **Prefer controlled** for complex forms
2. **Use uncontrolled** for simple, one-off forms
3. **File inputs** are always uncontrolled
4. **Use FormData** for uncontrolled form submission
