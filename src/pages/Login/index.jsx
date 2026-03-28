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
    <div style={{ 
      minHeight: '100vh', 
      background: '#09090b', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#ffffff',
      fontFamily: 'Pretendard, -apple-system, sans-serif'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '40px 32px', 
        borderRadius: '24px', 
        background: '#18181b', 
        border: '1px solid #27272a',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' 
      }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <img src={logo} alt="DeepRadar" style={{ width: '160px', margin: '0 auto' }} />
        </div>

        {/* Description */}
        <p style={{ fontSize: '15px', color: '#a1a1aa', textAlign: 'center', marginBottom: '32px', lineHeight: '1.5' }}>
          다크웹 유출 여부를 실시간으로 확인하세요
        </p>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            height: '52px',
            background: '#ffffff',
            color: '#000000',
            fontWeight: '600',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f4f4f5'}
          onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" style={{ width: '20px', height: '20px' }} />
          Google로 시작하기
        </button>
        
        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: '#27272a' }}></div>
          <span style={{ fontSize: '12px', color: '#52525b', fontWeight: '500' }}>안내</span>
          <div style={{ flex: 1, height: '1px', background: '#27272a' }}></div>
        </div>

        {/* Info */}
        <p style={{ fontSize: '13px', color: '#71717a', textAlign: 'center', marginBottom: '24px' }}>
          현재 Google 계정으로만 로그인 가능합니다
        </p>

        {/* Security Notice */}
        <div style={{ 
          background: '#27272a44', 
          padding: '16px', 
          borderRadius: '12px', 
          marginBottom: '32px',
          fontSize: '13px',
          color: '#a1a1aa',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span> 안전한 OAuth 2.0 인증 사용
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span> 이메일 정보만 사용됩니다
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '12px', 
          fontSize: '12px', 
          color: '#52525b' 
        }}>
          <span style={{ cursor: 'pointer' }}>이용약관</span>
          <span style={{ fontSize: '10px' }}>|</span>
          <span style={{ cursor: 'pointer' }}>개인정보처리방침</span>
        </div>
      </div>
    </div>
  )
}