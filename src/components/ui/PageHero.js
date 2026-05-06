import ResponsiveImage from './ResponsiveImage'

export default function PageHero({
  image,
  imageKey,
  alt,
  eyebrow,
  title,
  overlayClass = 'bg-gray-950/65',
  beforeTitle,
  children,
}) {
  return (
    <section className="relative page-hero flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <ResponsiveImage
          image={imageKey || image}
          alt={alt}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      <div className="relative z-10 container-xl pb-14 pt-32">
        {eyebrow && (
          <p className="text-forest-400 text-sm font-bold uppercase tracking-widest mb-2">
            {eyebrow}
          </p>
        )}
        {beforeTitle}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
          {title}
        </h1>
        {children}
      </div>
    </section>
  )
}
