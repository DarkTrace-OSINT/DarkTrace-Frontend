import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

const statsData = {
  totalCount: 1540,
  siteStats: [
    { siteId: 1, sourceName: 'BreachForums', count: 700, ratio: 45.5 },
    { siteId: 2, sourceName: 'RaidForums', count: 385, ratio: 25.0 },
    { siteId: 3, sourceName: 'Telegram', count: 308, ratio: 20.0 },
    { siteId: 4, sourceName: '기타', count: 147, ratio: 9.5 },
  ]
}

const recentThreats = {
  lastHourCount: 31,
  openCount: 14,
  resolvedCount: 91,
  weeklyCount: 105,
}

const COLORS = ['#ff4d4f', '#fa8c16', '#1890ff', '#52c41a']

// 최근 7일 날짜 자동 생성
const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      name: `${d.getMonth()+1}/${d.getDate()}`,
      day: ['일','월','화','수','목','금','토'][d.getDay()],
      count: [12, 8, 24, 15, 31, 6, 9][6-i]
    })
  }
  return days
}

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const dailyData = getLast7Days()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px' }}>📊 통합 관제 대시보드</h1>
        <span style={{ color: '#8b949e', fontSize: '13px' }}>
          🕐 {currentTime.toLocaleString('ko-KR')}
        </span>
      </div>

      {/* 실시간 탐지 현황 (API 3) */}
      <div style={{
        background: '#161b22', border: '1px solid #1f6feb',
        borderRadius: '12px', padding: '16px 20px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{
          background: '#ff4d4f', borderRadius: '50%',
          width: '10px', height: '10px', display: 'inline-block',
          boxShadow: '0 0 6px #ff4d4f',
        }} />
        <span style={{ color: '#58a6ff', fontSize: '14px', fontWeight: 'bold' }}>실시간 탐지 현황</span>
        <span style={{ color: '#8b949e', fontSize: '13px' }}>최근 1시간 기준</span>
        <span style={{ color: '#ff4d4f', fontSize: '24px', fontWeight: 'bold', marginLeft: '8px' }}>
          {recentThreats.lastHourCount}건
        </span>
        <span style={{ color: '#8b949e', fontSize: '13px', marginLeft: 'auto' }}>
          OPEN: <span style={{ color: '#fa8c16' }}>{recentThreats.openCount}</span>
          &nbsp;&nbsp;
          RESOLVED: <span style={{ color: '#52c41a' }}>{recentThreats.resolvedCount}</span>
        </span>
      </div>

      {/* 통계 카드 (API 2) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '최근 1시간 탐지', value: recentThreats.lastHourCount, color: '#ff4d4f' },
          { label: '이번 주 탐지', value: recentThreats.weeklyCount, color: '#fa8c16' },
          { label: 'OPEN (미조치)', value: recentThreats.openCount, color: '#1890ff' },
          { label: 'RESOLVED (조치완료)', value: recentThreats.resolvedCount, color: '#52c41a' },
        ].map((card) => (
          <div key={card.label} style={{
            background: '#161b22', border: '1px solid #30363d',
            borderRadius: '12px', padding: '20px',
          }}>
            <div style={{ color: '#8b949e', fontSize: '13px', marginBottom: '8px' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '32px', fontWeight: 'bold' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 총 누적 탐지 건수 */}
      <div style={{
        background: '#161b22', border: '1px solid #30363d',
        borderRadius: '12px', padding: '20px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <span style={{ color: '#8b949e', fontSize: '14px' }}>📌 총 누적 탐지 건수</span>
        <span style={{ color: '#58a6ff', fontSize: '28px', fontWeight: 'bold' }}>
          {statsData.totalCount.toLocaleString()}건
        </span>
      </div>

      {/* 차트 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* 일별 유출 건수 */}
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>📈 일별 유출 건수 (최근 7일)</h3>
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
              <Tooltip
                contentStyle={{ background: '#21262d', border: '1px solid #30363d' }}
                formatter={(value) => [`${value}건`, '탐지 건수']}
                labelFormatter={(label) => {
                  const d = dailyData.find(d => d.name === label)
                  return `${label} (${d?.day})`
                }}
              />
              <Bar dataKey="count" fill="#1f6feb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 사이트별 비중 */}
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>🌐 사이트별 비중</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statsData.siteStats}
                cx="50%" cy="45%"
                outerRadius={80}
                dataKey="count"
                nameKey="sourceName"
              >
                {statsData.siteStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value, entry) => (
                  <span style={{ color: '#e6edf3', fontSize: '12px' }}>
                    {entry.payload.sourceName} ({entry.payload.ratio}%)
                  </span>
                )}
                payload={statsData.siteStats.map((item, index) => ({
                  value: item.sourceName,
                  type: 'circle',
                  color: COLORS[index],
                  payload: item,
                }))}
              />
              <Tooltip
                formatter={(value, name, props) => [`${value}건 (${props.payload.ratio}%)`, props.payload.sourceName]}
                contentStyle={{ background: '#21262d', border: '1px solid #30363d' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
