import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneCall, Menu, X } from 'lucide-react'
import { CLINIC, NAV_LINKS } from '../data/site'
import logo from '../assets/images/logo.png'
import './Header.css'

function Header({ onBookClick, onCallClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(NAV_LINKS[0].href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean)
    if (!sections.length) return undefined

    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(`#${entry.target.id}`, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let topHref = activeHref
        let topRatio = 0
        ratios.forEach((ratio, href) => {
          if (ratio > topRatio) {
            topRatio = ratio
            topHref = href
          }
        })

        if (topRatio > 0 && topHref !== activeHref) {
          setActiveHref(topHref)
          const link = NAV_LINKS.find((l) => l.href === topHref)
          if (link) {
            window.history.replaceState(null, '', link.path)
          }
        }
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref])

  const handleNavClick = (link) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    setActiveHref(link.href)
    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', link.path)
  }

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container header__inner">
        <a href={NAV_LINKS[0].path} className="header__logo" onClick={handleNavClick(NAV_LINKS[0])}>
          <img src={logo} alt={`${CLINIC.name} logo`} className="header__logo-img" />
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.path}
                  className={activeHref === link.href ? 'header__nav-link--active' : ''}
                  onClick={handleNavClick(link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="header__nav-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setMenuOpen(false)
                onCallClick()
              }}
            >
              <PhoneCall size={16} />
              Call Now
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setMenuOpen(false)
                onBookClick()
              }}
            >
              Book Appointment
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="header__menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  )
}

export default Header
