'use client'

import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav          from '@/components/ui/Nav'
import Hero         from '@/components/sections/Hero'
import About        from '@/components/sections/About'
import Education    from '@/components/sections/Education'
import Experience   from '@/components/sections/Experience'
import Skills       from '@/components/sections/Skills'
import CVModal      from '@/components/sections/CVModal'
import Contact      from '@/components/sections/Contact'
import Footer       from '@/components/ui/Footer'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isMobile) return

    let lenis: any
    const init = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }
    init()
    return () => { if (lenis) lenis.destroy() }
  }, [])

  return (
    /* 1. 'min-h-[100dvh]' use kiya taake mobile browser UI se height kharab na ho.
       2. 'px-4 md:px-0' add kiya taake mobile par content bilkul corners se na chipke.
    */
    <main className="min-h-[100dvh] w-full bg-transparent overflow-x-hidden relative z-10 px-4 sm:px-6 md:px-0">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-[#07beb8] via-[#3dccc7] to-[#c4fff9] origin-left z-[9999]"
        style={{ scaleX }}
      />
      
      <Nav />
      
      {/* Sections Wrapper: Taake spacing mobile par tight rahe aur desktop par normal */}
      <div className="flex flex-col gap-10 md:gap-0">
        <Hero />
        <div className="section-divider opacity-50" />
        <About />
        <div className="section-divider opacity-50" />
        <Education />
        <div className="section-divider opacity-50" />
        <Experience />
        <div className="section-divider opacity-50" />
        <Skills />
        <div className="section-divider opacity-50" />
        <CVModal />
        <div className="section-divider opacity-50" />
        <Contact />
      </div>

      <Footer />
    </main>
  )
}