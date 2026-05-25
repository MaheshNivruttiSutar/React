import { useState, useTransition } from 'react';

const generateItems = (filter) => {
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(`Item ${i + 1} - ${filter}`);
  }
  return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
};

export const UseTransitionHookExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const [tab, setTab] = useState('home');
  const [tabPending, startTabTransition] = useTransition();

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    startTransition(() => {
      const filteredResults = generateItems(value);
      setResults(filteredResults);
    });
  };

  const handleTabChange = (newTab) => {
    startTabTransition(() => {
      setTab(newTab);
    });
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const SlowTab = ({ name }) => {
    const items = [];
    for (let i = 0; i < 500; i++) {
      items.push(<div key={i} style={{ padding: '0.25rem' }}>{name} Item {i + 1}</div>);
    }
    return <div style={{ maxHeight: '200px', overflow: 'auto' }}>{items}</div>;
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>useTransition Hook</h2>

        {/* What is useTransition */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is useTransition?</h3>
          <p style={{ color: '#666' }}>
            useTransition lets you mark state updates as non-urgent "transitions". This keeps the UI 
            responsive during expensive updates by allowing React to interrupt them.
          </p>

          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [isPending, startTransition] = useTransition();

// Mark update as low priority
startTransition(() => {
  setExpensiveState(newValue); // Won't block UI
});

// Show loading state while pending
{isPending && <Spinner />}`}
          </pre>
        </div>

        {/* Search Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Search with Transition</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Type quickly - the input stays responsive while results update in the background.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Type to search 10,000 items..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #667eea',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{
            padding: '1rem',
            background: isPending ? '#fff3e0' : '#e8f5e9',
            borderRadius: '6px',
            marginBottom: '1rem',
            transition: 'background 0.2s',
          }}>
            {isPending ? (
              <span>Searching... (transition in progress)</span>
            ) : (
              <span>Found {results.length} results</span>
            )}
          </div>

          <div style={{ maxHeight: '200px', overflow: 'auto', background: '#f5f5f5', borderRadius: '6px', padding: '0.5rem' }}>
            {results.slice(0, 100).map((item, index) => (
              <div key={index} style={{ padding: '0.25rem', borderBottom: '1px solid #eee' }}>
                {item}
              </div>
            ))}
            {results.length > 100 && (
              <div style={{ padding: '0.5rem', color: '#666', textAlign: 'center' }}>
                ... and {results.length - 100} more
              </div>
            )}
          </div>
        </div>

        {/* Tab Example */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Tab Navigation with Transition</h3>
          
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
            {['home', 'about', 'contact'].map(tabName => (
              <button
                key={tabName}
                onClick={() => handleTabChange(tabName)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: tab === tabName ? '#667eea' : '#e0e0e0',
                  color: tab === tabName ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  opacity: tabPending ? 0.7 : 1,
                }}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div style={{
            padding: '1rem',
            background: tabPending ? '#f5f5f5' : 'white',
            borderRadius: '0 6px 6px 6px',
            border: '1px solid #ddd',
            minHeight: '100px',
          }}>
            {tabPending ? (
              <div style={{ textAlign: 'center', color: '#666' }}>Loading tab content...</div>
            ) : (
              <SlowTab name={tab} />
            )}
          </div>
        </div>

        {/* Key Points */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>When to Use useTransition</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { title: 'Expensive renders', desc: 'Large lists, complex components' },
              { title: 'Search/filter', desc: 'Keep input responsive while filtering' },
              { title: 'Tab switching', desc: 'Show stale content while new loads' },
              { title: 'Non-urgent updates', desc: 'Updates user can wait for' },
            ].map(item => (
              <div key={item.title} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <strong>{item.title}</strong>
                <span style={{ color: '#666', marginLeft: '0.5rem' }}>— {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseTransitionHookExample;
