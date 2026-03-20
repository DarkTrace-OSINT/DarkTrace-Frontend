import logo from '../../assets/logo.png'

export default function LoginPage() {
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
          onClick={() => alert('백엔드 연동 후 활성화됩니다')}
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
