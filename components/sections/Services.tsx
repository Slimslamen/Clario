'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './Services.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const services = [
  {
    num: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 16c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2.5" fill="currentColor"/>
        <path d="M16 6v2M16 24v2M6 16h2M24 16h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    problemSv: 'Receptionen klarar inte alla inkommande samtal.',
    problemEn: "Your front desk can't handle every incoming call.",
    solutionSv: 'Clario AI-receptionist svarar, förstår och hanterar samtal på naturlig svenska — dygnet runt.',
    solutionEn: "Clario's AI receptionist answers, understands and handles calls in natural language — around the clock.",
    outcomeSv: 'Inga missade samtal. Nöjdare kunder. Friare personal.',
    outcomeEn: 'Zero missed calls. Happier clients. Freed-up staff.',
    titleSv: 'AI-receptionist',
    titleEn: 'AI Receptionist',
  },
  {
    num: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="24" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 12h24M10 3v4M22 3v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="9" y="17" width="5" height="5" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="18" y="17" width="5" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      </svg>
    ),
    problemSv: 'Manuell bokning tar tid och leder till dubbelbokning.',
    problemEn: 'Manual booking wastes time and causes double-bookings.',
    solutionSv: 'Automatisk synkronisering mot ditt bokningssystem — direkt via AI-samtalet.',
    solutionEn: 'Automatic sync with your booking system — directly through the AI conversation.',
    outcomeSv: 'Felfri bokning utan manuell hantering.',
    outcomeEn: 'Error-free bookings without manual handling.',
    titleSv: 'Bokningsautomation',
    titleEn: 'Booking Automation',
  },
  {
    num: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 8h24v16a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 24V8Z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 8l12 10.5L28 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="24" cy="22" r="4" fill="var(--c-accent)" opacity="0.15"/>
        <path d="M22.5 22l1 1 2-2" stroke="var(--c-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    problemSv: 'Kunddata lever i silos — CRM uppdateras inte automatiskt.',
    problemEn: "Customer data lives in silos — CRM isn't updated automatically.",
    solutionSv: 'Clario skriver automatiskt kundinteraktioner, noteringar och statusändringar till ditt CRM.',
    solutionEn: 'Clario automatically writes customer interactions, notes and status changes to your CRM.',
    outcomeSv: 'Alltid aktuell kunddata. Bättre uppföljning.',
    outcomeEn: 'Always up-to-date customer data. Better follow-up.',
    titleSv: 'CRM-integration',
    titleEn: 'CRM Integration',
  },
]

export default function Services() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    gsap.set('[data-service]', { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
    gsap.to('[data-service]', {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1,
      stagger: 0.18,
      ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })

    // Number counter for service cards
    gsap.from('[data-service-num]', {
      textContent: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.18,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className={`section ${styles.services}`} aria-labelledby="services-heading">
      <div className={styles.bgLine} aria-hidden="true" />
      <div className="container">
        <div className={styles.header}>
          <p className="label">{t('Tjänster', 'Services')}</p>
          <h2 id="services-heading">{t('Vad Clario gör för dig', 'What Clario does for you')}</h2>
          <p className={styles.sub}>
            {t(
              'Tre kärnautomatiseringar som direkt påverkar din verksamhets effektivitet och kundnöjdhet.',
              'Three core automations that directly impact your business efficiency and customer satisfaction.'
            )}
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <article key={i} className={styles.card} data-service>
              <div className={styles.topRow}>
                <span className={styles.serviceNum} data-service-num>{s.num}</span>
                <div className={styles.iconWrap}>{s.icon}</div>
              </div>

              <h3 className={styles.title}>{t(s.titleSv, s.titleEn)}</h3>

              <dl className={styles.flow}>
                <div className={styles.flowItem}>
                  <dt className={styles.flowLabel}>{t('Problem', 'Problem')}</dt>
                  <dd className={styles.flowText}>{t(s.problemSv, s.problemEn)}</dd>
                </div>
                <div className={styles.flowItem}>
                  <dt className={styles.flowLabel}>{t('Lösning', 'Solution')}</dt>
                  <dd className={styles.flowText}>{t(s.solutionSv, s.solutionEn)}</dd>
                </div>
                <div className={`${styles.flowItem} ${styles.outcomeItem}`}>
                  <dt className={`${styles.flowLabel} ${styles.outcomeLabel}`}>{t('Resultat', 'Outcome')}</dt>
                  <dd className={`${styles.flowText} ${styles.outcomeText}`}>{t(s.outcomeSv, s.outcomeEn)}</dd>
                </div>
              </dl>

              <div className={styles.cardGlow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
