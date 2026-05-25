# Advanced Form Validation

## Quick Overview

Build a custom useForm hook with composable validation rules, async validation, and cross-field validation.

## What You'll Learn

- Custom useForm hook
- Composable validation rules
- Pattern validation (regex)
- Cross-field validation (password match)
- Async validation (email uniqueness)
- Debounced validation
- Password strength indicators

## Time to Complete

Approximately 30-35 minutes

## Prerequisites

- Basic form validation
- useState and useEffect
- Async/await
- Regular expressions

## Key Pattern

```jsx
const rules = {
  required: (value) => !value ? 'Required' : null,
  minLength: (min) => (value) => 
    value.length < min ? `Min ${min} chars` : null,
};

const schema = {
  username: [rules.required, rules.minLength(3)],
  password: [rules.required, rules.minLength(8)],
};

const { values, errors, handleSubmit } = useForm(initialValues, schema);
```

---

**Tip**: Consider React Hook Form or Formik for production apps - they handle edge cases and performance optimization!
