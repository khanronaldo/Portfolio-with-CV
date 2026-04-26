'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CV_SECTIONS = [
  {
    title: 'Objective',
    icon: '🎯',
    content: (
      <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.88rem', color:'rgba(196,255,249,.6)', lineHeight:1.85, fontStyle:'italic' }}>
        "To secure a position in the banking sector where I can utilize my commerce knowledge and IT skills to handle financial transactions, maintain records, and provide excellent customer service, while contributing to the growth of the organization and enhancing my professional career."
      </p>
    )
  },
  {
    title: 'Experience',
    icon: '💼',
    content: (
      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
        {[
          { role:'Teacher & Educator', co:'Educational Institutions', dur:'4 Years' },
          { role:'Sales Executive – Health Insurance', co:'Health Life Insurance', dur:'2 Months' },
          { role:'Real Estate Sales Executive', co:'Real Estate Firm', dur:'8 Months' },
          { role:'Freelance Creative Designer', co:'Self-Employed', dur:'Ongoing' },
        ].map(j=>(
          <div key={j.role} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px', background:'rgba(61,204,199,.04)', border:'1px solid rgba(61,204,199,.1)', borderRadius:'10px' }}>
            <div>
              <div style={{ fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.82rem', color:'var(--deep-text)' }}>{j.role}</div>
              <div style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.72rem', color:'var(--muted-text)' }}>{j.co}</div>
            </div>
            <span style={{ fontFamily:'var(--font-cormorant)', fontWeight:500, fontSize:'1rem', color:'var(--c3)', flexShrink:0 }}>{j.dur}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: 'Education',
    icon: '🎓',
    content: (
      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {[
          { d:'Diploma in Information Technology (DIT)', b:'KPK Board · GTVC Khaki', s:'DIT' },
          { d:'Intermediate in Commerce (I.COM)', b:'Federal Board · IMCG Islamabad', s:'I.COM' },
          { d:'Matriculation (Science – Biology)', b:'Federal Board · IMCG Islamabad', s:'Matric' },
        ].map(e=>(
          <div key={e.s} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px', background:'rgba(61,204,199,.04)', border:'1px solid rgba(61,204,199,.1)', borderRadius:'10px' }}>
            <div>
              <div style={{ fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.82rem', color:'var(--deep-text)' }}>{e.d}</div>
              <div style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.72rem', color:'var(--muted-text)' }}>{e.b}</div>
            </div>
            <span style={{ fontFamily:'var(--font-space)', fontWeight:600, fontSize:'.68rem', letterSpacing:'.12em', padding:'4px 12px', borderRadius:'16px', background:'rgba(61,204,199,.1)', color:'var(--c3)', border:'1px solid rgba(61,204,199,.2)' }}>{e.s}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: 'Skills',
    icon: '⚡',
    content: (
      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
        {['MS Office','Canva','Photoshop','Data Entry','Web Dev Basics','Communication','Teaching','Sales','Client Relations','Database Basics'].map(s=>(
          <span key={s} style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.72rem', padding:'5px 14px', borderRadius:'20px', background:'rgba(61,204,199,.06)', color:'var(--c4)', border:'1px solid rgba(61,204,199,.15)' }}>{s}</span>
        ))}
      </div>
    )
  },
  {
    title: 'Personal Info',
    icon: '👤',
    content: (
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
        {[['DOB','17 May 2003'],['Nationality','Pakistani'],['Father','Muhammad Waseem'],['CNIC','13503-5475495-0'],['Status','Single'],['Phone','+92-330-5521979'],['Email','zainishbanoor@gmail.com'],['Location','Ghori Town, Islamabad']].map(([k,v])=>(
          <div key={k} style={{ padding:'8px 12px', background:'rgba(61,204,199,.04)', border:'1px solid rgba(61,204,199,.08)', borderRadius:'8px' }}>
            <div style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.6rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted-text)', marginBottom:'3px' }}>{k}</div>
            <div style={{ fontFamily:'var(--font-space)', fontWeight:400, fontSize:'.78rem', color:'var(--deep-text)' }}>{v}</div>
          </div>
        ))}
      </div>
    )
  },
]

export default function CVModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key==='Escape') setOpen(false) }
    if (open) { document.body.style.overflow='hidden'; window.addEventListener('keydown',handleKey) }
    else { document.body.style.overflow='' }
    return () => { document.body.style.overflow=''; window.removeEventListener('keydown',handleKey) }
  }, [open])

  return (
    <>
      {/* Trigger Section */}
      <section id="cv" style={{ padding:'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%,rgba(7,190,184,.06) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:2, maxWidth:'600px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginBottom:'16px' }}>
            <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
            <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.5em', textTransform:'uppercase', color:'var(--c2)' }}>Download / View</span>
            <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
          </div>
          <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2rem,5vw,3.5rem)', color:'var(--deep-text)', lineHeight:1.1, marginBottom:'20px' }}>
            My <em style={{ fontStyle:'italic', color:'var(--c3)' }}>Curriculum Vitae</em>
          </h2>
          <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.88rem', color:'rgba(156,234,239,.45)', lineHeight:1.8, marginBottom:'32px' }}>
            View my complete professional profile with all experience, education, and skills detailed in one place.
          </p>
          <button onClick={() => setOpen(true)} data-hover style={{
            fontFamily:'var(--font-space)', fontWeight:500,
            fontSize:'.72rem', letterSpacing:'.25em', textTransform:'uppercase',
            padding:'14px 36px',
            background:'linear-gradient(135deg,var(--c1),var(--c2))',
            color:'#020d0d', border:'none', borderRadius:'50px',
            cursor:'none', transition:'all .35s',
            boxShadow:'0 8px 28px rgba(7,190,184,.4)',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLElement).style.boxShadow='0 18px 40px rgba(7,190,184,.55)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='0 8px 28px rgba(7,190,184,.4)'}}>
            Open Full CV ↗
          </button>
        </div>
      </section>

      {/* Modal */}
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}}
            style={{ position:'fixed', inset:0, zIndex:10000, background:'rgba(2,13,13,.88)', backdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
            onClick={(e)=>{ if(e.target===e.currentTarget) setOpen(false) }}>

            <motion.div initial={{scale:.88,y:28}} animate={{scale:1,y:0}} exit={{scale:.88,y:28}}
              transition={{duration:.45,ease:[.34,1.56,.64,1]}}
              
              /* 🔥 YEH DO LINES LENIS KO WHEEL SCROLL BLOCK KARNE SE ROKENGI 🔥 */
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              
              style={{ width:'min(94vw,720px)', maxHeight:'88vh', overflowY:'auto', background:'#031a1a', border:'1px solid rgba(61,204,199,.2)', borderRadius:'24px', boxShadow:'0 40px 100px rgba(7,190,184,.18)' }}>

              {/* Header */}
              <div style={{ padding:'28px 32px 20px', borderBottom:'1px solid rgba(61,204,199,.1)', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#031a1a', zIndex:2, borderRadius:'24px 24px 0 0' }}>
                <div>
                  <h3 style={{ fontFamily:'var(--font-greatvibes)', fontSize:'1.8rem', background:'linear-gradient(135deg,var(--c3),var(--c5))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Zainishba Noor</h3>
                  <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.68rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--muted-text)', marginTop:'3px' }}>Curriculum Vitae · 2025</p>
                </div>
                <button onClick={()=>setOpen(false)} data-hover style={{ width:'38px', height:'38px', borderRadius:'10px', background:'rgba(61,204,199,.08)', border:'1px solid rgba(61,204,199,.15)', color:'var(--c3)', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', transition:'all .3s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(61,204,199,.18)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='rgba(61,204,199,.08)'}}>✕</button>
              </div>

              {/* Content */}
              <div style={{ padding:'24px 32px 32px', display:'flex', flexDirection:'column', gap:'24px' }}>
                {CV_SECTIONS.map((s,i)=>(
                  <motion.div key={s.title} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.05*i, duration:.5}}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                      <span style={{ fontSize:'1.1rem' }}>{s.icon}</span>
                      <h4 style={{ fontFamily:'var(--font-cormorant)', fontWeight:600, fontSize:'1.25rem', color:'var(--c3)' }}>{s.title}</h4>
                      <div style={{ flex:1, height:'1px', background:'rgba(61,204,199,.1)' }} />
                    </div>
                    {s.content}
                  </motion.div>
                ))}

                {/* Download button */}
                <div style={{ paddingTop:'16px', borderTop:'1px solid rgba(61,204,199,.1)', display:'flex', justifyContent:'center' }}>
                  {/* 🔥 DOWNLOAD LINK UPDATED 🔥 */}
                  <a href="/Zainishba_Noor_CV.pdf" download="Zainishba_Noor_CV.pdf" style={{
                    fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.72rem',
                    letterSpacing:'.25em', textTransform:'uppercase',
                    padding:'13px 32px',
                    background:'linear-gradient(135deg,var(--c1),var(--c2))',
                    color:'#020d0d', borderRadius:'50px', textDecoration:'none',
                    cursor:'none', transition:'all .35s',
                    boxShadow:'0 8px 24px rgba(7,190,184,.35)',
                    display:'inline-flex', alignItems:'center', gap:'8px',
                  }}>
                    ↓ Download CV (PDF)
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}