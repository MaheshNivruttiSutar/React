import { useState } from 'react';

export const ValidationWithUseActionStateExample = () => {
  const [activeTab, setActiveTab] = useState('concept');

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Validation with useActionState (React 19)</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['concept', 'example', 'comparison'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? '#667eea' : 'white',
                color: activeTab === tab ? 'white' : '#333',
                border: '2px solid #667eea',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'concept' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>What is useActionState?</h3>
            
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <strong>React 19 Feature:</strong> <code>useActionState</code> (formerly <code>useFormState</code>) 
              is a hook that handles form state and actions, making server-side validation seamless.
            </div>

            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
            }}>
{`import { useActionState } from 'react';

// Action function (can be async/server action)
async function submitForm(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Validation
  const errors = {};
  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';
  
  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }
  
  // Submit to server
  await submitToServer({ email, password });
  
  return { errors: {}, success: true };
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    { errors: {}, success: false }
  );

  return (
    <form action={formAction}>
      <input name="email" />
      {state.errors.email && <span>{state.errors.email}</span>}
      
      <input name="password" type="password" />
      {state.errors.password && <span>{state.errors.password}</span>}
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Login'}
      </button>
      
      {state.success && <p>Login successful!</p>}
    </form>
  );
}`}
            </pre>

            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Key Benefits</h4>
              <ul style={{ color: '#666', lineHeight: 1.8 }}>
                <li><strong>Automatic pending state</strong> - No manual loading state needed</li>
                <li><strong>Progressive enhancement</strong> - Works without JS</li>
                <li><strong>Server actions</strong> - Direct server validation support</li>
                <li><strong>FormData API</strong> - Native form data handling</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Complete Example</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem',
            }}>
{`'use client';
import { useActionState } from 'react';

// Server action or async function
async function registerUser(prevState, formData) {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  
  const errors = {};
  
  // Validation
  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!password || password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  // Check if email already exists (server-side check)
  if (email === 'taken@example.com') {
    errors.email = 'This email is already registered';
  }
  
  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
      success: false,
      message: 'Please fix the errors above'
    };
  }
  
  // Success - save to database
  return { 
    errors: {}, 
    success: true,
    message: 'Registration successful!'
  };
}

function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    errors: {},
    success: false,
    message: ''
  });

  return (
    <form action={formAction}>
      <div>
        <label>Name</label>
        <input 
          name="name" 
          disabled={isPending}
          style={{ borderColor: state.errors.name ? 'red' : '#ddd' }}
        />
        {state.errors.name && (
          <span className="error">{state.errors.name}</span>
        )}
      </div>
      
      <div>
        <label>Email</label>
        <input 
          name="email" 
          type="email"
          disabled={isPending}
          style={{ borderColor: state.errors.email ? 'red' : '#ddd' }}
        />
        {state.errors.email && (
          <span className="error">{state.errors.email}</span>
        )}
      </div>
      
      <div>
        <label>Password</label>
        <input 
          name="password" 
          type="password"
          disabled={isPending}
          style={{ borderColor: state.errors.password ? 'red' : '#ddd' }}
        />
        {state.errors.password && (
          <span className="error">{state.errors.password}</span>
        )}
      </div>
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>
      
      {state.message && (
        <p className={state.success ? 'success' : 'error'}>
          {state.message}
        </p>
      )}
    </form>
  );
}`}
            </pre>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <strong>Note:</strong> This example shows the pattern. In a real app with React 19 
              and Server Components, the action function can be a server action that runs on the server.
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Traditional vs useActionState</h3>
            
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div>
                <h4 style={{ color: '#f44336' }}>Traditional Approach</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.8rem',
                  height: '300px',
                }}>
{`function Form() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const errors = validate(formData);
      if (Object.keys(errors).length) {
        setErrors(errors);
        return;
      }
      
      await submitToServer(formData);
      setSuccess(true);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      ...
    </form>
  );
}`}
                </pre>
              </div>

              <div>
                <h4 style={{ color: '#4caf50' }}>useActionState (React 19)</h4>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.8rem',
                  height: '300px',
                }}>
{`async function submitAction(prev, formData) {
  const email = formData.get('email');
  
  const errors = {};
  if (!email) errors.email = 'Required';
  
  if (Object.keys(errors).length) {
    return { errors, success: false };
  }
  
  await submitToServer({ email });
  return { errors: {}, success: true };
}

function Form() {
  const [state, action, isPending] = 
    useActionState(submitAction, {
      errors: {},
      success: false
    });

  return (
    <form action={action}>
      <input name="email" />
      {state.errors.email && (
        <span>{state.errors.email}</span>
      )}
      
      <button disabled={isPending}>
        {isPending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}`}
                </pre>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Key Differences</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Aspect</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Traditional</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>useActionState</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>State management</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Multiple useState</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Single state object</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Loading state</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Manual</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Automatic (isPending)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Form data</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Controlled inputs</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Native FormData</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Server integration</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>API calls</td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Server Actions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationWithUseActionStateExample;
