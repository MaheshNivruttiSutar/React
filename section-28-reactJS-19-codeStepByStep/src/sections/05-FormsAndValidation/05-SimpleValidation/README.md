# Simple Form Validation

## Quick Overview

Learn to implement client-side form validation in React with error messages and visual feedback.

## What You'll Learn

- Validation function pattern
- Common validation rules
- Touched state for blur validation
- Real-time validation
- Error message display
- Form submission handling

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- Controlled form inputs
- useState hook
- Regular expressions (basic)

## Key Pattern

```jsx
const [errors, setErrors] = useState({});

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email';
  }
  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validate(formData);
  setErrors(errors);
  if (Object.keys(errors).length === 0) {
    // Submit
  }
};
```

---

**Tip**: Validate on blur for better UX - don't show errors while the user is still typing!
