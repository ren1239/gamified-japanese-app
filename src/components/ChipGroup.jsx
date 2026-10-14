import { motion } from 'framer-motion'

export default function ChipGroup({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
      {options.map(opt => {
        const active = value === opt.id
        return (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(opt.id)}
            style={{
              padding: '5px 12px',
              borderRadius: 999,
              border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border-md)'}`,
              background: active ? 'var(--primary)' : 'transparent',
              color: active ? '#fff' : 'var(--text-muted)',
              fontFamily: "'Nunito'", fontWeight: 800, fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}{opt.count != null ? ` (${opt.count})` : ''}
          </motion.button>
        )
      })}
    </div>
  )
}
