import { useState, useEffect } from 'react'
import { useEditor } from '../../contexts/EditorContext'

const ButtonProperties = ({ component }) => {
  const { updateComponent } = useEditor()
  const [text, setText] = useState(component.props.text)
  const [url, setUrl] = useState(component.props.url)
  const [color, setColor] = useState(component.props.color)
  const [bgColor, setBgColor] = useState(component.props.bgColor)

  useEffect(() => {
    updateComponent(component.id, { text, url, color, bgColor })
  }, [text, url, color, bgColor])

  return (
    <div className="button-properties">
      <div className="form-group">
        <label>Button Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Button URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Text Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ButtonProperties