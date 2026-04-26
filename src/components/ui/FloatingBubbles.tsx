'use client'
import { useEffect, useRef } from 'react'

export default function FloatingBubbles() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c || window.innerWidth < 768) return
    const cols = ['#07beb8','#3dccc7','#68d8d6','#9ceaef','#c4fff9']
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div')
      const size = Math.random()*8+4
      const dx = ((Math.random()-.5)*120)+'px'
      el.style.cssText = `
        position:absolute; left:${Math.random()*100}%;
        bottom:-30px; width:${size}px; height:${size}px;
        border-radius:50%; border:1px solid ${cols[Math.floor(Math.random()*cols.length)]}55;
        opacity:0; --dx:${dx};
        animation:bubbleFloat ${20+Math.random()*20}s ${Math.random()*25}s ease-in-out infinite;
        will-change:transform,opacity;
      `
      c.appendChild(el)
    }
    return () => { while(c.firstChild) c.removeChild(c.firstChild) }
  }, [])
  return <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
}