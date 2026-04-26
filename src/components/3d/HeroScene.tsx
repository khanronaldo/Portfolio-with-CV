'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingRing({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.3
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.2
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.5, 0.015, 16, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
    </mesh>
  )
}

function Crystal({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.4
    ref.current.rotation.x = clock.elapsedTime * 0.2
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.2
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
    </mesh>
  )
}

function GlowOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.2
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.8) * 0.1)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

function ResponsiveScene() {
  const { size } = useThree()
  
  // Elements ko center mein rakhne ke liye responsive scale
  const responsiveScale = useMemo(() => {
    const aspect = size.width / size.height
    return aspect < 1 ? aspect * 1.5 : 1.2 // Mobile par thora bara aur centered dikhega
  }, [size.width, size.height])

  return (
    /* Group ko 0,0,0 par rakha hai jo Canvas ka center hota hai */
    <group scale={responsiveScale} position={[0, 0, 0]}>
      <FloatingRing position={[-1.8, 0.6, 0]} color="#07beb8" speed={0.8} />
      <FloatingRing position={[2.0, -0.4, -1]} color="#3dccc7" speed={0.6} />
      <Crystal position={[1.2, 0.9, 0]} color="#68d8d6" />
      <Crystal position={[-1.2, -0.8, -1]} color="#9ceaef" />
      <GlowOrb position={[0.4, 1.6, 0]} color="#07beb8" />
      <GlowOrb position={[-0.6, -1.4, 0]} color="#3dccc7" />
      <GlowOrb position={[1.8, -1.2, -1]} color="#c4fff9" />
    </group>
  )
}

export default function HeroScene() {
  return (
    /* Wrapper div jo Canvas ko center mein force karega */
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        gl={{ antialias: true, alpha: true }} 
        className="w-full h-full"
      >
        <ResponsiveScene />
      </Canvas>
    </div>
  )
}