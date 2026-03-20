'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './CtaSection.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CtaSection() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
    })

    tl.from('[data-cta-border]', { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.inOut' })
      .from('[data-cta-label]',  { opacity: 0, y: 12, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('[data-cta-head]',   { opacity: 0, y: 32, duration: 0.9, ease: 'power4.out' }, '-=0.2')
      .from('[data-cta-sub]',    { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('[data-cta-btn]',    { opacity: 0, scale: 0.92, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.2')

    // Pulsing glow on the section
    gsap.to('[data-cta-glow]', {
      scale: 1.3, opacity: 0.6, duration: 3,
      repeat: -1, yoyo: true, ease: 'sine.inOut'
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={`section--sm ${styles.cta}`} aria-labelledby="cta-heading">
      <div className={styles.glow} data-cta-glow aria-hidden="true" />
      <div className={styles.borderTop} data-cta-border aria-hidden="true" />
      <div className={styles.borderBottom} data-cta-border aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          <p className="label" style={{ justifyContent: 'center' }} data-cta-label>
            {t('Kom igång idag', 'Get started today')}
          </p>
          <h2 id="cta-heading" className={styles.heading} data-cta-head>
            {t(
              <>Redo att automatisera din<br /><em>verksamhet med AI?</em></>,
              <>Ready to automate your<br /><em>business with AI?</em></>
            )}
          </h2>
          <p className={styles.sub} data-cta-sub>
            {t(
              'Boka en gratis 30-minuters demo. Vi visar hur Clario fungerar i din specifika verksamhet — utan säljprat.',
              'Book a free 30-minute demo. We show how Clario works in your specific business — no sales pitch.'
            )}
          </p>
          <div className={styles.actions} data-cta-btn>
            <a href="#booking" className="btn btn--primary">
              {t('Boka gratis demo', 'Book free demo')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <p className={styles.note}>{t('Ingen bindningstid. Ingen kreditkort krävs.', 'No commitment. No credit card required.')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
