import { useDrop } from 'react-dnd'
import { useEditor } from '../../contexts/EditorContext'
import TextComponent from '../components/TextComponent'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import DividerComponent from '../components/DividerComponent'
import ColumnsComponent from '../components/ColumnsComponent'

const Canvas = () => {
  const { components, addComponent, selectComponent, moveComponent } = useEditor()

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item) => addComponent(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const renderComponent = (component, index) => {
    switch (component.type) {
      case 'text':
        return <TextComponent key={component.id} {...component} index={index} />
      case 'image':
        return <ImageComponent key={component.id} {...component} index={index} />
      case 'button':
        return <ButtonComponent key={component.id} {...component} index={index} />
      case 'divider':
        return <DividerComponent key={component.id} {...component} index={index} />
      case 'columns':
        return <ColumnsComponent key={component.id} {...component} index={index} />
      default:
        return null
    }
  }

  return (
    <div
      ref={drop}
      className={`canvas ${isOver ? 'active-drop' : ''}`}
      onClick={() => selectComponent(null)}
    >
      {components.length === 0 && (
        <div className="empty-canvas">
          <p>Drag components here to start building</p>
        </div>
      )}
      {components.map((component, index) => renderComponent(component, index))}
    </div>
  )
}

export default Canvas