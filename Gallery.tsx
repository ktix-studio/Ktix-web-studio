import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { id: 1, title: 'Front Elevation - Day', category: 'exterior', gradient: 'from-sky-200/30 to-blue-400/30' },
  { id: 2, title: 'Front Elevation - Night', category: 'exterior', gradient: 'from-indigo-900/50 to-purple-900/50' },
  { id: 3, title: 'Living Room', category: 'interior', gradient: 'from-amber-200/30 to-orange-300/30' },
  { id: 4, title: 'Master Suite', category: 'interior', gradient: 'from-rose-200/30 to-pink-300/30' },
  { id: 5, title: 'Aerial View', category: 'drone', gradient: 'from-green-200/30 to-emerald-400/30' },
  { id: 6, title: 'Kitchen Detail', category: 'interior', gradient: 'from-stone-200/30 to-gray-400/30' },
  { id: 7, title: 'Pool Area', category: 'exterior', gradient: 'from-cyan-200/30 to-blue-300/30' },
  { id: 8, title: 'Sunset View', category: 'drone', gradient: 'from-orange-300/30 to-red-400/30' },
]

const categories = ['all', 'exterior', 'interior', 'drone']

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [dayNight, setDayNight] = useState(50)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <section id="gallery" className="section-padding bg-luxe-darker">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-luxe-gold text-sm font-medium tracking-widest uppercase">Gallery</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Visual Tour</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Explore every angle of this architectural masterpiece through our curated collection of renders and photography.
          </p>
        </motion.div>

        {/* Day/Night Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="glass-card rounded-2xl p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/60">☀️ Day</span>
              <span className="text-sm font-medium text-luxe-gold">Exterior Lighting</span>
              <span className="text-sm text-white/60">Night 🌙</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={dayNight}
              onChange={(e) => setDayNight(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #fbbf24 0%, #1e1b4b 100%)`,
              }}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-luxe-gold text-black'
                  : 'bg-luxe-gray text-white/60 hover:text-white hover:bg-luxe-gray-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedImage(image.id)}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group ${
                  i === 0 || i === 3 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`} />
                <div
                  className="absolute inset-0 bg-black transition-opacity duration-500"
                  style={{ opacity: dayNight / 100 * 0.6 }}
                />
                {/* Simulated architectural elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 bg-white/10 rounded-t-sm" />
                    <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/3 bg-white/5 rounded-sm" />
                    <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/3 bg-white/5 rounded-sm" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-luxe-gold/30 rounded-full" />
                  </div>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.title}</p>
                  <p className="text-xs text-white/50 capitalize">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-4xl w-full aspect-video rounded-2xl overflow-hidden relative"
              >
                {(() => {
                  const img = galleryImages.find(i => i.id === selectedImage)
                  return (
                    <div className={`absolute inset-0 bg-gradient-to-br ${img?.gradient || 'from-gray-800 to-gray-900'}`}>
                      <div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: dayNight / 100 * 0.5 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-1/2 h-2/3">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-white/10 rounded-t-lg" />
                          <div className="absolute bottom-1/3 left-1/4 w-1/5 h-1/3 bg-white/5 rounded" />
                          <div className="absolute bottom-1/3 right-1/4 w-1/5 h-1/3 bg-white/5 rounded" />
                        </div>
                      </div>
                    </div>
                  )
                })()}
                <div className="absolute bottom-6 left-6">
                  <p className="text-xl font-semibold">
                    {galleryImages.find(i => i.id === selectedImage)?.title}
                  </p>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
