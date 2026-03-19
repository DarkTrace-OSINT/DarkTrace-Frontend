function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '20px',
    }}>
      <div style={{ color: '#8b949e', fontSize: '13px', marginBottom: '8px' }}>{label}</div>
      <div style={{ color: color, fontSize: '32px', fontWeight: 'bold' }}>{value}</div>
    </div>
  )
}

export default StatCard
