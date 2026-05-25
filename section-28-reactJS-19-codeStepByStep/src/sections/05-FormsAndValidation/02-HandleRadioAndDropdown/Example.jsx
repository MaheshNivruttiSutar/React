import { useState } from 'react';

export const HandleRadioAndDropdownExample = () => {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [multiSelect, setMultiSelect] = useState([]);

  const sizes = ['small', 'medium', 'large', 'xlarge'];
  const colors = [
    { value: 'red', label: 'Red', hex: '#f44336' },
    { value: 'blue', label: 'Blue', hex: '#2196f3' },
    { value: 'green', label: 'Green', hex: '#4caf50' },
    { value: 'purple', label: 'Purple', hex: '#9c27b0' },
  ];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France'];
  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
  ];
  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML'];

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setMultiSelect(options);
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  };

  const radioLabelStyle = (isSelected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    backgroundColor: isSelected ? '#e3f2fd' : '#f5f5f5',
    border: `2px solid ${isSelected ? '#2196f3' : 'transparent'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Handle Radio Buttons & Dropdowns</h2>

        {/* Radio Buttons - Basic */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Radio Buttons (Size Selection)</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {sizes.map(size => (
              <label key={size} style={radioLabelStyle(selectedSize === size)}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ textTransform: 'capitalize', fontWeight: selectedSize === size ? 'bold' : 'normal' }}>
                  {size}
                </span>
              </label>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected:</strong> {selectedSize}
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
{`const [selected, setSelected] = useState('medium');

{sizes.map(size => (
  <label key={size}>
    <input
      type="radio"
      name="size"
      value={size}
      checked={selected === size}
      onChange={(e) => setSelected(e.target.value)}
    />
    {size}
  </label>
))}`}
          </pre>
        </div>

        {/* Radio Buttons with Colors */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Radio Buttons (Color Selection)</h3>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {colors.map(color => (
              <label 
                key={color.value} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: selectedColor === color.value ? '#f5f5f5' : 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: color.hex,
                  borderRadius: '50%',
                  border: selectedColor === color.value ? '4px solid #333' : '2px solid #ddd',
                  transition: 'all 0.2s',
                }} />
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{ display: 'none' }}
                />
                <span style={{ fontSize: '0.85rem' }}>{color.label}</span>
              </label>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected:</strong> {selectedColor || 'None'}
          </div>
        </div>

        {/* Basic Dropdown */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Basic Dropdown (Select)</h3>
          
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="">Select a country</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected:</strong> {country || 'None'}
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
{`const [country, setCountry] = useState('');

<select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
>
  <option value="">Select a country</option>
  {countries.map(c => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>`}
          </pre>
        </div>

        {/* Dropdown with Object Options */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Dropdown with Object Options</h3>
          
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected Value:</strong> {category || 'None'}
          </div>
        </div>

        {/* Multiple Select */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Multiple Select</h3>
          
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Skills (Hold Ctrl/Cmd to select multiple)
          </label>
          <select
            multiple
            value={multiSelect}
            onChange={handleMultiSelect}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '0.5rem',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              height: '150px',
            }}
          >
            {skills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px' }}>
            <strong>Selected:</strong> {multiSelect.length > 0 ? multiSelect.join(', ') : 'None'}
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
{`const handleMultiSelect = (e) => {
  const options = Array.from(
    e.target.selectedOptions,
    option => option.value
  );
  setSelected(options);
};

<select multiple value={selected} onChange={handleMultiSelect}>
  {options.map(opt => (
    <option key={opt} value={opt}>{opt}</option>
  ))}
</select>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HandleRadioAndDropdownExample;
