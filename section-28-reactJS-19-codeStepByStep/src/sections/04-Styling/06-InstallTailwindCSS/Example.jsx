import { useState } from 'react';

export const InstallTailwindCSSExample = () => {
  const [activeTab, setActiveTab] = useState('install');

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Install Tailwind CSS</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['install', 'config', 'usage', 'examples'].map(tab => (
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

        {activeTab === 'install' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Installation Steps (Vite + React)</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Step 1: Install Tailwind CSS</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
              }}>
{`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
              </pre>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Step 2: Configure tailwind.config.js</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
              }}>
{`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Step 3: Add Tailwind directives to index.css</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
              }}>
{`/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
              </pre>
            </div>

            <div>
              <h4 style={{ color: '#667eea' }}>Step 4: Start using Tailwind</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
              }}>
{`function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600">
      Hello Tailwind!
    </h1>
  );
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Configuration Options</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.9rem',
            }}>
{`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          50: '#eef2ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
        },
        secondary: '#764ba2',
      },
      // Custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      // Custom breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    // Add plugins here
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}`}
            </pre>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Tip:</strong> Use <code>extend</code> to add custom values while keeping defaults.
              Properties outside <code>extend</code> will replace the defaults.
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Common Utility Classes</h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                { category: 'Layout', classes: 'flex, grid, block, hidden, container' },
                { category: 'Flexbox', classes: 'justify-center, items-center, flex-col, gap-4' },
                { category: 'Spacing', classes: 'p-4, px-6, m-2, mt-4, space-y-2' },
                { category: 'Sizing', classes: 'w-full, h-screen, max-w-lg, min-h-0' },
                { category: 'Typography', classes: 'text-lg, font-bold, text-center, leading-6' },
                { category: 'Colors', classes: 'text-blue-500, bg-gray-100, border-red-300' },
                { category: 'Borders', classes: 'border, border-2, rounded-lg, rounded-full' },
                { category: 'Effects', classes: 'shadow-md, opacity-50, hover:bg-blue-600' },
              ].map(item => (
                <div key={item.category} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                  <strong style={{ color: '#667eea' }}>{item.category}:</strong>
                  <code style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>{item.classes}</code>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>Responsive Design</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
              }}>
{`{/* Mobile first approach */}
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

{/* Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>`}
              </pre>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#667eea' }}>State Variants</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
              }}>
{`<button className="
  bg-blue-500 
  hover:bg-blue-600 
  focus:ring-2 
  focus:ring-blue-300
  active:bg-blue-700
  disabled:opacity-50
  disabled:cursor-not-allowed
">
  Button
</button>`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Component Examples</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#667eea' }}>Button Component</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
              }}>
{`function Button({ variant = 'primary', size = 'md', children }) {
  const baseClasses = 'font-semibold rounded-lg transition-colors';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`}>
      {children}
    </button>
  );
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#667eea' }}>Card Component</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
              }}>
{`function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h3>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}`}
              </pre>
            </div>

            <div>
              <h4 style={{ color: '#667eea' }}>Form Input</h4>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
              }}>
{`function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className={\`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          \${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300'
          }
        \`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Quick Reference</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <strong style={{ color: '#2e7d32' }}>Spacing Scale</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                0=0, 1=0.25rem, 2=0.5rem, 4=1rem, 6=1.5rem, 8=2rem
              </div>
            </div>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong style={{ color: '#1976d2' }}>Font Sizes</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                xs, sm, base, lg, xl, 2xl, 3xl, 4xl
              </div>
            </div>
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <strong style={{ color: '#e65100' }}>Colors</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                50, 100, 200, 300, 400, 500, 600, 700, 800, 900
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallTailwindCSSExample;
