'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/lang'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#results',      label: t('Resultat', 'Results') },
    { href: '#services',     label: t('Tjänster', 'Services') },
    { href: '#process',      label: t('Process', 'Process') },
    { href: '#testimonials', label: t('Kunder', 'Clients') },
    { href: '#faq',          label: 'FAQ' },
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={styles.nav} aria-label="Primär navigation">
        <a href="/" className={styles.logo} aria-label="Clario – startsida">
          <span className={styles.logoMark}>C</span>
          <span className={styles.logoText}>lario</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={styles.link}>{label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          {/* Language toggle */}
          <button
            className={styles.langToggle}
            onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')}
            aria-label={lang === 'sv' ? 'Switch to English' : 'Byt till svenska'}
          >
            {lang === 'sv' ? 'EN' : 'SV'}
          </button>

          <a href="#booking" className="btn btn--primary" style={{ fontSize: '0.75rem', padding: '10px 20px' }}>
            {t('Boka demo', 'Book demo')}
          </a>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#booking" className="btn btn--primary" onClick={() => setMenuOpen(false)}>
              {t('Boka demo', 'Book demo')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
