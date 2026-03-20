'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import styles from './CookieBanner.module.css'

const STORAGE_KEY = 'clario_cookie_consent'

export default function CookieBanner() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage unavailable (SSR, privacy mode) — show banner
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch { /* ignore */ }
    setVisible(false)
  }

  const decline = () => {
    try { localStorage.setItem(STORAGE_KEY, 'declined') } catch { /* ignore */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-label={t('Cookie-meddelande', 'Cookie notice')}
      aria-live="polite"
    >
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>{t('Vi använder cookies', 'We use cookies')}</p>
          <p className={styles.body}>
            {t(
              'Vi använder nödvändiga cookies för att webbplatsen ska fungera. Med ditt samtycke kan vi även använda analytiska cookies för att förbättra tjänsten. Inga tredjepartsspårare aktiveras utan ditt godkännande.',
              'We use necessary cookies to make the website work. With your consent we may also use analytical cookies to improve the service. No third-party trackers are activated without your approval.'
            )}{' '}
            <a href="/privacy-policy" className={styles.policyLink}>
              {t('Läs mer', 'Learn more')}
            </a>
          </p>
        </div>
        <div className={styles.actions}>
          <button className="btn btn--ghost" onClick={decline} style={{ fontSize: '0.75rem', padding: '10px 18px' }}>
            {t('Neka', 'Decline')}
          </button>
          <button className="btn btn--primary" onClick={accept} style={{ fontSize: '0.75rem', padding: '10px 18px' }}>
            {t('Acceptera', 'Accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
