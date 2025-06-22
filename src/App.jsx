import { EditorProvider } from './contexts/EditorContext'
import { ThemeProvider } from './contexts/ThemeContext'
import EditorLayout from './components/EditorLayout'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <EditorProvider>
        <div className="app-container">
          <EditorLayout />
        </div>
      </EditorProvider>
    </ThemeProvider>
  )
}

export default App