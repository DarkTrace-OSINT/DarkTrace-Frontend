import { useState, useEffect } from 'react'
import StatusBadge from '../../components/StatusBadge'
import { searchThreats, updateThreatAction } from '../../api/threats'

function ThreatSearch() {
  const [search, setSearch] = useState('')
  const [indicatorType, setIndicatorType] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [actionNote, setActionNote] = useState('')

  const fetchData = async (page = 0, showLoading = true) => {
    try {
      if (showLoading) setLoading(true)
      const params = {
        page,
        size: 10,
        ...(search && { keyword: search }),
        ...(indicatorType !== 'ALL' && { indicatorType }),
        ...(statusFilter !== 'ALL' && { actionStatus: statusFilter }),
      }
      const response = await searchThreats(params)
      setData(response.data?.content || [])
      setTotalPages(response.data?.totalPages || 0)
    } catch (error) {
      console.error('위협 데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {
    setCurrentPage(0)
    fetchData(0)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchData(page, false)
  }

  const openModal = (item) => {
    console.log('모달 원본 item:', item)
    setModal(item)
  }

  const handleActionConfirm = async () => {
    try {
      console.log('modal 전체:', modal)
      console.log('parsedId:', modal?.parsedId)
      await updateThreatAction({
        parsedId: modal.indicatorId,
        adminId: 1,
        actionStatus: 'RESOLVED',
        actionNote,
      })
      await fetchData(currentPage)
      setModal(null)
      setActionNote('')
    } catch (error) {
      console.error('조치 처리 실패:', error)
    }
  }

  const pageGroupSize = 10
  const currentGroup = Math.floor(currentPage / pageGroupSize)
  const startPage = currentGroup * pageGroupSize
  const endPage = Math.min(startPage + pageGroupSize, totalPages)

  const btnStyle = (active) => ({
    padding: '8px 14px', borderRadius: '6px',
    background: active ? '#1f6feb' : '#161b22',
    color: '#e6edf3', border: '1px solid #30363d',
    cursor: 'pointer', fontSize: '14px',
  })

  const navBtnStyle = (disabled) => ({
    padding: '8px 14px', borderRadius: '6px',
    background: '#161b22', color: disabled ? '#444' : '#e6edf3',
    border: '1px solid #30363d', cursor: disabled ? 'default' : 'pointer', fontSize: '14px',
  })

  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>위협 검색 및 대응</h1>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="이메일, 사이트, 유출 제목 검색..."
          style={{ flex: 1, padding: '12px 16px', background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none' }}
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
        <button onClick={handleSearch} style={{ background: '#1f6feb', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>검색</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#8b949e', padding: '40px' }}>데이터 로딩 중...</div>
      ) : (
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#8b949e' }}>데이터가 없습니다</td>
                </tr>
              ) : (
                data.map(item => (
                  <tr key={item.indicatorId} style={{ borderBottom: '1px solid #21262d' }}>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#58a6ff', maxWidth: '200px' }}>{item.leakTitle || '-'}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px' }}>{item.indicatorValue}</td>
                    <td style={{ padding: '14px 16px' }}><StatusBadge status={item.indicatorType} /></td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#8b949e' }}>{item.sourceName}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#8b949e' }}>{item.detectedAt}</td>
                    <td style={{ padding: '14px 16px' }}><StatusBadge status={item.actionStatus} /></td>
                    <td style={{ padding: '14px 16px' }}>
                      {item.actionStatus === 'OPEN' && (
                        <button onClick={() => openModal(item)} style={{ background: '#1f6feb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>조치</button>
                      )}
                      {item.actionStatus === 'RESOLVED' && item.actionNote && (
                        <span style={{ fontSize: '12px', color: '#8b949e' }}>{item.actionNote}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px', alignItems: 'center' }}>
          <button onClick={() => handlePageChange(0)} disabled={currentPage === 0} style={navBtnStyle(currentPage === 0)}>{'«'}</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} style={navBtnStyle(currentPage === 0)}>{'‹'}</button>
          {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(i => (
            <button key={i} onClick={() => handlePageChange(i)} style={btnStyle(currentPage === i)}>{i + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} style={navBtnStyle(currentPage === totalPages - 1)}>{'›'}</button>
          <button onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} style={navBtnStyle(currentPage === totalPages - 1)}>{'»'}</button>
        </div>
      )}

      {/* 조치 모달 */}
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '32px', width: '480px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>위협 조치</h3>
            <p style={{ color: '#58a6ff', fontSize: '13px', marginBottom: '4px' }}>{modal.leakTitle}</p>
            <p style={{ color: '#8b949e', fontSize: '14px', marginBottom: '24px' }}>{modal.indicatorValue} ({modal.sourceName})</p>
            <label style={{ fontSize: '13px', color: '#8b949e', display: 'block', marginBottom: '8px' }}>조치 메모 <span style={{ color: '#ff4d4f' }}>*</span></label>
            <textarea
              value={actionNote}
              onChange={e => setActionNote(e.target.value)}
              placeholder="예: 비밀번호 초기화 완료, 계정 잠금 처리 등"
              rows={4}
              style={{ width: '100%', padding: '12px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontSize: '14px', outline: 'none', resize: 'none', marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => { setModal(null); setActionNote('') }} style={{ background: '#21262d', color: '#e6edf3', border: '1px solid #30363d', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>취소</button>
              <button
                onClick={handleActionConfirm}
                disabled={!actionNote.trim()}
                style={{
                  background: actionNote.trim() ? '#52c41a' : '#2d4a2d',
                  color: '#fff', border: 'none',
                  padding: '10px 20px', borderRadius: '8px',
                  cursor: actionNote.trim() ? 'pointer' : 'default',
                  fontSize: '14px', fontWeight: 'bold'
                }}
              >조치 완료</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThreatSearch