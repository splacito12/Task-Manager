import { useState } from 'react'
import Board from './components/Board'

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Task Management Board</h1>
      </header>
      <Board />
    </div>
  )
}

export default App
