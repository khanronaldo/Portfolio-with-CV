'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value:'4+',    label:'Years Teaching',    icon:'🎓' },
  { value:'DIT',   label:'IT Diploma',        icon:'💻' },
  { value:'I.COM', label:'Commerce Degree',   icon:'📊' },
  { value:'3',     label:'Languages',         icon:'🌍' },
]

/* ── Mini 3D wireframe sphere via canvas 2D ────────── */
function WireOrb({ size=320 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!; let t = 0; let raf: number
    const RINGS=14, PTS=28
    function project(x:number,y:number,z:number,cx:number,cy:number){
      const s=500/(500+z); return { x:cx+x*s, y:cy+y*s, s }
    }
    function sphere(rx:number,ry:number,r:number){
      const pts:Array<{x:number,y:number,z:number}>=[]
      for(let i=0;i<RINGS;i++){
        const phi=(i/(RINGS-1))*Math.PI
        for(let j=0;j<PTS;j++){
          const th=(j/PTS)*Math.PI*2
          let x=r*Math.sin(phi)*Math.cos(th)
          let y=r*Math.cos(phi)
          let z=r*Math.sin(phi)*Math.sin(th)
          let y2=y*Math.cos(rx)-z*Math.sin(rx); let z2=y*Math.sin(rx)+z*Math.cos(rx); y=y2; z=z2
          let x2=x*Math.cos(ry)+z*Math.sin(ry); let z3=-x*Math.sin(ry)+z*Math.cos(ry); x=x2; z=z3
          pts.push({x,y,z})
        }
      }
      return pts
    }
    function loop(){
      ctx.clearRect(0,0,size,size)
      t+=.008
      const cx=size*.5, cy=size*.52
      const grd=ctx.createRadialGradient(cx,cy,0,cx,cy,size*.42)
      grd.addColorStop(0,'rgba(61,204,199,.07)'); grd.addColorStop(.5,'rgba(7,190,184,.04)'); grd.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=grd; ctx.fillRect(0,0,size,size)
      const pts=sphere(t*.12,t*.18,size*.28)
      for(let i=0;i<RINGS;i++){
        ctx.beginPath()
        for(let j=0;j<=PTS;j++){
          const idx=(j%PTS)+i*PTS
          const p=pts[idx]; const pr=project(p.x,p.y,p.z,cx,cy)
          const a=Math.max(.02,((p.z+size*.28)/(size*.56))*.22)
          ctx.strokeStyle=`rgba(61,204,199,${a})`;ctx.lineWidth=.5
          j===0?ctx.moveTo(pr.x,pr.y):ctx.lineTo(pr.x,pr.y)
        }
        ctx.stroke()
      }
      for(let j=0;j<PTS;j++){
        ctx.beginPath()
        for(let i=0;i<RINGS;i++){
          const p=pts[j+i*PTS]; const pr=project(p.x,p.y,p.z,cx,cy)
          i===0?ctx.moveTo(pr.x,pr.y):ctx.lineTo(pr.x,pr.y)
        }
        ctx.strokeStyle='rgba(104,216,214,.06)'; ctx.lineWidth=.4; ctx.stroke()
      }
      // orbiting dots
      for(let i=0;i<5;i++){
        const a=t*(.5+i*.1)+i*(Math.PI*2/5)
        const r2=size*.3
        const ox=r2*Math.cos(a); const oy=r2*Math.sin(a)*.55; const oz=r2*Math.sin(a)
        const pr=project(ox,oy,oz,cx,cy)
        const bright=(oz+r2)/(r2*2)
        ctx.beginPath(); ctx.arc(pr.x,pr.y,2.5*pr.s,0,Math.PI*2)
        ctx.fillStyle=`rgba(61,204,199,${.7*bright+.1})`; ctx.fill()
        const g2=ctx.createRadialGradient(pr.x,pr.y,0,pr.x,pr.y,9)
        g2.addColorStop(0,`rgba(61,204,199,${.2*bright})`); g2.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(pr.x,pr.y,9,0,Math.PI*2); ctx.fill()
      }
      // rings
      for(let ri=0;ri<4;ri++){
        const tilt=.4+ri*.3
        const rad=size*(.2+ri*.06)
        ctx.beginPath()
        for(let k=0;k<=80;k++){
          const a=(k/80)*Math.PI*2
          const rx2=rad*Math.cos(a); const ry2=rad*Math.sin(a)*Math.cos(tilt+t*.1)
          const rz2=rad*Math.sin(a)*Math.sin(tilt+t*.1)
          const px2=rx2*Math.cos(t*(.04+ri*.01)+ri)-rz2*Math.sin(t*(.04+ri*.01)+ri)
          const pz2=rx2*Math.sin(t*(.04+ri*.01)+ri)+rz2*Math.cos(t*(.04+ri*.01)+ri)
          const pr2=project(px2,ry2,pz2,cx,cy)
          k===0?ctx.moveTo(pr2.x,pr2.y):ctx.lineTo(pr2.x,pr2.y)
        }
        ctx.strokeStyle=`rgba(61,204,199,${.06+ri*.015})`; ctx.lineWidth=.6; ctx.stroke()
      }
      raf=requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [size])
  return <canvas ref={ref} width={size} height={size} style={{ width:'100%', height:'100%' }} />
}

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <section id="about" ref={ref} style={{ padding:'clamp(70px,10vw,120px) clamp(20px,5vw,80px)', position:'relative', overflow:'hidden' }}>
      {/* BG text */}
      <div style={{
        position:'absolute', right:'-2%', top:'10%',
        fontFamily:'var(--font-cormorant)', fontSize:'clamp(100px,18vw,220px)',
        fontWeight:300, color:'rgba(61,204,199,.025)', lineHeight:1,
        pointerEvents:'none', userSelect:'none', letterSpacing:'-.02em',
      }}>ABOUT</div>

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.9,ease:[.16,1,.3,1]}} style={{ marginBottom:'56px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
            <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.5em', textTransform:'uppercase', color:'var(--c2)' }}>About Me</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,4rem)', color:'var(--deep-text)', lineHeight:1.1 }}>
            Shaping minds,<br/><em style={{ fontStyle:'italic', color:'var(--c3)' }}>inspiring futures</em>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'56px', alignItems:'start' }}>

          {/* 3D ORB SIDE */}
          <motion.div initial={{opacity:0,x:-32}} animate={inView?{opacity:1,x:0}:{}}
            transition={{duration:.9,delay:.15,ease:[.16,1,.3,1]}}
            style={{ position:'relative' }}>
            <div style={{
              width:'100%', maxWidth:'380px', aspectRatio:'1',
              margin:'0 auto', position:'relative',
            }}>
              <WireOrb size={380} />
              {/* Glow underneath */}
              <div style={{
                position:'absolute', bottom:'-20px', left:'50%', transform:'translateX(-50%)',
                width:'60%', height:'60px',
                background:'radial-gradient(ellipse,rgba(7,190,184,.18) 0%,transparent 70%)',
                filter:'blur(12px)',
                pointerEvents:'none',
              }}/>
            </div>
            {/* Stats grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'28px' }}>
              {STATS.map((s,i)=>(
                <motion.div key={s.label} className="tilt-card"
                  initial={{opacity:0,scale:.85}} animate={inView?{opacity:1,scale:1}:{}}
                  transition={{duration:.6,delay:.35+i*.08,ease:[.34,1.56,.64,1]}}
                  style={{
                    padding:'18px 14px',
                    background:'rgba(7,190,184,.04)',
                    border:'1px solid rgba(61,204,199,.12)',
                    borderRadius:'14px', textAlign:'center',
                    transition:'all .35s ease', cursor:'default',
                  }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(61,204,199,.3)';el.style.background='rgba(7,190,184,.08)';el.style.transform='translateY(-4px)';el.style.boxShadow='0 12px 30px rgba(7,190,184,.15)'}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(61,204,199,.12)';el.style.background='rgba(7,190,184,.04)';el.style.transform='none';el.style.boxShadow='none'}}>
                  <div style={{ fontSize:'1.2rem', marginBottom:'6px' }}>{s.icon}</div>
                  <div style={{ fontFamily:'var(--font-cormorant)', fontWeight:600, fontSize:'1.7rem', color:'var(--c3)', lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted-text)', marginTop:'5px' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TEXT SIDE */}
          <motion.div initial={{opacity:0,x:32}} animate={inView?{opacity:1,x:0}:{}}
            transition={{duration:.9,delay:.25,ease:[.16,1,.3,1]}}
            style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

            {/* Objective card */}
            <div style={{
              padding:'28px 32px',
              background:'rgba(7,190,184,.04)',
              border:'1px solid rgba(61,204,199,.12)',
              borderRadius:'20px',
              borderLeft:'2px solid var(--c2)',
            }}>
              <div style={{ width:'28px', height:'1px', background:'var(--c2)', marginBottom:'16px' }} />
              <p style={{
                fontFamily:'var(--font-cormorant)', fontStyle:'italic',
                fontSize:'clamp(.98rem,1.8vw,1.15rem)', color:'rgba(196,255,249,.65)',
                lineHeight:1.9, fontWeight:300,
              }}>
                "To secure a position in the banking sector where I can utilize my commerce knowledge and IT skills to handle financial transactions, maintain records, and provide excellent customer service, while contributing to the growth of the organization."
              </p>
            </div>

            {/* Personal info */}
            <div style={{
              background:'rgba(7,190,184,.03)',
              border:'1px solid rgba(61,204,199,.1)',
              borderRadius:'20px', overflow:'hidden',
            }}>
              <div style={{ padding:'16px 24px', borderBottom:'1px solid rgba(61,204,199,.08)' }}>
                <span style={{ fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.68rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--c2)' }}>Personal Details</span>
              </div>
              {[
                ['Date of Birth', '17 May 2003'],
                ['Nationality',   'Pakistani'],
                ['Father',        'Muhammad Waseem'],
                ['Marital Status','Single'],
                ['Location',      'Ghori Town, Islamabad'],
                ['CNIC',          '13503-5475495-0'],
              ].map(([k,v],i)=>(
                <div key={k} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'12px 24px',
                  borderBottom: i<5 ? '1px solid rgba(61,204,199,.06)' : 'none',
                  transition:'background .25s',
                }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(61,204,199,.04)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='transparent'}>
                  <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.78rem', color:'var(--muted-text)' }}>{k}</span>
                  <span style={{ fontFamily:'var(--font-space)', fontWeight:400, fontSize:'.82rem', color:'var(--deep-text)' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.4em', textTransform:'uppercase', color:'var(--muted-text)', marginBottom:'14px' }}>Languages</p>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                {[{lang:'Urdu',level:'Fluent',pct:98},{lang:'English',level:'Good',pct:72},{lang:'Pashto',level:'Intermediate',pct:55}].map(l=>(
                  <div key={l.lang} style={{
                    padding:'12px 20px',
                    background:'rgba(7,190,184,.04)',
                    border:'1px solid rgba(61,204,199,.12)',
                    borderRadius:'50px',
                    display:'flex', alignItems:'center', gap:'12px',
                    transition:'all .3s',
                  }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(61,204,199,.3)';el.style.background='rgba(61,204,199,.08)'}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(61,204,199,.12)';el.style.background='rgba(7,190,184,.04)'}}>
                    <div>
                      <div style={{ fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.82rem', color:'var(--deep-text)' }}>{l.lang}</div>
                      <div style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.68rem', color:'var(--muted-text)' }}>{l.level}</div>
                    </div>
                    {/* Conic progress */}
                    <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:`conic-gradient(var(--c2) ${l.pct}%,rgba(61,204,199,.1) 0%)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <div style={{ width:'26px', height:'26px', borderRadius:'50%', background:'#031a1a', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-space)', fontSize:'.55rem', fontWeight:500, color:'var(--c3)' }}>{l.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}