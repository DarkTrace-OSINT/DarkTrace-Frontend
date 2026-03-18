import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ThreatSearch from './pages/ThreatSearch'
import SystemSettings from './pages/SystemSettings'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 (사이드바 없음) */}
        <Route path="/login" element={<Login />} />

        {/* 메인 페이지들 (사이드바 있음) */}
        <Route path="/*" element={
          <div className="app">
            <nav className="sidebar">
              <div className="logo">🛡️ DarkTrace</div>
              <NavLink to="/" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>📊 대시보드</NavLink>
              <NavLink to="/search" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>🔍 위협 검색</NavLink>
              <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>⚙️ 시스템 설정</NavLink>
            </nav>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/search" element={<ThreatSearch />} />
                <Route path="/settings" element={<SystemSettings />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App