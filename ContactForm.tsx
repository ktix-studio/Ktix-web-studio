import { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    moveInDate: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const budgetRanges = [
    '$500K - $750K',
    '$750K - $1M',
    '$1M - $1.5M',
    '$1.5M - $2M',
    '$2M+',
  ]

  return (
    <section id="contact" className="section-padding bg-luxe-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxe-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxe-gold/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-luxe-gold text-sm font-medium tracking-widest uppercase">Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
              Begin Your <span className="gradient-text">Luxury</span> Journey
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Schedule a private viewing or request more information about this exceptional property.
              Our team is ready to guide you through every step.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-luxe-gold/10 flex items-center justify-center">
                  <span className="text-luxe-gold">📍</span>
                </div>
                <div>
                  <p className="text-sm text-white/40">Location</p>
                  <p className="text-white/80">Beverly Hills, CA 90210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-luxe-gold/10 flex items-center justify-center">
                  <span className="text-luxe-gold">📞</span>
                </div>
                <div>
                  <p className="text-sm text-white/40">Phone</p>
                  <p className="text-white/80">+1 (310) 555-0199</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-luxe-gold/10 flex items-center justify-center">
                  <span className="text-luxe-gold">✉️</span>
                </div>
                <div>
                  <p className="text-sm text-white/40">Email</p>
                  <p className="text-white/80">hello@luxeresidences.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-luxe-darker border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-luxe-gold/50 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-luxe-darker border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-luxe-gold/50 transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-luxe-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-luxe-gold/50 transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>Select your budget</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Preferred Move-in Date</label>
                <input
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="w-full bg-luxe-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-luxe-gold/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Message (Optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-luxe-darker border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-luxe-gold/50 transition-colors resize-none"
                  rows={3}
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-luxe-gold text-black font-semibold rounded-xl hover:bg-luxe-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-luxe-gold/20"
              >
                {submitted ? '✓ Inquiry Sent!' : 'Schedule a Viewing'}
              </button>

              <p className="text-xs text-white/30 text-center">
                We'll respond within 24 hours. Your information is kept confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
