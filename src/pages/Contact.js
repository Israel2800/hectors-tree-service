import { useState } from 'react'
import {
  HiArrowRight,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
  HiCheckCircle,
} from 'react-icons/hi'
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'
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

const reviewLinks = [
  {
    name: 'Facebook',
    href: company.facebookHref,
    Icon: FaFacebookF,
    description: 'Stay connected with updates, project photos, and community activity.',
    accent: 'from-[#edf4ff] to-[#f8fbff] text-[#1877f2]',
  },
  {
    name: 'Instagram',
    href: company.instagramHref,
    Icon: FaInstagram,
    description: 'Browse recent work, before-and-after shots, and behind-the-scenes content.',
    accent: 'from-[#fff0f7] to-[#fff8fb] text-[#d62976]',
  },
  {
    name: 'Google Reviews',
    href: company.googleReviewsHref,
    Icon: FaGoogle,
    description: 'See recent customer feedback and leave your own review.',
    accent: 'from-[#fff4dd] to-[#fef9ef] text-[#c98300]',
  },
  {
    name: 'TikTok',
    href: company.tiktokHref,
    Icon: SiTiktok,
    description: 'Watch content, job highlights, and updates from the team.',
    accent: 'from-[#eefaf7] to-[#f8fcfb] text-forest-700',
  },
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
          <div className="mb-10 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-forest-600 mb-4">
              Reviews &amp; Social
            </span>

            <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-3 sm:gap-4">
              {reviewLinks.map(({ name, href, Icon, accent }) => (
                <a
                  key={name}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noreferrer'}
                  aria-label={name}
                  title={name}
                  className="group flex h-14 w-14 items-center justify-center transition-all duration-200 hover:-translate-y-0.5 sm:h-16 sm:w-16"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-sm ring-1 ring-black/5 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md sm:h-12 sm:w-12`}>
                    <Icon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <SectionTitle
            eyebrow="Free Estimates"
            title="Simple, Fast, and Easy to Submit"
            subtitle="Share your address, service needed, and a short description. We will review the request and follow up with your free estimate."
          />

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div id="estimate-form" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
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
                  <a href={company.emailHref} className="text-forest-700 hover:text-forest-900 transition-colors break-all">
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

                {/* Legacy Reviews & Social sidebar block kept commented for reference after moving the icons
                into a compact horizontal strip above the Free Estimates section.
                <div className="rounded-2xl bg-gray-50 border border-gray-100 px-5 py-5">
                  <div className="flex items-center gap-2 text-gray-900 mb-2">
                    <p className="font-heading font-bold text-lg">Reviews & Social</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Explore recent content and help future customers by sharing your experience.
                  </p>

                  <div className="space-y-3">
                    {reviewLinks.map(({ name, href, Icon, description, accent }) => (
                      <a
                        key={name}
                        href={href}
                        target={href === '#' ? undefined : '_blank'}
                        rel={href === '#' ? undefined : 'noreferrer'}
                        className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-md"
                      >
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900">{name}</p>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                        <HiArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-forest-700" />
                      </a>
                    ))}
                  </div>
                </div>
                */}
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

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-forest-100 bg-white shadow-xl shadow-forest-900/10">
            <div className="grid gap-0 lg:grid-cols-[1.4fr,0.9fr]">
              <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 px-6 py-7 sm:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-200">Service Location</p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white">Visit or Search Our Service Area</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-forest-100">
                  Our map is centered on the business address so customers can quickly confirm location details and get directions with confidence.
                </p>
              </div>

              <div className="bg-[#f8fbf9] px-6 py-7 sm:px-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-700">Address</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{company.address}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-700">Hours</p>
                    <p className="mt-1 text-sm text-gray-600">Monday - Saturday 7:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-600">Sunday Emergency Only</p>
                  </div>
                  <a
                    href={company.mapDirectionsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-800"
                  >
                    Get Directions
                    <HiArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative h-80 overflow-hidden sm:h-96">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-forest-950/10 via-transparent to-transparent" />
              <iframe
                title="Hector's Tree Service Location"
                src={company.mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'saturate(0.9) contrast(1.02)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
