import { useEditor } from '../../contexts/EditorContext'
import TextProperties from './TextProperties'
import ImageProperties from './ImageProperties'
import ButtonProperties from './ButtonProperties'
import DividerProperties from './DividerProperties'
import ColumnsProperties from './ColumnsProperties'

const PropertiesPanel = () => {
  const { selectedComponent, components } = useEditor()
  const component = components.find(comp => comp.id === selectedComponent)

  if (!component) return null

  const renderProperties = () => {
    switch (component.type) {
      case 'text':
        return <TextProperties component={component} />
      case 'image':
        return <ImageProperties component={component} />
      case 'button':
        return <ButtonProperties component={component} />
      case 'divider':
        return <DividerProperties component={component} />
      case 'columns':
        return <ColumnsProperties component={component} />
      default:
        return null
    }
  }

  return (
    <div className="properties-panel">
      <h3>{component.type} Properties</h3>
      {renderProperties()}
    </div>
  )
}

export default PropertiesPanel