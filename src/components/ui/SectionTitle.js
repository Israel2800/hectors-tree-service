import { useInView } from '../../hooks/useInView'

export default function SectionTitle({ eyebrow, title, subtitle, center = true, light = false }) {
  const [ref, isInView] = useInView()

  return (
    <div ref={ref} className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 transition-all duration-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${light ? 'text-forest-300' : 'text-forest-600'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-700 delay-100 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        } ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
