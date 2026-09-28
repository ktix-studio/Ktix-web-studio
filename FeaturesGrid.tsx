--- src/components/FeaturesGrid.tsx (原始)


+++ src/components/FeaturesGrid.tsx (修改后)
import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    icon: '🏠',
    title: 'Smart Home Integration',
    description: 'Full home automation with voice control, automated lighting, climate, and security systems.',
    details: ['Google Home & Alexa', 'Automated Blinds', 'Smart Locks', 'Energy Monitoring'],
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: '🌿',
    title: 'Sustainable Materials',
    description: 'Eco-conscious construction with reclaimed wood, recycled steel, and low-VOC finishes.',
    details: ['Bamboo Flooring', 'Recycled Glass', 'Solar Panels', 'Rainwater Harvesting'],
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: '✨',
    title: 'Custom Finishes',
    description: 'Bespoke Italian marble, hand-crafted cabinetry, and designer fixtures throughout.',
    details: ['Calacatta Marble', 'Walnut Cabinetry', 'Brushed Brass', 'Custom Tilework'],
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: '🔒',
    title: 'Premium Security',
    description: '24/7 surveillance with AI-powered cameras, biometric access, and panic rooms.',
    details: ['4K CCTV System', 'Fingerprint Access', 'Motion Sensors', 'Safe Room'],
    color: 'from-red-500/20 to-pink-500/20',
  },
  {
    icon: '💧',
    title: 'Wellness Features',
    description: 'In-home spa, air purification, circadian lighting, and meditation garden.',
    details: ['HEPA Air System', 'Circadian Lighting', 'Steam Shower', 'Zen Garden'],
    color: 'from-cyan-500/20 to-teal-500/20',
  },
  {
    icon: '🎵',
    title: 'Entertainment Suite',
    description: 'Dolby Atmos theater, whole-home audio, and dedicated gaming room.',
    details: ['7.2.4 Atmos', 'Sonos System', '8K Projector', 'Acoustic Treatment'],
    color: 'from-violet-500/20 to-indigo-500/20',
  },
]

export function FeaturesGrid() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="features" className="section-padding bg-luxe-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-luxe-gold text-sm font-medium tracking-widest uppercase">Premium Features</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Crafted for Excellence</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Every detail has been considered. From cutting-edge technology to timeless materials,
            this home sets a new standard for luxury living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-500 group ${
                expandedIndex === i ? 'ring-1 ring-luxe-gold/50 scale-[1.02]' : ''
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-luxe-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-3">
                {feature.description}
              </p>

              <motion.div
                initial={false}
                animate={{ height: expandedIndex === i ? 'auto' : 0, opacity: expandedIndex === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-white/10 mt-3">
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxe-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <div className="mt-4 flex items-center gap-1 text-luxe-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{expandedIndex === i ? 'Click to collapse' : 'Click for details'}</span>
                <svg className={`w-3 h-3 transition-transform ${expandedIndex === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
