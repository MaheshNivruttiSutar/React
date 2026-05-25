import { useState, useEffect } from 'react';

const validationRules = {
  required: (value) => (!value?.trim() ? 'This field is required' : null),
  
  email: (value) => {
    if (!value) return null;
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null;
  },
  
  minLength: (min) => (value) => {
    if (!value) return null;
    return value.length < min ? `Must be at least ${min} characters` : null;
  },
  
  maxLength: (max) => (value) => {
    if (!value) return null;
    return value.length > max ? `Must be no more than ${max} characters` : null;
  },
  
  pattern: (regex, message) => (value) => {
    if (!value) return null;
    return !regex.test(value) ? message : null;
  },
  
  match: (fieldName, getMessage) => (value, formData) => {
    if (!value) return null;
    return value !== formData[fieldName] ? getMessage(fieldName) : null;
  },
  
  custom: (fn) => fn,
};

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

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validationSchema).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, newValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    
    const allTouched = Object.keys(validationSchema).reduce(
      (acc, key) => ({ ...acc, [key]: true }), {}
    );
    setTouched(allTouched);
    
    const validationErrors = validateAll();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

export const AdvancedValidationExample = () => {
  const [submitted, setSubmitted] = useState(false);
  const [asyncError, setAsyncError] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);

  const schema = {
    username: [
      validationRules.required,
      validationRules.minLength(3),
      validationRules.maxLength(20),
      validationRules.pattern(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores'),
    ],
    email: [
      validationRules.required,
      validationRules.email,
    ],
    password: [
      validationRules.required,
      validationRules.minLength(8),
      validationRules.pattern(/[A-Z]/, 'Must contain at least one uppercase letter'),
      validationRules.pattern(/[0-9]/, 'Must contain at least one number'),
    ],
    confirmPassword: [
      validationRules.required,
      validationRules.match('password', () => 'Passwords do not match'),
    ],
    age: [
      validationRules.required,
      validationRules.custom((value) => {
        const num = parseInt(value, 10);
        if (isNaN(num)) return 'Must be a number';
        if (num < 18) return 'Must be 18 or older';
        if (num > 120) return 'Invalid age';
        return null;
      }),
    ],
    terms: [
      validationRules.custom((value) => !value ? 'You must accept the terms' : null),
    ],
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setErrors,
  } = useForm(
    { username: '', email: '', password: '', confirmPassword: '', age: '', terms: false },
    schema
  );

  useEffect(() => {
    if (values.email && touched.email && !errors.email) {
      const checkEmail = async () => {
        setCheckingEmail(true);
        await new Promise(r => setTimeout(r, 1000));
        if (values.email === 'taken@example.com') {
          setAsyncError('This email is already registered');
        } else {
          setAsyncError('');
        }
        setCheckingEmail(false);
      };
      checkEmail();
    } else {
      setAsyncError('');
    }
  }, [values.email, touched.email, errors.email]);

  const onSubmit = async (data) => {
    if (asyncError) {
      setErrors(prev => ({ ...prev, email: asyncError }));
      return;
    }
    await new Promise(r => setTimeout(r, 1000));
    console.log('Submitted:', data);
    setSubmitted(true);
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${(errors[name] || (name === 'email' && asyncError)) && touched[name] ? '#f44336' : '#ddd'}`,
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  });

  if (submitted) {
    return (
      <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ ...cardStyle, textAlign: 'center', backgroundColor: '#e8f5e9' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ color: '#2e7d32', marginTop: 0 }}>Registration Complete!</h2>
            <button
              onClick={() => { setSubmitted(false); resetForm(); }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Advanced Form Validation</h2>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Registration Form</h3>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Username <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('username')}
                placeholder="3-20 characters, letters/numbers/underscores"
              />
              {errors.username && touched.username && (
                <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.username}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email <span style={{ color: '#f44336' }}>*</span>
                {checkingEmail && <span style={{ color: '#666', fontWeight: 'normal', marginLeft: '0.5rem' }}>(checking...)</span>}
              </label>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('email')}
                placeholder="your@email.com"
              />
              {(errors.email || asyncError) && touched.email && (
                <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.email || asyncError}</span>
              )}
              <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.25rem' }}>
                Try: taken@example.com to see async validation
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Password <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('password')}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
              />
              {errors.password && touched.password && (
                <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.password}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Confirm Password <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('confirmPassword')}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.confirmPassword}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Age <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                name="age"
                type="number"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('age')}
                placeholder="Must be 18+"
              />
              {errors.age && touched.age && (
                <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.age}</span>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  name="terms"
                  type="checkbox"
                  checked={values.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: '20px', height: '20px' }}
                />
                <span>I accept the terms and conditions <span style={{ color: '#f44336' }}>*</span></span>
              </label>
              {errors.terms && touched.terms && (
                <span style={{ color: '#f44336', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>{errors.terms}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || checkingEmail}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: isSubmitting || checkingEmail ? '#9e9e9e' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isSubmitting || checkingEmail ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>

        <div style={cardStyle}>
          <h4 style={{ marginTop: 0, color: '#667eea' }}>Features Demonstrated</h4>
          <ul style={{ color: '#666', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Custom useForm hook</li>
            <li>Composable validation rules</li>
            <li>Pattern validation (regex)</li>
            <li>Cross-field validation (password match)</li>
            <li>Async validation (email check)</li>
            <li>Touch tracking for blur validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvancedValidationExample;
