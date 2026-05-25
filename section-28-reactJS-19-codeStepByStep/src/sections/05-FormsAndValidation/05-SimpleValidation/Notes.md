# Simple Form Validation

## Basic Validation Pattern

```jsx
const [formData, setFormData] = useState({ email: '', password: '' });
const [errors, setErrors] = useState({});

const validate = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate(formData);
  setErrors(validationErrors);
  
  if (Object.keys(validationErrors).length === 0) {
    // Form is valid - submit
    console.log('Submitting:', formData);
  }
};
```

## Common Validation Rules

### Required Field
```jsx
if (!value.trim()) {
  errors.field = 'This field is required';
}
```

### Email Format
```jsx
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.email = 'Invalid email format';
}
```

### Minimum Length
```jsx
if (password.length < 8) {
  errors.password = 'Must be at least 8 characters';
}
```

### Maximum Length
```jsx
if (bio.length > 500) {
  errors.bio = 'Maximum 500 characters allowed';
}
```

### Number Range
```jsx
if (age < 18 || age > 100) {
  errors.age = 'Age must be between 18 and 100';
}
```

### Password Match
```jsx
if (password !== confirmPassword) {
  errors.confirmPassword = 'Passwords do not match';
}
```

### Phone Number
```jsx
if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
  errors.phone = 'Invalid phone number';
}
```

## Validate on Blur (Touched State)

```jsx
const [touched, setTouched] = useState({});

const handleBlur = (e) => {
  const { name } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));
  
  // Validate this field
  const errors = validate(formData);
  setErrors(prev => ({ ...prev, [name]: errors[name] }));
};

// Only show error if field has been touched
{errors.email && touched.email && (
  <span className="error">{errors.email}</span>
)}
```

## Real-time Validation

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Validate as user types (if field was touched)
  if (touched[name]) {
    const errors = validate({ ...formData, [name]: value });
    setErrors(prev => ({ ...prev, [name]: errors[name] }));
  }
};
```

## Complete Form Component

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (values) => {
    const errors = {};
    
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Min 8 characters';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true });
    
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Submit:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <span className="error">{errors.name}</span>
        )}
      </div>
      
      {/* Other fields... */}
      
      <button type="submit">Register</button>
    </form>
  );
}
```

## Input Styling Based on Validation

```jsx
<input
  style={{
    borderColor: errors.email && touched.email ? 'red' : '#ddd'
  }}
  className={errors.email && touched.email ? 'input-error' : ''}
/>
```

## Disable Submit Until Valid

```jsx
const isValid = Object.keys(validate(formData)).length === 0;

<button type="submit" disabled={!isValid}>
  Submit
</button>
```

## Best Practices

1. **Validate on blur** - Don't show errors while typing
2. **Validate on submit** - Always validate before submitting
3. **Show clear messages** - Tell users exactly what's wrong
4. **Mark required fields** - Use asterisk or text
5. **Highlight errors visually** - Red border, icon, etc.
6. **Focus first error** - After submit, focus the first invalid field
