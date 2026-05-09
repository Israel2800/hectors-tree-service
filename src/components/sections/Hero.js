import { Link } from 'react-router-dom'
import { HiPhone } from 'react-icons/hi'
import { FaCheckCircle, FaStar } from 'react-icons/fa'
import ResponsiveImage from '../ui/ResponsiveImage'
import { company } from '../../data'

const badges = [
  'Free Estimates',
  '24/7 Emergency',
  '10+ Years Experience',
  'Satisfaction Guaranteed',
]

export default function Hero() {
  return (
    <section className="relative hero-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <ResponsiveImage
          image="mainImage"
          alt="Professional tree service"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="max-w-2xl xl:max-w-3xl">
          <h1 className="animate-fade-in-up animation-delay-100 font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
            Expert Tree Care{' '}
            <span className="text-forest-400">You Can Trust</span>
          </h1>

          <p className="animate-fade-in-up animation-delay-200 text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
            Professional tree removal, trimming &amp; care for homeowners
            across {company.serviceAreas}.
          </p>

          <div className="animate-fade-in-up animation-delay-250 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-500/40 bg-forest-700/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest-300">
              <span className="h-2 w-2 rounded-full bg-forest-400 animate-pulse" />
              {company.license}
            </span>
          </div>

          <div className="animate-fade-in-up animation-delay-300 flex items-center gap-2 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-300 text-sm font-medium">5.0 - Trusted by 500+ homeowners</span>
          </div>

          <div className="animate-fade-in-up animation-delay-400 flex flex-wrap gap-x-6 gap-y-2 mb-10">
            {badges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-sm text-gray-300">
                <FaCheckCircle className="w-3.5 h-3.5 text-forest-400 shrink-0" />
                {badge}
              </span>
            ))}
          </div>

          <div className="animate-fade-in-up animation-delay-500 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-forest-900/40 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Get Free Quote
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              <HiPhone className="w-5 h-5" />
              {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
