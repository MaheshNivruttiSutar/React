import { useState } from 'react';

export const HandleCheckboxesExample = () => {
  const [singleChecked, setSingleChecked] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [selectedFruits, setSelectedFruits] = useState([]);
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];

  const [preferences, setPreferences] = useState({
    newsletter: true,
    notifications: false,
    marketing: false,
    updates: true,
  });

  const [selectAll, setSelectAll] = useState(false);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const [selectedItems, setSelectedItems] = useState([]);

  const handleFruitChange = (fruit) => {
    setSelectedFruits(prev => 
      prev.includes(fruit)
        ? prev.filter(f => f !== fruit)
        : [...prev, fruit]
    );
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedItems(checked ? [...items] : []);
  };

  const handleItemChange = (item) => {
    const newSelected = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    
    setSelectedItems(newSelected);
    setSelectAll(newSelected.length === items.length);
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Handle Checkboxes in React</h2>

        {/* Single Checkbox */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Single Checkbox (Boolean State)</h3>
          
          <label style={{ ...labelStyle, backgroundColor: singleChecked ? '#e8f5e9' : '#f5f5f5' }}>
            <input
              type="checkbox"
              checked={singleChecked}
              onChange={(e) => setSingleChecked(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span>Enable dark mode</span>
          </label>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>State:</strong> <code>{singleChecked.toString()}</code>
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            marginTop: '1rem',
            fontSize: '0.85rem',
            overflow: 'auto',
          }}>
{`const [checked, setChecked] = useState(false);

<input
  type="checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
          </pre>
        </div>

        {/* Terms & Conditions */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Terms & Conditions Pattern</h3>
          
          <label style={{ ...labelStyle, backgroundColor: acceptTerms ? '#e8f5e9' : '#f5f5f5' }}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span>I accept the terms and conditions</span>
          </label>
          
          <button
            disabled={!acceptTerms}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: acceptTerms ? '#4caf50' : '#e0e0e0',
              color: acceptTerms ? 'white' : '#999',
              border: 'none',
              borderRadius: '6px',
              cursor: acceptTerms ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
            }}
          >
            Submit
          </button>
        </div>

        {/* Multiple Checkboxes (Array) */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Multiple Checkboxes (Array State)</h3>
          
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {fruits.map(fruit => (
              <label 
                key={fruit} 
                style={{ 
                  ...labelStyle, 
                  backgroundColor: selectedFruits.includes(fruit) ? '#e3f2fd' : '#f5f5f5' 
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedFruits.includes(fruit)}
                  onChange={() => handleFruitChange(fruit)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span>{fruit}</span>
              </label>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected:</strong> {selectedFruits.length > 0 ? selectedFruits.join(', ') : 'None'}
          </div>

          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '6px',
            marginTop: '1rem',
            fontSize: '0.85rem',
            overflow: 'auto',
          }}>
{`const [selected, setSelected] = useState([]);

const handleChange = (item) => {
  setSelected(prev => 
    prev.includes(item)
      ? prev.filter(i => i !== item)  // Remove
      : [...prev, item]               // Add
  );
};

<input
  type="checkbox"
  checked={selected.includes(item)}
  onChange={() => handleChange(item)}
/>`}
          </pre>
        </div>

        {/* Object State */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Object State Pattern</h3>
          
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {Object.entries(preferences).map(([key, value]) => (
              <label 
                key={key} 
                style={{ 
                  ...labelStyle, 
                  backgroundColor: value ? '#e8f5e9' : '#f5f5f5' 
                }}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handlePreferenceChange(key)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>State:</strong>
            <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
              {JSON.stringify(preferences, null, 2)}
            </pre>
          </div>
        </div>

        {/* Select All Pattern */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Select All / Deselect All</h3>
          
          <label style={{ 
            ...labelStyle, 
            backgroundColor: selectAll ? '#667eea' : '#f5f5f5',
            color: selectAll ? 'white' : 'inherit',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span>Select All</span>
          </label>
          
          <div style={{ display: 'grid', gap: '0.5rem', marginLeft: '1.5rem' }}>
            {items.map(item => (
              <label 
                key={item} 
                style={{ 
                  ...labelStyle, 
                  backgroundColor: selectedItems.includes(item) ? '#e3f2fd' : '#f5f5f5' 
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleItemChange(item)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected:</strong> {selectedItems.length} of {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleCheckboxesExample;
