import { useDrag, useDrop } from 'react-dnd'
import { useEditor } from '../../contexts/EditorContext'


const TextComponent = ({ id, props, index }) => {
  const { content, fontSize, color } = props
  const { selectComponent, moveComponent } = useEditor()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'COMPONENT_ITEM',
    hover: (item) => {
      if (item.id !== id) {
        moveComponent(item.index, index)
        item.index = index
      }
    },
  }))

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`component text-component ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(id)
      }}
      style={{ fontSize: `${fontSize}px`, color }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ width: '100%', minHeight: '100px' }}
      />
    </div>
  )
}

export default TextComponent
