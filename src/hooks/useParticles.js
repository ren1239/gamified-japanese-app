import { useEffect, useRef } from 'react'

class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.size = Math.random() * 9 + 4
    this.speedX = (Math.random() - 0.5) * 14
    this.speedY = (Math.random() - 0.5) * 14 - 5
    this.gravity = 0.35
    this.life = 1
    this.decay = Math.random() * 0.018 + 0.012
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.25
    this.shape = Math.random() > 0.5 ? 'rect' : 'circle'
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.speedY += this.gravity
    this.speedX *= 0.99
    this.life -= this.decay
    this.rotation += this.rotSpeed
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.life)
    ctx.fillStyle = this.color
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2)
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
}

const COLORS = {
  correct: ['#00E676', '#00FF9D', '#FFE500', '#00F0D0', '#fff'],
  wrong: ['#FF3366', '#FF6B6B', '#FFE500', '#FF9F00'],
  perfect: ['#FF2D78', '#FFE500', '#00F0D0', '#00E676', '#fff', '#FF9F00', '#A78BFA'],
}

export function useParticles() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)
      particlesRef.current.forEach((p) => {
        p.update()
        p.draw(ctx)
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const burst = (x, y, type = 'correct', count = 55) => {
    const palette = COLORS[type] || COLORS.correct
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(
        new Particle(x, y, palette[Math.floor(Math.random() * palette.length)])
      )
    }
  }

  const perfectBurst = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const origins = [
      [w * 0.2, h * 0.3],
      [w * 0.5, h * 0.2],
      [w * 0.8, h * 0.3],
      [w * 0.3, h * 0.6],
      [w * 0.7, h * 0.6],
    ]
    origins.forEach(([x, y], i) => {
      setTimeout(() => burst(x, y, 'perfect', 80), i * 180)
    })
  }

  return { canvasRef, burst, perfectBurst }
}
