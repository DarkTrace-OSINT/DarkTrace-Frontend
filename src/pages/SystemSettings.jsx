import { useState } from 'react'

const mockEngines = [
  { siteId: 1, sourceName: 'BreachForums', crawlerStatus: 'ALIVE', lastCrawledAt: '2026-03-18 15:30:00' },
  { siteId: 2, sourceName: 'RaidForums', crawlerStatus: 'ALIVE', lastCrawledAt: '2026-03-18 15:25:00' },
  { siteId: 3, sourceName: 'StealerLog', crawlerStatus: 'DEAD', lastCrawledAt: '2026-03-18 12:00:00' },
]

const mockSettings = {
  settingId: 1,
  telegramBotToken: '',
  telegramChatId: '',
  isAlertActive: true,
  keywords: ['naver.com', 'gmail.com', 'kakao.com'],
}

function SystemSettings() {
  const [telegramBotToken, setTelegramBotToken] = useState(mockSettings.telegramBotToken)
  const [telegramChatId, setTelegramChatId] = useState(mockSettings.telegramChatId)
  const [isAlertActive, setIsAlertActive] = useState(mockSettings.isAlertActive)
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState(mockSettings.keywords)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // PUT /api/v1/system/settings 연동 예정
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
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

      {/* 엔진 상태 (API 6) */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>🖥️ 엔진 상태 모니터링</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {mockEngines.map(engine => (
            <div key={engine.siteId} style={{
              background: '#0d1117',
              border: `1px solid ${engine.crawlerStatus === 'ALIVE' ? '#52c41a' : '#ff4d4f'}`,
              borderRadius: '8px', padding: '16px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: engine.crawlerStatus === 'ALIVE' ? '#52c41a' : '#ff4d4f' }}>●</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{engine.sourceName}</span>
                <span style={{
                  fontSize: '12px',
                  color: engine.crawlerStatus === 'ALIVE' ? '#52c41a' : '#ff4d4f',
                  background: engine.crawlerStatus === 'ALIVE' ? '#52c41a22' : '#ff4d4f22',
                  padding: '2px 8px', borderRadius: '10px',
                }}>{engine.crawlerStatus}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>마지막 수집: {engine.lastCrawledAt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 텔레그램 설정 (API 7) */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>📱 텔레그램 설정</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>Bot Token</label>
            <input
              value={telegramBotToken}
              onChange={e => setTelegramBotToken(e.target.value)}
              placeholder="8700467173:AAE..."
              style={{ width: '100%', padding: '10px 14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>Chat ID</label>
            <input
              value={telegramChatId}
              onChange={e => setTelegramChatId(e.target.value)}
              placeholder="8411891432"
              style={{ width: '100%', padding: '10px 14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '13px', color: '#8b949e' }}>알림 활성화</label>
            <div
              onClick={() => setIsAlertActive(!isAlertActive)}
              style={{
                width: '48px', height: '26px', borderRadius: '13px',
                background: isAlertActive ? '#52c41a' : '#30363d',
                cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
              }}
            >
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                position: 'absolute', top: '3px',
                left: isAlertActive ? '25px' : '3px',
                transition: 'left 0.3s',
              }} />
            </div>
            <span style={{ fontSize: '13px', color: isAlertActive ? '#52c41a' : '#8b949e' }}>
              {isAlertActive ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      {/* 탐지 키워드 (API 7) */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>🔑 탐지 키워드</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddKeyword()}
            placeholder="키워드 추가... (Enter 또는 추가 버튼)"
            style={{ flex: 1, padding: '10px 14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
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
