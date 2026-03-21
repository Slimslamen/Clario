'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang'
import styles from './Hero.module.css'
import ScrollGlobe from '@/components/ui/ScrollGlobe'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* ─── Particle canvas ────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', onMouseMove)

    const COUNT = 60
    type Node = { x: number; y: number; vx: number; vy: number }
    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const LINK_DIST  = 140
    const MOUSE_DIST = 180
    const ACCENT     = '240, 168, 50'

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / LINK_DIST) * 0.18})`
            ctx.lineWidth = 1
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }

        const mdx   = nodes[i].x - mouse.x
        const mdy   = nodes[i].y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (mdist < MOUSE_DIST) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - mdist / MOUSE_DIST) * 0.5})`
          ctx.lineWidth = 1
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        const proximity = Math.max(0, 1 - mdist / MOUSE_DIST)
        ctx.beginPath()
        ctx.arc(nodes[i].x, nodes[i].y, 1.5 + proximity * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${0.2 + proximity * 0.6})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}

/* ─── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const tiltRef    = useRef<HTMLDivElement>(null)
  const glowARef   = useRef<HTMLDivElement>(null)
  const glowBRef   = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      /* 1 — clip-path entrance */
      if (!reduced) {
        gsap.set('[data-clip]', { clipPath: 'inset(0 0 100% 0)', opacity: 1 })
        gsap.timeline({ defaults: { ease: 'power4.out' } })
          .to('[data-clip]', { clipPath: 'inset(0 0 0% 0)', duration: 1, stagger: 0.14 })
          .from('[data-fade]', { opacity: 0, y: 20, duration: 0.618, stagger: 0.1 }, '-=0.5')
      }

      /* 2 — parallax scroll */
      if (!reduced) {
        const scrubConfig = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(glowARef.current, { yPercent: -35, ease: 'none', scrollTrigger: scrubConfig })
        gsap.to(glowBRef.current, { yPercent: -55, ease: 'none', scrollTrigger: scrubConfig })
        gsap.to(gridRef.current,  { yPercent: -20, ease: 'none', scrollTrigger: scrubConfig })
      }

      /* 3 — 3D mouse tilt */
      if (!reduced && tiltRef.current) {
        const el = tiltRef.current
        const qX = gsap.quickTo(el, 'rotateX', { duration: 0.6, ease: 'power3.out' })
        const qY = gsap.quickTo(el, 'rotateY', { duration: 0.6, ease: 'power3.out' })

        const onMove = (e: MouseEvent) => {
          const r  = el.getBoundingClientRect()
          const nx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
          const ny = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
          qY(nx * 8)
          qX(-ny * 5)
        }
        const onLeave = () => { qX(0); qY(0) }

        window.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        return () => {
          window.removeEventListener('mousemove', onMove)
          el.removeEventListener('mouseleave', onLeave)
        }
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="hero-globe-anchor" className={styles.hero} aria-label="Hero">

      <ParticleCanvas />

      <div ref={glowARef} className={styles.glowA} aria-hidden="true" />
      <div ref={glowBRef} className={styles.glowB} aria-hidden="true" />
      <div className={styles.glowC} aria-hidden="true" />
      <div ref={gridRef}  className={styles.grid}   aria-hidden="true" />

      <div ref={tiltRef} className={styles.tiltWrap}>
        <div className="container">
          <div className={styles.inner}>

            <p className="label" data-fade>
              {t('AI-driven automatisering', 'AI-driven automation')}
            </p>

            <h1 className={styles.headline}>
              <span className={styles.clipRow}>
                <span data-clip className={styles.clipInner}>
                  {t('Din AI-receptionist', 'Your AI receptionist')}
                </span>
              </span>
              <span className={styles.clipRow}>
                <span data-clip className={`${styles.clipInner} ${styles.accentLine}`}>
                  {t('— alltid tillgänglig', '— always available')}
                </span>
              </span>
            </h1>

            <p className={styles.sub} data-fade>
              {t(
                'Clario hanterar samtal, bokning och kundkommunikation dygnet runt — så att du kan fokusera på det som faktiskt kräver din närvaro.',
                'Clario handles calls, bookings and customer communication around the clock — so you can focus on what actually requires your presence.'
              )}
            </p>

            <div className={styles.ctas} data-fade>
              <a href="#booking" className="btn btn--primary">
                {t('Boka gratis demo', 'Book free demo')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#services" className="btn btn--ghost">
                {t('Se tjänsterna', 'Explore services')}
              </a>
            </div>

            <div className={styles.badges}>
              {[
                { icon: '🔒', label: t('GDPR-säker', 'GDPR secure') },
                { icon: '⚡', label: t('Upp och igång på 72h', 'Live in 72h') },
                { icon: '📞', label: t('24/7 tillgänglig', '24/7 available') },
              ].map(({ icon, label }) => (
                <span key={String(label)} className={styles.badge} data-fade>
                  <span aria-hidden="true">{icon}</span> {label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      <ScrollGlobe />

      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
