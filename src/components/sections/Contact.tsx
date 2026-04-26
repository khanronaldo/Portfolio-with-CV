'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // WhatsApp API Logic
    const phoneNumber = "923305521979" 
    const whatsappMessage = `Hello Zainishba!\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Message:* ${form.message}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    // Naye tab mein WhatsApp open karega
    window.open(whatsappUrl, '_blank')

    // Button state update karega aur form clear karega
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const contactInfo = [
    { icon: '📞', label: 'Phone', value: '+92-330-5521979' },
    { icon: '✉️', label: 'Email', value: 'zainishbanoor@gmail.com' },
    { icon: '📍', label: 'Location', value: 'Islamabad, Pakistan' },
  ]

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#07beb8]/5 rounded-full filter blur-[120px]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[#07beb8] text-sm tracking-[0.3em] uppercase mb-4 font-medium" style={{ fontFamily: 'var(--font-space)' }}>✦ Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-bold text-[#e6f1ff] mb-6" style={{ fontFamily: 'var(--font-space)' }}>
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-[#8892b0] text-lg max-w-xl mx-auto">Open to opportunities in banking, education, and creative fields.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -6 }} className="glass-card p-6 text-center group hover:border-[#07beb8]/40 transition-colors duration-300">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
              <div className="text-[#07beb8] text-xs tracking-widest uppercase mb-2 font-semibold">{c.label}</div>
              <div className="text-[#ccd6f6] text-sm">{c.value}</div>
            </motion.div>
          ))}
        </div>

        <motion.form initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit} className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#07beb8] via-[#3dccc7] to-[#c4fff9]" />
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[#8892b0] text-xs tracking-widest uppercase mb-3 font-medium">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#07beb8]/5 border border-[#07beb8]/20 rounded-xl px-5 py-4 text-[#e6f1ff] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#07beb8] focus:ring-1 focus:ring-[#07beb8]/50 transition-all duration-300" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-[#8892b0] text-xs tracking-widest uppercase mb-3 font-medium">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#07beb8]/5 border border-[#07beb8]/20 rounded-xl px-5 py-4 text-[#e6f1ff] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#07beb8] focus:ring-1 focus:ring-[#07beb8]/50 transition-all duration-300" placeholder="Your email" />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-[#8892b0] text-xs tracking-widest uppercase mb-3 font-medium">Message</label>
            <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#07beb8]/5 border border-[#07beb8]/20 rounded-xl px-5 py-4 text-[#e6f1ff] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#07beb8] focus:ring-1 focus:ring-[#07beb8]/50 transition-all duration-300 resize-none" placeholder="Your message..." />
          </div>
          <button type="submit"
            className={`w-full py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 ${
              sent ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gradient-to-r from-[#07beb8] to-[#3dccc7] text-[#011627] hover:shadow-[0_10px_40px_rgba(7,190,184,0.3)] hover:-translate-y-1'
            }`}>
            {sent ? '✓ Redirecting to WhatsApp...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}