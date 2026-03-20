'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './Results.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const metrics = [
  { value: 35,  suffix: '%', labelSv: 'ökad effektivitet',     labelEn: 'efficiency increase' },
  { value: 80,  suffix: '%', labelSv: 'färre missade samtal',  labelEn: 'fewer missed calls'  },
  { value: 48,  suffix: 'h', labelSv: 'till live-system',      labelEn: 'to go live'          },
  { value: 24,  suffix: '/7',labelSv: 'AI alltid tillgänglig', labelEn: 'AI always available' },
]

export default function Results() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    // Cards fly in with clip
    gsap.set('[data-metric]', { clipPath: 'inset(0 0 100% 0)', opacity: 1 })
    gsap.to('[data-metric]', {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })

    // Counters
    document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count') ?? '0')
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => gsap.to({ val: 0 }, {
          val: target, duration: 1.618, ease: 'power2.out',
          onUpdate(this: gsap.core.Tween) {
            el.textContent = Math.round((this.targets()[0] as { val: number }).val).toString()
          },
        }),
      })
    })

    // Horizontal scan line
    gsap.fromTo('[data-scan]',
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section id="results" ref={sectionRef} className={`section ${styles.results}`} aria-labelledby="results-heading">
      <div className={styles.scanLine} data-scan aria-hidden="true" />
      <div className="container">
        <div className={styles.header}>
          <p className="label">{t('Bevisade resultat', 'Proven results')}</p>
          <h2 id="results-heading">{t('Siffror som talar', 'Numbers that speak')}</h2>
        </div>
        <div className={styles.grid}>
          {metrics.map((m, i) => (
            <div key={i} className={styles.card} data-metric>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.value}>
                <span data-count={m.value} className={styles.number}>0</span>
                <span className={styles.suffix}>{m.suffix}</span>
              </div>
              <p className={styles.metricLabel}>{t(m.labelSv, m.labelEn)}</p>
              <div className={styles.bar}>
                <div className={styles.barFill} style={{ '--pct': `${m.value === 24 ? 100 : m.value}%` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
