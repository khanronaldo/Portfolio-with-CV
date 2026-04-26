'use client'
import { useEffect, useRef } from 'react'

export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (window.innerWidth < 768) return

    const colors = ['#07beb8', '#3dccc7', '#68d8d6', '#9ceaef']
    const count = 15

    for (let i = 0; i < count; i++) {
      const orb = document.createElement('div')
      const size = Math.random() * 8 + 4
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      orb.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        opacity: ${Math.random() * 0.3 + 0.1};
        filter: blur(${Math.random() * 2 + 1}px);
        animation: floatOrb ${Math.random() * 10 + 15}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `
      containerRef.current.appendChild(orb)
    }

    return () => { if (containerRef.current) containerRef.current.innerHTML = '' }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" />
}