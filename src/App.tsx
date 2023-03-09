import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import News from './pages/News'
import Error from './pages/Error'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/news/:id" element={<div>News detail</div>} />
        <Route path="/error" element={<Error/>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </div>
  )
}

export default App
