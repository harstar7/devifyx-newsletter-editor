import { useState, useCallback } from 'react'

export const useUndoRedo = (initialState) => {
  const [history, setHistory] = useState([initialState])
  const [index, setIndex] = useState(0)
  
  const currentState = history[index]
  
  const pushState = useCallback((newState) => {
    setHistory(prev => [...prev.slice(0, index + 1), newState])
    setIndex(prev => prev + 1)
  }, [index])
  
  const undo = useCallback(() => {
    setIndex(prev => Math.max(0, prev - 1))
  }, [])
  
  const redo = useCallback(() => {
    setIndex(prev => Math.min(history.length - 1, prev + 1))
  }, [history.length])
  
  return [currentState, pushState, undo, redo, index, history.length]
}