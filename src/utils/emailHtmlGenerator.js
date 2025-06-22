export const generateEmailHtml = (components) => {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  
  const renderComponent = (component) => {
    switch (component.type) {
      case 'text':
        return `
          <div style="font-size: ${component.props.fontSize}px; color: ${component.props.color}; padding: 10px;">
            ${component.props.content}
          </div>
        `
      case 'image':
        return `
          <img src="${component.props.src}" alt="${component.props.alt}" style="width: ${component.props.width}; max-width: 100%;" />
        `
      case 'button':
        return `
          <a href="${component.props.url}" style="display: inline-block; padding: 10px 20px; background-color: ${component.props.bgColor}; color: ${component.props.color}; text-decoration: none; margin: 10px;">
            ${component.props.text}
          </a>
        `
      case 'divider':
        return `
          <hr style="border: none; border-top: ${component.props.height}px solid ${component.props.color}; margin: 20px 0;" />
        `
      case 'columns':
        // Implement columns HTML
        return '<div>Columns</div>'
      default:
        return ''
    }
  }

  const bodyContent = components.map(comp => renderComponent(comp)).join('')

  const html = `
    ${doctype}
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Newsletter</title>
      <style type="text/css">
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
        img { max-width: 100%; height: auto; }
        .email-container { max-width: 600px; margin: 0 auto; }
      </style>
    </head>
    <body>
      <div class="email-container">
        ${bodyContent}
      </div>
    </body>
    </html>
  `

  return html
}