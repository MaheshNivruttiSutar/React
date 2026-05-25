import { useState } from 'react';

export const SimpleValidationExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values) => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (values.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!values.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(values.age) || values.age < 18 || values.age > 120) {
      newErrors.age = 'Age must be between 18 and 120';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const newErrors = validate(formData);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      age: true,
    });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${errors[fieldName] && touched[fieldName] ? '#f44336' : '#ddd'}`,
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  const errorStyle = {
    color: '#f44336',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
    display: 'block',
  };

  if (submitted) {
    return (
      <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ ...cardStyle, textAlign: 'center', backgroundColor: '#e8f5e9' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ color: '#2e7d32', marginTop: 0 }}>Form Submitted Successfully!</h2>
            <p style={{ color: '#666' }}>Thank you for registering, {formData.name}.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', password: '', confirmPassword: '', age: '' });
                setTouched({});
                setErrors({});
              }}
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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Simple Form Validation</h2>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Registration Form</h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Name <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('name')}
                placeholder="Enter your name"
              />
              {errors.name && touched.name && (
                <span style={errorStyle}>{errors.name}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('email')}
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <span style={errorStyle}>{errors.email}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Password <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('password')}
                placeholder="Enter password (min 8 characters)"
              />
              {errors.password && touched.password && (
                <span style={errorStyle}>{errors.password}</span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Confirm Password <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('confirmPassword')}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <span style={errorStyle}>{errors.confirmPassword}</span>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Age <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle('age')}
                placeholder="Enter your age"
              />
              {errors.age && touched.age && (
                <span style={errorStyle}>{errors.age}</span>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Register
            </button>
          </form>
        </div>

        {/* Code Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Validation Pattern</h3>
          
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}>
{`const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Min 8 characters';
  }

  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validate(formData);
  setErrors(errors);
  
  if (Object.keys(errors).length === 0) {
    // Submit form
  }
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SimpleValidationExample;
