function Toggle({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: '48px', height: '26px', borderRadius: '13px',
          background: value ? '#52c41a' : '#30363d',
          cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
        }}
      >
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
          position: 'absolute', top: '3px',
          left: value ? '25px' : '3px',
          transition: 'left 0.3s',
        }} />
      </div>
      <span style={{ fontSize: '13px', color: value ? '#52c41a' : '#8b949e' }}>
        {value ? 'ON' : 'OFF'}
      </span>
    </div>
  )
}

export default Toggle
