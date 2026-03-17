import { useState } from 'react'

function SystemSettings() {
  const [telegramToken, setTelegramToken] = useState('')
  const [telegramChatId, setTelegramChatId] = useState('')
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState(['gmail.com', 'naver.com', 'kakao.com'])
  const [saved, setSaved] = useState(false)

  const engineStatus = [
    { name: '다크웹 크롤러', status: 'alive' },
    { name: '로그 파서', status: 'alive' },
    { name: 'OSINT 수집기', status: 'dead' },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAddKeyword = () => {
    if (keyword.trim()) {
      setKeywords(prev => [...prev, keyword.trim()])
      setKeyword('')
    }
  }

  const handleRemoveKeyword = (kw) => {
    setKeywords(prev => prev.filter(k => k !== kw))
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>⚙️ 시스템 설정</h1>

      {/* 엔진 상태 */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>🖥️ 엔진 상태</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          {engineStatus.map(engine => (
            <div key={engine.name} style={{
              background: '#0d1117',
              border: `1px solid ${engine.status === 'alive' ? '#52c41a' : '#ff4d4f'}`,
              borderRadius: '8px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '10px', color: engine.status === 'alive' ? '#52c41a' : '#ff4d4f' }}>●</span>
              <span style={{ fontSize: '14px' }}>{engine.name}</span>
              <span style={{ fontSize: '12px', color: engine.status === 'alive' ? '#52c41a' : '#ff4d4f' }}>
                {engine.status === 'alive' ? 'ALIVE' : 'DEAD'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 텔레그램 설정 */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>📱 텔레그램 설정</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>Bot Token</label>
            <input
              value={telegramToken}
              onChange={e => setTelegramToken(e.target.value)}
              placeholder="8700467173:AAE..."
              style={{
                width: '100%', padding: '10px 14px',
                background: '#0d1117', border: '1px solid #30363d',
                borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>Chat ID</label>
            <input
              value={telegramChatId}
              onChange={e => setTelegramChatId(e.target.value)}
              placeholder="8411891432"
              style={{
                width: '100%', padding: '10px 14px',
                background: '#0d1117', border: '1px solid #30363d',
                borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* 탐지 키워드 */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>🔑 탐지 키워드</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="키워드 추가..."
            style={{
              flex: 1, padding: '10px 14px',
              background: '#0d1117', border: '1px solid #30363d',
              borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none',
            }}
          />
          <button onClick={handleAddKeyword} style={{
            background: '#1f6feb', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
          }}>추가</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {keywords.map(kw => (
            <span key={kw} style={{
              background: '#21262d', border: '1px solid #30363d',
              padding: '6px 12px', borderRadius: '20px', fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              {kw}
              <span onClick={() => handleRemoveKeyword(kw)} style={{ cursor: 'pointer', color: '#ff4d4f' }}>×</span>
            </span>
          ))}
        </div>
      </div>

      {/* 저장 버튼 */}
      <button onClick={handleSave} style={{
        background: saved ? '#52c41a' : '#1f6feb',
        color: '#fff', border: 'none',
        padding: '12px 32px', borderRadius: '8px',
        cursor: 'pointer', fontSize: '15px', fontWeight: 'bold',
        transition: 'background 0.3s',
      }}>
        {saved ? '✅ 저장 완료!' : '💾 설정 저장'}
      </button>
    </div>
  )
}

export default SystemSettings
