'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const JOBS = [
  { title:'Teacher & Educator', company:'Educational Institutions', duration:'4 Years', type:'Full-Time', icon:'🎓', color:'var(--c1)', desc:'Mentored and guided students across multiple subjects with strong classroom management, curriculum development, and a passion for building confident learners.', tags:['Classroom Management','Curriculum Planning','Student Mentoring','Assessment'] },
  { title:'Sales Executive – EFU Insurance', company:'EFU Life Insurance', duration:'2 Months', type:'Sales', icon:'📋', color:'var(--c3)', desc:'Promoted and sold EFU insurance products, developed strong client acquisition skills, handled queries professionally, and consistently met monthly sales targets.', tags:['Client Relations','Insurance Sales','Target Achievement','Communication'] },
  { title:'Real Estate Sales Executive', company:'Real Estate Firm', duration:'8 Months', type:'Sales', icon:'🏡', color:'var(--c2)', desc:'Managed property listings and client consultations for residential and commercial real estate, conducting site visits, negotiating deals, and building a strong client network.', tags:['Property Sales','Client Consultation','Deal Negotiation','Lead Management'] },
  { title:'Freelance Creative', company:'Self-Employed', duration:'Ongoing', type:'Freelance', icon:'🎨', color:'var(--c4)', desc:'Data entry, typing, and creative design tasks using Canva and Photoshop for various clients — consistently delivering quality outputs with attention to detail.', tags:['Canva Design','Photoshop','Data Entry','Graphic Design'] },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <section id="experience" ref={ref} style={{ padding:'clamp(70px,10vw,120px) clamp(20px,5vw,80px)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'-1%', bottom:'5%', fontFamily:'var(--font-cormorant)', fontSize:'clamp(80px,14vw,180px)', fontWeight:300, color:'rgba(61,204,199,.025)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>WORK</div>

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.9,ease:[.16,1,.3,1]}} style={{ marginBottom:'56px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
            <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.5em', textTransform:'uppercase', color:'var(--c2)' }}>Experience</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,4rem)', color:'var(--deep-text)', lineHeight:1.1 }}>
            Professional <em style={{ fontStyle:'italic', color:'var(--c3)' }}>Path</em>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'20px' }}>
          {JOBS.map((j,i)=>(
            <motion.div key={j.title}
              initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:.85,delay:.1+i*.12,ease:[.16,1,.3,1]}}>
              <div className="tilt-card" style={{
                padding:'28px', height:'100%',
                background:'rgba(7,190,184,.04)',
                border:'1px solid rgba(61,204,199,.1)',
                borderRadius:'20px',
                transition:'all .4s var(--ease-spring)',
                cursor:'default', position:'relative', overflow:'hidden',
              }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background='rgba(7,190,184,.07)';el.style.borderColor='rgba(61,204,199,.22)';el.style.transform='translateY(-6px) scale(1.01)';el.style.boxShadow='0 24px 50px rgba(7,190,184,.14)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background='rgba(7,190,184,.04)';el.style.borderColor='rgba(61,204,199,.1)';el.style.transform='none';el.style.boxShadow='none'}}>

                {/* Top bar */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,transparent,${j.color},transparent)`, opacity:.4 }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }}>
                  <div style={{ width:'50px', height:'50px', borderRadius:'14px', background:'rgba(7,190,184,.08)', border:'1px solid rgba(61,204,199,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem' }}>{j.icon}</div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'5px' }}>
                    <span style={{ fontFamily:'var(--font-space)', fontSize:'.6rem', letterSpacing:'.15em', textTransform:'uppercase', padding:'4px 12px', borderRadius:'20px', background:'rgba(61,204,199,.08)', color:'var(--c3)', border:'1px solid rgba(61,204,199,.15)' }}>{j.type}</span>
                    <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.1rem', color:'var(--c2)', fontWeight:500 }}>{j.duration}</span>
                  </div>
                </div>

                <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:600, fontSize:'clamp(1rem,2vw,1.25rem)', color:'var(--deep-text)', marginBottom:'4px', lineHeight:1.2 }}>{j.title}</h3>
                <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.75rem', color:'var(--muted-text)', marginBottom:'14px', letterSpacing:'.05em' }}>{j.company}</p>
                <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.8rem', color:'rgba(156,234,239,.45)', lineHeight:1.75, marginBottom:'18px' }}>{j.desc}</p>

                <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                  {j.tags.map(t=>(
                    <span key={t} style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.08em', padding:'4px 11px', borderRadius:'20px', border:'1px solid rgba(61,204,199,.15)', color:'var(--muted-text)', background:'rgba(61,204,199,.04)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}