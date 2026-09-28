import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const floorPlans = {
  ground: {
    label: 'Ground Floor',
    sqft: '2,400 sq ft',
    rooms: [
      { name: 'Living Room', x: 10, y: 15, w: 40, h: 35, dims: "22' × 18'" },
      { name: 'Kitchen', x: 55, y: 15, w: 35, h: 35, dims: "18' × 16'" },
      { name: 'Dining', x: 55, y: 55, w: 35, h: 30, dims: "16' × 14'" },
      { name: 'Garage', x: 10, y: 55, w: 40, h: 30, dims: "20' × 22'" },
      { name: 'Foyer', x: 35, y: 88, w: 30, h: 10, dims: "8' × 10'" },
    ]
  },
  upper: {
    label: 'Upper Floor',
    sqft: '1,800 sq ft',
    rooms: [
      { name: 'Master Bedroom', x: 10, y: 15, w: 45, h: 40, dims: "24' × 20'" },
      { name: 'Master Bath', x: 10, y: 60, w: 25, h: 25, dims: "14' × 12'" },
      { name: 'Bedroom 2', x: 58, y: 15, w: 32, h: 30, dims: "16' × 14'" },
      { name: 'Bedroom 3', x: 58, y: 50, w: 32, h: 30, dims: "16' × 14'" },
      { name: 'Hallway', x: 38, y: 50, w: 17, h: 35, dims: "6' × 20'" },
      { name: 'Balcony', x: 10, y: 88, w: 80, h: 10, dims: "40' × 8'" },
    ]
  }
}

export function FloorPlans() {
  const [activeFloor, setActiveFloor] = useState<'ground' | 'upper'>('ground')
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const [is3D, setIs3D] = useState(false)

  const plan = floorPlans[activeFloor]

  return (
    <section id="floorplans" className="section-padding bg-luxe-darker">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-luxe-gold text-sm font-medium tracking-widest uppercase">Floor Plans</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Thoughtfully Designed Spaces</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Every room is crafted with intention. Explore our meticulously planned layouts designed for modern living.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex bg-luxe-gray rounded-full p-1">
            <button
              onClick={() => setActiveFloor('ground')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFloor === 'ground' ? 'bg-luxe-gold text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              Ground Floor
            </button>
            <button
              onClick={() => setActiveFloor('upper')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFloor === 'upper' ? 'bg-luxe-gold text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              Upper Floor
            </button>
          </div>
          <button
            onClick={() => setIs3D(!is3D)}
            className="px-4 py-2 border border-white/20 rounded-full text-sm text-white/70 hover:border-luxe-gold hover:text-luxe-gold transition-all"
          >
            {is3D ? '2D View' : '3D View'}
          </button>
        </div>

        {/* Floor Plan Display */}
        <motion.div
          key={activeFloor}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">{plan.label}</h3>
              <p className="text-white/50 text-sm">{plan.sqft}</p>
            </div>
            <div className="text-luxe-gold text-sm font-medium">
              Total: 4,200 sq ft
            </div>
          </div>

          <div
            className={`relative w-full aspect-[4/3] bg-luxe-darker rounded-xl border border-white/5 overflow-hidden transition-all duration-700 ${
              is3D ? 'perspective-[800px]' : ''
            }`}
            style={is3D ? { transform: 'rotateX(30deg) rotateZ(-5deg)', transformStyle: 'preserve-3d' } : {}}
          >
            {/* Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Rooms */}
            <AnimatePresence mode="wait">
              {plan.rooms.map((room, i) => (
                <motion.div
                  key={`${activeFloor}-${room.name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredRoom(room.name)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className="absolute border border-luxe-gold/30 bg-luxe-gold/5 hover:bg-luxe-gold/15 transition-all duration-300 cursor-pointer rounded-sm flex items-center justify-center flex-col"
                  style={{
                    left: `${room.x}%`,
                    top: `${room.y}%`,
                    width: `${room.w}%`,
                    height: `${room.h}%`,
                  }}
                >
                  <span className="text-xs md:text-sm font-medium text-white/80">{room.name}</span>
                  <span className="text-[10px] md:text-xs text-luxe-gold/70">{room.dims}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Tooltip */}
            {hoveredRoom && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-luxe-gold/30"
              >
                <p className="text-sm font-medium text-luxe-gold">{hoveredRoom}</p>
                <p className="text-xs text-white/60">
                  {plan.rooms.find(r => r.name === hoveredRoom)?.dims}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
