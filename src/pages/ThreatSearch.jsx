import { useState } from 'react'

const mockData = [
  { id: 1, email: 'user1@gmail.com', source: 'BreachForums', severity: 'high', status: '미조치', date: '2026-03-17' },
  { id: 2, email: 'user2@naver.com', source: 'RaidForums', severity: 'medium', status: '미조치', date: '2026-03-17' },
  { id: 3, email: 'user3@kakao.com', source: 'Telegram', severity: 'low', status: '조치완료', date: '2026-03-16' },
  { id: 4, email: 'user4@gmail.com', source: 'BreachForums', severity: 'high', status: '미조치', date: '2026-03-16' },
  { id: 5, email: 'user5@naver.com', source: 'RaidForums', severity: 'medium', status: '조치완료', date: '2026-03-15' },
]

const severityColor = { high: '#ff4d4f', medium: '#fa8c16', low: '#52c41a' }

function ThreatSearch() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState(mockData)

  const filtered = data.filter(item =>
    item.email.includes(search) || item.source.includes(search)
  )

  const handleAction = (id) => {
    setData(prev => prev.map(item =>
      item.id === id ? { ...item, status: '조치완료' } : item
    ))
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>🔍 위협 검색 및 대응</h1>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="이메일 또는 사이트 검색..."
        style={{
          width: '100%',
          padding: '12px 16px',
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          color: '#e6edf3',
          fontSize: '14px',
          marginBottom: '24px',
          outline: 'none',
        }}
      />

      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {['이메일', '출처', '심각도', '탐지일', '상태', '조치'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#8b949e', fontSize: '13px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #21262d' }}>
                <td style={{ padding: '14px 16px', fontSize: '14px' }}>{item.email}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#8b949e' }}>{item.source}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    background: severityColor[item.severity] + '22',
                    color: severityColor[item.severity],
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                  }}>{item.severity.toUpperCase()}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#8b949e' }}>{item.date}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    color: item.status === '조치완료' ? '#52c41a' : '#fa8c16',
                    fontSize: '13px',
                  }}>{item.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  {item.status === '미조치' && (
                    <button onClick={() => handleAction(item.id)} style={{
                      background: '#1f6feb',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}>조치</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ThreatSearch
