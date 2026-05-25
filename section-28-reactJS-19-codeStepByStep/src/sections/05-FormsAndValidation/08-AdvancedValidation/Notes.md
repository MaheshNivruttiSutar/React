# Advanced Form Validation

## Custom useForm Hook

```jsx
const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const rules = validationSchema[name];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    // Mark all touched, validate all, submit if valid
  };

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit };
};
```

## Composable Validation Rules

```jsx
const rules = {
  required: (value) => 
    !value?.trim() ? 'Required' : null,
  
  email: (value) => 
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email' : null,
  
  minLength: (min) => (value) => 
    value.length < min ? `Min ${min} characters` : null,
  
  maxLength: (max) => (value) => 
    value.length > max ? `Max ${max} characters` : null,
  
  pattern: (regex, message) => (value) => 
    !regex.test(value) ? message : null,
  
  match: (fieldName) => (value, formData) => 
    value !== formData[fieldName] ? 'Does not match' : null,
};

// Usage in schema
const schema = {
  username: [rules.required, rules.minLength(3), rules.maxLength(20)],
  email: [rules.required, rules.email],
  password: [
    rules.required,
    rules.minLength(8),
    rules.pattern(/[A-Z]/, 'Needs uppercase'),
    rules.pattern(/[0-9]/, 'Needs number'),
  ],
};
```

## Cross-Field Validation

```jsx
const schema = {
  password: [rules.required, rules.minLength(8)],
  confirmPassword: [
    rules.required,
    rules.match('password'), // Compares with password field
  ],
};

// Implementation
const matchRule = (fieldName) => (value, formData) => {
  if (!value) return null;
  return value !== formData[fieldName] ? 'Passwords do not match' : null;
};
```

## Async Validation

```jsx
const [asyncErrors, setAsyncErrors] = useState({});

useEffect(() => {
  if (!values.email || errors.email) return;

  const checkEmail = async () => {
    const response = await fetch(`/api/check-email?email=${values.email}`);
    const { exists } = await response.json();
    
    if (exists) {
      setAsyncErrors(prev => ({ ...prev, email: 'Email already registered' }));
    } else {
      setAsyncErrors(prev => ({ ...prev, email: null }));
    }
  };

  const debounceTimer = setTimeout(checkEmail, 500);
  return () => clearTimeout(debounceTimer);
}, [values.email, errors.email]);

// Combine with sync errors
const emailError = errors.email || asyncErrors.email;
```

## Debounced Validation

```jsx
import { useMemo } from 'react';
import debounce from 'lodash/debounce';

const debouncedValidate = useMemo(
  () => debounce((name, value) => {
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, 300),
  []
);

const handleChange = (e) => {
  const { name, value } = e.target;
  setValues(prev => ({ ...prev, [name]: value }));
  debouncedValidate(name, value);
};
```

## Field Arrays

```jsx
const [skills, setSkills] = useState(['']);

const addSkill = () => setSkills([...skills, '']);
const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

const updateSkill = (index, value) => {
  const newSkills = [...skills];
  newSkills[index] = value;
  setSkills(newSkills);
};

// Render
{skills.map((skill, index) => (
  <div key={index}>
    <input
      value={skill}
      onChange={(e) => updateSkill(index, e.target.value)}
    />
    <button onClick={() => removeSkill(index)}>Remove</button>
  </div>
))}
<button onClick={addSkill}>Add Skill</button>
```

## Password Strength Indicator

```jsx
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 2) return { label: 'Weak', color: 'red' };
  if (score <= 4) return { label: 'Medium', color: 'orange' };
  return { label: 'Strong', color: 'green' };
};

function PasswordInput({ value, onChange }) {
  const strength = getPasswordStrength(value);
  
  return (
    <div>
      <input type="password" value={value} onChange={onChange} />
      <div className="strength-meter">
        <div style={{ 
          width: `${(strength.score / 6) * 100}%`,
          backgroundColor: strength.color 
        }} />
      </div>
      <span>{strength.label}</span>
    </div>
  );
}
```

## Form Libraries

Consider these for production apps:

- **React Hook Form** - Performant, minimal re-renders
- **Formik** - Popular, comprehensive
- **Yup/Zod** - Schema validation libraries

```jsx
// React Hook Form example
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## Best Practices

1. **Validate on blur** - Not while typing
2. **Show errors clearly** - Visual feedback
3. **Async validation** - Debounce to reduce API calls
4. **Composable rules** - Reusable validation functions
5. **Touch tracking** - Only show errors after interaction
6. **Disable submit** - While validating or submitting
