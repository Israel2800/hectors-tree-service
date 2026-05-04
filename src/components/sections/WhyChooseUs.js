import { FaShieldAlt, FaAward, FaLeaf, FaHeadset } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'
import { useInView } from '../../hooks/useInView'
import SectionTitle from '../ui/SectionTitle'
import { stats } from '../../data'
import treeCareImg from '../../assets/images/tree-care.jpg'

const reasons = [
  {
    Icon:  FaShieldAlt,
    title: 'Fully Licensed & Insured',
    desc:  'We carry comprehensive liability insurance and workers\' compensation — every job, every time.',
  },
  {
    Icon:  FaAward,
    title: 'Certified Arborists',
    desc:  'Our crew is trained and certified, bringing professional expertise to every project.',
  },
  {
    Icon:  FaLeaf,
    title: 'Eco-Responsible Methods',
    desc:  'We prioritize tree health and environmental care, recycling wood chips and minimizing waste.',
  },
  {
    Icon:  FaHeadset,
    title: '24/7 Emergency Response',
    desc:  "Storm damage doesn't keep business hours. Neither do we — call us any time.",
  },
]

function ReasonItem({ Icon, title, desc, delay }) {
  const [ref, inView] = useInView()
  return (
    <li
      ref={ref}
      className={`flex gap-4 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 bg-forest-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-forest-700" />
      </div>
      <div>
        <h3 className="font-heading font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </li>
  )
}

function StatBlock({ value, label, delay }) {
  const [ref, isInView] = useInView()
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-heading font-extrabold text-4xl lg:text-5xl text-forest-400 mb-1">{value}</p>
      <p className="text-sm text-gray-300 font-medium uppercase tracking-wider">{label}</p>
    </div>
  )
}

export default function WhyChooseUs() {
  const [imgRef, imgInView] = useInView()

  return (
    <>
      {/* ── Why Us ── */}
      <section className="page-section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div
              ref={imgRef}
              className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
                imgInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <img
                src={treeCareImg}
                alt="Our professional team at work"
                className="w-full h-80 lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                  <FaAward className="w-6 h-6 text-forest-700" />
                </div>
                <div>
                  <p className="font-heading font-bold text-gray-900 text-sm">10+ Years</p>
                  <p className="text-xs text-gray-500">Serving Nashville, TN</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <SectionTitle
                eyebrow="Why Choose Us"
                title="The Right Team for Every Tree"
                subtitle="We combine certified expertise, modern equipment, and genuine care for your property."
                center={false}
              />

              <ul className="space-y-5">
                {reasons.map(({ Icon, title, desc }, i) => (
                  <ReasonItem key={title} Icon={Icon} title={title} desc={desc} delay={i * 80} />
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-2 text-sm text-forest-700 font-semibold">
                <HiCheckCircle className="w-5 h-5" />
                100% satisfaction guaranteed on every job
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-forest-900 py-16">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }, i) => (
              <StatBlock key={label} value={value} label={label} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
