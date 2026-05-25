import { useState, useRef, useTransition, useDeferredValue, Suspense, createContext, useContext, forwardRef, use } from 'react';

// Context for demo
const ThemeContext = createContext('light');

export const React19AllNewFeaturesExample = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    { id: 'actions', title: 'Actions & useActionState', color: '#667eea' },
    { id: 'use', title: 'use() Hook', color: '#e91e63' },
    { id: 'ref', title: 'ref as Prop', color: '#00bcd4' },
    { id: 'context', title: 'Context as Provider', color: '#4caf50' },
    { id: 'metadata', title: 'Document Metadata', color: '#ff9800' },
    { id: 'stylesheets', title: 'Stylesheet Support', color: '#9c27b0' },
    { id: 'async', title: 'Async Scripts', color: '#f44336' },
    { id: 'preloading', title: 'Resource Preloading', color: '#2196f3' },
    { id: 'errors', title: 'Better Error Reporting', color: '#795548' },
    { id: 'customElements', title: 'Custom Elements', color: '#607d8b' },
  ];

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '0.5rem' }}>React 19 - All New Features</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Click on each feature to see details and examples
        </p>

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {features.map(feature => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              style={{
                padding: '1rem',
                background: activeFeature === feature.id ? feature.color : 'white',
                color: activeFeature === feature.id ? 'white' : '#333',
                border: `2px solid ${feature.color}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
            >
              {feature.title}
            </button>
          ))}
        </div>

        {/* Feature Details */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {!activeFeature && (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
              Select a feature above to see details and examples
            </div>
          )}

          {activeFeature === 'actions' && <ActionsFeature />}
          {activeFeature === 'use' && <UseHookFeature />}
          {activeFeature === 'ref' && <RefAsPropFeature />}
          {activeFeature === 'context' && <ContextProviderFeature />}
          {activeFeature === 'metadata' && <MetadataFeature />}
          {activeFeature === 'stylesheets' && <StylesheetFeature />}
          {activeFeature === 'async' && <AsyncScriptFeature />}
          {activeFeature === 'preloading' && <PreloadingFeature />}
          {activeFeature === 'errors' && <ErrorReportingFeature />}
          {activeFeature === 'customElements' && <CustomElementsFeature />}
        </div>

        {/* Quick Reference */}
        <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Quick Reference: React 19 New Hooks</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <QuickRefCard
              title="useActionState"
              code="const [state, action, pending] = useActionState(fn, init)"
              description="Form state with actions and pending state"
            />
            <QuickRefCard
              title="useOptimistic"
              code="const [optimistic, add] = useOptimistic(state, reducer)"
              description="Optimistic UI updates"
            />
            <QuickRefCard
              title="use()"
              code="const data = use(promise); const ctx = use(Context)"
              description="Read promises and context conditionally"
            />
            <QuickRefCard
              title="useFormStatus"
              code="const { pending, data } = useFormStatus()"
              description="Form status in nested components"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Components
const ActionsFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#667eea' }}>Actions & useActionState</h3>
    <p>Actions are async functions that handle form submissions with automatic pending states.</p>
    
    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>Key Benefits:</h4>
      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
        <li>Automatic pending state management</li>
        <li>Progressive enhancement (works without JS)</li>
        <li>Built-in error handling</li>
        <li>Optimistic updates with useOptimistic</li>
      </ul>
    </div>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// useActionState - form state management
async function saveUser(prevState, formData) {
  const name = formData.get('name');
  await api.saveUser({ name });
  return { success: true };
}

function Form() {
  const [state, action, pending] = useActionState(saveUser, {});
  
  return (
    <form action={action}>
      <input name="name" disabled={pending} />
      <button disabled={pending}>
        {pending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}`}
    </pre>
  </div>
);

const UseHookFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#e91e63' }}>use() Hook</h3>
    <p>A new primitive for reading resources (Promises and Context) that can be called conditionally.</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ background: '#ffebee', padding: '1rem', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Before (useContext)</h4>
        <code>Must be at top level</code>
      </div>
      <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>After (use)</h4>
        <code>Can be conditional!</code>
      </div>
    </div>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// use() can be called conditionally
function Profile({ shouldLoad }) {
  if (!shouldLoad) return null;
  
  const user = use(userPromise);     // Read Promise
  const theme = use(ThemeContext);    // Read Context
  
  return <div className={theme}>{user.name}</div>;
}

// Works with Suspense
<Suspense fallback={<Loading />}>
  <Profile shouldLoad={true} />
</Suspense>`}
    </pre>
  </div>
);

const RefAsPropFeature = () => {
  const inputRef = useRef(null);

  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ marginTop: 0, color: '#00bcd4' }}>ref as Prop</h3>
      <p>Function components can now receive ref as a regular prop - no more forwardRef needed!</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <FancyInput ref={inputRef} placeholder="I receive ref as prop!" />
        <button
          onClick={() => inputRef.current?.focus()}
          style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Focus Input
        </button>
      </div>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Before React 19 - needed forwardRef
const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

// React 19 - ref is just a prop!
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Usage is the same
<Input ref={myRef} />`}
      </pre>
    </div>
  );
};

// Demo component that receives ref as prop (React 19 style)
const FancyInput = ({ ref, ...props }) => (
  <input
    ref={ref}
    style={{
      padding: '0.75rem',
      border: '2px solid #00bcd4',
      borderRadius: '4px',
      width: '100%',
      boxSizing: 'border-box',
    }}
    {...props}
  />
);

const ContextProviderFeature = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ marginTop: 0, color: '#4caf50' }}>Context as Provider</h3>
      <p>In React 19, Context can be rendered directly as a provider (no .Provider needed).</p>
      
      <button
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Toggle Theme: {theme}
      </button>

      <ThemeContext.Provider value={theme}>
        <ThemedBox />
      </ThemeContext.Provider>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto', marginTop: '1rem' }}>
{`// Before React 19
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// React 19 - Context is the Provider
<ThemeContext value={theme}>
  <App />
</ThemeContext>

// .Provider still works for backwards compatibility`}
      </pre>
    </div>
  );
};

const ThemedBox = () => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{
      padding: '1rem',
      background: theme === 'light' ? '#e8f5e9' : '#1a1a2e',
      color: theme === 'light' ? '#2e7d32' : '#4ade80',
      borderRadius: '6px',
    }}>
      Current theme: <strong>{theme}</strong>
    </div>
  );
};

const MetadataFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#ff9800' }}>Document Metadata</h3>
    <p>React 19 natively supports rendering document metadata tags like title, meta, and link.</p>
    
    <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>Supported Tags:</h4>
      <code>{'<title>'}</code>, <code>{'<meta>'}</code>, <code>{'<link>'}</code>
    </div>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Title hoists to <head> automatically
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title} | My Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <link rel="canonical" href={post.url} />
      
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// No more react-helmet needed for basic cases!`}
    </pre>
  </div>
);

const StylesheetFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#9c27b0' }}>Stylesheet Support</h3>
    <p>React 19 manages stylesheet loading order and deduplication automatically.</p>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Stylesheets with precedence control
function Component() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="/styles/base.css" 
        precedence="default" 
      />
      <link 
        rel="stylesheet" 
        href="/styles/theme.css" 
        precedence="high" 
      />
      <div className="themed">Content</div>
    </>
  );
}

// React ensures:
// 1. Stylesheets load before content renders
// 2. Correct ordering based on precedence
// 3. No duplicate stylesheet loading`}
    </pre>
  </div>
);

const AsyncScriptFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#f44336' }}>Async Scripts</h3>
    <p>Better support for async scripts with automatic deduplication and ordering.</p>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Async scripts anywhere in the tree
function Analytics() {
  return (
    <>
      <script async src="/analytics.js" />
      <div>Component content</div>
    </>
  );
}

// Multiple components can request the same script
// React deduplicates automatically
function ComponentA() {
  return <script async src="/shared.js" />;
}
function ComponentB() {
  return <script async src="/shared.js" />;  // Same script - loaded once
}`}
    </pre>
  </div>
);

const PreloadingFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#2196f3' }}>Resource Preloading</h3>
    <p>New APIs for preloading resources: prefetchDNS, preconnect, preload, preinit.</p>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { prefetchDNS, preconnect, preload, preinit } from 'react-dom';

function App() {
  // DNS prefetch for external domains
  prefetchDNS('https://api.example.com');
  
  // Preconnect to establish early connection
  preconnect('https://cdn.example.com');
  
  // Preload critical resources
  preload('/fonts/main.woff2', { as: 'font' });
  preload('/hero.jpg', { as: 'image' });
  
  // Preinit scripts and stylesheets
  preinit('/critical.js', { as: 'script' });
  preinit('/critical.css', { as: 'style' });
  
  return <div>App content</div>;
}`}
    </pre>
  </div>
);

const ErrorReportingFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#795548' }}>Better Error Reporting</h3>
    <p>React 19 improves error messages and removes duplicate logging in development.</p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ background: '#ffebee', padding: '1rem', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Before</h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
          <li>Errors logged twice</li>
          <li>console.error for caught errors</li>
          <li>Less context in messages</li>
        </ul>
      </div>
      <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>React 19</h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
          <li>Single error log</li>
          <li>onCaughtError callback</li>
          <li>Better stack traces</li>
        </ul>
      </div>
    </div>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// New error handling callbacks
createRoot(container, {
  onCaughtError: (error) => {
    // Error caught by Error Boundary
    logToService(error);
  },
  onUncaughtError: (error) => {
    // Uncaught error
    showErrorDialog(error);
  },
  onRecoverableError: (error) => {
    // Recoverable hydration errors
    reportRecoverable(error);
  }
});`}
    </pre>
  </div>
);

const CustomElementsFeature = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ marginTop: 0, color: '#607d8b' }}>Custom Elements Support</h3>
    <p>React 19 fully supports Web Components / Custom Elements.</p>

    <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Custom elements now work properly
function App() {
  return (
    <my-custom-element
      customProp={myObject}      // Object props work!
      oncustomevent={handleEvent} // Event handlers work!
      class="my-class"           // class attribute works!
    />
  );
}

// React 19 automatically:
// - Passes objects/arrays as properties (not stringified)
// - Handles custom events
// - Uses 'class' attribute (not className for custom elements)`}
    </pre>
  </div>
);

// Quick Reference Card
const QuickRefCard = ({ title, code, description }) => (
  <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{title}</h4>
    <code style={{ 
      display: 'block', 
      background: '#e0e0e0', 
      padding: '0.5rem', 
      borderRadius: '4px',
      fontSize: '0.85rem',
      marginBottom: '0.5rem',
    }}>
      {code}
    </code>
    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{description}</p>
  </div>
);

export default React19AllNewFeaturesExample;
