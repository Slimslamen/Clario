'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './Booking.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Booking() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
    })

    tl.from('[data-book-head]', { opacity: 0, y: 40, duration: 1, ease: 'power4.out' })
      .from('[data-book-frame]', {
        opacity: 0, scale: 0.96, y: 30, duration: 1.2, ease: 'power4.out'
      }, '-=0.5')

    // Corner accent lines draw in
    gsap.from('[data-corner]', {
      opacity: 0, scale: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(2)',
      scrollTrigger: { trigger: '[data-book-frame]', start: 'top 80%', once: true },
    })
  }, { scope: sectionRef })

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <section id="booking" ref={sectionRef} className={`section ${styles.booking}`} aria-labelledby="booking-heading">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.header} data-book-head>
          <p className="label" style={{ justifyContent: 'center' }}>{t('Boka demo', 'Book demo')}</p>
          <h2 id="booking-heading">{t('Se Clario i aktion — gratis', 'See Clario in action — free')}</h2>
          <p className={styles.sub}>
            {t(
              '30 minuter. Ingen säljpitch. Vi visar hur Clario fungerar i just din verksamhet.',
              '30 minutes. No sales pitch. We show how Clario works in your specific business.'
            )}
          </p>
        </div>

        <div className={styles.frameWrap} data-book-frame>
          {/* Corner decorations */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} className={`${styles.corner} ${styles[`corner-${pos}` as keyof typeof styles]}`} data-corner aria-hidden="true" />
          ))}

          <iframe
            src={`https://cal.com/jimmy-lopez-morales-iawco1/30min?embed=true&theme=dark`}
            className={styles.calEmbed}
            title={t('Boka en demo med Clario', 'Book a demo with Clario')}
            loading="lazy"
            allowFullScreen
            aria-label={t(
              'Kalenderbokning — välj tid för din gratis Clario-demo',
              'Calendar booking — pick a time for your free Clario demo'
            )}
          />
        </div>

        <p className={styles.privacy}>
          {t('Dina uppgifter behandlas enligt vår ', 'Your data is processed according to our ')}
          <a href="/privacy-policy" className={styles.privacyLink}>
            {t('integritetspolicy', 'privacy policy')}
          </a>.
        </p>
      </div>
    </section>
  )
}
