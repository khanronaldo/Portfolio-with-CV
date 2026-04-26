import type { Metadata, Viewport } from 'next' // Viewport add kiya
import '@/styles/globals.css'
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(() => import('@/components/3d/ParticlesBackground'), { ssr: false })
const CustomCursor         = dynamic(() => import('@/components/ui/CustomCursor'),         { ssr: false })
const PageLoader           = dynamic(() => import('@/components/ui/PageLoader'),            { ssr: false })
const FloatingPetals       = dynamic(() => import('@/components/ui/FloatingPetals'),       { ssr: false })

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

// Mobile par zooming issues fix karne ke liye viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden"> 
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* overflow-x-hidden lagaya taake elements screen se bahar na nikalein */}
      <body className="antialiased bg-[#011627] overflow-x-hidden min-h-screen selection:bg-teal-500/30">
        <PageLoader />
        <ParticlesBackground />
        <FloatingPetals />
        <CustomCursor />
        {/* Main content wrapper jo mobile par padding maintain karega */}
        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  )
}