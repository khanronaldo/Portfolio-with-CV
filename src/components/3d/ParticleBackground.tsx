'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Soft rose-gold color palette for particles
const COLORS = ['#f2c4ce', '#c9a96e', '#e8d5b0', '#fce4ec', '#d4849a', '#e8c4a0']

interface ParticlesProps {
  count: number
  isMobile: boolean
}

function ParticleField({ count, isMobile }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material } = useMemo(() => {
    const geo      = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread particles across a large area
      positions[i * 3]     = (Math.random() - 0.5) * (isMobile ? 18 : 28)
      positions[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 18 : 28)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3

      const hex = COLORS[Math.floor(Math.random() * COLORS.length)]
      const c   = new THREE.Color(hex)
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      // Vary sizes for depth
      sizes[i] = Math.random() * 0.06 + 0.02
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))

    const mat = new THREE.PointsMaterial({
      size:         0.055,
      vertexColors: true,
      transparent:  true,
      opacity:      isMobile ? 0.35 : 0.5,
      sizeAttenuation: true,
      blending:     THREE.AdditiveBlending,
      depthWrite:   false,
    })

    return { geometry: geo, material: mat }
  }, [count, isMobile])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.012
    pointsRef.current.rotation.x = Math.sin(t * 0.04) * 0.04
    pointsRef.current.position.y = Math.sin(t * 0.08) * 0.3
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

// Floating 3D ring / torus for decorative depth
function FloatingTorus({ position, color, speed = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.y = t * 0.3
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.4
  })

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.6, 0.04, 16, 60]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  )
}

// Floating crystal / octahedron
function FloatingCrystal({ position, color, speed = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.3
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.5
  })

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} wireframe />
    </mesh>
  )
}

export default function ParticleBackground() {
  const [isMobile, setIsMobile]   = useState(false)
  const [mounted,  setMounted]    = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!mounted) return null

  // Mobile: pure CSS, zero WebGL overhead
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 20% 30%, rgba(242,196,206,0.3) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 70%, rgba(201,169,110,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 5%,  rgba(252,228,236,0.4)  0%, transparent 50%)
          `,
          backgroundColor: '#fdf6f0',
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{
          antialias:          false,
          alpha:              true,
          powerPreference:    'high-performance',
          preserveDrawingBuffer: false,
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ParticleField count={280} isMobile={false} />
        <FloatingTorus    position={[-5,  1.5, -3]} color="#c9a96e" speed={0.6} />
        <FloatingTorus    position={[ 5, -1.0, -4]} color="#f2c4ce" speed={0.4} />
        <FloatingCrystal  position={[-3.5, -2, -2]} color="#c9a96e" speed={0.8} />
        <FloatingCrystal  position={[ 4.5,  2, -3]} color="#f2c4ce" speed={0.5} />
        <FloatingCrystal  position={[ 0,  -3, -2]}  color="#e8d5b0" speed={0.7} />
      </Canvas>
    </div>
  )
}
