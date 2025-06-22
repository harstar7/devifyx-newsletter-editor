import ComponentPalette from './Builder/ComponentPalette'
import Canvas from './Builder/Canvas'
import PropertiesPanel from './PropertiesPanel/PropertiesPanel'
import PreviewPanel from './Preview/PreviewPanel'
import Toolbar from './Builder/Toolbar'
import { useEditor } from '../contexts/EditorContext'

const EditorLayout = () => {
  const { selectedComponent } = useEditor()

  return (
    <div className="app-container">
      {/* Editor Section (grows with content) */}
      <div className="editor-area">
        <Toolbar />
        <div className="editor-content">
          <ComponentPalette />
          <Canvas />
          {selectedComponent && <PropertiesPanel />}
        </div>
      </div>

      {/* Preview Section (fixed height) */}
      <div className="preview-area">
        <PreviewPanel />
      </div>
    </div>
  )
}

export default EditorLayout