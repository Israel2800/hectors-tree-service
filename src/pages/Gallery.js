import { useState } from 'react'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useInView } from '../hooks/useInView'
import ContactCTA from '../components/sections/ContactCTA'
import { galleryImages } from '../data'
import mainImage from '../assets/images/mainImage.jpg'

function GalleryItem({ src, alt, index, onOpen, delay }) {
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
      <img
        src={src}
        alt={alt}
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
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={onClose}
      >
        <HiX className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 sm:left-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[85vh] px-20" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
        <p className="text-center text-gray-400 text-sm mt-3">
          {images[index].alt} · {index + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 sm:right-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        <HiChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const open  = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev  = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  const next  = () => setLightboxIndex((i) => (i + 1) % galleryImages.length)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={mainImage} alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-950/65" />
        </div>
        <div className="relative z-10 container-xl pb-14 pt-32">
          <p className="text-forest-400 text-sm font-bold uppercase tracking-widest mb-2">Our Work</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">Photo Gallery</h1>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="page-section bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="text-gray-500 text-lg">
              {galleryImages.length} photos · Click any image to view full-size
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map(({ src, alt }, i) => (
              <GalleryItem
                key={i}
                src={src}
                alt={alt}
                index={i}
                onOpen={open}
                delay={Math.min(i * 40, 400)}
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
