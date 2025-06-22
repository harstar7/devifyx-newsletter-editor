import { useDrag } from 'react-dnd'
import { COMPONENT_TYPES } from '../../constants'

const DraggableItem = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`palette-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="material-icons">{icon}</span>
      {label}
    </div>
  )
}

const ComponentPalette = () => {
  return (
    <div className="component-palette">
      <h3>Components</h3>
      {COMPONENT_TYPES.map((component) => (
        <DraggableItem
          key={component.type}
          type={component.type}
          label={component.label}
          icon={component.icon}
        />
      ))}
    </div>
  )
}

export default ComponentPalette