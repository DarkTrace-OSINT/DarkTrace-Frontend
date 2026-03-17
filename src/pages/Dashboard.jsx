import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const leakData = [
  { name: '월', count: 12 },
  { name: '화', count: 8 },
  { name: '수', count: 24 },
  { name: '목', count: 15 },
  { name: '금', count: 31 },
  { name: '토', count: 6 },
  { name: '일', count: 9 },
]

const siteData = [
  { name: 'BreachForums', value: 45 },
  { name: 'RaidForums', value: 25 },
  { name: 'Telegram', value: 20 },
  { name: '기타', value: 10 },
]

const COLORS = ['#ff4d4f', '#fa8c16', '#1890ff', '#52c41a']

function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>📊 통합 관제 대시보드</h1>

      {/* 상단 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: '오늘 탐지', value: '31', color: '#ff4d4f' },
          { label: '이번 주 탐지', value: '105', color: '#fa8c16' },
          { label: '미조치 건수', value: '14', color: '#1890ff' },
          { label: '조치 완료', value: '91', color: '#52c41a' },
        ].map((card) => (
          <div key={card.label} style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
            padding: '20px',
          }}>
            <div style={{ color: '#8b949e', fontSize: '13px', marginBottom: '8px' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '32px', fontWeight: 'bold' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 차트 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#8b949e' }}>📈 일별 유출 건수</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leakData}>
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
              <Pie data={siteData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
                {siteData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#21262d', border: '1px solid #30363d' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
