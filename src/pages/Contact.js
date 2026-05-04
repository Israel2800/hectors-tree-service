import { useState } from 'react'
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiCheckCircle } from 'react-icons/hi'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import SectionTitle from '../components/ui/SectionTitle'
import { company } from '../data'
import mainImage from '../assets/images/mainImage.jpg'

const services = [
  'Tree Removal',
  'Tree Trimming',
  'Stump Removal',
  'Tree Care & Health',
  'Emergency Service',
  'Other',
]

function ContactInfo({ Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-forest-700" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-forest-700 mb-0.5">{label}</p>
        <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...formData }).toString(),
      })
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-72 sm:h-80 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={mainImage} alt="Contact Hector's Tree Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-950/65" />
        </div>
        <div className="relative z-10 container-xl pb-14 pt-32">
          <p className="text-forest-400 text-sm font-bold uppercase tracking-widest mb-2">Get in Touch</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">Contact Us</h1>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="page-section bg-gray-50">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Free Estimates"
            title="Let's Talk About Your Trees"
            subtitle="Fill out the form or give us a call. We typically respond within 2 hours."
          />

          <div className="grid lg:grid-cols-5 gap-10">

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-4">
                      <HiCheckCircle className="w-9 h-9 text-forest-600" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Message Received!</h3>
                    <p className="text-gray-500">
                      Thank you for reaching out. We'll get back to you within 2 hours during business hours.
                    </p>
                  </div>
                ) : (
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <input type="hidden" name="form-name" value="contact" />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(615) 000-0000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Needed</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm text-gray-700 bg-white"
                        >
                          <option value="">Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your tree situation — size, location, any urgency…"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
                        Something went wrong. Please call us directly at {company.phone}.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-forest-700 hover:bg-forest-800 disabled:bg-forest-400 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed shadow-md"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message & Request Quote'}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      No obligation · We respond within 2 hours during business hours
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── Info ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Contact details card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 space-y-6">
                <h3 className="font-heading font-bold text-gray-900 text-xl">Contact Information</h3>

                <ContactInfo Icon={HiLocationMarker} label="Address">
                  {company.address}
                </ContactInfo>

                <ContactInfo Icon={HiPhone} label="Phone">
                  <a href={company.phoneHref} className="text-forest-700 font-semibold hover:text-forest-900 transition-colors">
                    {company.phone}
                  </a>
                </ContactInfo>

                <ContactInfo Icon={HiMail} label="Email">
                  <a href={`mailto:${company.email}`} className="text-forest-700 hover:text-forest-900 transition-colors break-all">
                    {company.email}
                  </a>
                </ContactInfo>

                <ContactInfo Icon={HiClock} label="Business Hours">
                  {company.businessHours.map(({ days, hours }) => (
                    <div key={days} className="flex justify-between gap-4">
                      <span className="font-medium text-gray-800">{days}</span>
                      <span className="text-gray-500">{hours}</span>
                    </div>
                  ))}
                </ContactInfo>

                <div className="flex gap-2.5 pt-1">
                  {[FaFacebookF, FaInstagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-forest-700 hover:text-white transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div className="bg-red-600 rounded-3xl p-7 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">24/7 Emergency?</h3>
                <p className="text-red-100 text-sm mb-4">
                  Storm damage or hazardous tree? Don't wait — call us now.
                </p>
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <HiPhone className="w-4 h-4" />
                  Call {company.phone}
                </a>
              </div>
            </div>
          </div>

          {/* ── Map ── */}
          <div className="mt-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-80 sm:h-96">
            <iframe
              title="Hector's Tree Service Location"
              src="https://maps.google.com/maps?q=1224+Cherrybark+Dr+Smyrna+TN+37167&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
