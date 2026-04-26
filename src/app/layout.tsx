import type { Metadata } from 'next'
import '@/styles/globals.css'
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(() => import('@/components/3d/ParticlesBackground'), { ssr: false })
const CustomCursor        = dynamic(() => import('@/components/ui/CustomCursor'),         { ssr: false })
const PageLoader          = dynamic(() => import('@/components/ui/PageLoader'),            { ssr: false })
const FloatingPetals      = dynamic(() => import('@/components/ui/FloatingPetals'),       { ssr: false })

export const metadata: Metadata = {
  title: 'Zainishba Noor — Portfolio',
  description: 'Professional portfolio of Zainishba Noor — Educator, IT Graduate & Creative Professional.',
  keywords: ['Zainishba Noor', 'Portfolio', 'CV', 'Educator', 'IT', 'Commerce'],
  authors: [{ name: 'Zainishba Noor' }],
  openGraph: {
    title: 'Zainishba Noor — Portfolio',
    description: 'Modern portfolio & CV of Zainishba Noor',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#011627]">
        <PageLoader />
        <ParticlesBackground />
        <FloatingPetals />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}