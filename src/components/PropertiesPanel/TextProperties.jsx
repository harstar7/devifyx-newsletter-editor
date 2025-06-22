import { useState, useEffect } from 'react'
import { useEditor } from '../../contexts/EditorContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextProperties = ({ component }) => {
  const { updateComponent } = useEditor()
  const [content, setContent] = useState(component.props.content)
  const [fontSize, setFontSize] = useState(component.props.fontSize)
  const [color, setColor] = useState(component.props.color)

  useEffect(() => {
    updateComponent(component.id, { content, fontSize, color })
  }, [content, fontSize, color])

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  }

  return (
    <div className="text-properties">
      <div className="form-group">
        <label>Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div>
      <div className="form-group">
        <label>Font Size</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
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
    </div>
  )
}

export default TextProperties