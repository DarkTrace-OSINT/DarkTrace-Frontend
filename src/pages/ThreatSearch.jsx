import { useState } from 'react'

const mockData = [
  { indicatorId: 1, indicatorValue: 'user1@gmail.com', indicatorType: 'EMAIL', sourceName: 'BreachForums', actionStatus: 'OPEN', parsedId: 101, date: '2026-03-17', leakTitle: 'Gmail 계정 대량 유출 2026' },
  { indicatorId: 2, indicatorValue: 'user2@naver.com', indicatorType: 'EMAIL', sourceName: 'RaidForums', actionStatus: 'OPEN', parsedId: 102, date: '2026-03-17', leakTitle: '네이버 로그인 정보 유출' },
  { indicatorId: 3, indicatorValue: 'user3@kakao.com', indicatorType: 'EMAIL', sourceName: 'Telegram', actionStatus: 'RESOLVED', parsedId: 103, date: '2026-03-16', leakTitle: '카카오 계정 유출 건' },
  { indicatorId: 4, indicatorValue: 'admin@samsung.com', indicatorType: 'EMAIL', sourceName: 'BreachForums', actionStatus: 'OPEN', parsedId: 104, date: '2026-03-16', leakTitle: '삼성 임직원 계정 유출' },
  { indicatorId: 5, indicatorValue: 'user5@naver.com', indicatorType: 'ID', sourceName: 'RaidForums', actionStatus: 'RESOLVED', parsedId: 105, date: '2026-03-15', leakTitle: '네이버 ID 리스트 유출' },
]

function ThreatSearch() {
  const [search, setSearch] = useState('')
  const [indicatorType, setIndicatorType] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [data, setData] = useState(mockData)
  const [modal, setModal] = useState(null)
  const [actionNote, setActionNote] = useState('')

  const filtered = data.filter(item => {
    const matchSearch = item.indicatorValue.includes(search) || item.sourceName.includes(search) || item.leakTitle.includes(search)
    const matchType = indicatorType === 'ALL' || item.indicatorType === indicatorType
    const matchStatus = statusFilter === 'ALL' || item.actionStatus === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const handleActionConfirm = () => {
    setData(prev => prev.map(item =>
      item.parsedId === modal.parsedId ? { ...item, actionStatus: 'RESOLVED', actionNote } : item
    ))
    setModal(null)
    setActionNote('')
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>🔍 위협 검색 및 대응</h1>

      {/* 검색 필터 */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="이메일, 사이트, 유출 제목 검색..."
          style={{
            flex: 1, padding: '12px 16px',
            background: '#161b22', border: '1px solid #30363d',
            borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none',
          }}
        />
        <select value={indicatorType} onChange={e => setIndicatorType(e.target.value)}
          style={{ padding: '12px 16px', background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}>
          <option value="ALL">전체 유형</option>
          <option value="EMAIL">EMAIL</option>
          <option value="ID">ID</option>
          <option value="PW">PW</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '12px 16px', background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}>
          <option value="ALL">전체 상태</option>
          <option value="OPEN">OPEN</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>

      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {['유출 제목', '유출값', '유형', '출처', '탐지일', '상태', '조치'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#8b949e', fontSize: '13px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.indicatorId} style={{ borderBottom: '1px solid #21262d' }}>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#58a6ff', maxWidth: '200px' }}>{item.leakTitle}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px' }}>{item.indicatorValue}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: '#1f6feb22', color: '#58a6ff', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{item.indicatorType}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#8b949e' }}>{item.sourceName}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#8b949e' }}>{item.date}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ color: item.actionStatus === 'RESOLVED' ? '#52c41a' : '#fa8c16', fontSize: '13px', fontWeight: 'bold' }}>{item.actionStatus}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  {item.actionStatus === 'OPEN' && (
                    <button onClick={() => setModal(item)} style={{
                      background: '#1f6feb', color: '#fff', border: 'none',
                      padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
                    }}>조치</button>
                  )}
                  {item.actionStatus === 'RESOLVED' && item.actionNote && (
                    <span style={{ fontSize: '12px', color: '#8b949e' }}>📝 {item.actionNote}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
        {[1, 2, 3, 4, 5].map(page => (
          <button key={page} style={{
            padding: '8px 14px', borderRadius: '6px',
            background: page === 1 ? '#1f6feb' : '#161b22',
            color: '#e6edf3', border: '1px solid #30363d', cursor: 'pointer',
          }}>{page}</button>
        ))}
      </div>

      {/* 조치 메모 팝업 */}
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#161b22', border: '1px solid #30363d',
            borderRadius: '12px', padding: '32px', width: '480px',
          }}>
            <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>⚠️ 위협 조치</h3>
            <p style={{ color: '#58a6ff', fontSize: '13px', marginBottom: '4px' }}>{modal.leakTitle}</p>
            <p style={{ color: '#8b949e', fontSize: '14px', marginBottom: '24px' }}>
              {modal.indicatorValue} ({modal.sourceName})
            </p>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '8px' }}>조치 메모</label>
            <textarea
              value={actionNote}
              onChange={e => setActionNote(e.target.value)}
              placeholder="예: 비밀번호 초기화 완료, 계정 잠금 처리 등"
              rows={4}
              style={{
                width: '100%', padding: '12px', background: '#0d1117',
                border: '1px solid #30363d', borderRadius: '8px',
                color: '#e6edf3', fontSize: '14px', outline: 'none', resize: 'none',
                marginBottom: '20px',
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => { setModal(null); setActionNote('') }} style={{
                background: '#21262d', color: '#e6edf3', border: '1px solid #30363d',
                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
              }}>취소</button>
              <button onClick={handleActionConfirm} style={{
                background: '#52c41a', color: '#fff', border: 'none',
                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold',
              }}>조치 완료</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThreatSearch
