const EmailRenderer = ({ components }) => {
  const renderComponent = (component) => {
    switch (component.type) {
      case 'text':
        return (
          <div
            key={component.id}
            style={{
              fontSize: `${component.props.fontSize}px`,
              color: component.props.color,
              padding: '10px',
            }}
            dangerouslySetInnerHTML={{ __html: component.props.content }}
          />
        )
      case 'image':
        return (
          <img
            key={component.id}
            src={component.props.src}
            alt={component.props.alt}
            style={{ width: component.props.width }}
          />
        )
      case 'button':
        return (
          <a
            key={component.id}
            href={component.props.url}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: component.props.bgColor,
              color: component.props.color,
              textDecoration: 'none',
              margin: '10px',
            }}
          >
            {component.props.text}
          </a>
        )
      case 'divider':
        return (
          <hr
            key={component.id}
            style={{
              border: 'none',
              borderTop: `${component.props.height}px solid ${component.props.color}`,
              margin: '20px 0',
            }}
          />
        )
      case 'columns':
        // Implement columns rendering
        return <div key={component.id}>Columns</div>
      default:
        return null
    }
  }

  return (
    <div className="email-renderer">
      {components.map(component => renderComponent(component))}
    </div>
  )
}

export default EmailRenderer