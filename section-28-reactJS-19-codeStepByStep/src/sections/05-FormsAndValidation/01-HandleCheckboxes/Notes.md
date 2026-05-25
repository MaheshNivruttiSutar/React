# Handle Checkboxes in React

## Single Checkbox (Boolean)

```jsx
const [isChecked, setIsChecked] = useState(false);

<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

## Key Points

- Use `checked` prop (not `value`) for checkboxes
- Access `e.target.checked` (boolean) in onChange
- This creates a controlled component

## Multiple Checkboxes (Array)

```jsx
const [selectedItems, setSelectedItems] = useState([]);
const items = ['Apple', 'Banana', 'Orange'];

const handleChange = (item) => {
  setSelectedItems(prev => 
    prev.includes(item)
      ? prev.filter(i => i !== item)  // Remove if exists
      : [...prev, item]               // Add if not exists
  );
};

{items.map(item => (
  <label key={item}>
    <input
      type="checkbox"
      checked={selectedItems.includes(item)}
      onChange={() => handleChange(item)}
    />
    {item}
  </label>
))}
```

## Object State Pattern

```jsx
const [preferences, setPreferences] = useState({
  newsletter: false,
  notifications: true,
  marketing: false,
});

const handleChange = (key) => {
  setPreferences(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
};

{Object.entries(preferences).map(([key, value]) => (
  <label key={key}>
    <input
      type="checkbox"
      checked={value}
      onChange={() => handleChange(key)}
    />
    {key}
  </label>
))}
```

## Select All Pattern

```jsx
const items = ['Item 1', 'Item 2', 'Item 3'];
const [selected, setSelected] = useState([]);
const [selectAll, setSelectAll] = useState(false);

const handleSelectAll = (checked) => {
  setSelectAll(checked);
  setSelected(checked ? [...items] : []);
};

const handleItemChange = (item) => {
  const newSelected = selected.includes(item)
    ? selected.filter(i => i !== item)
    : [...selected, item];
  
  setSelected(newSelected);
  setSelectAll(newSelected.length === items.length);
};

// Select All checkbox
<input
  type="checkbox"
  checked={selectAll}
  onChange={(e) => handleSelectAll(e.target.checked)}
/>

// Individual checkboxes
{items.map(item => (
  <input
    key={item}
    type="checkbox"
    checked={selected.includes(item)}
    onChange={() => handleItemChange(item)}
  />
))}
```

## Indeterminate State

```jsx
const checkboxRef = useRef();

useEffect(() => {
  // Indeterminate when some but not all are selected
  checkboxRef.current.indeterminate = 
    selected.length > 0 && selected.length < items.length;
}, [selected]);

<input
  ref={checkboxRef}
  type="checkbox"
  checked={selectAll}
  onChange={(e) => handleSelectAll(e.target.checked)}
/>
```

## Form Submission

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  const formData = {
    acceptTerms,
    selectedFruits,
    preferences,
  };
  
  console.log(formData);
};
```

## Styling Checkboxes

```jsx
// Custom styled checkbox
<label className="checkbox-label">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    className="checkbox-input"
  />
  <span className="checkbox-custom"></span>
  <span className="checkbox-text">Label</span>
</label>

// CSS
.checkbox-input {
  position: absolute;
  opacity: 0;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: inline-block;
}

.checkbox-input:checked + .checkbox-custom {
  background: #667eea;
  border-color: #667eea;
}
```

## Common Patterns

### Required Checkbox (Terms)

```jsx
const [accepted, setAccepted] = useState(false);

<form onSubmit={handleSubmit}>
  <label>
    <input
      type="checkbox"
      checked={accepted}
      onChange={(e) => setAccepted(e.target.checked)}
      required
    />
    I accept the terms
  </label>
  <button type="submit" disabled={!accepted}>
    Submit
  </button>
</form>
```

### Toggle Switch

```jsx
<label className="switch">
  <input
    type="checkbox"
    checked={enabled}
    onChange={(e) => setEnabled(e.target.checked)}
  />
  <span className="slider"></span>
</label>
```

## Best Practices

1. **Always use controlled components** - Use `checked` prop
2. **Accessible labels** - Wrap input in label or use `htmlFor`
3. **Functional updates** - Use callback form for state based on previous
4. **Unique keys** - When mapping checkboxes in a list
