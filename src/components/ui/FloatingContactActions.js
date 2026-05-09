import { Link } from 'react-router-dom'
import { HiChatAlt2, HiPhone } from 'react-icons/hi'
import { company } from '../../data'

function FloatingAction({ as: Component = 'a', className = '', children, ...props }) {
  return (
    <Component
      className={`group flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl shadow-forest-900/20 ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl sm:h-auto sm:w-auto sm:min-w-[11rem] sm:justify-start sm:gap-2.5 sm:px-4 sm:py-3 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default function FloatingContactActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <FloatingAction
        href={company.phoneHref}
        aria-label={`Call ${company.name}`}
        className="bg-white text-forest-800"
      >
        <HiPhone className="h-5 w-5 shrink-0" />
        <span className="hidden text-sm font-semibold sm:inline">Call Now</span>
      </FloatingAction>

      <FloatingAction
        as={Link}
        to="/contact"
        aria-label="Request an estimate"
        className="bg-forest-700 text-white"
      >
        <HiChatAlt2 className="h-5 w-5 shrink-0" />
        <span className="hidden text-sm font-semibold sm:inline">Free Estimate</span>
      </FloatingAction>
    </div>
  )
}
