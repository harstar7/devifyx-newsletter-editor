import { useDrag, useDrop } from 'react-dnd'
import { useEditor } from '../../contexts/EditorContext'

const DividerComponent = ({ id, props, index }) => {
  const { color, height } = props
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
      className={`component divider-component ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(id)
      }}
    >
      <hr style={{ border: 'none', borderTop: `${height}px solid ${color}` }} />
    </div>
  )
}

export default DividerComponent