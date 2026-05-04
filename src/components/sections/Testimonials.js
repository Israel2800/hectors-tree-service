import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { useInView } from '../../hooks/useInView'
import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../data'

function TestimonialCard({ item, delay }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-7 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(item.rating)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4 text-amber-400" />
        ))}
      </div>

      {/* Quote icon */}
      <FaQuoteLeft className="w-6 h-6 text-forest-200 mb-3" />

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">{item.quote}</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-forest-100"
        />
        <div>
          <p className="font-heading font-bold text-gray-900 text-sm">{item.name}</p>
          <p className="text-xs text-forest-600 font-medium">{item.location}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="page-section bg-gray-50">
      <div className="container-xl">
        <SectionTitle
          eyebrow="Client Reviews"
          title="What Our Customers Say"
          subtitle="Real feedback from homeowners and businesses we've served across the Nashville area."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} delay={i * 100} />
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-gray-800 text-sm">5.0 average</span>
            <span className="text-gray-400 text-sm">· 500+ happy customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
