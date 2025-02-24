import { useState } from 'react'
import "./css/App.css";
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import Favorites from './pages/favorites'
import NavBar from './components/NavBar'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <NavBar />
      <main className="main-context">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
