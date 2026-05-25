import { useState } from 'react';
import '../styles/sections.css';

export const SectionTemplate = ({ 
  title, 
  description,
  exampleComponent: ExampleComponent, 
  notes,
  challenge 
}) => {
  const [activeTab, setActiveTab] = useState('example');

  return (
    <div className="section-container">
      <div className="section-header">
        <h1>{title}</h1>
        <p className="section-description">{description}</p>
      </div>

      <div className="section-tabs">
        <button 
          className={`tab-button ${activeTab === 'example' ? 'active' : ''}`}
          onClick={() => setActiveTab('example')}
        >
          💻 Example
        </button>
        <button 
          className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          📖 Notes
        </button>
        <button 
          className={`tab-button ${activeTab === 'challenge' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenge')}
        >
          💪 Practice
        </button>
      </div>

      <div className="section-content">
        {activeTab === 'example' && (
          <div className="tab-pane example-pane">
            <ExampleComponent />
          </div>
        )}
        
        {activeTab === 'notes' && (
          <div className="tab-pane notes-pane">
            <div className="markdown-content">
              {notes}
            </div>
          </div>
        )}
        
        {activeTab === 'challenge' && (
          <div className="tab-pane challenge-pane">
            <div className="markdown-content">
              {challenge}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionTemplate;
