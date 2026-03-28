import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { getDashboardStats, getRecentThreats } from '../../api/dashboard'

const COLORS = ['#ff4d4f', '#fa8c16', '#1890ff', '#52c41a']

const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      name: `${d.getMonth()+1}/${d.getDate()}`,
      day: ['일','월','화','수','목','금','토'][d.getDay()],
      count: 0
    })
  }
  return days
}

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [statsData, setStatsData] = useState(null)
  const [recentData, setRecentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    setDailyData(getLast7Days())
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getDashboardStats()
        setStatsData(stats.data)
        if (stats.data.dailyStats && stats.data.dailyStats.length > 0) {
            const last7Days = getLast7Days()
            const merged = last7Days.map(day => {
            const found = stats.data.dailyStats.find(d => d.date === day.name)
            return found ? { ...day, count: found.count } : day
         })
       setDailyData(merged)
        } else {
       setDailyData(getLast7Days())
}
        const recent = await getRecentThreats()
        setRecentData(recent.data)
      } catch (error) {
        console.error('대시보드 데이터 로딩 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#8b949e' }}>
      데이터 로딩 중...
    </div>
  )

  const threatCount = recentData?.threats?.length || 0
  const criticalCount = recentData?.summary?.criticalCount || 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px' }}>통합 관제 대시보드</h1>
        <span style={{ color: '#8b949e', fontSize: '13px' }}>
          {currentTime.toLocaleString('ko-KR')}
        </span>
      </div>

      {/* 실시간 탐지 현황 */}
      <div style={{
        background: '#161b22', border: '1px solid #1f6feb',
        borderRadius: '12px', padding: '16px 20px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ background: '#ff4d4f', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', boxShadow: '0 0 6px #ff4d4f' }} />
        <span style={{ color: '#58a6ff', fontSize: '14px', fontWeight: 'bold' }}>실시간 탐지 현황</span>
        <span style={{ color: '#8b949e', fontSize: '13px' }}>최근 1시간 기준</span>
        <span style={{ color: '#ff4d4f', fontSize: '24px', fontWeight: 'bold', marginLeft: '8px' }}>
          {threatCount}건
        </span>
        <span style={{ color: '#8b949e', fontSize: '13px', marginLeft: 'auto' }}>
          Critical: <span style={{ color: '#fa8c16' }}>{criticalCount}</span>
        </span>
      </div>

      {/* 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '최근 탐지', value: threatCount, color: '#ff4d4f' },
          { label: 'Critical', value: criticalCount, color: '#fa8c16' },
          { label: '총 누적 탐지', value: statsData?.totalCount || 0, color: '#1890ff' },
          { label: '수집 사이트 수', value: statsData?.siteStats?.length || 0, color: '#52c41a' },
        ].map((card) => (
          <div key={card.label} style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '20px' }}>
            <div style={{ color: '#8b949e', fontSize: '13px', marginBottom: '8px' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '32px', fontWeight: 'bold' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 총 누적 탐지 건수 */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: '#8b949e', fontSize: '14px' }}>총 누적 탐지 건수</span>
        <span style={{ color: '#58a6ff', fontSize: '28px', fontWeight: 'bold' }}>
          {statsData?.totalCount?.toLocaleString() || 0}건
        </span>
      </div>

      {/* 차트 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>일별 유출 건수 (최근 7일)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis dataKey="name" stroke="#8b949e" tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text x={0} y={0} dy={12} textAnchor="middle" fill="#8b949e" fontSize={11}>{payload.value}</text>
                  <text x={0} y={0} dy={26} textAnchor="middle" fill="#58a6ff" fontSize={10}>
                    {dailyData.find(d => d.name === payload.value)?.day}
                  </text>
                </g>
              )} height={40} />
              <YAxis stroke="#8b949e" />
              <Tooltip contentStyle={{ background: '#21262d', border: '1px solid #30363d' }} formatter={(value) => [`${value}건`, '탐지 건수']} />
              <Bar dataKey="count" fill="#1f6feb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>사이트별 비중</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statsData?.siteStats || []} cx="50%" cy="45%" outerRadius={80} dataKey="count" nameKey="sourceName">
                {(statsData?.siteStats || []).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value, entry) => (
                  <span style={{ color: '#e6edf3', fontSize: '12px' }}>
                    {entry.payload.sourceName} ({entry.payload.ratio}%)
                  </span>
                )}
                payload={(statsData?.siteStats || []).map((item, index) => ({
                  value: item.sourceName,
                  type: 'circle',
                  color: COLORS[index],
                  payload: item,
                }))}
              />
              <Tooltip formatter={(value, name, props) => [`${value}건 (${props.payload.ratio}%)`, props.payload.sourceName]} contentStyle={{ background: '#21262d', border: '1px solid #30363d' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard