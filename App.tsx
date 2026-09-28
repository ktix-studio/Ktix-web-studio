import { useState, Suspense, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { HouseViewer, InteriorViewer } from './components/HouseViewer'
import { FloorPlans } from './components/FloorPlans'
import { FeaturesGrid } from './components/FeaturesGrid'
import { Gallery } from './components/Gallery'
import { ContactForm } from './components/ContactForm'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-luxe-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-luxe-gold/30 border-t-luxe-gold rounded-full animate-spin mx-auto mb-6" />
        <p className="text-white/60 text-sm tracking-widest uppercase">Loading Experience</p>
      </div>
    </div>
  )
}

function HeroSection({ isNight, setIsNight, onRoomClick }: { isNight: boolean; setIsNight: (v: boolean) => void; onRoomClick: (room: string) => void }) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isNight
          ? 'bg-gradient-to-b from-[#0a0a1a] via-[#0a0a0a] to-[#050510]'
          : 'bg-gradient-to-b from-[#1a1a2e] via-[#0a0a0a] to-[#0a0a0a]'
      }`} />

      {/* 3D Viewer */}
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingScreen />}>
          <HouseViewer isNight={isNight} onHotspotClick={onRoomClick} />
        </Suspense>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {/* Top bar */}
        <div className="pt-24 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-luxe-gold text-xs md:text-sm font-medium tracking-widest uppercase">Exclusive Listing</span>
          </motion.div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex items-center px-6 md:px-12">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-7xl font-bold leading-tight"
            >
              Modern
              <br />
              <span className="gradient-text">Living</span>
              <br />
              Redefined
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/50 mt-6 text-sm md:text-lg max-w-md"
            >
              A stunning two-story contemporary residence featuring smart home technology,
              sustainable design, and bespoke finishes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 mt-8 pointer-events-auto"
            >
              <a
                href="#tours"
                className="px-6 py-3 bg-luxe-gold text-black font-semibold rounded-full hover:bg-luxe-gold-light transition-all hover:scale-105 animate-pulse-glow"
              >
                Explore Interior
              </a>
              <a
                href="#floorplans"
                className="px-6 py-3 border border-white/20 text-white/80 font-medium rounded-full hover:border-luxe-gold hover:text-luxe-gold transition-all"
              >
                View Plans
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="pb-8 px-6 md:px-12 flex items-end justify-between pointer-events-auto">
          {/* Price */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white/40 text-xs uppercase tracking-wider">Starting from</p>
            <p className="text-2xl md:text-4xl font-bold text-luxe-gold">$2.4M</p>
          </motion.div>

          {/* Day/Night Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-white/40">☀️</span>
            <button
              onClick={() => setIsNight(!isNight)}
              className="relative w-14 h-7 rounded-full bg-luxe-gray border border-white/10 transition-all"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-500 ${
                  isNight ? 'left-8 bg-indigo-400' : 'left-1 bg-amber-400'
                }`}
              />
            </button>
            <span className="text-xs text-white/40">🌙</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="hidden md:flex items-center gap-8"
          >
            <div className="text-center">
              <p className="text-xl font-bold">4,200</p>
              <p className="text-xs text-white/40">Sq Ft</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">5</p>
              <p className="text-xs text-white/40">Bedrooms</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">4</p>
              <p className="text-xs text-white/40">Bathrooms</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/30">Scroll</span>
          <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

function InteriorTours({ activeRoom, setActiveRoom }: { activeRoom: string | null; setActiveRoom: (room: string | null) => void }) {
  const rooms = [
    { id: 'living', label: 'Living Room', description: 'Open-concept living with floor-to-ceiling windows' },
    { id: 'kitchen', label: 'Kitchen', description: 'Chef\'s kitchen with premium appliances' },
    { id: 'bedroom', label: 'Master Bedroom', description: 'Serene retreat with private balcony access' },
    { id: 'bathroom', label: 'Bathroom', description: 'Spa-inspired with rainfall shower' },
  ]

  return (
    <section id="tours" className="section-padding bg-luxe-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-luxe-gold text-sm font-medium tracking-widest uppercase">Interior Tours</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Step Inside</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Experience each room in immersive 3D. Rotate, zoom, and explore every detail of our thoughtfully designed interiors.
          </p>
        </motion.div>

        {/* Room selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                (activeRoom || 'living') === room.id
                  ? 'bg-luxe-gold text-black'
                  : 'glass-card text-white/60 hover:text-white'
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>

        {/* 3D Interior Viewer */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="h-[400px] md:h-[500px] relative">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-luxe-gray">
                <div className="w-10 h-10 border-2 border-luxe-gold/30 border-t-luxe-gold rounded-full animate-spin" />
              </div>
            }>
              <InteriorViewer room={activeRoom || 'living'} />
            </Suspense>
          </div>
          <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">
                {rooms.find(r => r.id === (activeRoom || 'living'))?.label}
              </h3>
              <p className="text-white/50 text-sm mt-1">
                {rooms.find(r => r.id === (activeRoom || 'living'))?.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                360° Interactive
              </div>
              <button className="px-4 py-2 border border-white/20 rounded-full text-xs text-white/60 hover:border-luxe-gold hover:text-luxe-gold transition-all">
                Material Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-luxe-darker border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-luxe-gold to-luxe-gold-light rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-sm">L</span>
              </div>
              <span className="text-lg font-semibold">LUXE<span className="text-luxe-gold">.</span></span>
            </div>
            <p className="text-white/40 text-sm max-w-md">
              Redefining luxury living through innovative design, sustainable practices, and uncompromising quality.
              Every home tells a story of excellence.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Quick Links</h4>
            <ul className="space-y-2">
              {['Properties', 'About Us', 'Services', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-luxe-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Connect</h4>
            <ul className="space-y-2">
              {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-luxe-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 LUXE Residences. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function AmbientSoundToggle() {
  const [playing, setPlaying] = useState(false)

  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-luxe-gold/50 transition-all group"
      title={playing ? 'Mute ambient sound' : 'Play ambient sound'}
    >
      {playing ? (
        <div className="flex items-center gap-0.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-luxe-gold rounded-full animate-pulse"
              style={{
                height: `${8 + i * 4}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <svg className="w-5 h-5 text-white/50 group-hover:text-luxe-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5l-3-3v13l3-3h3l5 5V3.5l-5 5h-3z" />
        </svg>
      )}
    </button>
  )
}

function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-full glass-card flex items-center gap-2 hover:border-luxe-gold/50 transition-all group"
    >
      <svg className="w-4 h-4 text-white/50 group-hover:text-luxe-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span className="text-xs text-white/50 group-hover:text-luxe-gold transition-colors">
        {copied ? 'Link Copied!' : 'Share Tour'}
      </span>
    </button>
  )
}

export default function App() {
  const [isNight, setIsNight] = useState(false)
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleRoomClick = (room: string) => {
    setActiveRoom(room)
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-luxe-dark text-white">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <Navigation />

      <main>
        <HeroSection isNight={isNight} setIsNight={setIsNight} onRoomClick={handleRoomClick} />
        <InteriorTours activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        <FloorPlans />
        <FeaturesGrid />
        <Gallery />
        <ContactForm />
      </main>

      <Footer />

      <AmbientSoundToggle />
      <ShareButton />
    </div>
  )
}
