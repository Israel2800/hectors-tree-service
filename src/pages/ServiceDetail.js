import { useParams, Link, Navigate } from 'react-router-dom'
import { FaTree, FaLeaf, FaSeedling } from 'react-icons/fa'
import { GiTreeBranch } from 'react-icons/gi'
import { HiCheckCircle, HiArrowRight, HiArrowLeft, HiPhone } from 'react-icons/hi'
import { useInView } from '../hooks/useInView'
import ContactCTA from '../components/sections/ContactCTA'
import { services, company } from '../data'

const iconMap = {
  'tree-removal':  FaTree,
  'tree-trimming': FaLeaf,
  'stump-removal': GiTreeBranch,
  'tree-care':     FaSeedling,
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const service = services.find((s) => s.id === serviceId)

  if (!service) return <Navigate to="/services" replace />

  const Icon = iconMap[service.id] || FaTree
  const related = services.filter((s) => s.id !== service.id)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-80 sm:h-[440px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.heroImage || service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/50 to-gray-950/25" />
        </div>
        <div className="relative z-10 container-xl pb-14 pt-32">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="page-section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Content */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.description}</p>

              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-5">What's Included</h2>
              <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                {service.features.map((f) => {
                  const [ref, inView] = useInView()
                  return (
                    <li
                      key={f}
                      ref={ref}
                      className={`flex items-start gap-3 bg-forest-50 rounded-xl px-4 py-3 transition-all duration-400 ${
                        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      <HiCheckCircle className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">{f}</span>
                    </li>
                  )
                })}
              </ul>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Quick contact */}
              <div className="bg-forest-900 rounded-2xl p-6 text-white sticky top-28">
                <h3 className="font-heading font-bold text-xl mb-2">Get a Free Quote</h3>
                <p className="text-gray-300 text-sm mb-5">
                  Ready to schedule? Contact us for a no-obligation estimate.
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 bg-forest-500 hover:bg-forest-400 text-white font-bold px-5 py-3 rounded-xl transition-colors mb-3 w-full"
                >
                  Request Estimate
                  <HiArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={company.phoneHref}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl transition-colors w-full"
                >
                  <HiPhone className="w-4 h-4" />
                  {company.phone}
                </a>
                <p className="text-xs text-gray-400 text-center mt-4">
                  Mon–Fri 7am–6pm · Sat 8am–4pm<br />24/7 for emergencies
                </p>
              </div>

              {/* Other services */}
              <div>
                <h3 className="font-heading font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                  Other Services
                </h3>
                <div className="space-y-3">
                  {related.map((s) => {
                    const RelIcon = iconMap[s.id] || FaTree
                    return (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-forest-50 rounded-xl border border-transparent hover:border-forest-100 transition-all duration-200 group"
                      >
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                          <RelIcon className="w-4 h-4 text-forest-700" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-forest-700 transition-colors">
                          {s.title}
                        </span>
                        <HiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-forest-600 ml-auto transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
