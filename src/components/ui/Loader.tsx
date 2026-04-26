'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setHidden(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <div id="page-loader" className={hidden ? 'hidden' : ''} aria-hidden>
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full border border-gold/10 animate-spin-slow" />
        <div className="absolute w-48 h-48 rounded-full border border-rose/15"
             style={{ animation: 'spin 15s linear infinite reverse' }} />
        <div className="absolute w-32 h-32 rounded-full border border-gold/10 animate-spin-slow" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <span
          className="loader-name shimmer-text"
          style={{ fontFamily: 'var(--font-greatvibes)' }}
        >
          Zainishba Noor
        </span>
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
        <span
          className="loader-sub"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Portfolio
        </span>
      </div>
    </div>
  )
}
