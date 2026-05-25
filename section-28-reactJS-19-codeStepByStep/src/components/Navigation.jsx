import { useState } from 'react';
import '../styles/sections.css';

const Navigation = ({ sections, onSectionSelect, currentSection }) => {
  const [expandedCategory, setExpandedCategory] = useState('01-Basics');

  const categories = [
    { id: '01-Basics', label: '📚 Basics', icon: '📚' },
    { id: '02-PropsAndConditionalRendering', label: '🎨 Props & Conditional', icon: '🎨' },
    { id: '03-HooksAndState', label: '⚙️ Hooks & State', icon: '⚙️' },
    { id: '04-Styling', label: '🎯 Styling', icon: '🎯' },
    { id: '05-FormsAndValidation', label: '📝 Forms & Validation', icon: '📝' },
    { id: '06-APIIntegration', label: '🔌 API Integration', icon: '🔌' },
    { id: '07-ReactRouter', label: '🛣️ React Router', icon: '🛣️' },
    { id: '08-AdvancedConcepts', label: '🚀 Advanced', icon: '🚀' },
    { id: '09-Projects', label: '🏗️ Projects', icon: '🏗️' },
  ];

  return (
    <nav className="navigation-sidebar">
      <div className="nav-header">
        <h2>React 19 Learning Hub</h2>
        <p className="nav-subtitle">Learn by Doing</p>
      </div>

      <div className="nav-sections">
        {categories.map(category => (
          <div key={category.id} className="nav-category">
            <button
              className={`category-button ${expandedCategory === category.id ? 'expanded' : ''}`}
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
            >
              {category.icon} {category.label.split(' ').slice(1).join(' ')}
            </button>

            {expandedCategory === category.id && sections[category.id] && (
              <div className="category-items">
                {sections[category.id].map(section => (
                  <button
                    key={section.id}
                    className={`section-item ${currentSection?.id === section.id ? 'active' : ''}`}
                    onClick={() => onSectionSelect(section)}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
