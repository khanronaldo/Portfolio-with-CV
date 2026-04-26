'use client'

import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    // Touch/mobile: skip Lenis — native scroll is better and saves CPU
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return

    let lenis: any
    let rafId: number

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        infinite: false,
      })

      // Integrate with GSAP ScrollTrigger if available
      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])
}
