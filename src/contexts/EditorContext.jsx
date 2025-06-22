import React, { createContext, useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

const EditorContext = createContext()

const initialState = {
  components: [],
  selectedComponent: null,
  history: [[]],
  historyIndex: 0,
  previewDevice: 'desktop', // 'desktop' | 'tablet' | 'mobile'

}

const editorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      const newComponent = {
        id: uuidv4(),
        type: action.payload.type,
        props: getDefaultProps(action.payload.type),
      }
      return {
        ...state,
        components: [...state.components, newComponent],
      }

    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedComponent: action.payload.id,
      }

    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map(comp =>
          comp.id === action.payload.id
            ? { ...comp, props: { ...comp.props, ...action.payload.updates } }
            : comp
        ),
      }

    case 'DELETE_COMPONENT':
      return {
        ...state,
        components: state.components.filter(comp => comp.id !== action.payload.id),
        selectedComponent: null,
      }

    case 'MOVE_COMPONENT':
      const { fromIndex, toIndex } = action.payload
      const newComponents = [...state.components]
      const [movedItem] = newComponents.splice(fromIndex, 1)
      newComponents.splice(toIndex, 0, movedItem)
      return {
        ...state,
        components: newComponents,
      }

    case 'SAVE_HISTORY':
      return {
        ...state,
        history: [...state.history.slice(0, state.historyIndex + 1), state.components],
        historyIndex: state.historyIndex + 1,
      }

    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          components: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        }
      }
      return state

    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          components: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        }
      }
      return state

    case 'LOAD_TEMPLATE':
      return {
        ...state,
        components: action.payload.components,
        selectedComponent: null,
        history: [action.payload.components],
        historyIndex: 0,
      }

    default:
      return state
  }
}

const getDefaultProps = (type) => {
  switch (type) {
    case 'text':
      return { content: 'Edit this text', fontSize: 16, color: '#000000' }
    case 'image':
      return { src: '', alt: '', width: '100%' }
    case 'button':
      return { text: 'Click me', url: '#', color: '#2563eb', bgColor: '#ffffff' }
    case 'divider':
      return { color: '#e5e7eb', height: 1 }
    case 'columns':
      return { count: 2, children: [] }
      case 'SET_PREVIEW_DEVICE':
  return {
    ...state,
    previewDevice: action.payload
  };
    default:
      return {}
  }
}

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const value = {
    ...state,
    setPreviewDevice: (device) => dispatch({ type: 'SET_PREVIEW_DEVICE', payload: device }),
    addComponent: (type) => {dispatch({ type: 'ADD_COMPONENT', payload: { type } });  dispatch({ type: 'SAVE_HISTORY' })},
    selectComponent: (id) => dispatch({ type: 'SELECT_COMPONENT', payload: { id } }),
    updateComponent: (id, updates) => {dispatch({ type: 'UPDATE_COMPONENT', payload: { id, updates } });  dispatch({ type: 'SAVE_HISTORY' })},
    deleteComponent: (id) => {dispatch({ type: 'DELETE_COMPONENT', payload: { id } }); dispatch({ type: 'SAVE_HISTORY' })},
    moveComponent: (fromIndex, toIndex) => {dispatch({ type: 'MOVE_COMPONENT', payload: { fromIndex, toIndex } }); dispatch({ type: 'SAVE_HISTORY' })},
    saveHistory: () => dispatch({ type: 'SAVE_HISTORY' }),
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    loadTemplate: (components) => {dispatch({ type: 'LOAD_TEMPLATE', payload: { components } });  dispatch({ type: 'SAVE_HISTORY' })} // ✅ Added
    
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}
