'use client'

import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef<number>(0)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return
    dot.style.display  = 'block'
    ring.style.display = 'block'

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    let ringPos = { x: -100, y: -100 }

    const animate = () => {
      // Dot: snap directly
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`

      // Ring: lerp for trail effect
      ringPos.x += (pos.current.x - ringPos.x) * 0.12
      ringPos.y += (pos.current.y - ringPos.y) * 0.12
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`

      rafId.current = requestAnimationFrame(animate)
    }

    const addHover    = () => { dot.classList.add('hovering'); ring.classList.add('hovering') }
    const removeHover = () => { dot.classList.remove('hovering'); ring.classList.remove('hovering') }

    const bindHoverables = () => {
      const els = document.querySelectorAll('a, button, .glass-card, .tag, [data-hover]')
      els.forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
      return els
    }

    const els = bindHoverables()
    window.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
      els.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return { dotRef, ringRef }
}
