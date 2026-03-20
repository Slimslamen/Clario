'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './Faq.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const faqs = [
  {
    qSv: 'Hur lång tid tar det att komma igång med Clario?',
    qEn: 'How long does it take to get started with Clario?',
    aSv: 'Typisk implementationstid är 72 timmar från beställning till live-system. Vi hanterar all teknisk setup och konfiguration. Du behöver inte göra något tekniskt.',
    aEn: "Typical implementation time is 72 hours from order to live system. We handle all technical setup and configuration. You don't need to do anything technical.",
  },
  {
    qSv: 'Vilka bokningssystem integrerar Clario med?',
    qEn: 'Which booking systems does Clario integrate with?',
    aSv: 'Clario integrerar med de flesta moderna bokningssystem, inklusive Bokadirekt, Cal.com och andra API-baserade plattformar. Hör av dig om ditt specifika system.',
    aEn: "Clario integrates with most modern booking systems, including Bokadirekt, Cal.com and other API-based platforms. Contact us about your specific system.",
  },
  {
    qSv: 'Är Clario GDPR-kompatibelt?',
    qEn: 'Is Clario GDPR compliant?',
    aSv: 'Ja. All databehandling sker inom EU, vi lagrar minimal data, och vi har tydliga databehandlingsavtal (DPA) med alla underleverantörer.',
    aEn: 'Yes. All data processing takes place within the EU, we store minimal data, and we have clear data processing agreements (DPA) with all subprocessors.',
  },
  {
    qSv: 'Kan AI:n prata svenska med mina kunder?',
    qEn: 'Can the AI speak Swedish with my customers?',
    aSv: 'Absolut. Det är en kärnfunktion. Clario är optimerad för naturlig, professionell svenska och kan hantera dialekter och branschspecifikt språk.',
    aEn: "Absolutely. That's a core feature. Clario is optimized for natural, professional Swedish and can handle dialects and industry-specific language.",
  },
  {
    qSv: 'Vad händer om AI:n inte kan svara på en fråga?',
    qEn: "What happens if the AI can't answer a question?",
    aSv: 'Clario eskalerar smidigt till en mänsklig medarbetare eller skickar ett meddelande för återkoppling. Systemet är aldrig en återvändsgränd.',
    aEn: 'Clario seamlessly escalates to a human team member or sends a message for follow-up. The system is never a dead end.',
  },
  {
    qSv: 'Finns det ett bindande kontrakt?',
    qEn: 'Is there a binding contract?',
    aSv: 'Nej. Vi tror på att leverera värde, inte på att låsa in kunder. Du kan avsluta med 30 dagars uppsägningstid.',
    aEn: "No. We believe in delivering value, not locking customers in. You can cancel with 30 days' notice.",
  },
]

export default function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return

    gsap.from('[data-faq-header]', {
      opacity: 0, x: -40, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
    gsap.from('[data-faq-item]', {
      opacity: 0, x: 40, duration: 0.8, stagger: 0.09, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
  }, { scope: sectionRef })

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section id="faq" ref={sectionRef} className={`section ${styles.faq}`} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left} data-faq-header>
            <p className="label">{t('Vanliga frågor', 'Common questions')}</p>
            <h2 id="faq-heading">{t('Svar på dina frågor', 'Answers to your questions')}</h2>
            <p className={styles.sub}>
              {t(
                'Hittar du inte svaret du söker? Boka en demo så reder vi ut det.',
                "Can't find the answer? Book a demo and we'll sort it out."
              )}
            </p>
            <a href="#booking" className="btn btn--ghost" style={{ marginTop: 'var(--sp-4)' }}>
              {t('Boka demo', 'Book demo')}
            </a>
          </div>

          <div className={styles.right}>
            <dl>
              {faqs.map((faq, i) => (
                <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`} data-faq-item>
                  <dt>
                    <button
                      className={styles.question}
                      onClick={() => toggle(i)}
                      aria-expanded={open === i}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-q-${i}`}
                    >
                      <span>{t(faq.qSv, faq.qEn)}</span>
                      <span className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`} aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                    className={`${styles.answer} ${open === i ? styles.answerOpen : ''}`}>
                    <p>{t(faq.aSv, faq.aEn)}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
