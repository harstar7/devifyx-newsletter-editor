import { useDrag, useDrop } from 'react-dnd'
import { useEditor } from '../../contexts/EditorContext'

const ButtonComponent = ({ id, props, index }) => {
  const { text, url, color, bgColor } = props
  const { selectComponent, updateComponent, moveComponent } = useEditor()

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
      className={`component button-component ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(id)
      }}
    >
      <a
        href={url}
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: bgColor,
          color: color,
          textDecoration: 'none',
        }}
      >
        {text}
      </a>
    </div>
  )
}

export default ButtonComponent