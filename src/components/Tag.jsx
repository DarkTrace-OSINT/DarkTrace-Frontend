function Tag({ label, onRemove }) {
  return (
    <span style={{
      background: '#21262d',
      border: '1px solid #30363d',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }}>
      {label}
      {onRemove && (
        <span
          onClick={() => onRemove(label)}
          style={{ cursor: 'pointer', color: '#ff4d4f' }}
        >×</span>
      )}
    </span>
  )
}

export default Tag
