# Handle Radio Buttons & Dropdowns

## Radio Buttons

### Basic Pattern

```jsx
const [selected, setSelected] = useState('option1');

const options = ['option1', 'option2', 'option3'];

{options.map(option => (
  <label key={option}>
    <input
      type="radio"
      name="myRadio"  // Same name groups them
      value={option}
      checked={selected === option}
      onChange={(e) => setSelected(e.target.value)}
    />
    {option}
  </label>
))}
```

### Key Points

- All radios in a group share the same `name` attribute
- Use `checked` prop to control selection
- Access `e.target.value` in onChange

### Styled Radio Group

```jsx
function RadioGroup({ options, value, onChange, name }) {
  return (
    <div className="radio-group">
      {options.map(option => (
        <label 
          key={option.value}
          className={`radio-label ${value === option.value ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
```

## Dropdown (Select)

### Basic Pattern

```jsx
const [country, setCountry] = useState('');

<select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</select>
```

### Dynamic Options

```jsx
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="">Select a country</option>
  {countries.map(c => (
    <option key={c.value} value={c.value}>
      {c.label}
    </option>
  ))}
</select>
```

### Option Groups

```jsx
<select value={car} onChange={(e) => setCar(e.target.value)}>
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>
```

## Multiple Select

```jsx
const [selected, setSelected] = useState([]);

const handleChange = (e) => {
  const options = Array.from(
    e.target.selectedOptions,
    option => option.value
  );
  setSelected(options);
};

<select
  multiple
  value={selected}
  onChange={handleChange}
>
  <option value="js">JavaScript</option>
  <option value="react">React</option>
  <option value="node">Node.js</option>
</select>
```

## Controlled vs Uncontrolled

### Controlled (Recommended)

```jsx
// React controls the value
const [value, setValue] = useState('');

<select value={value} onChange={(e) => setValue(e.target.value)}>
```

### Uncontrolled

```jsx
// DOM controls the value
const selectRef = useRef();

<select ref={selectRef} defaultValue="">

// Access: selectRef.current.value
```

## Form Integration

```jsx
const [formData, setFormData] = useState({
  size: 'medium',
  country: '',
  category: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

<form>
  {/* Radio */}
  <input
    type="radio"
    name="size"
    value="small"
    checked={formData.size === 'small'}
    onChange={handleChange}
  />
  
  {/* Select */}
  <select name="country" value={formData.country} onChange={handleChange}>
    <option value="">Select</option>
    <option value="us">US</option>
  </select>
</form>
```

## Dependent Dropdowns

```jsx
const [country, setCountry] = useState('');
const [city, setCity] = useState('');

const cities = {
  us: ['New York', 'Los Angeles', 'Chicago'],
  uk: ['London', 'Manchester', 'Birmingham'],
};

// Reset city when country changes
useEffect(() => {
  setCity('');
}, [country]);

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="">Select Country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>

<select 
  value={city} 
  onChange={(e) => setCity(e.target.value)}
  disabled={!country}
>
  <option value="">Select City</option>
  {country && cities[country].map(c => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>
```

## Validation

```jsx
const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!country) {
    setError('Please select a country');
    return;
  }
  
  setError('');
  // Submit form
};
```

## Best Practices

1. **Always use `name` for radio groups** - Groups them together
2. **Provide default/placeholder option** - For dropdowns
3. **Use `value` prop** - For controlled components
4. **Handle empty selections** - Check for empty string
5. **Accessible labels** - Use `<label>` with `htmlFor` or wrap input
