import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Dashboard from './pages/Dashboard'
import ThreatSearch from './pages/ThreatSearch'
import SystemSettings from './pages/SystemSettings'
import Login from './pages/Login'
import logo from './assets/logo.png'
import './styles/App.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/*" element={
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
          } />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
