import { Link } from 'react-router-dom'
import { HiPhone, HiArrowRight } from 'react-icons/hi'
import { useInView } from '../../hooks/useInView'
import { company } from '../../data'
import treeRemoval from '../../assets/images/tree-removal.jpg'

export default function ContactCTA() {
  const [ref, isInView] = useInView(0.2)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src={treeRemoval}
          alt="Tree service crew"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-forest-900/88" />
      </div>

      <div className="relative z-10 container-xl">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-forest-400 mb-4">
            Ready to Get Started?
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-5">
            Get Your Free Estimate Today
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            No obligation, no pressure — just an honest quote from a team
            that cares about your property as much as you do.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-500 hover:bg-forest-400 text-white font-bold px-9 py-4 rounded-xl shadow-lg hover:shadow-forest-900/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Request Free Quote
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={company.phoneHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-9 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <HiPhone className="w-5 h-5" />
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
