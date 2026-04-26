'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos  = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf  = useRef<number>(0)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return
    if (window.matchMedia('(hover:none)').matches) return

    const onMove = (e: MouseEvent) => { pos.current.x = e.clientX; pos.current.y = e.clientY }

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14
      ring.current.y += (pos.current.y - ring.current.y) * 0.14
      dot.style.transform  = `translate(${pos.current.x - 3}px,${pos.current.y - 3}px)`
      rng.style.transform  = `translate(${ring.current.x - 16}px,${ring.current.y - 16}px)`
      raf.current = requestAnimationFrame(loop)
    }

    const on  = () => { dot.classList.add('hovering');  rng.classList.add('hovering')  }
    const off = () => { dot.classList.remove('hovering'); rng.classList.remove('hovering') }

    const attach = () => {
      document.querySelectorAll('a,button,[data-hover],.tilt-card').forEach(el => {
        el.addEventListener('mouseenter', on);  el.addEventListener('mouseleave', off)
      })
    }
    attach()
    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  aria-hidden />
      <div id="cursor-ring" ref={ringRef} aria-hidden />
    </>
  )
}