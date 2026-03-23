import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken, getToken } from '../../api/auth'
import logo from '../../assets/logo.png'

export default function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // 이미 로그인된 경우 대시보드로 이동
    if (getToken()) {
      navigate('/dashboard')
    }

    // 구글 OAuth 콜백 처리 (URL에 code 파라미터 있을 때)
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (code) {
      handleOAuthCallback(code)
    }
  }, [])

  const handleOAuthCallback = async (code) => {
    try {
      const response = await fetch('http://3.38.108.191:8080/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()

      if (data.accessToken) {
        saveToken(data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleGoogleLogin = () => {
    // 백엔드에서 구글 OAuth URL로 리다이렉트
    window.location.href = 'http://3.38.108.191:8080/oauth2/authorization/google'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
      <div style={{ width: '100%', maxWidth: '448px', padding: '32px', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', background: '#18181b' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img src={logo} alt="DeepRadar" style={{ width: '160px', margin: '0 auto' }} />
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', marginBottom: '24px' }}>
          다크웹 유출 여부를 실시간으로 확인하세요
        </p>

        {/* Google Login Button */}
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

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#374151' }} />
          <span style={{ padding: '0 12px', fontSize: '12px', color: '#6b7280' }}>안내</span>
          <div style={{ flex: 1, height: '1px', background: '#374151' }} />
        </div>

        {/* Info */}
        <p style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginBottom: '16px' }}>
          현재 Google 계정으로만 로그인 가능합니다
        </p>

        {/* Security Notice */}
        <div style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', lineHeight: '1.8' }}>
          <p>안전한 OAuth 2.0 인증 사용</p>
          <p>이메일 정보만 사용됩니다</p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#4b5563' }}>
          <a href="#" style={{ color: '#4b5563' }}>이용약관</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <a href="#" style={{ color: '#4b5563' }}>개인정보처리방침</a>
        </div>
      </div>
    </div>
  )
}
