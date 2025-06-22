import { useState, useEffect } from 'react'
import { useEditor } from '../../contexts/EditorContext'

const DividerProperties = ({ component }) => {
  const { updateComponent } = useEditor()
  const [color, setColor] = useState(component.props.color)
  const [height, setHeight] = useState(component.props.height)

  useEffect(() => {
    updateComponent(component.id, { color, height })
  }, [color, height])

  return (
    <div className="divider-properties">
      <div className="form-group">
        <label>Divider Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Divider Height (px)</label>
        <input
          type="number"
          value={height}
          min="1"
          max="10"
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}

export default DividerProperties