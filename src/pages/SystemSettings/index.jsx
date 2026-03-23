import { useState, useEffect } from 'react'
import StatusBadge from '../../components/StatusBadge'
import Toggle from '../../components/Toggle'
import Tag from '../../components/Tag'
import { getEngineStatus, updateSystemSettings } from '../../api/system'

function SystemSettings() {
  const [engines, setEngines] = useState([])
  const [telegramBotToken, setTelegramBotToken] = useState('')
  const [telegramChatId, setTelegramChatId] = useState('')
  const [isAlertActive, setIsAlertActive] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState([])
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEngines = async () => {
      try {
        const response = await getEngineStatus()
        setEngines(response.data?.engines || [])
      } catch (error) {
        console.error('엔진 상태 로딩 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEngines()
  }, [])

  const handleSave = async () => {
    try {
      await updateSystemSettings({
        telegramBotToken,
        telegramChatId,
        keywords,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('설정 저장 실패:', error)
    }
  }

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords(prev => [...prev, keyword.trim()])
      setKeyword('')
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>시스템 설정</h1>

      {/* 엔진 상태 (API 6) */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>엔진 상태 모니터링</h3>
        {loading ? (
          <div style={{ color: '#8b949e' }}>로딩 중...</div>
        ) : engines.length === 0 ? (
          <div style={{ color: '#8b949e' }}>엔진 데이터 없음</div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {engines.map(engine => (
              <div key={engine.siteId} style={{
                background: '#0d1117',
                border: `1px solid ${engine.crawlerStatus === 'ALIVE' ? '#52c41a' : '#ff4d4f'}`,
                borderRadius: '8px', padding: '16px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{engine.sourceName}</span>
                  <StatusBadge status={engine.crawlerStatus} />
                </div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>마지막 수집: {engine.lastCrawledAt || '-'}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 텔레그램 설정 (API 7) */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>텔레그램 설정</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>Bot Token</label>
            <input
              type="password"
              value={telegramBotToken}
              onChange={e => setTelegramBotToken(e.target.value)}
              placeholder="텔레그램 Bot Token"
              style={{ width: '100%', padding: '10px 14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>Chat ID</label>
            <input
              type="password"
              value={telegramChatId}
              onChange={e => setTelegramChatId(e.target.value)}
              placeholder="텔레그램 Chat ID"
              style={{ width: '100%', padding: '10px 14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '13px', color: '#8b949e' }}>알림 활성화</label>
            <Toggle value={isAlertActive} onChange={setIsAlertActive} />
          </div>
        </div>
      </div>

      {/* 탐지 키워드 (API 7) */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>탐지 키워드</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddKeyword()}
            placeholder="키워드 추가... (Enter 또는 추가 버튼)"
            style={{ flex: 1, padding: '10px 14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={handleAddKeyword} style={{ background: '#1f6feb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>추가</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {keywords.map(kw => (
            <Tag key={kw} label={kw} onRemove={(kw) => setKeywords(prev => prev.filter(k => k !== kw))} />
          ))}
        </div>
      </div>

      <button onClick={handleSave} style={{
        background: saved ? '#52c41a' : '#1f6feb',
        color: '#fff', border: 'none',
        padding: '12px 32px', borderRadius: '8px',
        cursor: 'pointer', fontSize: '15px', fontWeight: 'bold',
        transition: 'background 0.3s',
      }}>
        {saved ? '저장 완료!' : '설정 저장'}
      </button>
    </div>
  )
}

export default SystemSettings
