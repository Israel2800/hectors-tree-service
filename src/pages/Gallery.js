import { useState } from 'react'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import ContactCTA from '../components/sections/ContactCTA'
import PageHero from '../components/ui/PageHero'
import ResponsiveImage from '../components/ui/ResponsiveImage'
import { useInView } from '../hooks/useInView'
import { galleryImages } from '../data'

function GalleryItem({ imageKey, alt, index, onOpen, delay }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      onClick={() => onOpen(index)}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden bg-gray-200 aspect-square transition-all duration-500 ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ResponsiveImage
        image={imageKey}
        alt={alt}
        sizes="(min-width: 1280px) 18vw, (min-width: 640px) 30vw, 50vw"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/50 transition-all duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
          <HiChevronRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  if (index === null) return null

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={onClose}
      >
        <HiX className="w-5 h-5" />
      </button>

      <button
        className="absolute left-4 sm:left-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>

      <div className="max-w-5xl max-h-[85vh] px-20" onClick={(event) => event.stopPropagation()}>
        <ResponsiveImage
          image={images[index].imageKey}
          alt={images[index].alt}
          sizes="90vw"
          loading="eager"
          fetchPriority="high"
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
        <p className="text-center text-gray-400 text-sm mt-3">
          {images[index].alt} - {index + 1} / {images.length}
        </p>
      </div>

      <button
        className="absolute right-4 sm:right-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
      >
        <HiChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const open = (index) => setLightboxIndex(index)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length)
  const next = () => setLightboxIndex((index) => (index + 1) % galleryImages.length)

  return (
    <>
      <PageHero
        imageKey="mainImage"
        alt="Gallery"
        eyebrow="Our Work"
        title="Photo Gallery"
      />

      <section className="page-section bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="text-gray-500 text-lg">
              {galleryImages.length} photos - click any image to view full-size
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map(({ imageKey, alt }, index) => (
              <GalleryItem
                key={imageKey}
                imageKey={imageKey}
                alt={alt}
                index={index}
                onOpen={open}
                delay={Math.min(index * 40, 400)}
              />
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />

      <ContactCTA />
    </>
  )
}
