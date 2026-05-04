import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiX, HiPhone, HiChevronDown } from 'react-icons/hi'
import logo from '../../assets/HLogo.png'

const serviceLinks = [
  { name: 'Tree Removal',  path: '/services/tree-removal'  },
  { name: 'Tree Trimming', path: '/services/tree-trimming' },
  { name: 'Stump Removal', path: '/services/stump-removal' },
  { name: 'Tree Care',     path: '/services/tree-care'     },
]

const navLinks = [
  { name: 'Home',     path: '/',        end: true },
  { name: 'About',    path: '/about'              },
  { name: 'Gallery',  path: '/gallery'            },
  { name: 'Contact',  path: '/contact'            },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [dropdownOpen,  setDropdownOpen]  = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const baseLinkClass = (isActive) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-forest-500'
        : scrolled
          ? 'text-gray-700 hover:text-forest-700'
          : 'text-white/90 hover:text-white'
    }`

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-0'
          : 'bg-gradient-to-b from-black/60 to-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={logo}
              alt="Hector's Tree Service"
              className="h-11 w-11 object-contain"
            />
            <div className="leading-tight">
              <p className={`font-heading font-bold text-base transition-colors ${
                scrolled ? 'text-forest-900' : 'text-white'
              }`}>
                Hector's Tree Service
              </p>
              <p className={`text-xs font-medium transition-colors ${
                scrolled ? 'text-forest-600' : 'text-forest-300'
              }`}>
                Licensed &amp; Insured
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, 1).map(({ name, path, end }) => (
              <NavLink key={path} to={path} end={end}
                className={({ isActive }) => baseLinkClass(isActive)}>
                {name}
              </NavLink>
            ))}

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `${baseLinkClass(isActive)} flex items-center gap-1`
                }
              >
                Services
                <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </NavLink>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <Link
                  to="/services"
                  className="block px-4 py-3 text-sm font-semibold text-forest-700 bg-forest-50 hover:bg-forest-100 border-b border-gray-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  All Services
                </Link>
                {serviceLinks.map(({ name, path }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                        isActive ? 'text-forest-700 bg-forest-50' : 'text-gray-600 hover:bg-gray-50 hover:text-forest-700'
                      }`
                    }
                    onClick={() => setDropdownOpen(false)}
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map(({ name, path }) => (
              <NavLink key={path} to={path}
                className={({ isActive }) => baseLinkClass(isActive)}>
                {name}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:6154010212"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                scrolled ? 'text-forest-700 hover:text-forest-900' : 'text-white/90 hover:text-white'
              }`}
            >
              <HiPhone className="w-4 h-4" />
              (615) 401-0212
            </a>
            <Link
              to="/contact"
              className="bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-forest-900/20 hover:-translate-y-px active:scale-95"
            >
              Free Quote
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-gray-100 shadow-xl px-4 py-4 space-y-1">
          {navLinks.slice(0, 1).map(({ name, path, end }) => (
            <NavLink
              key={path} to={path} end={end}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest-50 text-forest-700' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {name}
            </NavLink>
          ))}

          {/* Mobile Services */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Services
              <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? 'max-h-64' : 'max-h-0'}`}>
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-forest-100 pl-3">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'text-forest-700 font-semibold' : 'text-gray-500 hover:text-forest-700'
                    }`
                  }
                  onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                >
                  All Services
                </NavLink>
                {serviceLinks.map(({ name, path }) => (
                  <NavLink
                    key={path} to={path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? 'text-forest-700 font-semibold' : 'text-gray-500 hover:text-forest-700'
                      }`
                    }
                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(1).map(({ name, path }) => (
            <NavLink
              key={path} to={path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest-50 text-forest-700' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <a
              href="tel:6154010212"
              className="flex items-center gap-2 px-4 py-2 text-forest-700 font-semibold text-sm"
            >
              <HiPhone className="w-4 h-4" />
              (615) 401-0212
            </a>
            <Link
              to="/contact"
              className="block w-full bg-forest-700 hover:bg-forest-800 text-white text-center text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
