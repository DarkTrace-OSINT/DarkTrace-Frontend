import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ThreatSearch from './pages/ThreatSearch'
import SystemSettings from './pages/SystemSettings'
import Login from './pages/Login'
import { getToken, saveToken } from './api/auth'
import logo from './assets/logo.png'
import './styles/App.css'

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />
}

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      saveToken(token)
      window.history.replaceState({}, document.title, '/dashboard')
    }
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/*" element={
          <PrivateRoute>
            <div className="app">
              <nav className="sidebar">
                <div className="logo">
                  <img src={logo} alt="DeepRadar" style={{ width: '100px', objectFit: 'contain' }} />
                </div>
                <NavLink to="/dashboard" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>대시보드</NavLink>
                <NavLink to="/search" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>위협 검색</NavLink>
                <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>시스템 설정</NavLink>
              </nav>
              <main className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/search" element={<ThreatSearch />} />
                  <Route path="/settings" element={<SystemSettings />} />
                </Routes>
              </main>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App