import { Link } from 'react-router-dom'
import { HiArrowRight, HiPhotograph } from 'react-icons/hi'
import { useInView } from '../../hooks/useInView'
import SectionTitle from '../ui/SectionTitle'
import ResponsiveImage from '../ui/ResponsiveImage'
import { galleryImages } from '../../data'

const preview = galleryImages.slice(0, 6)

function GalleryItem({ imageKey, alt, delay }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden bg-gray-200 aspect-square transition-all duration-500 ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ResponsiveImage
        image={imageKey}
        alt={alt}
        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/50 transition-all duration-300 flex items-center justify-center">
        <HiPhotograph className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" />
      </div>
    </div>
  )
}

export default function GalleryPreview() {
  return (
    <section className="page-section bg-white">
      <div className="container-xl">
        <SectionTitle
          eyebrow="Our Work"
          title="See the Results"
          subtitle="Browse through recent projects and see the quality craftsmanship we bring to every job."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {preview.map(({ imageKey, alt }, i) => (
            <GalleryItem key={imageKey} imageKey={imageKey} alt={alt} delay={i * 60} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            View Full Gallery
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
