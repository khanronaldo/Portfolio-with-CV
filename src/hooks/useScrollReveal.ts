'use client'

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay for stagger feel
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0
            setTimeout(() => el.classList.add('visible'), delay * 1000)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
