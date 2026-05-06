import { responsiveImages } from '../../generated/responsive-images'

function buildSrcSet(entries) {
  return entries.map((entry) => `${entry.src} ${entry.width}w`).join(', ')
}

function resolveImage(image) {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return responsiveImages[image] || null
  }

  return image
}

export function getResponsiveImage(image) {
  return resolveImage(image)
}

export default function ResponsiveImage({
  image,
  alt,
  className = '',
  pictureClassName = '',
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  ...imgProps
}) {
  const asset = resolveImage(image)

  if (!asset) {
    return null
  }

  const fallbackEntries = asset.formats.jpeg
  const webpEntries = asset.formats.webp
  const fallbackSource = fallbackEntries[fallbackEntries.length - 1]?.src

  return (
    <picture className={pictureClassName}>
      {webpEntries.length > 0 && (
        <source type="image/webp" srcSet={buildSrcSet(webpEntries)} sizes={sizes} />
      )}
      <img
        src={fallbackSource}
        srcSet={buildSrcSet(fallbackEntries)}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={className}
        {...imgProps}
      />
    </picture>
  )
}
