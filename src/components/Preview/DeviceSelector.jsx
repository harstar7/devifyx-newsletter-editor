import { useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';

const DeviceSelector = () => {
  const [device, setDevice] = useState('desktop');
  const { setPreviewDevice } = useEditor();

  const handleDeviceChange = (newDevice) => {
    setDevice(newDevice);
    setPreviewDevice(newDevice);
  };

  return (
    <div className="device-selector">
      <button
        className={`device-button ${device === 'desktop' ? 'active' : ''}`}
        onClick={() => handleDeviceChange('desktop')}
        aria-label="Desktop view"
      >
        <span className="device-icon">💻</span>
        <span className="device-label">Desktop</span>
      </button>
      
      <button
        className={`device-button ${device === 'tablet' ? 'active' : ''}`}
        onClick={() => handleDeviceChange('tablet')}
        aria-label="Tablet view"
      >
        <span className="device-icon">📱</span>
        <span className="device-label">Tablet</span>
      </button>
      
      <button
        className={`device-button ${device === 'mobile' ? 'active' : ''}`}
        onClick={() => handleDeviceChange('mobile')}
        aria-label="Mobile view"
      >
        <span className="device-icon">📲</span>
        <span className="device-label">Mobile</span>
      </button>
    </div>
  );
};

export default DeviceSelector;