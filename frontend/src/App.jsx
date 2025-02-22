import { useState } from 'react'
import "./css/App.css";
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import Favorites from './pages/favorites'
import NavBar from './components/navBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar />
      <main className="main-context">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
