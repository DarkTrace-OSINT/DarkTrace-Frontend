import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../api/auth'
import logo from '../../assets/logo.png'

export default function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (getToken()) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleGoogleLogin = () => {
    window.location.href = 'https://unpercipient-woodrow-nonrecurent.ngrok-free.dev/oauth2/authorization/google'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
      <div style={{ width: '100%', maxWidth: '448px', padding: '32px', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', background: '#18181b' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img src={logo} alt="DeepRadar" style={{ width: '160px', margin: '0 auto' }} />
        </div>
        <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', marginBottom: '24px' }}>
          다크웹 유출 여부를 실시간으로 확인하세요
        </p>
        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%', height: '48px', background: '#ffffff',
            color: '#000000', fontWeight: '600', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', border: 'none', cursor: 'pointer', fontSize: '15px',
          }}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" style={{ width: '20px', height: '20px' }} />
          Google로 시작하기
        </button>
      </div>
    </div>
  )
}