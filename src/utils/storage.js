// Enhanced storage.js with template management utilities
export const TEMPLATE_STORAGE_KEY = 'newsletterTemplates';
export const CURRENT_TEMPLATE_VERSION = '1.1';

// Enhanced save function with duplicate prevention
export const saveTemplate = (components, name = 'Untitled Template', options = {}) => {
  try {
    const templates = loadAllTemplates();
    const now = new Date().toISOString();
    
    const template = {
      id: options.id || Date.now().toString(),
      name: name.trim() || `Template ${templates.length + 1}`,
      components: deepCloneComponents(components), // Prevent reference issues
      version: CURRENT_TEMPLATE_VERSION,
      savedAt: now,
      updatedAt: now,
      ...options.metadata // Allow additional custom data
    };

    // Prevent duplicate names
    const nameExists = templates.some(t => 
      t.name.toLowerCase() === template.name.toLowerCase() && 
      t.id !== template.id
    );
    
    if (nameExists && !options.force) {
      throw new Error(`Template name "${template.name}" already exists`);
    }

    // Update existing or add new
    const updatedTemplates = [
      template,
      ...templates.filter(t => t.id !== template.id)
    ].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(updatedTemplates));
    return template;
  } catch (error) {
    console.error('Template save failed:', error);
    throw error; // Re-throw for error handling in UI
  }
};

// Deep clone components to prevent reference issues
const deepCloneComponents = (components) => {
  return JSON.parse(JSON.stringify(components));
};

// Enhanced loader with validation
export const loadAllTemplates = () => {
  try {
    const templates = JSON.parse(localStorage.getItem(TEMPLATE_STORAGE_KEY) || '[]');
    
    return templates.map(t => ({
      // Default values for missing fields
      id: t.id || Date.now().toString(),
      name: t.name || 'Unnamed Template',
      components: t.components || [],
      version: t.version || '1.0',
      savedAt: t.savedAt || new Date().toISOString(),
      updatedAt: t.updatedAt || t.savedAt || new Date().toISOString(),
      ...(t.metadata || {}) // Preserve any metadata
    }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error('Template load failed:', error);
    return [];
  }
};

// Safer delete with backup
export const deleteTemplate = (id) => {
  try {
    const templates = loadAllTemplates();
    const toDelete = templates.find(t => t.id === id);
    
    if (!toDelete) return false;

    // Create backup (optional)
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem(
        `template_backup_${id}_${Date.now()}`,
        JSON.stringify(toDelete)
      );
    }

    const updatedTemplates = templates.filter(t => t.id !== id);
    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(updatedTemplates));
    return true;
  } catch (error) {
    console.error('Template deletion failed:', error);
    return false;
  }
};

// Additional utility functions
export const getTemplateById = (id) => {
  return loadAllTemplates().find(t => t.id === id);
};

export const duplicateTemplate = (id, newName = '') => {
  const template = getTemplateById(id);
  if (!template) return null;
  
  return saveTemplate(
    template.components,
    newName || `${template.name} (Copy)`,
    { 
      metadata: template.metadata 
    }
  );
};

// Migration from old single-template format
export const migrateLegacyTemplates = () => {
  try {
    const legacy = localStorage.getItem('newsletterTemplate');
    if (legacy) {
      saveTemplate(
        JSON.parse(legacy),
        'Legacy Template',
        { id: 'legacy_template' }
      );
      localStorage.removeItem('newsletterTemplate');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

// Initialize with migration
migrateLegacyTemplates();