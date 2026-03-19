function StatusBadge({ status }) {
  const styles = {
    OPEN:     { background: '#fa8c1622', color: '#fa8c16' },
    RESOLVED: { background: '#52c41a22', color: '#52c41a' },
    ALIVE:    { background: '#52c41a22', color: '#52c41a' },
    DEAD:     { background: '#ff4d4f22', color: '#ff4d4f' },
    EMAIL:    { background: '#1f6feb22', color: '#58a6ff' },
    ID:       { background: '#722ed122', color: '#b37feb' },
    PW:       { background: '#fa8c1622', color: '#ffc069' },
  }

  const style = styles[status] || { background: '#30363d', color: '#8b949e' }

  return (
    <span style={{
      ...style,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
    }}>
      {status}
    </span>
  )
}

export default StatusBadge
