'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Education',  href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['about', 'education', 'experience', 'skills', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700" style={{
        paddingTop: scrolled ? '20px' : '0px',
        paddingLeft: 'clamp(16px, 4vw, 32px)',
        paddingRight: 'clamp(16px, 4vw, 32px)',
        pointerEvents: 'none' // Taki aas paas click ho sake
      }}>
        
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          pointerEvents: 'auto', // Inner container click ho sake
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(2,13,13,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(61,204,199,0.15)' : '1px solid transparent',
          boxShadow: scrolled ? '0 20px 40px -10px rgba(0,0,0,0.5)' : 'none',
          borderRadius: scrolled ? '100px' : '0px',
          padding: scrolled ? '12px 28px' : '28px 12px',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>

          {/* Logo */}
          <a href="#hero" data-hover style={{
            fontFamily: 'var(--font-greatvibes)', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
            background: 'linear-gradient(135deg, var(--c3), var(--c5))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', textDecoration: 'none', cursor: 'none',
            position: 'relative', top: '2px'
          }}>
            Zainishba Noor
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} data-hover style={{
                fontFamily: 'var(--font-space)', fontWeight: 400,
                fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase',
                color: active === l.href.slice(1) ? 'var(--c3)' : 'var(--muted-text)',
                textDecoration: 'none', cursor: 'none', transition: 'color 0.3s',
                position: 'relative', padding: '5px 0'
              }}>
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span layoutId="nav-dot" transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{
                    position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%', background: 'var(--c3)', display: 'block',
                    boxShadow: '0 0 10px var(--c3)' // Thora glowing effect
                  }} />
                )}
              </a>
            ))}
            
            {/* View CV Button */}
            <a href="#cv" data-hover style={{
              fontFamily: 'var(--font-space)', fontWeight: 600,
              fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
              padding: '.6rem 1.8rem', border: '1px solid rgba(61,204,199,0.3)',
              borderRadius: '50px', color: 'var(--c2)',
              textDecoration: 'none', cursor: 'none',
              transition: 'all 0.4s ease', background: 'rgba(61,204,199,0.05)',
              boxShadow: 'inset 0 0 0 0 var(--c2)'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--c2)';
              (e.currentTarget as HTMLElement).style.color = '#020d0d';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px -5px rgba(7,190,184,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(61,204,199,0.05)';
              (e.currentTarget as HTMLElement).style.color = 'var(--c2)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 0 0 0 var(--c2)';
            }}>
              View CV
            </a>
          </nav>

          {/* Mobile Burger */}
          <button className="md:hidden flex flex-col gap-[6px] p-2 z-50 relative"
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: i === 1 && !open ? '16px' : '24px', height: '2px',
                background: 'var(--c3)', borderRadius: '2px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                marginLeft: i === 1 && !open ? 'auto' : '0', // Thora modern asymmetric look
                transform: open ? (i === 0 ? 'rotate(45deg) translate(5.5px, 5.5px)' : i === 2 ? 'rotate(-45deg) translate(5.5px, -5.5px)' : 'none') : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Modern Floating Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop for mobile */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(2,13,13,0.6)', backdropFilter: 'blur(5px)' }}
              onClick={() => setOpen(false)}
            />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} style={{
                position: 'fixed', top: '90px', left: '16px', right: '16px', zIndex: 45,
                background: 'rgba(3,26,26,0.85)', backdropFilter: 'blur(24px)',
                border: '1px solid rgba(61,204,199,0.15)', borderRadius: '24px',
                padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '8px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
              }}>
              
              {[...LINKS, { label: 'View CV (PDF)', href: '#cv' }].map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (i * 0.05) }}
                  style={{
                  fontFamily: 'var(--font-space)', fontWeight: 400, fontSize: '1rem',
                  letterSpacing: '.15em', textTransform: 'uppercase',
                  color: l.label.includes('CV') ? 'var(--c2)' : 'var(--muted-text)', 
                  textDecoration: 'none', padding: '16px', borderRadius: '12px',
                  background: 'rgba(61,204,199,0.03)', border: '1px solid rgba(61,204,199,0.05)',
                  textAlign: 'center'
                }}>
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}