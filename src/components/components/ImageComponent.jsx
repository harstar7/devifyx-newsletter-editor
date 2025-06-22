import { useDrag, useDrop } from 'react-dnd'
import { useEditor } from '../../contexts/EditorContext'

const ImageComponent = ({ id, props, index }) => {
  const { src, alt, width } = props
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateComponent(id, { src: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`component image-component ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(id)
      }}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width }} />
      ) : (
        <div className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <p>Upload an image</p>
        </div>
      )}
    </div>
  )
}

export default ImageComponent