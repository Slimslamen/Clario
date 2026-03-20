'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './Process.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const steps = [
  {
    num: '01', titleSv: 'Analys',        titleEn: 'Analysis',
    descSv: 'Vi kartlägger dina nuvarande flöden — samtal, bokning och kundkommunikation — och identifierar var AI skapar störst värde.',
    descEn: 'We map your current flows — calls, bookings and customer communication — and identify where AI creates the greatest value.',
  },
  {
    num: '02', titleSv: 'Setup',         titleEn: 'Setup',
    descSv: 'Clario konfigureras efter din verksamhet: röst, tonalitet, integrationer och bokningsregler anpassas exakt efter dina behov.',
    descEn: 'Clario is configured for your business: voice, tone, integrations and booking rules are tailored exactly to your needs.',
  },
  {
    num: '03', titleSv: 'Implementation',titleEn: 'Implementation',
    descSv: 'Vi driftsätter och testar systemet live. Allt verifieras innan det går i produktion. Typisk ledtid: 48 timmar.',
    descEn: 'We deploy and test the system live. Everything is verified before going to production. Typical lead time: 48 hours.',
  },
  {
    num: '04', titleSv: 'Optimering',    titleEn: 'Optimization',
    descSv: 'Löpande uppföljning av samtalskvalitet, konvertering och systemstabilitet. Vi itererar baserat på verklig data.',
    descEn: 'Continuous monitoring of call quality, conversion and system stability. We iterate based on real data.',
  },
]

export default function Process() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true }
    })

    tl.from('[data-step]', { opacity: 0, y: 48, duration: 0.9, stagger: 0.15, ease: 'power4.out' })
      .from('[data-connector]', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.inOut' }, '-=0.6')

    // Active step highlight on scroll
    steps.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: `[data-step-idx="${i}"]`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => gsap.to(`[data-step-idx="${i}"] [data-step-num]`, { color: 'var(--c-accent)', duration: 0.4 }),
        onLeaveBack: () => gsap.to(`[data-step-idx="${i}"] [data-step-num]`, { color: 'rgba(255,255,255,0.08)', duration: 0.4 }),
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="process" ref={sectionRef} className={`section ${styles.process}`} aria-labelledby="process-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="label">{t('Vår process', 'Our process')}</p>
          <h2 id="process-heading">{t('Från idé till live på 48h', 'From idea to live in 48h')}</h2>
        </div>

        <ol className={styles.steps} role="list">
          {steps.map((s, i) => (
            <li key={i} className={styles.step} data-step data-step-idx={i}>
              <div className={styles.stepHead}>
                <span className={styles.num} data-step-num>{s.num}</span>
                {i < steps.length - 1 && <div className={styles.connector} data-connector aria-hidden="true" />}
              </div>
              <h3 className={styles.stepTitle}>{t(s.titleSv, s.titleEn)}</h3>
              <p className={styles.stepDesc}>{t(s.descSv, s.descEn)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
