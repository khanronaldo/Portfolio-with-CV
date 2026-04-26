'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative py-16 px-6 overflow-hidden mt-10">
      {/* Subtle Glowing Background Orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#07beb8]/5 rounded-t-full filter blur-[100px] pointer-events-none" />
      
      {/* Modern Glowing Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#07beb8]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[2px] bg-[#07beb8] blur-[2px]" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        
        {/* Left Section - Branding */}
        <div className="text-center md:text-left">
          <a href="#hero" className="inline-block mb-3" onClick={scrollToTop}>
            <h3 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#07beb8] to-[#c4fff9] drop-shadow-[0_0_15px_rgba(7,190,184,0.3)] transition-transform hover:scale-105 duration-300 cursor-pointer" 
                style={{ fontFamily: 'var(--font-greatvibes, var(--font-script))' }}>
              Zainishba Noor
            </h3>
          </a>
          <p className="text-[#8892b0] text-[0.65rem] tracking-[0.3em] uppercase font-medium" style={{ fontFamily: 'var(--font-space)' }}>
            Educator <span className="text-[#07beb8] mx-1">·</span> Technologist <span className="text-[#07beb8] mx-1">·</span> Creative
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {['About', 'Education', 'Experience', 'Skills', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-[#8892b0] text-[0.7rem] tracking-[0.2em] uppercase hover:text-[#c4fff9] transition-all duration-300 relative group font-medium" 
              style={{ fontFamily: 'var(--font-space)' }}>
              {link}
              {/* Glowing dot on hover */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#07beb8] opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 shadow-[0_0_8px_#07beb8]" />
            </a>
          ))}
        </div>

        {/* Right Section - Scroll to Top Button */}
        <motion.button 
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#07beb8]/5 border border-[#07beb8]/20 backdrop-blur-md flex items-center justify-center text-[#c4fff9] shadow-[0_0_20px_rgba(7,190,184,0.05)] hover:shadow-[0_0_30px_rgba(7,190,184,0.25)] hover:border-[#07beb8]/50 transition-all duration-300 group"
        >
          <span className="transform group-hover:-translate-y-1 transition-transform duration-300 text-xl">↑</span>
        </motion.button>
      </div>

      {/* Bottom Copyright Area */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-[#07beb8]/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-[#8892b0] text-[0.75rem] tracking-wider flex items-center justify-center flex-wrap" style={{ fontFamily: 'var(--font-space)' }}>
          © {new Date().getFullYear()} <span className="mx-2 text-[#07beb8] opacity-50">|</span> Crafted with 
          <motion.span 
            animate={{ scale: [1, 1.25, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
            className="inline-block text-[#07beb8] mx-1.5 text-lg"
          >
            ♥
          </motion.span> 
          by Zainishba Noor
        </p>
        <p className="text-[#8892b0]/40 text-[0.65rem] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-space)' }}>
          All rights reserved
        </p>
      </div>
    </footer>
  )
}