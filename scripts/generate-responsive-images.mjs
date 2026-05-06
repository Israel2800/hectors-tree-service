import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const sourceDir = path.join(projectRoot, 'src', 'assets', 'images')
const outputDir = path.join(projectRoot, 'public', 'optimized-images')
const manifestDir = path.join(projectRoot, 'src', 'generated')
const manifestPath = path.join(manifestDir, 'responsive-images.js')
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const targetWidths = [480, 768, 1024, 1280, 1600, 1920]

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true })
}

async function buildVariantEntries(imagePath, baseName, format, widths, formatOptions) {
  const imageOutputDir = path.join(outputDir, baseName)
  await ensureDirectory(imageOutputDir)

  const variants = []

  for (const width of widths) {
    const filename = `${width}.${format === 'jpeg' ? 'jpg' : format}`
    const outputPath = path.join(imageOutputDir, filename)
    const transformer = sharp(imagePath, { failOn: 'none' })
      .rotate()
      .resize({
        width,
        withoutEnlargement: true,
      })

    if (format === 'webp') {
      transformer.webp(formatOptions)
    } else {
      transformer.jpeg(formatOptions)
    }

    const info = await transformer.toFile(outputPath)

    variants.push({
      width: info.width,
      height: info.height,
      src: `/optimized-images/${baseName}/${filename}`,
    })
  }

  return variants
}

async function generate() {
  await ensureDirectory(outputDir)
  await ensureDirectory(manifestDir)

  const directoryEntries = await fs.readdir(sourceDir, { withFileTypes: true })
  const files = directoryEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => supportedExtensions.has(path.extname(filename).toLowerCase()))
    .sort((left, right) => left.localeCompare(right))

  const manifest = {}

  for (const filename of files) {
    const imagePath = path.join(sourceDir, filename)
    const baseName = path.parse(filename).name
    const extension = path.extname(filename).toLowerCase()
    const metadata = await sharp(imagePath, { failOn: 'none' }).rotate().metadata()

    if (!metadata.width || !metadata.height) {
      continue
    }

    try {
      const widths = [...new Set([...targetWidths, metadata.width])]
        .filter((width) => width <= metadata.width)
        .sort((left, right) => left - right)

      const jpeg = await buildVariantEntries(imagePath, baseName, 'jpeg', widths, {
        quality: 82,
        mozjpeg: true,
      })
      const webp = await buildVariantEntries(imagePath, baseName, 'webp', widths, {
        quality: 80,
      })
      const largestJpeg = jpeg[jpeg.length - 1]

      manifest[baseName] = {
        width: largestJpeg.width,
        height: largestJpeg.height,
        formats: {
          jpeg,
          webp,
        },
      }
    } catch (error) {
      const imageOutputDir = path.join(outputDir, baseName)
      const fallbackFilename = `original${extension}`
      await ensureDirectory(imageOutputDir)
      await fs.copyFile(imagePath, path.join(imageOutputDir, fallbackFilename))

      manifest[baseName] = {
        width: metadata.width,
        height: metadata.height,
        formats: {
          jpeg: [
            {
              width: metadata.width,
              height: metadata.height,
              src: `/optimized-images/${baseName}/${fallbackFilename}`,
            },
          ],
          webp: [],
        },
      }

      console.warn(`Fell back to the original asset for ${filename}.`, error.message)
    }
  }

  const fileContents = `export const responsiveImages = ${JSON.stringify(manifest, null, 2)}\n`

  await fs.writeFile(manifestPath, fileContents, 'utf8')
}

generate().catch((error) => {
  console.error('Failed to generate responsive image assets.')
  console.error(error)
  process.exitCode = 1
})
