import { Link } from 'react-router-dom'
import { FaTree, FaLeaf, FaSeedling } from 'react-icons/fa'
import { GiTreeBranch } from 'react-icons/gi'
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi'
import ContactCTA from '../components/sections/ContactCTA'
import PageHero from '../components/ui/PageHero'
import ResponsiveImage from '../components/ui/ResponsiveImage'
import SectionTitle from '../components/ui/SectionTitle'
import { useInView } from '../hooks/useInView'
import { services, faqs, company } from '../data'

const iconMap = {
  'tree-removal': FaTree,
  'tree-trimming': FaLeaf,
  'stump-removal': GiTreeBranch,
  'tree-care': FaSeedling,
}

function ServiceRow({ service, index }) {
  const [ref, inView] = useInView()
  const Icon = iconMap[service.id] || FaTree
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-0 items-stretch bg-gray-50 rounded-3xl overflow-hidden shadow-sm transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`h-72 lg:h-auto lg:min-h-[380px] ${isEven ? '' : 'lg:order-last'}`}>
        <ResponsiveImage
          image={service.imageKey}
          alt={service.title}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-8 lg:py-12">
        <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-forest-700" />
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mb-3">
          {service.title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-7">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
              <HiCheckCircle className="w-4 h-4 text-forest-600 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md"
        >
          Learn More
          <HiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

function FAQ({ q, a, delay }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-heading font-bold text-gray-900 mb-2 text-base">{q}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        imageKey="mainImage"
        alt="Tree services"
        eyebrow="What We Do"
        title="Our Services"
      />

      <section className="page-section bg-white">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Professional Tree Care"
            title="Everything Your Trees Need"
            subtitle="Each service is performed by certified professionals using modern equipment and industry-best techniques."
          />
          <div className="space-y-8">
            {services.map((service, index) => (
              <ServiceRow key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-700 py-12">
        <div className="container-xl text-center text-white">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
            Storm Damage? Emergency Tree Removal?
          </h2>
          <p className="text-red-100 mb-6">
            We respond 24/7. Call us immediately for any hazardous situation.
          </p>
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-8 py-3.5 rounded-xl hover:bg-red-50 transition-colors shadow-lg"
          >
            Call Now: {company.phone}
          </a>
        </div>
      </section>

      <section className="page-section bg-gray-50">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Questions & Answers"
            title="Frequently Asked Questions"
            subtitle="Can't find your answer? Give us a call - we're happy to help."
          />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {faqs.map(({ q, a }, index) => (
              <FAQ key={q} q={q} a={a} delay={index * 60} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
