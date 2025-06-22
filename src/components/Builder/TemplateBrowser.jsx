import { useEffect, useState } from 'react';
import { loadAllTemplates } from '../../utils/storage';

const TemplateBrowser = ({ onSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedTemplates = loadAllTemplates();
    setTemplates(loadedTemplates);
    setIsLoading(false);
  }, []);

  return (
    <div className="template-browser">
      <h3>Saved Templates</h3>
      {isLoading ? (
        <p>Loading templates...</p>
      ) : templates.length === 0 ? (
        <p>No templates found</p>
      ) : (
        <div className="template-list">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="template-item"
              onClick={() => onSelect(template)}
            >
              <div className="template-preview">
                {template.components.slice(0, 2).map((comp, i) => (
                  <div key={i} className={`template-component ${comp.type}`}>
                    {comp.type === 'text' && '📝'}
                    {comp.type === 'image' && '🖼️'}
                    {comp.type === 'button' && '🔘'}
                  </div>
                ))}
                {template.components.length > 2 && (
                  <div className="more-components">+{template.components.length - 2} more</div>
                )}
              </div>
              <div className="template-meta">
                <h4>{template.name || 'Untitled Template'}</h4>
                <span>{new Date(template.savedAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateBrowser;