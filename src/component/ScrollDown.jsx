// ScrollDownHint.jsx
import React from 'react'

export default function ScrollDownHint() {
  return (
    <div style={wrapperStyle}>
      <div style={textStyle}>Scroll down</div>
      <div style={arrowStyle}>⌄</div>
    </div>
  )
}

const wrapperStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  color: '#ffffff',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '14px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  opacity: 0.9,
  animation: 'fadeIn 1.2s ease-out forwards',
  pointerEvents: 'none',
}

/* puoi spostare questi stili in un file CSS */
const textStyle = {
  fontWeight: 500,
}

const arrowStyle = {
  fontSize: '22px',
  animation: 'bounce 1.3s infinite',
}
