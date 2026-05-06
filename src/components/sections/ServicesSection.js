import { Link } from 'react-router-dom'
import { FaTree, FaLeaf, FaSeedling } from 'react-icons/fa'
import { GiTreeBranch } from 'react-icons/gi'
import { HiArrowRight } from 'react-icons/hi'
import { useInView } from '../../hooks/useInView'
import SectionTitle from '../ui/SectionTitle'
import ResponsiveImage from '../ui/ResponsiveImage'
import { services } from '../../data'

const iconMap = {
  'tree-removal':  FaTree,
  'tree-trimming': FaLeaf,
  'stump-removal': GiTreeBranch,
  'tree-care':     FaSeedling,
}

function ServiceCard({ service, delay }) {
  const [ref, isInView] = useInView()
  const Icon = iconMap[service.id] || FaTree

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-52 overflow-hidden">
        <ResponsiveImage
          image={service.imageKey}
          alt={service.title}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
        <div className="absolute bottom-4 left-4 w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-forest-700 font-semibold text-sm group/link hover:gap-3 transition-all duration-200"
        >
          Learn More
          <HiArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="page-section bg-gray-50">
      <div className="container-xl">
        <SectionTitle
          eyebrow="What We Offer"
          title="Professional Tree Services"
          subtitle="From hazardous removals to routine trimming, our certified team handles every job with precision, safety, and care."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 80} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            View All Services
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
