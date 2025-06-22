import { useState } from 'react'
import { useEditor } from '../../contexts/EditorContext'
import EmailRenderer from './EmailRenderer'

const PreviewPanel = () => {
  const { components } = useEditor()
  const [device, setDevice] = useState('desktop')

  return (
    <div className="preview-panel">
      <div className="device-selector">
        <button
          className={device === 'desktop' ? 'active' : ''}
          onClick={() => setDevice('desktop')}
        >
          Desktop
        </button>
        <button
          className={device === 'tablet' ? 'active' : ''}
          onClick={() => setDevice('tablet')}
        >
          Tablet
        </button>
        <button
          className={device === 'mobile' ? 'active' : ''}
          onClick={() => setDevice('mobile')}
        >
          Mobile
        </button>
      </div>
      <div className={`preview-container ${device}`}>
        <EmailRenderer components={components} />
      </div>
    </div>
  )
}

export default PreviewPanel