'use client'
import { useEffect, useRef } from 'react'

export default function FloatingPetals() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.innerWidth < 768) return

    const colors = ['#07beb8', '#3dccc7', '#68d8d6', '#9ceaef', '#c4fff9']
    const count = 18

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 6 + 3
      const color = colors[Math.floor(Math.random() * colors.length)]
      const left = Math.random() * 100
      const duration = Math.random() * 12 + 18
      const delay = Math.random() * 8

      const orb = document.createElement('div')
      orb.style.cssText = `
        position: absolute;
        left: ${left}%;
        bottom: -20px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        opacity: 0;
        filter: blur(${Math.random() * 1.5 + 0.5}px);
        box-shadow: 0 0 ${size * 2}px ${color}40;
        animation: cyanFloat ${duration}s ${delay}s ease-in-out infinite;
        will-change: transform, opacity;
        pointer-events: none;
      `
      container.appendChild(orb)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" />
}