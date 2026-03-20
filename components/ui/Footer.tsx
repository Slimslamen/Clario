'use client'

import { useLang } from '@/lib/lang'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo} aria-label="Clario – startsida">
              <span className={styles.logoMark}>C</span>lario
            </a>
            <p className={styles.tagline}>
              {t(
                'AI-driven automatisering för moderna svenska verksamheter.',
                'AI-driven automation for modern Swedish businesses.'
              )}
            </p>
          </div>

          <nav aria-label={t('Sidfotslänkar', 'Footer navigation')}>
            <ul className={styles.links} role="list">
              <li><a href="#services">{t('Tjänster', 'Services')}</a></li>
              <li><a href="#process">{t('Process', 'Process')}</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#booking">{t('Boka demo', 'Book demo')}</a></li>
              <li><a href="/privacy-policy">{t('Integritetspolicy', 'Privacy policy')}</a></li>
            </ul>
          </nav>

          <div className={styles.contact}>
            <p className={styles.contactLabel}>{t('Kontakt', 'Contact')}</p>
            <a href="mailto:hej@clario.se" className={styles.email}>hej@clario.se</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Clario. {t('Alla rättigheter förbehållna.', 'All rights reserved.')}
          </p>
          <p className={styles.legal}>
            {t('Organisationsnummer: 556XXX-XXXX · Sverige', 'Org. no: 556XXX-XXXX · Sweden')}
          </p>
        </div>
      </div>
    </footer>
  )
}
