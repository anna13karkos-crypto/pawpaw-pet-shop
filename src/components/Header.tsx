import { useState } from 'react'
import { motion } from 'framer-motion'

const NAV_ITEMS = ['Магазин', 'Клініка', 'Хостел', 'Блог']

function NavUnderline() {
  return (
    <svg className="nav-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M2 6 Q 25 2, 50 6 T 98 5" />
    </svg>
  )
}

function NavLink({ label }: { label: string }) {
  return (
    <a href="#" className="nav-link font-script text-xl text-cream md:text-2xl">
      {label}
      <NavUnderline />
    </a>
  )
}

function SearchIcon() {
  return (
    <svg
      className="icon-search"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      className="icon-profile"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      className="icon-cart"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h2l1.6 9.6a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20.5 9H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.9, 0.3, 1] }}
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10 md:py-7"
    >
      {/* Logo */}
      <a href="#" aria-label="Good Pets — на головну" className="shrink-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream bg-coral text-center shadow-md md:h-20 md:w-20">
          <span className="font-marker text-[9px] leading-tight text-cream md:text-[10px]">
            GOOD
            <br />
            PETS
          </span>
        </div>
      </a>

      {/* Desktop nav */}
      <nav aria-label="Основна навігація" className="hidden items-center gap-10 lg:flex">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item} label={item} />
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-5 text-cream md:gap-6">
        <button type="button" aria-label="Пошук" className="header-icon-btn hidden md:inline-flex">
          <SearchIcon />
        </button>
        <button type="button" aria-label="Профіль" className="header-icon-btn hidden md:inline-flex">
          <ProfileIcon />
        </button>
        <button type="button" aria-label="Кошик" className="header-icon-btn inline-flex">
          <CartIcon />
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="header-icon-btn inline-flex flex-col justify-center gap-1.5 lg:hidden"
        >
          <span className={`block h-0.5 w-6 bg-cream transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-cream transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-cream transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav
          aria-label="Мобільна навігація"
          className="absolute left-0 right-0 top-full mt-2 flex flex-col items-center gap-4 rounded-b-3xl bg-sky-dark/95 py-6 shadow-lg lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item} label={item} />
          ))}
          <div className="mt-2 flex items-center gap-6 text-cream">
            <button type="button" aria-label="Пошук" className="header-icon-btn">
              <SearchIcon />
            </button>
            <button type="button" aria-label="Профіль" className="header-icon-btn">
              <ProfileIcon />
            </button>
          </div>
        </nav>
      )}
    </motion.header>
  )
}
