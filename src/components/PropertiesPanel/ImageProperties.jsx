import { useState, useEffect } from 'react'
import { useEditor } from '../../contexts/EditorContext'

const ImageProperties = ({ component }) => {
  const { updateComponent } = useEditor()
  const [src, setSrc] = useState(component.props.src)
  const [alt, setAlt] = useState(component.props.alt)
  const [width, setWidth] = useState(component.props.width)

  useEffect(() => {
    updateComponent(component.id, { src, alt, width })
  }, [src, alt, width])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSrc(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-properties">
      <div className="form-group">
        <label>Image Source</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {src && (
          <div className="image-preview">
            <img src={src} alt="Preview" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Width</label>
        <select
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        >
          <option value="100%">Full Width</option>
          <option value="75%">75% Width</option>
          <option value="50%">50% Width</option>
          <option value="25%">25% Width</option>
        </select>
      </div>
    </div>
  )
}

export default ImageProperties