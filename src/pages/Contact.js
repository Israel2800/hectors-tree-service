import { useState } from 'react'
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
  HiCheckCircle,
  HiShieldCheck,
} from 'react-icons/hi'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import PageHero from '../components/ui/PageHero'
import SectionTitle from '../components/ui/SectionTitle'
import TurnstileWidget from '../components/ui/TurnstileWidget'
import { company } from '../data'
import { getPlatformConfig, isPlatformConfigured, submitLead } from '../lib/platformApi'

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
  const platformConfig = getPlatformConfig()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: '',
    notRobot: false,
    companyWebsite: '',
  })
  const [status, setStatus] = useState('idle')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileError, setTurnstileError] = useState('')
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0)

  const platformReady = Boolean(
    isPlatformConfigured() &&
      platformConfig.tenantSlug &&
      platformConfig.turnstileSiteKey
  )

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const resetForm = () => {
    setTurnstileToken('')
    setTurnstileError('')
    setTurnstileResetSignal((value) => value + 1)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      service: '',
      message: '',
      notRobot: false,
      companyWebsite: '',
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.companyWebsite) {
      setStatus('success')
      return
    }

    if (!platformReady) {
      setStatus('unconfigured')
      return
    }

    if (!turnstileToken) {
      setStatus('turnstile')
      return
    }

    try {
      setStatus('sending')
      setTurnstileError('')

      await submitLead({
        tenantSlug: platformConfig.tenantSlug,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim(),
        serviceType: formData.service || undefined,
        message: formData.message.trim(),
        turnstileToken,
        sourceUrl: window.location.href,
        website: formData.companyWebsite.trim() || undefined,
      })

      setStatus('success')
      resetForm()
    } catch {
      setStatus('error')
      setTurnstileToken('')
      setTurnstileResetSignal((value) => value + 1)
    }
  }

  return (
    <>
      <PageHero
        imageKey="mainImage"
        alt="Contact Hector's Tree Service"
        eyebrow="Get in Touch"
        title="Contact Us"
      >
        <p className="mt-3 max-w-2xl text-gray-200 text-base sm:text-lg">
          Tell us about your tree project and request your free estimate in just a few steps.
        </p>
      </PageHero>

      <section className="page-section bg-gray-50">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Free Estimates"
            title="Simple, Fast, and Easy to Submit"
            subtitle="Share your address, service needed, and a short description. We will review the request and follow up with your free estimate."
          />

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-4">
                      <HiCheckCircle className="w-9 h-9 text-forest-600" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Message Received!</h3>
                    <p className="text-gray-500">
                      Thank you for reaching out. Your request was submitted securely, and we will follow up as soon as possible during business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="rounded-2xl border border-forest-100 bg-forest-50 px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                          <HiShieldCheck className="w-6 h-6 text-forest-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Friendly and secure estimate request</p>
                          <p className="text-sm text-gray-600 mt-1">
                            This form is designed to be quick on mobile and desktop while still keeping strong anti-spam protection in place.
                          </p>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      autoComplete="off"
                      tabIndex={-1}
                      className="hidden"
                      aria-hidden="true"
                    />

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
                          <option value="">Select a service...</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Property Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, State ZIP"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm"
                      />
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
                        placeholder="Describe the work you need, where the tree is located, and any urgency."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition text-sm resize-none"
                      />
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notRobot"
                        required
                        checked={formData.notRobot}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-forest-700 focus:ring-forest-400"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I confirm that I am not a robot and that this request is legitimate.
                      </span>
                    </label>

                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Human verification <span className="text-red-500">*</span>
                      </p>
                      <TurnstileWidget
                        siteKey={platformConfig.turnstileSiteKey}
                        resetSignal={turnstileResetSignal}
                        onTokenChange={(token) => {
                          setTurnstileToken(token)
                          setTurnstileError('')
                        }}
                        onError={(message) => {
                          setTurnstileError(message)
                        }}
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        This protects the form from spam and abusive automated submissions.
                      </p>
                    </div>

                    {status === 'unconfigured' && (
                      <p className="text-amber-700 text-sm bg-amber-50 rounded-xl px-4 py-3">
                        The contact experience is ready, but the production API, tenant slug, or Turnstile site key is still missing. Add the platform environment variables before deploying this form.
                      </p>
                    )}

                    {status === 'turnstile' && (
                      <p className="text-amber-700 text-sm bg-amber-50 rounded-xl px-4 py-3">
                        Please complete the human verification before submitting the form.
                      </p>
                    )}

                    {turnstileError && (
                      <p className="text-amber-700 text-sm bg-amber-50 rounded-xl px-4 py-3">
                        {turnstileError}
                      </p>
                    )}

                    {status === 'error' && (
                      <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
                        Something went wrong while sending your request. Please call us directly at {company.phone}.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-forest-700 hover:bg-forest-800 disabled:bg-forest-400 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed shadow-md"
                    >
                      {status === 'sending' ? 'Sending Request...' : 'Send Message & Request Free Estimate'}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      No obligation - Free estimate - We respond as quickly as possible during business hours
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
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
                  {[FaFacebookF, FaInstagram].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-forest-700 hover:text-white transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-forest-900 rounded-3xl p-7 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">What Happens Next</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Once you submit the form, we review the address, service type, and message so we can follow up with a clear and free estimate.
                </p>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>1. Submit your contact information and property address.</li>
                  <li>2. We review the request details.</li>
                  <li>3. We follow up with your free estimate.</li>
                </ul>
              </div>

              <div className="bg-red-600 rounded-3xl p-7 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">24/7 Emergency?</h3>
                <p className="text-red-100 text-sm mb-4">
                  Storm damage or hazardous tree? Don&apos;t wait - call us now.
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
