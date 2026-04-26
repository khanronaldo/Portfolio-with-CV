'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SkillsBg() {
  const ref = useRef<THREE.Points>(null)
  const geo = useRef(new THREE.BufferGeometry())
  useEffect(() => {
    const n=120, pos=new Float32Array(n*3), col=new Float32Array(n*3)
    const cs=[new THREE.Color('#07beb8'),new THREE.Color('#3dccc7'),new THREE.Color('#9ceaef')]
    for(let i=0;i<n;i++){
      pos[i*3]=(Math.random()-.5)*22; pos[i*3+1]=(Math.random()-.5)*22; pos[i*3+2]=(Math.random()-.5)*10-3
      const c=cs[Math.floor(Math.random()*3)]; col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b
    }
    geo.current.setAttribute('position',new THREE.BufferAttribute(pos,3))
    geo.current.setAttribute('color',new THREE.BufferAttribute(col,3))
  },[])
  const mat = useRef(new THREE.PointsMaterial({ size:.04,vertexColors:true,transparent:true,opacity:.35,sizeAttenuation:true,blending:THREE.AdditiveBlending,depthWrite:false }))
  useFrame(({clock})=>{ if(ref.current){ ref.current.rotation.y=clock.elapsedTime*.008; ref.current.position.y=Math.sin(clock.elapsedTime*.05)*.2 }})
  return <points ref={ref} geometry={geo.current} material={mat.current} />
}

const GROUPS = [
  { title:'Technology & IT', icon:'💻', color:'var(--c1)', skills:[{name:'MS Word / PowerPoint',pct:88},{name:'MS Excel',pct:80},{name:'Web Development Basics',pct:65},{name:'Database Basics',pct:60},{name:'Data Entry & Typing',pct:92}] },
  { title:'Creative Design',  icon:'🎨', color:'var(--c3)', skills:[{name:'Canva',pct:90},{name:'Photoshop',pct:72},{name:'Graphic Design',pct:75}] },
  { title:'Professional',     icon:'🌟', color:'var(--c2)', skills:[{name:'Communication',pct:92},{name:'Team Collaboration',pct:88},{name:'Presentation',pct:85},{name:'Teaching',pct:95}] },
]

const HOBBIES = [{ label:'Painting',icon:'🖼️'},{label:'Book Reading',icon:'📚'},{label:'Creative Arts',icon:'✨'},{label:'Teaching',icon:'🎓'}]

function SkillBar({ name,pct,color,delay,inView }:{ name:string;pct:number;color:string;delay:number;inView:boolean }) {
  return (
    <div style={{ marginBottom:'16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
        <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.8rem', color:'var(--deep-text)' }}>{name}</span>
        <span style={{ fontFamily:'var(--font-space)', fontWeight:500, fontSize:'.72rem', color:'var(--c3)' }}>{pct}%</span>
      </div>
      <div style={{ height:'3px', background:'rgba(61,204,199,.1)', borderRadius:'3px', overflow:'hidden', position:'relative' }}>
        <motion.div initial={{ width:0 }} animate={inView?{width:`${pct}%`}:{width:0}}
          transition={{ duration:1.3, delay, ease:[.16,1,.3,1] }}
          style={{ height:'100%', background:`linear-gradient(90deg,var(--c1),var(--c3))`, borderRadius:'3px', position:'relative' }}>
          {/* Shimmer */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)', animation:'shimmer 2s linear infinite' }} />
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => { const check=()=>setIsMobile(window.innerWidth<768); check(); window.addEventListener('resize',check,{passive:true}); return()=>window.removeEventListener('resize',check) }, [])

  return (
    <section id="skills" ref={ref} style={{ padding:'clamp(70px,10vw,120px) clamp(20px,5vw,80px)', position:'relative', overflow:'hidden' }}>
      {/* 3D background */}
      {!isMobile && (
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.7 }}>
          <Canvas dpr={[1,1.2]} camera={{position:[0,0,12],fov:58}} gl={{antialias:false,alpha:true,powerPreference:'high-performance'}} style={{pointerEvents:'none'}}>
            <SkillsBg />
          </Canvas>
        </div>
      )}

      <div style={{ position:'relative', zIndex:2, maxWidth:'1200px', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.9,ease:[.16,1,.3,1]}} style={{ marginBottom:'56px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
            <span style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.5em', textTransform:'uppercase', color:'var(--c2)' }}>Skills & Expertise</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-cormorant)', fontWeight:300, fontSize:'clamp(2.2rem,5vw,4rem)', color:'var(--deep-text)', lineHeight:1.1 }}>
            What I <em style={{ fontStyle:'italic', color:'var(--c3)' }}>Bring</em>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'20px', marginBottom:'40px' }}>
          {GROUPS.map((g,gi)=>(
            <motion.div key={g.title} initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.85,delay:.15+gi*.12,ease:[.16,1,.3,1]}}>
              <div style={{
                padding:'28px', background:'rgba(7,190,184,.04)',
                border:'1px solid rgba(61,204,199,.1)', borderRadius:'20px',
                backdropFilter:'blur(12px)', height:'100%',
                transition:'all .35s', cursor:'default',
              }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background='rgba(7,190,184,.07)';el.style.borderColor='rgba(61,204,199,.22)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background='rgba(7,190,184,.04)';el.style.borderColor='rgba(61,204,199,.1)'}}>
                <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px', paddingBottom:'16px', borderBottom:'1px solid rgba(61,204,199,.08)' }}>
                  <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:'rgba(7,190,184,.1)', border:'1px solid rgba(61,204,199,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem' }}>{g.icon}</div>
                  <h3 style={{ fontFamily:'var(--font-cormorant)', fontWeight:600, fontSize:'1.2rem', color:'var(--deep-text)' }}>{g.title}</h3>
                </div>
                {g.skills.map((s,si)=>(
                  <SkillBar key={s.name} name={s.name} pct={s.pct} color={g.color} delay={.3+gi*.1+si*.07} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hobbies */}
        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.9,delay:.6,ease:[.16,1,.3,1]}}>
          <p style={{ fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.62rem', letterSpacing:'.4em', textTransform:'uppercase', color:'var(--muted-text)', marginBottom:'16px' }}>Hobbies & Interests</p>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            {HOBBIES.map((h,i)=>(
              <motion.div key={h.label} className="skill-tag"
                initial={{opacity:0,scale:.7}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{duration:.5,delay:.65+i*.08,ease:[.34,1.56,.64,1]}}
                style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 20px', background:'rgba(7,190,184,.04)', border:'1px solid rgba(61,204,199,.12)', borderRadius:'50px', fontFamily:'var(--font-space)', fontWeight:300, fontSize:'.82rem', color:'var(--deep-text)' }}>
                <span>{h.icon}</span><span>{h.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}