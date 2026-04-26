'use client'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Torus, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

/* ── 3D SCENE ──────────────────────────────────────── */
function HeroOrb() {
  return (
    <Float speed={1.6} rotationIntensity={.5} floatIntensity={1.4}>
      {/* ORB KA SIZE 1 SE 0.7 KAR DIYA HAI */}
      <Sphere args={[0.7, 80, 80]}>
        <MeshDistortMaterial color="#3dccc7" attach="material"
          distort={.42} speed={2} roughness={.1} metalness={.15}
          transparent opacity={.78} />
      </Sphere>
      {/* Outer wireframe shell KA SIZE BHI KAM KIYA HAI */}
      <Sphere args={[0.95, 28, 28]}>
        <meshBasicMaterial color="#07beb8" wireframe transparent opacity={.06} />
      </Sphere>
    </Float>
  )
}

function OrbitRing({ radius, speed, tilt, color }: { radius:number; speed:number; tilt:number; color:string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.elapsedTime * speed
    ref.current.rotation.x = tilt
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, .018, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={.35} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

function FloatDiamond({ position, color, speed }: { position:[number,number,number]; color:string; speed:number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * speed
    ref.current.rotation.y = clock.elapsedTime * speed * .7
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * .6 + position[0]) * .3
  })
  return (
    <mesh ref={ref} position={position}>
      {/* Diamonds ka size aur chota kar diya */}
      <octahedronGeometry args={[.18, 0]} />
      <meshBasicMaterial color={color} transparent opacity={.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

function HeroScene() {
  return (
    <Canvas dpr={[1,1.5]} camera={{ position:[0,0,5], fov:45 }}
      gl={{ antialias:false, alpha:true, powerPreference:'high-performance' }}
      style={{ pointerEvents:'none', background:'transparent' }}>
      <ambientLight intensity={.4} />
      <pointLight position={[4,4,4]}   intensity={2}   color="#3dccc7" />
      <pointLight position={[-4,-3,-4]} intensity={1.2} color="#9ceaef" />
      <pointLight position={[0,0,3]}   intensity={.8}  color="#c4fff9" />

      <HeroOrb />
      {/* 3D RINGS KA RADIUS BOHT CHOTA KAR DIYA HAI */}
      <OrbitRing radius={1.1} speed={.28} tilt={Math.PI/2.5}  color="#07beb8" />
      <OrbitRing radius={1.35} speed={-.2} tilt={Math.PI/4}    color="#3dccc7" />
      <OrbitRing radius={0.85} speed={.4}  tilt={Math.PI/6}    color="#9ceaef" />

      {/* DIAMONDS KO BHI ORB KE QAREEB KAR DIYA HAI */}
      <FloatDiamond position={[ 1.5,  0.6, 0]} color="#68d8d6" speed={.6} />
      <FloatDiamond position={[-1.5, -0.6,-1]} color="#3dccc7" speed={.5} />
      <FloatDiamond position={[ 1.3, -1.0, 0]} color="#c4fff9" speed={.7} />
    </Canvas>
  )
}

/* ── TEXT ANIMATION VARIANTS ─────────────────────────── */
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:.1 }}}
const fadeUp  = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:.9, ease:[.16,1,.3,1] as any }}}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Parallax on scroll */
  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const onScroll = () => {
      const py = window.scrollY
      el.querySelectorAll('[data-par]').forEach(node => {
        const speed = parseFloat((node as HTMLElement).dataset.par || '0')
        ;(node as HTMLElement).style.transform = `translateY(${py * speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" ref={sectionRef} style={{
      minHeight:'100vh', display:'grid',
      gridTemplateColumns:'1fr 1fr',
      alignItems:'center',
      padding:'clamp(100px,12vw,140px) clamp(20px,5vw,80px) 60px',
      gap:'32px', position:'relative', overflow:'hidden',
    }}>
      {/* BG glows */}
      <div data-par=".15" style={{
        position:'absolute', top:'-10%', right:'2%',
        width:'clamp(280px,45vw,600px)', height:'clamp(280px,45vw,600px)',
        borderRadius:'50%',
        background:'radial-gradient(circle,rgba(61,204,199,.12) 0%,transparent 70%)',
        pointerEvents:'none', willChange:'transform',
      }}/>
      <div data-par=".08" style={{
        position:'absolute', bottom:'5%', left:'-3%',
        width:'clamp(160px,28vw,380px)', height:'clamp(160px,28vw,380px)',
        borderRadius:'50%',
        background:'radial-gradient(circle,rgba(7,190,184,.08) 0%,transparent 70%)',
        pointerEvents:'none', willChange:'transform',
      }}/>

      {/* ── LEFT TEXT ─────────────────────────────────── */}
      <motion.div variants={stagger} initial="hidden" animate="show" style={{ zIndex:10, position:'relative' }}>

        {/* Eyebrow */}
        <motion.div variants={fadeUp} style={{
          display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px',
        }}>
          <div style={{ width:'28px', height:'1px', background:'var(--c2)' }} />
          <span style={{
            fontFamily:'var(--font-space)', fontWeight:300,
            fontSize:'.62rem', letterSpacing:'.55em', textTransform:'uppercase', color:'var(--c2)',
          }}>Welcome to my Portfolio</span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUp} style={{
          fontFamily:'var(--font-greatvibes)',
          fontSize:'clamp(3.2rem,7.5vw,6rem)',
          lineHeight:1.05, marginBottom:'10px',
          background:'linear-gradient(135deg,var(--c3),var(--c5) 50%,var(--c2))',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text',
          filter:'drop-shadow(0 0 30px rgba(61,204,199,.25))',
        }}>
          Zainishba Noor
        </motion.h1>

        {/* Role */}
        <motion.h2 variants={fadeUp} style={{
          fontFamily:'var(--font-cormorant)', fontWeight:300, fontStyle:'italic',
          fontSize:'clamp(1rem,2.2vw,1.5rem)',
          color:'var(--muted-text)', letterSpacing:'.06em', marginBottom:'24px',
        }}>
          Educator · IT Graduate · Creative Professional
        </motion.h2>

        {/* Body */}
        <motion.p variants={fadeUp} style={{
          fontFamily:'var(--font-space)', fontWeight:300,
          fontSize:'clamp(.82rem,1.4vw,.95rem)', color:'rgba(156,234,239,.5)',
          lineHeight:1.85, maxWidth:'440px', marginBottom:'36px',
        }}>
          Passionate about education, technology, and creative design. Combining commerce knowledge with IT skills to build meaningful professional impact.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'32px' }}>
          <a href="#about" data-hover style={{
            fontFamily:'var(--font-space)', fontWeight:500,
            fontSize:'.72rem', letterSpacing:'.22em', textTransform:'uppercase',
            padding:'13px 30px',
            background:'linear-gradient(135deg,var(--c1),var(--c2))',
            color:'#020d0d', borderRadius:'50px', textDecoration:'none', cursor:'none',
            transition:'all .35s', boxShadow:'0 8px 28px rgba(7,190,184,.35)',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(7,190,184,.5)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='0 8px 28px rgba(7,190,184,.35)'}}>
            Explore
          </a>
          <a href="#cv" data-hover style={{
            fontFamily:'var(--font-space)', fontWeight:400,
            fontSize:'.72rem', letterSpacing:'.22em', textTransform:'uppercase',
            padding:'13px 30px', border:'1px solid rgba(61,204,199,.3)',
            color:'var(--c3)', borderRadius:'50px', textDecoration:'none', cursor:'none',
            transition:'all .35s',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--c3)';(e.currentTarget as HTMLElement).style.background='rgba(61,204,199,.08)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(61,204,199,.3)';(e.currentTarget as HTMLElement).style.background='transparent'}}>
            View CV ↗
          </a>
        </motion.div>

        {/* Contact pills */}
        <motion.div variants={fadeUp} style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
          {[{icon:'📞',text:'+92-330-5521979'},{icon:'✉️',text:'zainishbanoor@gmail.com'}].map(c=>(
            <div key={c.text} style={{
              display:'flex', alignItems:'center', gap:'8px',
              fontFamily:'var(--font-space)', fontWeight:300,
              fontSize:'.72rem', color:'rgba(156,234,239,.4)', letterSpacing:'.04em',
            }}>
              <span>{c.icon}</span><span>{c.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT 3D ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity:0, scale:.82 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:1.5, ease:[.16,1,.3,1], delay:.25 }}
        style={{ height:'clamp(300px,52vw,600px)', position:'relative' }}
      >
        {/* CSS ORBITS KA BAHAIR WALA SIZE BOHT CHOTA KAR DIYA HAI */}
        {[{s:'38%',d:'20s',r:false},{s:'50%',d:'32s',r:true},{s:'62%',d:'48s',r:false}].map((o,i)=>(
          <div key={i} style={{
            position:'absolute', top:'50%', left:'50%',
            width:o.s, height:o.s,
            borderRadius:'50%',
            border:`1px ${i===1?'dashed':'solid'} rgba(61,204,199,${.12-.03*i})`,
            animation:`orbit${o.r?'SpinRev':'Spin'} ${o.d} linear infinite`,
            transform:'translate(-50%,-50%)',
            pointerEvents:'none',
          }}/>
        ))}
        <HeroScene />
      </motion.div>

      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
      }}>
        <span style={{
          fontFamily:'var(--font-space)', fontSize:'.58rem',
          letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(156,234,239,.3)',
        }}>Scroll</span>
        <div style={{
          width:'1px', height:'48px',
          background:'linear-gradient(to bottom,var(--c2),transparent)',
          animation:'scrollDrop 2.2s ease infinite',
        }}/>
      </div>

     
    </section>
  )
}