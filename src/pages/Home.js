import Hero          from '../components/sections/Hero'
import ServicesSection from '../components/sections/ServicesSection'
import WhyChooseUs   from '../components/sections/WhyChooseUs'
import Testimonials  from '../components/sections/Testimonials'
import GalleryPreview from '../components/sections/GalleryPreview'
import ContactCTA    from '../components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <ContactCTA />
    </>
  )
}
