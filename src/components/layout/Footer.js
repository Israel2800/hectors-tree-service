import { Link } from 'react-router-dom'
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi'
import logo from '../../assets/HLogo.png'
import { company } from '../../data'

const quickLinks = [
  { name: 'Home',    path: '/'        },
  { name: 'About',   path: '/about'   },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
]

const serviceLinks = [
  { name: 'Tree Removal',  path: '/services/tree-removal'  },
  { name: 'Tree Trimming', path: '/services/tree-trimming' },
  { name: 'Stump Removal', path: '/services/stump-removal' },
  { name: 'Tree Care',     path: '/services/tree-care'     },
]

const socials = [
  { Icon: FaFacebookF, label: 'Facebook', href: company.facebookHref },
  { Icon: FaInstagram, label: 'Instagram', href: company.instagramHref },
  { Icon: FaGoogle, label: 'Google Reviews', href: company.googleReviewsHref },
  { Icon: SiTiktok, label: 'TikTok', href: company.tiktokHref },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt={company.name} className="h-[4.5rem] w-auto object-contain sm:h-[5.25rem]" />
              <div className="leading-tight">
                <p className="font-heading font-bold text-white text-base">{company.name}</p>
                <p className="text-xs text-forest-400">{company.license}</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Professional tree care services across {company.serviceAreas}. Quality work, fair pricing, guaranteed satisfaction.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-forest-700 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm hover:text-forest-400 transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm hover:text-forest-400 transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <HiLocationMarker className="w-4 h-4 text-forest-500 mt-0.5 shrink-0" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <HiPhone className="w-4 h-4 text-forest-500 shrink-0" />
                <a href={company.phoneHref} className="hover:text-forest-400 transition-colors">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <HiMail className="w-4 h-4 text-forest-500 shrink-0" />
                <a href={company.emailHref} className="hover:text-forest-400 transition-colors break-all">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <HiClock className="w-4 h-4 text-forest-500 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  {company.businessHours.map(({ days, hours }) => (
                    <div key={days}>
                      <span className="text-gray-300 font-medium">{days}:</span>{' '}
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Licensed &amp; Insured in Tennessee</p>
        </div>
      </div>
    </footer>
  )
}
