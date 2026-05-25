import { useState, lazy, Suspense } from 'react';

const HeavyChart = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center',
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Chart Component Loaded!</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', height: '150px', alignItems: 'flex-end' }}>
              {[40, 70, 55, 90, 65, 80, 45].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '30px',
                    height: `${h}%`,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: '4px 4px 0 0',
                  }}
                />
              ))}
            </div>
          </div>
        )
      });
    }, 2000);
  });
});

const HeavyTable = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#667eea', color: 'white' }}>
                <th style={{ padding: '0.75rem' }}>ID</th>
                <th style={{ padding: '0.75rem' }}>Name</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'Project Alpha', status: 'Active' },
                { id: 2, name: 'Project Beta', status: 'Pending' },
                { id: 3, name: 'Project Gamma', status: 'Completed' },
              ].map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem' }}>{item.id}</td>
                  <td style={{ padding: '0.75rem' }}>{item.name}</td>
                  <td style={{ padding: '0.75rem' }}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      });
    }, 1500);
  });
});

const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    color: '#667eea',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #e0e0e0',
      borderTopColor: '#667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <p style={{ marginTop: '1rem' }}>Loading component...</p>
  </div>
);

export const LazyLoadingExample = () => {
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Lazy Loading in React</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['demo', 'syntax', 'routes'].map(tab => (
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

        {activeTab === 'demo' && (
          <>
            {/* Interactive Demo */}
            <div style={cardStyle}>
              <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo</h3>
              <p style={{ color: '#666' }}>
                Click the buttons below to lazy load components. Watch the loading spinner!
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setShowChart(true)}
                  disabled={showChart}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: showChart ? '#e0e0e0' : '#667eea',
                    color: showChart ? '#999' : 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: showChart ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {showChart ? 'Chart Loaded' : 'Load Chart'}
                </button>
                <button
                  onClick={() => setShowTable(true)}
                  disabled={showTable}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: showTable ? '#e0e0e0' : '#4caf50',
                    color: showTable ? '#999' : 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: showTable ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {showTable ? 'Table Loaded' : 'Load Table'}
                </button>
              </div>

              {showChart && (
                <div style={{ marginBottom: '1rem' }}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <HeavyChart />
                  </Suspense>
                </div>
              )}

              {showTable && (
                <Suspense fallback={<LoadingSpinner />}>
                  <HeavyTable />
                </Suspense>
              )}

              {!showChart && !showTable && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#999', background: '#f5f5f5', borderRadius: '8px' }}>
                  Click a button above to load a component
                </div>
              )}
            </div>

            {/* Benefits */}
            <div style={cardStyle}>
              <h3 style={{ marginTop: 0, color: '#667eea' }}>Why Lazy Loading?</h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  { icon: '⚡', title: 'Faster Initial Load', desc: 'Only load what you need upfront' },
                  { icon: '📦', title: 'Smaller Bundle', desc: 'Split code into smaller chunks' },
                  { icon: '💾', title: 'Save Bandwidth', desc: 'Users only download what they use' },
                  { icon: '🎯', title: 'Better UX', desc: 'Perceived performance improvement' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span style={{ color: '#666' }}> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'syntax' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Basic Syntax</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}>
{`import { lazy, Suspense } from 'react';

// Lazy load the component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      {/* Suspense provides fallback while loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}`}
            </pre>

            <h4 style={{ color: '#667eea' }}>Conditional Lazy Loading</h4>
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}>
{`const Chart = lazy(() => import('./Chart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<Spinner />}>
          <Chart />
        </Suspense>
      )}
    </div>
  );
}`}
            </pre>

            <h4 style={{ color: '#667eea' }}>Custom Loading Component</h4>
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem',
            }}>
{`function LoadingFallback() {
  return (
    <div className="loading">
      <Spinner />
      <p>Loading component...</p>
    </div>
  );
}

<Suspense fallback={<LoadingFallback />}>
  <LazyComponent />
</Suspense>`}
            </pre>
          </div>
        )}

        {activeTab === 'routes' && (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Route-Based Lazy Loading</h3>
            
            <pre style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}>
{`import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <p>Loading page...</p>
    </div>
  );
}`}
            </pre>

            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Best Practice:</strong> Wrap Routes with a single Suspense, or wrap each 
              Route individually for more granular loading states.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LazyLoadingExample;
