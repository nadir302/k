import React from 'react'

export default function SurfaceCard({ title, subtitle, actions, children, style }) {
  return (
    <div style={{
      background: 'var(--surface-elev-1, #fff)',
      border: '1px solid var(--surface-border, #e5e7eb)',
      borderRadius: 12,
      boxShadow: 'var(--surface-shadow, 0 1px 2px rgba(0,0,0,0.06))',
      padding: 16,
      ...style
    }}>
      {(title || actions) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            {title && <div style={{ fontWeight: 600 }}>{title}</div>}
            {subtitle && <div style={{ color: '#6b7280', fontSize: 12 }}>{subtitle}</div>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}


