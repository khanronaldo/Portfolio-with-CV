'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId   = useRef<number>(0)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    if (window.matchMedia('(hover: none)').matches) {
      dot.style.display  = 'none'
      ring.style.display = 'none'
      return
    }

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const animate = () => {
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`

      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`

      rafId.current = requestAnimationFrame(animate)
    }

    const addHover    = () => { dot.classList.add('hovering'); ring.classList.add('hovering') }
    const removeHover = () => { dot.classList.remove('hovering'); ring.classList.remove('hovering') }

    const els = document.querySelectorAll('a, button, .glass-card, .tag, [data-hover]')
    els.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

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

  return (
    <>
      <div id="z-cursor"      ref={dotRef}  aria-hidden />
      <div id="z-cursor-ring" ref={ringRef} aria-hidden />
    </>
  )
}
