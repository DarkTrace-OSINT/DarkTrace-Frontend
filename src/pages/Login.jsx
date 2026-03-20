import logo from '../assets/logo.png'

function Login() {
  const handleGoogleLogin = () => {
    alert('백엔드 연동 후 활성화됩니다')
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#0d1117',
    }}>
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '400px',
        textAlign: 'center',
      }}>
        <img src={logo} alt="DeepRadar" style={{ width: '200px', marginBottom: '24px', objectFit: 'contain' }} />
        <p style={{ color: '#8b949e', fontSize: '14px', marginBottom: '40px' }}>
          다크웹 유출 정보 알림 및 OSINT 수집 시스템
        </p>
        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '14px',
            background: '#ffffff',
            color: '#1f1f1f',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="google" />
          Google로 로그인
        </button>
        <p style={{ color: '#30363d', fontSize: '12px', marginTop: '32px' }}>
          © 2026 DeepRadar. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login
