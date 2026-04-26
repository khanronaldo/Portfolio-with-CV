'use client'
import { useEffect, useRef } from 'react'

export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const t = setTimeout(() => {
      el.classList.add('out')
      setTimeout(() => { el.remove() }, 1000)
    }, 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div id="page-loader" ref={ref}>
      <div className="loader-rings">
        <div className="loader-ring" />
        <div className="loader-ring" />
        <div className="loader-ring" />
      </div>
      <div className="loader-name">Zainishba Noor</div>
      <div className="loader-bar-wrap"><div className="loader-bar" /></div>
      <p className="loader-sub">Portfolio · 2025</p>
    </div>
  )
}