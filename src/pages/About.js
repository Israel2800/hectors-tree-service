import { Link } from 'react-router-dom'
import { FaTree, FaHandshake, FaLeaf, FaStar } from 'react-icons/fa'
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi'
import SectionTitle from '../components/ui/SectionTitle'
import ContactCTA from '../components/sections/ContactCTA'
import { useInView } from '../hooks/useInView'
import { company, stats } from '../data'
import mainImage from '../assets/images/mainImage.jpg'
import treeCare from '../assets/images/tree-care.jpg'

const values = [
  {
    Icon:  FaTree,
    title: 'Safety First',
    desc:  'Every job begins with a thorough risk assessment. Our crew follows strict protocols to protect people, pets, and property.',
  },
  {
    Icon:  FaHandshake,
    title: 'Honest Pricing',
    desc:  'We provide written estimates with no hidden fees. The price we quote is the price you pay, always.',
  },
  {
    Icon:  FaLeaf,
    title: 'Environmental Care',
    desc:  'We recycle wood chips, minimize soil disturbance, and recommend preservation whenever a tree can be saved.',
  },
  {
    Icon:  FaStar,
    title: 'Quality Craftsmanship',
    desc:  'From the first cut to the final cleanup, we hold ourselves to the highest standard on every project.',
  },
]

const highlights = [
  'Licensed & fully insured in Tennessee',
  'Serving the Nashville area since 2015',
  '500+ successful projects completed',
  'Certified arborists on every crew',
  '24/7 emergency response available',
  'Free estimates with no obligation',
]

function ValueCard({ Icon, title, desc, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-forest-700" />
      </div>
      <h3 className="font-heading font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function StatItem({ value, label, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-heading font-extrabold text-4xl text-forest-400 mb-1">{value}</p>
      <p className="text-xs text-gray-300 uppercase tracking-widest">{label}</p>
    </div>
  )
}

export default function About() {
  const [imgRef, imgInView] = useInView()

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={mainImage} alt="About Hector's Tree Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-950/65" />
        </div>
        <div className="relative z-10 container-xl pb-14 pt-32">
          <p className="text-forest-400 text-sm font-bold uppercase tracking-widest mb-2">About Us</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">Our Story</h1>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="page-section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              ref={imgRef}
              className={`rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
                imgInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <img
                src={treeCare}
                alt="Hector's Tree Service team"
                className="w-full h-80 lg:h-[460px] object-cover"
              />
            </div>

            <div>
              <SectionTitle
                eyebrow="Who We Are"
                title="Rooted in Nashville, Grown on Trust"
                center={false}
              />
              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  Founded in {company.established}, Hector's Tree Service started with a simple mission: deliver
                  professional-grade tree care with the personal touch of a family business. Today, we proudly
                  serve hundreds of homeowners and businesses across {company.serviceAreas}.
                </p>
                <p>
                  Our crew of certified arborists combines years of hands-on experience with modern equipment
                  and proven techniques. Whether it's a routine trimming or an emergency removal, we bring
                  the same dedication to every job — your satisfaction and safety are never negotiable.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <HiCheckCircle className="w-4 h-4 text-forest-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md"
              >
                Get in Touch
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="page-section bg-gray-50">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Our Values"
            title="What Guides Our Work"
            subtitle="These principles shape every decision we make — from how we answer the phone to how we leave your yard."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }, i) => (
              <ValueCard key={title} Icon={Icon} title={title} desc={desc} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-forest-900 py-16">
        <div className="container-xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <StatItem key={label} value={value} label={label} delay={i * 100} />
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
