import { useState, useEffect } from 'react'
import { useEditor } from '../../contexts/EditorContext'

const ColumnsProperties = ({ component }) => {
  const { updateComponent } = useEditor()
  const [count, setCount] = useState(component.props.count)

  useEffect(() => {
    updateComponent(component.id, { count })
  }, [count])

  return (
    <div className="columns-properties">
      <div className="form-group">
        <label>Number of Columns</label>
        <select
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ColumnsProperties