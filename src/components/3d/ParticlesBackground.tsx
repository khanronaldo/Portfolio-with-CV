'use client'
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const C1 = '#07beb8'; const C2 = '#3dccc7'; const C3 = '#68d8d6'
const C4 = '#9ceaef'; const C5 = '#c4fff9'

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const g   = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [C1,C2,C3,C4,C5].map(h => new THREE.Color(h))
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-.5)*34; pos[i*3+1] = (Math.random()-.5)*34; pos[i*3+2] = (Math.random()-.5)*16-4
      const c = palette[Math.floor(Math.random()*palette.length)]
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos,3))
    g.setAttribute('color',    new THREE.BufferAttribute(col,3))
    return g
  }, [count])
  const mat = useMemo(() => new THREE.PointsMaterial({
    size:.055, vertexColors:true, transparent:true, opacity:.5,
    sizeAttenuation:true, blending:THREE.AdditiveBlending, depthWrite:false
  }), [])
  useFrame(({ clock: ck }) => {
    if (!ref.current) return
    ref.current.rotation.y = ck.elapsedTime * .01
    ref.current.rotation.x = ck.elapsedTime * .004
    ref.current.position.y = Math.sin(ck.elapsedTime * .07) * .3
  })
  return <points ref={ref} geometry={geo} material={mat} />
}

function FloatTorus({ pos, col, spd=1 }: { pos:[number,number,number]; col:string; spd?:number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock: ck }) => {
    if (!ref.current) return
    ref.current.rotation.x = ck.elapsedTime * spd * .35
    ref.current.rotation.y = ck.elapsedTime * spd * .25
    ref.current.position.y = pos[1] + Math.sin(ck.elapsedTime * spd * .5) * .5
  })
  return (
    <mesh ref={ref} position={pos}>
      <torusGeometry args={[.65,.035,16,64]} />
      <meshBasicMaterial color={col} transparent opacity={.22} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

function FloatOcta({ pos, col, spd=1 }: { pos:[number,number,number]; col:string; spd?:number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock: ck }) => {
    if (!ref.current) return
    ref.current.rotation.x = ck.elapsedTime * spd * .4
    ref.current.rotation.y = ck.elapsedTime * spd * .3
    ref.current.position.y = pos[1] + Math.sin(ck.elapsedTime * spd * .6 + 1) * .45
  })
  return (
    <mesh ref={ref} position={pos}>
      <octahedronGeometry args={[.28, 0]} />
      <meshBasicMaterial color={col} transparent opacity={.28} wireframe />
    </mesh>
  )
}

export default function ParticlesBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted,  setMounted]  = useState(false)
  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check, { passive:true })
    return () => window.removeEventListener('resize', check)
  }, [])
  if (!mounted) return null

  if (isMobile) return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{
      background:'radial-gradient(ellipse at 20% 20%,rgba(61,204,199,.12) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(7,190,184,.08) 0%,transparent 60%),#020d0d'
    }}/>
  )

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background:'#020d0d' }}>
      <Canvas dpr={[1,1.2]} camera={{ position:[0,0,14], fov:58 }}
        gl={{ antialias:false, alpha:true, powerPreference:'high-performance', preserveDrawingBuffer:false }}
        style={{ pointerEvents:'none' }}>
        <Particles count={300} />
        <FloatTorus pos={[-5.5, 1.8,-3]} col={C1} spd={.55} />
        <FloatTorus pos={[ 5.5,-1.2,-4]} col={C3} spd={.4}  />
        <FloatTorus pos={[ 0,   3.5,-5]} col={C2} spd={.35} />
        <FloatOcta  pos={[-3.8,-2.2,-2]} col={C2} spd={.7}  />
        <FloatOcta  pos={[ 4.8, 2.5,-3]} col={C4} spd={.5}  />
        <FloatOcta  pos={[ 1.2,-3.5,-2]} col={C1} spd={.65} />
      </Canvas>
    </div>
  )
}