'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EDU = [
  { degree:'Diploma in Information Technology', short:'DIT', board:'KPK Board', school:'GTVC Khaki', icon:'💻', color:'var(--c1)', year:'IT & Computing' },
  { degree:'Intermediate in Commerce (I.COM)',   short:'I.COM', board:'Federal Board', school:'IMCG Islamabad', icon:'📊', color:'var(--c3)', year:'Commerce' },
  { degree:'Matriculation (Science – Biology)',  short:'Matric', board:'Federal Board', school:'IMCG Islamabad', icon:'🔬', color:'var(--c4)', year:'Science' },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <section id="education" ref={ref} style={{ padding:'clamp(70px,10vw,120px) clamp(20px,5vw,80px)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', left:'-2%', top:'10%', fontFamily:'var(--font-cormorant)', fontSize:'clamp(90px,16vw,200px)', fontWeight:300, color:'rgba(61,204,199,.025)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>EDU</div>

      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.9,ease:[.16,1,.3,1]}} style={{ marginBottom:'56px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
            <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.5em', textTransform:'uppercase', color:'var(--c2)' }}>Education</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,4rem)', color:'var(--deep-text)', lineHeight:1.1 }}>
            Academic <em style={{ fontStyle:'italic', color:'var(--c3)' }}>Journey</em>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position:'relative', paddingLeft:'clamp(32px,5vw,56px)' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute', left:0, top:'24px', bottom:'24px', width:'1px', background:'linear-gradient(to bottom,transparent,var(--c1) 10%,var(--c3) 50%,var(--c4) 90%,transparent)', opacity:.35 }} />

          <div style={{ display:'flex', flexDirection:'column', gap:'36px' }}>
            {EDU.map((e,i)=>(
              <motion.div key={e.short}
                initial={{opacity:0,x:-36}} animate={inView?{opacity:1,x:0}:{}}
                transition={{duration:.85,delay:.15+i*.15,ease:[.16,1,.3,1]}}
                style={{ position:'relative', display:'flex', gap:'24px', alignItems:'flex-start' }}>

                {/* Timeline dot with ping */}
                <div style={{ position:'absolute', left:'clamp(-48px,-6.5vw,-36px)', top:'18px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div className="ping" style={{ position:'absolute', width:'18px', height:'18px', borderRadius:'50%', background:`${e.color}`, opacity:.2 }} />
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:e.color, boxShadow:`0 0 12px ${e.color}`, zIndex:1 }} />
                </div>

                {/* Card */}
                <div className="tilt-card" style={{
                  flex:1, padding:'clamp(20px,3vw,32px)',
                  background:'rgba(7,190,184,.04)',
                  border:`1px solid rgba(61,204,199,.1)`,
                  borderLeft:`2px solid ${e.color}`,
                  borderRadius:'16px',
                  transition:'all .4s var(--ease-spring)',
                  cursor:'default',
                }}
                onMouseEnter={el=>{const t=el.currentTarget as HTMLElement;t.style.background='rgba(7,190,184,.07)';t.style.transform='translateX(6px)';t.style.boxShadow=`0 12px 40px rgba(7,190,184,.12)`}}
                onMouseLeave={el=>{const t=el.currentTarget as HTMLElement;t.style.background='rgba(7,190,184,.04)';t.style.transform='none';t.style.boxShadow='none'}}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                      <div style={{ width:'48px', height:'48px', borderRadius:'12px', background:`rgba(7,190,184,.1)`, border:`1px solid rgba(61,204,199,.15)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>{e.icon}</div>
                      <div>
                        <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:600, fontSize:'clamp(1.05rem,2.2vw,1.35rem)', color:'var(--deep-text)', lineHeight:1.2 }}>{e.degree}</h3>
                        <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.78rem', color:'var(--muted-text)', marginTop:'4px' }}>{e.school} · {e.board}</p>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px' }}>
                      <span style={{ fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', padding:'5px 14px', borderRadius:'20px', background:`rgba(7,190,184,.1)`, color:'var(--c3)', border:`1px solid rgba(61,204,199,.2)` }}>{e.short}</span>
                      <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.68rem', color:'var(--muted-text)', letterSpacing:'.08em' }}>{e.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}