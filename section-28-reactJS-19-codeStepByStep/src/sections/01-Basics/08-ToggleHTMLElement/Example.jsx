import { useState } from 'react';

export const ToggleHTMLElementExample = () => {
  const [showContent, setShowContent] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [activeTab, setActiveTab] = useState('first');

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqItems = [
    { id: 1, question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'JSX is a syntax extension that lets you write HTML-like code in JavaScript.' },
    { id: 3, question: 'What are hooks?', answer: 'Hooks are functions that let you use state and other React features in functional components.' },
  ];

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
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Toggle HTML Elements</h2>

        {/* Simple Toggle */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Simple Show/Hide</h3>
          
          <button
            onClick={() => setShowContent(!showContent)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            {showContent ? 'Hide' : 'Show'} Content
          </button>

          {showContent && (
            <div style={{
              padding: '1rem',
              background: '#e3f2fd',
              borderRadius: '6px',
              marginBottom: '1rem',
              animation: 'fadeIn 0.3s ease',
            }}>
              <p style={{ margin: 0 }}>
                This content is conditionally rendered based on the <code>showContent</code> state.
                Click the button above to toggle its visibility.
              </p>
            </div>
          )}

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [showContent, setShowContent] = useState(true);

<button onClick={() => setShowContent(!showContent)}>
  {showContent ? 'Hide' : 'Show'} Content
</button>

{showContent && (
  <div>This content toggles visibility</div>
)}`}
          </pre>
        </div>

        {/* Modal Toggle */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Modal Toggle</h3>
          
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Open Modal
          </button>

          {showModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                maxWidth: '400px',
                width: '90%',
              }}>
                <h3 style={{ marginTop: 0 }}>Modal Title</h3>
                <p>This is modal content that appears as an overlay.</p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`const [showModal, setShowModal] = useState(false);

<button onClick={() => setShowModal(true)}>Open Modal</button>

{showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Modal Title</h3>
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  </div>
)}`}
          </pre>
        </div>

        {/* Accordion Toggle */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Accordion (FAQ)</h3>
          
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {faqItems.map(item => (
              <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleItem(item.id)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: expandedItems[item.id] ? '#667eea' : '#f5f5f5',
                    color: expandedItems[item.id] ? 'white' : '#333',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  {item.question}
                  <span>{expandedItems[item.id] ? '−' : '+'}</span>
                </button>
                {expandedItems[item.id] && (
                  <div style={{ padding: '1rem', background: 'white' }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`const [expandedItems, setExpandedItems] = useState({});

const toggleItem = (id) => {
  setExpandedItems(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};

{items.map(item => (
  <div key={item.id}>
    <button onClick={() => toggleItem(item.id)}>
      {item.question}
    </button>
    {expandedItems[item.id] && (
      <div>{item.answer}</div>
    )}
  </div>
))}`}
          </pre>
        </div>

        {/* Tab Toggle */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Tabs</h3>
          
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
            {['first', 'second', 'third'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === tab ? '#667eea' : '#e0e0e0',
                  color: activeTab === tab ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  textTransform: 'capitalize',
                }}
              >
                {tab} Tab
              </button>
            ))}
          </div>

          <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '0 6px 6px 6px' }}>
            {activeTab === 'first' && <div>Content for the first tab. Each tab shows different content.</div>}
            {activeTab === 'second' && <div>Content for the second tab. The state determines which tab is active.</div>}
            {activeTab === 'third' && <div>Content for the third tab. Only one tab content is shown at a time.</div>}
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '1rem', overflow: 'auto' }}>
{`const [activeTab, setActiveTab] = useState('first');

{['first', 'second', 'third'].map(tab => (
  <button 
    onClick={() => setActiveTab(tab)}
    className={activeTab === tab ? 'active' : ''}
  >
    {tab}
  </button>
))}

{activeTab === 'first' && <div>First content</div>}
{activeTab === 'second' && <div>Second content</div>}`}
          </pre>
        </div>

        {/* Toggle Patterns Summary */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>Common Toggle Patterns</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { pattern: 'show && <Component />', desc: 'Show/hide single element' },
              { pattern: 'show ? <A /> : <B />', desc: 'Toggle between two elements' },
              { pattern: 'expandedItems[id]', desc: 'Toggle multiple items independently' },
              { pattern: 'activeTab === "name"', desc: 'Show one of many options' },
            ].map(item => (
              <div key={item.pattern} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
                <code style={{ color: '#667eea' }}>{item.pattern}</code>
                <span style={{ color: '#666' }}> — {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleHTMLElementExample;
