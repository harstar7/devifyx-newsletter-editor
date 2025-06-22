import { useDrag, useDrop } from 'react-dnd'
import { useEditor } from '../../contexts/EditorContext'

const ColumnsComponent = ({ id, props, index }) => {
  const { count } = props
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

  const columnStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${count}, 1fr)`,
    gap: '10px',
    padding: '10px',
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`component columns-component ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(id)
      }}
    >
      <div style={columnStyle}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ border: '1px dashed #ccc', minHeight: '50px' }}>
            Column {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColumnsComponent