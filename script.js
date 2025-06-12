// Variables globales
let isLoading = true
let mouseX = 0
let mouseY = 0
const particles = []

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initPreloader()
  initCursor()
  initParticles()
  initNavigation()
  initAnimations()
  initSkillBars()
  initContactForm()
  initScrollEffects()
  initTiltEffect()
})

// Preloader
function initPreloader() {
  const preloader = document.getElementById("preloader")
  const progressBar = document.querySelector(".progress-bar")
  const progressText = document.querySelector(".progress-text")

  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 15
    if (progress > 100) progress = 100

    progressBar.style.width = progress + "%"
    progressText.textContent = Math.round(progress) + "%"

    if (progress >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        preloader.style.opacity = "0"
        setTimeout(() => {
          preloader.style.display = "none"
          isLoading = false
          startMainAnimations()
        }, 500)
      }, 500)
    }
  }, 100)
}

// Cursor personalizado
function initCursor() {
  const cursor = document.querySelector(".cursor")
  const follower = document.querySelector(".cursor-follower")

  if (!cursor || !follower) return

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"

    setTimeout(() => {
      follower.style.left = mouseX - 20 + "px"
      follower.style.top = mouseY - 20 + "px"
    }, 100)
  })

  // Efectos hover
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .skill-category, .education-card, .social-icon",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)"
      follower.style.transform = "scale(1.5)"
      cursor.style.backgroundColor = "#ff006e"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      follower.style.transform = "scale(1)"
      cursor.style.backgroundColor = "#00f5ff"
    })
  })
}

// Sistema de partículas
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Crear partículas
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#00f5ff" : "#ff006e",
    })
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      // Actualizar posición
      particle.x += particle.vx
      particle.y += particle.vy

      // Rebotar en los bordes
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // Efecto del mouse
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        particle.x -= dx * 0.01
        particle.y -= dy * 0.01
      }

      // Dibujar partícula
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle =
        particle.color +
        Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")
      ctx.fill()

      // Conectar partículas cercanas
      particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      })
    })

    requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

// Navegación
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Animaciones principales
function startMainAnimations() {
  // Typing effect
  const typingElement = document.querySelector(".greeting-text")
  if (typingElement) {
    typeWriter(typingElement, "Hola, soy", 100)
  }

  // Stagger animations
  const titleWords = document.querySelectorAll(".title-word")
  titleWords.forEach((word, index) => {
    setTimeout(
      () => {
        word.style.animation = "slideInUp 1s ease-out forwards"
      },
      index * 300 + 800,
    )
  })

  const subtitleLines = document.querySelectorAll(".subtitle-line")
  subtitleLines.forEach((line, index) => {
    setTimeout(
      () => {
        line.style.animation = "slideInLeft 0.8s ease-out forwards"
      },
      index * 200 + 1600,
    )
  })
}

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Intersection Observer para animaciones
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animaciones específicas
        if (entry.target.classList.contains("about-stats")) {
          animateCounters()
        }

        if (entry.target.classList.contains("skills-container")) {
          setTimeout(() => animateSkillBars(), 500)
        }

        if (entry.target.classList.contains("timeline")) {
          animateTimeline()
        }
      }
    })
  }, observerOptions)

  // Observar elementos
  const elementsToAnimate = document.querySelectorAll(
    ".about-content, .skills-container, .projects-grid, .timeline, .education-grid, .contact-content",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Observar secciones específicas
  const aboutStats = document.querySelector(".about-stats")
  if (aboutStats) observer.observe(aboutStats)

  const skillsContainer = document.querySelector(".skills-container")
  if (skillsContainer) observer.observe(skillsContainer)

  const timeline = document.querySelector(".timeline")
  if (timeline) observer.observe(timeline)
}

// Animación de contadores
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Animación de barras de habilidades
function initSkillBars() {
  // Esta función se llamará cuando la sección sea visible
}

function animateSkillBars() {
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item, index) => {
    setTimeout(() => {
      const skillLevel = item.getAttribute("data-skill")
      const progressBar = item.querySelector(".skill-progress")

      if (progressBar) {
        progressBar.style.width = skillLevel + "%"
      }
    }, index * 100)
  })
}

// Animación de timeline
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item")

  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 200)
  })
}

// Efectos de scroll
function initScrollEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    // Parallax effect en hero
    const heroVisual = document.querySelector(".hero-visual")
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`
    }

    // Floating cards parallax
    const floatingCards = document.querySelectorAll(".hologram-card")
    floatingCards.forEach((card, index) => {
      const speed = 0.3 + index * 0.1
      card.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Efecto tilt en tarjetas
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// Formulario de contacto
function initContactForm() {
  const form = document.getElementById("contact-form")

  if (!form) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = form.querySelector(".btn-submit")
    const btnText = submitBtn.querySelector(".btn-text")
    const originalText = btnText.textContent

    // Estado de carga
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    // Simular envío
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Éxito
      submitBtn.classList.remove("loading")
      btnText.textContent = "¡Mensaje Enviado!"
      submitBtn.style.background = "linear-gradient(135deg, #00ff88, #00cc6a)"

      // Resetear formulario
      form.reset()

      // Restaurar botón
      setTimeout(() => {
        btnText.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.background = ""
      }, 3000)
    } catch (error) {
      // Error
      submitBtn.classList.remove("loading")
      btnText.textContent = "Error al enviar"
      submitBtn.style.background = "linear-gradient(135deg, #ff006e, #ff0000)"

      // Restaurar botón
      setTimeout(() => {
        btnText.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.background = ""
      }, 3000)
    }
  })
}

// Efectos de glitch
function glitchEffect() {
  const nameHighlight = document.querySelector(".title-word")
  if (nameHighlight) {
    nameHighlight.style.textShadow = `
            2px 0 #ff006e,
            -2px 0 #00f5ff,
            0 2px #8338ec,
            0 -2px #00ff88
        `

    setTimeout(() => {
      nameHighlight.style.textShadow = ""
    }, 200)
  }
}

// Activar glitch ocasionalmente
setInterval(() => {
  if (Math.random() > 0.95) {
    glitchEffect()
  }
}, 1000)

// Optimización de rendimiento
let ticking = false

function updateAnimations() {
  // Aquí puedes añadir animaciones que necesiten actualizarse constantemente
  ticking = false
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
}

// Eventos optimizados
window.addEventListener("scroll", requestTick)
window.addEventListener("resize", requestTick)
