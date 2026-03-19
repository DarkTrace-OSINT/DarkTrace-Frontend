import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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

const dailyData = [
  { name: '월', count: 12 },
  { name: '화', count: 8 },
  { name: '수', count: 24 },
  { name: '목', count: 15 },
  { name: '금', count: 31 },
  { name: '토', count: 6 },
  { name: '일', count: 9 },
]

const COLORS = ['#ff4d4f', '#fa8c16', '#1890ff', '#52c41a']

function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>📊 통합 관제 대시보드</h1>

      {/* 상단 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
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

      {/* 총 탐지 건수 */}
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
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>📈 일별 유출 건수</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis dataKey="name" stroke="#8b949e" />
              <YAxis stroke="#8b949e" />
              <Tooltip contentStyle={{ background: '#21262d', border: '1px solid #30363d' }} />
              <Bar dataKey="count" fill="#1f6feb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>🌐 사이트별 비중</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statsData.siteStats}
                cx="50%" cy="50%"
                outerRadius={90}
                dataKey="count"
                nameKey="sourceName"
                label={({sourceName, ratio}) => `${sourceName} ${ratio}%`}
              >
                {statsData.siteStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`${value}건`, props.payload.sourceName]}
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
