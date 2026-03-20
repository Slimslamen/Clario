'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ScrollGlobe.module.css'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['results', 'services', 'process', 'testimonials', 'faq', 'booking']

const SECTION_COLORS = [
  { r: 0.94, g: 0.66, b: 0.20 },
  { r: 0.94, g: 0.66, b: 0.20 },
  { r: 0.39, g: 0.47, b: 1.00 },
  { r: 0.18, g: 0.83, b: 0.75 },
  { r: 0.94, g: 0.66, b: 0.20 },
  { r: 0.94, g: 0.66, b: 0.20 },
]

export default function ScrollGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) return
    if (!mountRef.current || !wrapRef.current) return

    let animId = 0
    let renderer: import('three').WebGLRenderer
    let scene: import('three').Scene
    let camera: import('three').PerspectiveCamera
    let pointsMesh: import('three').Points
    let linesMesh: import('three').LineSegments
    let atmoMesh: import('three').Mesh

    let autoRotY   = 0
    let mouseX     = 0
    let mouseY     = 0
    let sectionIdx = 0
    let currentColor = { r: 0.94, g: 0.66, b: 0.20 }
    let targetColor  = { r: 0.94, g: 0.66, b: 0.20 }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // ── ScrollTrigger: follow scroll + shrink + fade out ──────────
    // Globe is position:fixed. We drive y manually so it scrolls with page,
    // shrinks progressively, then fades out at hero bottom.
    const heroEl = document.getElementById('hero-globe-anchor')

    gsap.to(wrapRef.current, {
      scale: 0.12,
      y: () => (heroEl?.offsetHeight ?? window.innerHeight) * 0.5,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroEl ?? document.body,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    const onScroll = () => {}

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('scroll',    onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse,  { passive: true })

    // ── Three.js init ────────────────────────────────────────────
    const init = async () => {
      const T = await import('three')

      scene  = new T.Scene()
      camera = new T.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.z = 3.2

      renderer = new T.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(500, 500)
      renderer.setClearColor(0x000000, 0)
      mountRef.current!.appendChild(renderer.domElement)

      // Fibonacci sphere
      const COUNT = 2000
      const R = 1.0
      const pos    = new Float32Array(COUNT * 3)
      const cols   = new Float32Array(COUNT * 3)
      const sizes  = new Float32Array(COUNT)

      for (let i = 0; i < COUNT; i++) {
        const phi   = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        pos[i*3]   = R * Math.sin(phi) * Math.cos(theta)
        pos[i*3+1] = R * Math.sin(phi) * Math.sin(theta)
        pos[i*3+2] = R * Math.cos(phi)
        sizes[i]   = 0.010 + Math.sin(phi) * 0.016
        const b = 0.75 + Math.random() * 0.25
        cols[i*3]   = currentColor.r * b
        cols[i*3+1] = currentColor.g * b
        cols[i*3+2] = currentColor.b * b
      }

      const geo = new T.BufferGeometry()
      geo.setAttribute('position', new T.BufferAttribute(pos,   3))
      geo.setAttribute('color',    new T.BufferAttribute(cols,  3))
      geo.setAttribute('size',     new T.BufferAttribute(sizes, 1))

      // Sprite
      const c2 = document.createElement('canvas')
      c2.width = c2.height = 64
      const cx = c2.getContext('2d')!
      const gr = cx.createRadialGradient(32,32,0,32,32,32)
      gr.addColorStop(0,   'rgba(255,255,255,1)')
      gr.addColorStop(0.5, 'rgba(255,255,255,0.6)')
      gr.addColorStop(1,   'rgba(255,255,255,0)')
      cx.fillStyle = gr; cx.fillRect(0,0,64,64)
      const sprite = new T.CanvasTexture(c2)

      const mat = new T.PointsMaterial({
        size: 0.028, map: sprite, vertexColors: true,
        transparent: true, depthWrite: false,
        blending: T.AdditiveBlending, sizeAttenuation: true,
      })
      pointsMesh = new T.Points(geo, mat)
      scene.add(pointsMesh)

      // Sparse connection lines
      const lp: number[] = []
      const step = Math.floor(COUNT / 100)
      for (let i = 0; i < COUNT; i += step) {
        for (let j = i + step; j < COUNT; j += step) {
          const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2]
          if (dx*dx+dy*dy+dz*dz < 0.18)
            lp.push(pos[i*3],pos[i*3+1],pos[i*3+2],pos[j*3],pos[j*3+1],pos[j*3+2])
        }
      }
      const lgeo = new T.BufferGeometry()
      lgeo.setAttribute('position', new T.BufferAttribute(new Float32Array(lp), 3))
      linesMesh = new T.LineSegments(lgeo, new T.LineBasicMaterial({
        color: 0xf0a832, transparent: true, opacity: 0.10,
        blending: T.AdditiveBlending, depthWrite: false,
      }))
      scene.add(linesMesh)

      // Atmosphere
      atmoMesh = new T.Mesh(
        new T.SphereGeometry(1.14, 32, 32),
        new T.MeshBasicMaterial({
          color: 0xf0a832, transparent: true, opacity: 0.035,
          side: T.BackSide, blending: T.AdditiveBlending, depthWrite: false,
        })
      )
      scene.add(atmoMesh)

      let frame = 0
      const tick = () => {
        animId = requestAnimationFrame(tick)
        frame++

        // Color lerp
        currentColor.r = lerp(currentColor.r, targetColor.r, 0.018)
        currentColor.g = lerp(currentColor.g, targetColor.g, 0.018)
        currentColor.b = lerp(currentColor.b, targetColor.b, 0.018)

        // Update particle colors every 2 frames for perf
        if (frame % 2 === 0) {
          const ca = geo.attributes.color as T.BufferAttribute
          for (let i = 0; i < COUNT; i++) {
            const b = 0.65 + Math.sin(i * 1.7 + frame * 0.012) * 0.2
            ca.array[i*3]   = Math.min(1, currentColor.r * b)
            ca.array[i*3+1] = Math.min(1, currentColor.g * b)
            ca.array[i*3+2] = Math.min(1, currentColor.b * b)
          }
          ca.needsUpdate = true
        }

        ;(linesMesh.material as T.LineBasicMaterial).color.setRGB(currentColor.r, currentColor.g, currentColor.b)
        ;(atmoMesh.material  as T.MeshBasicMaterial).color.setRGB(currentColor.r, currentColor.g, currentColor.b)

        // Rotation
        autoRotY += 0.0025
        const targetRotX = lerp(0, mouseY * 0.35, 0.05)
        const targetRotY = autoRotY + lerp(0, mouseX * 0.35, 0.05)

        pointsMesh.rotation.x = lerp(pointsMesh.rotation.x, targetRotX, 0.06)
        pointsMesh.rotation.y = lerp(pointsMesh.rotation.y, targetRotY, 0.06)
        linesMesh.rotation.copy(pointsMesh.rotation)
        atmoMesh.rotation.y   = pointsMesh.rotation.y * 0.25

        // Breathe
        const breathe = 1 + Math.sin(frame * 0.007) * 0.022
        pointsMesh.scale.setScalar(breathe)
        linesMesh.scale.setScalar(breathe)

        renderer.render(scene, camera)
      }
      tick()
    }

    init()

    return () => {
      cancelAnimationFrame(animId)
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('mousemove', onMouse)
      renderer?.dispose()
      if (mountRef.current && renderer?.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <div ref={mountRef} className={styles.canvas} />
      <div className={styles.ring}  data-ring />
      <div className={styles.ring2} data-ring />
    </div>
  )
}
