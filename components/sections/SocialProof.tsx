'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './SocialProof.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const testimonials = [
  {
    quoteSv: 'Clario har förändrat hur vi hanterar inkommande samtal. Vi missar knappt någonting längre, och personalen kan äntligen fokusera på patienterna.',
    quoteEn: 'Clario has transformed how we handle incoming calls. We barely miss anything anymore, and the staff can finally focus on the patients.',
    nameSv: 'Anna Lindqvist', nameEn: 'Anna Lindqvist',
    roleSv: 'Klinikchef, Hälsokliniken Stockholm', roleEn: 'Clinic Manager, Hälsokliniken Stockholm',
    initials: 'AL', color: '#f0a832',
  },
  {
    quoteSv: 'Implementationen tog bokstavligen 48 timmar. Nu körs bokning och uppföljning helt automatiskt. Otroligt smidig lösning.',
    quoteEn: 'Implementation literally took 48 hours. Now bookings and follow-ups run completely automatically. Incredibly smooth solution.',
    nameSv: 'Marcus Berg', nameEn: 'Marcus Berg',
    roleSv: 'VD, Bergström Fastigheter', roleEn: 'CEO, Bergström Properties',
    initials: 'MB', color: '#6378ff',
  },
  {
    quoteSv: 'Vi testade flera AI-lösningar men Clario var den enda som faktiskt förstod hur vi kommunicerar med våra kunder på svenska.',
    quoteEn: 'We tested several AI solutions but Clario was the only one that actually understood how we communicate with our customers in Swedish.',
    nameSv: 'Sara Holm', nameEn: 'Sara Holm',
    roleSv: 'Grundare, Wellness by Sara', roleEn: 'Founder, Wellness by Sara',
    initials: 'SH', color: '#2dd4bf',
  },
]

const logos = ['Hälsokliniken', 'Bergström', 'Wellness by Sara', 'Nordic Dental', 'Friskvård AB']

export default function SocialProof() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    // Logo strip fade
    gsap.from('[data-logo]', {
      opacity: 0, y: 16, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '[data-logo-strip]', start: 'top 85%', once: true },
    })

    // Cards 3D flip-in
    gsap.set('[data-testimonial]', { opacity: 0, rotateY: -15, transformPerspective: 800 })
    gsap.to('[data-testimonial]', {
      opacity: 1, rotateY: 0, duration: 1, stagger: 0.18, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section id="testimonials" ref={sectionRef} className={`section ${styles.social}`} aria-labelledby="testimonials-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="label">{t('Kundberättelser', 'Client stories')}</p>
          <h2 id="testimonials-heading">{t('Vad våra kunder säger', 'What our clients say')}</h2>
        </div>

        <div className={styles.logoStrip} data-logo-strip aria-label={t('Utvalda kunder', 'Selected clients')}>
          {logos.map(logo => <span key={logo} className={styles.logo} data-logo>{logo}</span>)}
        </div>

        <div className={styles.grid}>
          {testimonials.map((tm, i) => (
            <blockquote key={i} className={styles.card} data-testimonial>
              <div className={styles.cardAccent} style={{ background: `radial-gradient(circle at 0% 0%, ${tm.color}18, transparent 60%)` }} aria-hidden="true" />
              <div className={styles.stars} aria-label="5 av 5 stjärnor">
                {[...Array(5)].map((_, j) => <span key={j} aria-hidden="true">★</span>)}
              </div>
              <p className={styles.quote}>"{t(tm.quoteSv, tm.quoteEn)}"</p>
              <footer className={styles.author}>
                <div className={styles.avatar} style={{ background: `${tm.color}20`, color: tm.color, border: `1px solid ${tm.color}40` }} aria-hidden="true">
                  {tm.initials}
                </div>
                <div>
                  <cite className={styles.name}>{t(tm.nameSv, tm.nameEn)}</cite>
                  <p className={styles.role}>{t(tm.roleSv, tm.roleEn)}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
