import { useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { saveTemplate, loadAllTemplates, deleteTemplate } from '../../utils/storage';
import { generateEmailHtml } from '../../utils/emailHtmlGenerator';
import TemplateBrowser from './TemplateBrowser'; // New component

const Toolbar = () => {
  const { components, saveHistory, undo, redo, loadTemplate } = useEditor();
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleSave = () => {
    const name = prompt('Enter template name:', `My Template ${new Date().toLocaleDateString()}`);
    if (name) {
      saveTemplate(components, name);
      saveHistory();
      alert(`Template "${name}" saved!`);
    }
  };

  const handleLoad = (template) => {
    if (template && confirm(`Load "${template.name}"? This will replace your current design.`)) {
      loadTemplate(template.components);
      setShowTemplates(false);
    }
  };

  const handleDelete = (templateId, e) => {
    e.stopPropagation();
    if (confirm('Permanently delete this template?')) {
      deleteTemplate(templateId);
      alert('Template deleted');
    }
  };

  const handleExport = () => {
    const html = generateEmailHtml(components);
    
    // Create downloadable file
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="toolbar">
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      
      <div className="template-actions">
        <button onClick={handleSave}>Save</button>
        
        <button onClick={() => setShowTemplates(!showTemplates)}>
          {showTemplates ? 'Hide Templates' : 'Load Template'}
        </button>
        
        {showTemplates && (
          <div className="template-browser-container">
            <TemplateBrowser 
              onSelect={handleLoad}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      <button onClick={handleExport}>Export HTML</button>
    </div>
  );
};

export default Toolbar;