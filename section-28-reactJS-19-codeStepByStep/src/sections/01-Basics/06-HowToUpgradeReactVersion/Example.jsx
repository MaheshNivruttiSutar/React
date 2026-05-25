import { useState } from 'react';

export const HowToUpgradeReactVersionExample = () => {
  const [activeTab, setActiveTab] = useState('check');

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const codeBlockStyle = {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '1rem',
    borderRadius: '6px',
    overflow: 'auto',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>How to Upgrade React Version</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['check', 'upgrade', 'react19', 'troubleshoot'].map(tab => (
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
              }}
            >
              {tab === 'check' ? 'Check Version' : tab === 'upgrade' ? 'Upgrade Steps' : tab === 'react19' ? 'React 19' : 'Troubleshoot'}
            </button>
          ))}
        </div>

        {activeTab === 'check' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Check Current Version</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Method 1: package.json</h4>
              <pre style={codeBlockStyle}>
{`// Check your package.json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Method 2: Terminal Commands</h4>
              <pre style={codeBlockStyle}>
{`# Check installed version
npm list react

# Check latest available version
npm view react version

# Check all available versions
npm view react versions`}
              </pre>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Method 3: Browser Console</h4>
              <pre style={codeBlockStyle}>
{`// In browser DevTools console
React.version  // "18.2.0"`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Current Version:</strong> This demo is running React {/* {React.version} */}18.x or 19.x
            </div>
          </div>
        )}

        {activeTab === 'upgrade' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Step-by-Step Upgrade Guide</h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Step 1: Backup & Git</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem' }}>
{`# Create a new branch
git checkout -b upgrade-react

# Commit current state
git add . && git commit -m "Before React upgrade"`}
                </pre>
              </div>

              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Step 2: Update Dependencies</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem' }}>
{`# npm
npm install react@latest react-dom@latest

# yarn
yarn add react@latest react-dom@latest

# Specific version
npm install react@19.0.0 react-dom@19.0.0`}
                </pre>
              </div>

              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Step 3: Update Related Packages</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem' }}>
{`# Update React-related packages
npm install @types/react@latest @types/react-dom@latest
npm install react-router-dom@latest  # if using
npm install @testing-library/react@latest`}
                </pre>
              </div>

              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>Step 4: Test & Fix</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem' }}>
{`# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests
npm test

# Start development server
npm run dev`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'react19' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Upgrading to React 19</h3>

            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <strong>Note:</strong> React 19 introduces several breaking changes. Review the migration guide carefully.
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Installation</h4>
              <pre style={codeBlockStyle}>
{`npm install react@19 react-dom@19

# For TypeScript
npm install @types/react@19 @types/react-dom@19`}
              </pre>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Key Changes in React 19</h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  { title: 'ref as prop', desc: 'No need for forwardRef anymore' },
                  { title: 'use() hook', desc: 'Read resources in render (Promises, Context)' },
                  { title: 'useActionState', desc: 'Replaces useFormState' },
                  { title: 'useOptimistic', desc: 'Optimistic UI updates' },
                  { title: 'Context as Provider', desc: '<Context> instead of <Context.Provider>' },
                  { title: 'Improved error reporting', desc: 'Better hydration error messages' },
                ].map(item => (
                  <div key={item.title} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                    <strong>{item.title}</strong>: {item.desc}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Migration Example: forwardRef</h4>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div>
                  <div style={{ color: '#f44336', marginBottom: '0.5rem' }}>Before (React 18)</div>
                  <pre style={{ ...codeBlockStyle, fontSize: '0.8rem' }}>
{`const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));`}
                  </pre>
                </div>
                <div>
                  <div style={{ color: '#4caf50', marginBottom: '0.5rem' }}>After (React 19)</div>
                  <pre style={{ ...codeBlockStyle, fontSize: '0.8rem' }}>
{`const Input = ({ ref, ...props }) => (
  <input ref={ref} {...props} />
);`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#667eea' }}>Codemods</h4>
              <pre style={codeBlockStyle}>
{`# Run React 19 codemods to auto-fix code
npx codemod@latest react/19/migration-recipe`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'troubleshoot' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Troubleshooting Common Issues</h3>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Peer Dependency Errors</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem', fontSize: '0.8rem' }}>
{`# Force install (use with caution)
npm install --legacy-peer-deps

# Or update conflicting packages
npm update react-router-dom`}
                </pre>
              </div>

              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Version Mismatch</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem', fontSize: '0.8rem' }}>
{`# Ensure react and react-dom match
npm list react react-dom

# Fix by installing same version
npm install react@19 react-dom@19`}
                </pre>
              </div>

              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '6px', borderLeft: '4px solid #f44336' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Cache Issues</h4>
                <pre style={{ ...codeBlockStyle, marginTop: '0.5rem', fontSize: '0.8rem' }}>
{`# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install`}
                </pre>
              </div>

              <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px', borderLeft: '4px solid #4caf50' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Best Practice: Lock Files</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Always commit <code>package-lock.json</code> (npm) or <code>yarn.lock</code> (yarn) 
                  to ensure consistent installs across team members.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Version History */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>React Version History</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {[
              { version: 'React 19', date: '2024', highlights: 'use() hook, Actions, ref as prop' },
              { version: 'React 18', date: '2022', highlights: 'Concurrent features, useTransition, Suspense' },
              { version: 'React 17', date: '2020', highlights: 'No new features, gradual upgrades' },
              { version: 'React 16.8', date: '2019', highlights: 'Hooks introduced' },
              { version: 'React 16', date: '2017', highlights: 'Fiber, Error Boundaries, Portals' },
            ].map(item => (
              <div key={item.version} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <strong style={{ minWidth: '100px' }}>{item.version}</strong>
                <span style={{ color: '#666', minWidth: '60px' }}>{item.date}</span>
                <span>{item.highlights}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUpgradeReactVersionExample;
