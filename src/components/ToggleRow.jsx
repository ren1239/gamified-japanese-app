// Settings row with icon, label and an on/off switch
export default function ToggleRow({ icon, title, subtitle, on, onToggle, color = 'var(--success)', dimColor = 'var(--success-dim)', last = false }) {
  return (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: 14, width: '100%',
      padding: '16px 20px', background: 'transparent', border: 'none',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      cursor: 'pointer', textAlign: 'left',
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: on ? dimColor : 'var(--border)', color: on ? color : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{subtitle}</div>
        </div>
        <div style={{ width: 46, height: 26, flexShrink: 0, background: on ? color : 'var(--border)', borderRadius: 13, position: 'relative', transition: 'background 0.3s' }}>
          <div style={{ width: 22, height: 22, background: '#fff', borderRadius: 11, position: 'absolute', top: 2, left: on ? 22 : 2, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </div>
      </div>
    </button>
  )
}
