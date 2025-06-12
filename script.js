// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
  particles: {
    count: 60,
    speed: 0.3,
    size: { min: 1, max: 4 },
    opacity: { min: 0.1, max: 0.8 },
    colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
  },
  animations: {
    duration: 1000,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    stagger: 150,
  },
  scroll: {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
}

// ===== VARIABLES GLOBALES =====
let particles = []
let animationFrame
const isScrolling = false
let currentTheme = "dark"

// Elementos del DOM
const preloader = document.getElementById("preloader")
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const searchToggle = document.getElementById("search-toggle")
const searchOverlay = document.getElementById("search-overlay")
const searchInput = document.getElementById("search-input")
const themeToggle = document.getElementById("theme-toggle")
const backToTop = document.getElementById("back-to-top")
const particlesContainer = document.getElementById("particles")

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  console.log("🚀 Inicializando Blog Futurista...")

  // Mostrar preloader
  showPreloader()

  // Inicializar componentes principales
  setTimeout(() => {
    initializeParticles()
    initializeNavigation()
    initializeSearch()
    initializeTheme()
    initializeScrollEffects()
    initializeAnimations()
    initializeFilters()
    initializeInteractions()
    initializeCounters()
    initializeNewsletter()
    initializePerformanceOptimizations()

    // Ocultar preloader
    hidePreloader()

    console.log("✅ Blog inicializado correctamente")
  }, 2000)
}

// ===== PRELOADER =====
function showPreloader() {
  preloader.classList.remove("hidden")
}

function hidePreloader() {
  preloader.classList.add("hidden")

  // Mostrar notificación de bienvenida
  setTimeout(() => {
    showNotification("¡Bienvenido al Blog! 🚀", "success")
  }, 500)
}

// ===== SISTEMA DE PARTÍCULAS AVANZADO =====
class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
    this.y = Math.random() * canvas.height
    this.opacity =
      Math.random() * (CONFIG.particles.opacity.max - CONFIG.particles.opacity.min) + CONFIG.particles.opacity.min
    this.color = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)]
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = -10
    this.size = Math.random() * (CONFIG.particles.size.max - CONFIG.particles.size.min) + CONFIG.particles.size.min
    this.speedX = (Math.random() - 0.5) * CONFIG.particles.speed
    this.speedY = Math.random() * CONFIG.particles.speed + 0.1
    this.opacity =
      Math.random() * (CONFIG.particles.opacity.max - CONFIG.particles.opacity.min) + CONFIG.particles.opacity.min
    this.color = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)]
    this.life = 1
    this.decay = Math.random() * 0.01 + 0.005
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // Efecto de ondulación
    this.x += Math.sin(this.y * 0.01) * 0.5

    // Reducir vida gradualmente
    this.life -= this.decay

    // Resetear cuando sale de la pantalla o muere
    if (this.y > this.canvas.height + 10 || this.x < -10 || this.x > this.canvas.width + 10 || this.life <= 0) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity * this.life

    // Crear gradiente radial
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(1, "transparent")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

function initializeParticles() {
  if (!particlesContainer) return

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.position = "absolute"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "1"

  particlesContainer.appendChild(canvas)

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function createParticles() {
    particles = []
    for (let i = 0; i < CONFIG.particles.count; i++) {
      particles.push(new Particle(canvas))
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw(ctx)
    })

    animationFrame = requestAnimationFrame(animateParticles)
  }

  // Inicializar
  resizeCanvas()
  createParticles()
  animateParticles()

  // Manejar redimensionamiento
  window.addEventListener(
    "resize",
    debounce(() => {
      resizeCanvas()
      createParticles()
    }, 250),
  )
}

// ===== NAVEGACIÓN =====
function initializeNavigation() {
  // Toggle móvil
  navToggle?.addEventListener("click", toggleMobileMenu)

  // Navegación suave
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick)
  })

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (navMenu.classList.contains("active")) {
        closeMobileMenu()
      }
      if (searchOverlay.classList.contains("active")) {
        closeSearch()
      }
    }
  })
}

function toggleMobileMenu() {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
}

function closeMobileMenu() {
  navMenu.classList.remove("active")
  navToggle.classList.remove("active")
  document.body.style.overflow = ""
}

function handleNavClick(e) {
  e.preventDefault()
  const targetId = e.currentTarget.getAttribute("href")

  if (targetId.startsWith("#")) {
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })

      closeMobileMenu()
    }
  }
}

// ===== BÚSQUEDA =====
function initializeSearch() {
  searchToggle?.addEventListener("click", openSearch)
  searchOverlay?.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      closeSearch()
    }
  })

  // Búsqueda en tiempo real
  searchInput?.addEventListener("input", handleSearch)

  // Sugerencias
  const suggestions = document.querySelectorAll(".suggestion-item")
  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", () => {
      searchInput.value = suggestion.textContent.trim()
      handleSearch()
    })
  })
}

function openSearch() {
  searchOverlay.classList.add("active")
  searchInput.focus()
  document.body.style.overflow = "hidden"
}

function closeSearch() {
  searchOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim()
  const articles = document.querySelectorAll(".article-card")

  articles.forEach((article) => {
    const title = article.querySelector(".article-title").textContent.toLowerCase()
    const excerpt = article.querySelector(".article-excerpt").textContent.toLowerCase()
    const tags = Array.from(article.querySelectorAll(".tag")).map((tag) => tag.textContent.toLowerCase())

    const matches = title.includes(query) || excerpt.includes(query) || tags.some((tag) => tag.includes(query))

    if (query === "" || matches) {
      article.style.display = "block"
      article.style.animation = "card-entrance 0.6s ease-out"
    } else {
      article.style.display = "none"
    }
  })

  // Mostrar mensaje si no hay resultados
  const visibleArticles = Array.from(articles).filter((article) => article.style.display !== "none")
  if (query !== "" && visibleArticles.length === 0) {
    showNotification("No se encontraron artículos", "info")
  }
}

// ===== TEMA =====
function initializeTheme() {
  // Detectar preferencia del sistema
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  currentTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light")

  applyTheme(currentTheme)

  themeToggle?.addEventListener("click", toggleTheme)

  // Escuchar cambios en la preferencia del sistema
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      currentTheme = e.matches ? "dark" : "light"
      applyTheme(currentTheme)
    }
  })
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark"
  applyTheme(currentTheme)
  localStorage.setItem("theme", currentTheme)

  // Animación del botón
  themeToggle.style.transform = "scale(0.8)"
  setTimeout(() => {
    themeToggle.style.transform = "scale(1)"
  }, 150)
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)

  const icon = themeToggle?.querySelector("i")
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
  }
}

// ===== EFECTOS DE SCROLL =====
function initializeScrollEffects() {
  let ticking = false

  function updateOnScroll() {
    handleNavbarScroll()
    handleActiveNavigation()
    handleBackToTop()
    handleParallaxEffects()
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll)
      ticking = true
    }
  })
}

function handleNavbarScroll() {
  const scrolled = window.pageYOffset > 50
  navbar.classList.toggle("scrolled", scrolled)
}

function handleActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      correspondingLink?.classList.add("active")
    }
  })
}

function handleBackToTop() {
  const scrolled = window.pageYOffset > 300
  backToTop.classList.toggle("visible", scrolled)
}

function handleParallaxEffects() {
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.3

  // Efecto parallax en orbs
  const orbs = document.querySelectorAll(".orb")
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.05
    orb.style.transform = `translate(${rate * speed}px, ${rate * speed * 0.5}px)`
  })

  // Efecto parallax en elementos flotantes
  const floatingElements = document.querySelectorAll(".tech-icon, .email-icon")
  floatingElements.forEach((element, index) => {
    const speed = 0.02 + index * 0.01
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
}

// Back to top functionality
backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===== ANIMACIONES =====
function initializeAnimations() {
  const observerOptions = {
    threshold: CONFIG.scroll.threshold,
    rootMargin: CONFIG.scroll.rootMargin,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateElement(entry.target)
      }
    })
  }, observerOptions)

  // Agregar clases de animación
  addAnimationClasses()

  // Observar elementos
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
  animatedElements.forEach((el) => observer.observe(el))
}

function addAnimationClasses() {
  // Hero elements
  const heroText = document.querySelector(".hero-text")
  const heroVisual = document.querySelector(".hero-visual")
  if (heroText) heroText.classList.add("slide-in-left")
  if (heroVisual) heroVisual.classList.add("slide-in-right")

  // Section headers
  const sectionHeaders = document.querySelectorAll(".section-header")
  sectionHeaders.forEach((header) => header.classList.add("fade-in"))

  // Article cards
  const articleCards = document.querySelectorAll(".article-card")
  articleCards.forEach((card, index) => {
    card.classList.add("scale-in")
    card.style.transitionDelay = `${index * 0.1}s`
  })

  // Newsletter
  const newsletter = document.querySelector(".newsletter-card")
  if (newsletter) newsletter.classList.add("fade-in")
}

function animateElement(element) {
  element.classList.add("visible")

  // Animaciones especiales
  if (element.classList.contains("hero-title")) {
    animateTextReveal(element)
  }
}

function animateTextReveal(element) {
  const text = element.textContent
  const words = text.split(" ")
  element.innerHTML = ""

  words.forEach((word, index) => {
    const span = document.createElement("span")
    span.textContent = word + " "
    span.style.opacity = "0"
    span.style.transform = "translateY(20px)"
    span.style.transition = `all 0.6s ease ${index * 0.1}s`
    element.appendChild(span)

    setTimeout(() => {
      span.style.opacity = "1"
      span.style.transform = "translateY(0)"
    }, 100)
  })
}

// ===== FILTROS =====
function initializeFilters() {
  const filterTabs = document.querySelectorAll(".filter-tab")
  const viewBtns = document.querySelectorAll(".view-btn")
  const articlesGrid = document.getElementById("articles-grid")

  // Filtros por categoría
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter")

      // Actualizar tabs activos
      filterTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      // Filtrar artículos
      filterArticles(filter)
    })
  })

  // Vista grid/list
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view")

      // Actualizar botones activos
      viewBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Cambiar vista
      changeView(view)
    })
  })
}

function filterArticles(filter) {
  const articles = document.querySelectorAll(".article-card")

  articles.forEach((article, index) => {
    const category = article.getAttribute("data-category")
    const shouldShow = filter === "all" || category === filter

    if (shouldShow) {
      article.style.display = "block"
      article.style.animation = `card-entrance 0.6s ease-out ${index * 0.1}s`
    } else {
      article.style.display = "none"
    }
  })
}

function changeView(view) {
  const articlesGrid = document.getElementById("articles-grid")

  if (view === "list") {
    articlesGrid.style.gridTemplateColumns = "1fr"
    articlesGrid.style.gap = "var(--space-4)"
  } else {
    articlesGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(350px, 1fr))"
    articlesGrid.style.gap = "var(--space-8)"
  }
}

// ===== INTERACCIONES =====
function initializeInteractions() {
  initializeHoverEffects()
  initializeClickEffects()
  initializeBookmarks()
  initializeReadButtons()
}

function initializeHoverEffects() {
  // Efecto hover en tarjetas
  const cards = document.querySelectorAll(".article-card, .newsletter-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", (e) => handleCardHover(e, true))
    card.addEventListener("mouseleave", (e) => handleCardHover(e, false))
    card.addEventListener("mousemove", handleCardMouseMove)
  })

  // Efecto hover en botones
  const buttons = document.querySelectorAll(".btn, .filter-tab, .view-btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", createRippleEffect)
  })
}

function handleCardHover(e, isEntering) {
  const card = e.currentTarget
  const intensity = isEntering ? 1.02 : 1

  card.style.transform = `scale(${intensity})`
}

function handleCardMouseMove(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20

  card.style.transform = `
    perspective(1000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale(1.02)
  `
}

function createRippleEffect(e) {
  const button = e.currentTarget
  const ripple = document.createElement("span")

  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  `

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = size + "px"
  ripple.style.left = x + "px"
  ripple.style.top = y + "px"

  button.style.position = "relative"
  button.style.overflow = "hidden"
  button.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

function initializeClickEffects() {
  // Efecto de click global
  document.addEventListener("click", (e) => {
    if (e.target.matches("button, .btn, .nav-link, .filter-tab")) {
      createClickEffect(e)
    }
  })
}

function createClickEffect(e) {
  const clickEffect = document.createElement("div")
  clickEffect.style.cssText = `
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    animation: click-effect 0.6s ease-out forwards;
  `

  clickEffect.style.left = e.clientX - 50 + "px"
  clickEffect.style.top = e.clientY - 50 + "px"

  document.body.appendChild(clickEffect)
  setTimeout(() => clickEffect.remove(), 600)
}

function initializeBookmarks() {
  const bookmarkBtns = document.querySelectorAll(".bookmark-btn")

  bookmarkBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()

      const isBookmarked = btn.classList.contains("bookmarked")

      if (isBookmarked) {
        btn.classList.remove("bookmarked")
        btn.innerHTML = '<i class="fas fa-bookmark"></i>'
        showNotification("Artículo removido de favoritos", "info")
      } else {
        btn.classList.add("bookmarked")
        btn.innerHTML = '<i class="fas fa-bookmark" style="color: var(--primary-color)"></i>'
        showNotification("Artículo guardado en favoritos", "success")
      }

      // Animación
      btn.style.transform = "scale(1.2)"
      setTimeout(() => {
        btn.style.transform = "scale(1)"
      }, 150)
    })
  })
}

function initializeReadButtons() {
  const readBtns = document.querySelectorAll(".read-btn")

  readBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()

      // Simular navegación a artículo
      const articleTitle = btn.closest(".article-card").querySelector(".article-title").textContent
      showNotification(`Abriendo: ${articleTitle}`, "info")

      // Aquí iría la lógica para navegar al artículo completo
    })
  })
}

// ===== CONTADORES ANIMADOS =====
function initializeCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number")
          counters.forEach((counter) => {
            animateCounter(counter)
          })
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelector(".hero-stats")
  if (statsSection) {
    counterObserver.observe(statsSection)
  }
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current)
  }, 16)
}

// ===== NEWSLETTER =====
function initializeNewsletter() {
  const newsletterForm = document.querySelector(".newsletter-form")

  newsletterForm?.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = newsletterForm.querySelector(".newsletter-input").value
    const submitBtn = newsletterForm.querySelector(".newsletter-btn")

    if (!email || !isValidEmail(email)) {
      showNotification("Por favor ingresa un email válido", "error")
      return
    }

    // Simular envío
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitBtn.disabled = true

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!'
      submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)"

      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        submitBtn.style.background = ""
        newsletterForm.reset()

        showNotification("¡Te has s uscrito exitosamente!", "success")
      }, 2000)
    }, 1500)
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
function initializePerformanceOptimizations() {
  // Lazy loading para imágenes
  const images = document.querySelectorAll('img[loading="lazy"]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        img.onload = () => {
          img.style.opacity = "1"
        }

        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Optimización de scroll
  let scrollTimeout
  window.addEventListener("scroll", () => {
    document.body.classList.add("scrolling")

    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove("scrolling")
    }, 150)
  })

  // Preload de recursos críticos
  preloadCriticalResources()
}

function preloadCriticalResources() {
  const criticalResources = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  ]

  criticalResources.forEach((resource) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = resource
    link.as = "style"
    document.head.appendChild(link)
  })
}

// ===== SISTEMA DE NOTIFICACIONES =====
class NotificationSystem {
  constructor() {
    this.container = this.createContainer()
    this.notifications = []
  }

  createContainer() {
    const container = document.createElement("div")
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `
    document.body.appendChild(container)
    return container
  }

  show(message, type = "info", duration = 3000) {
    const notification = this.createNotification(message, type)
    this.container.appendChild(notification)
    this.notifications.push(notification)

    // Animar entrada
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)"
      notification.style.opacity = "1"
    })

    // Auto-remover
    setTimeout(() => {
      this.remove(notification)
    }, duration)

    return notification
  }

  createNotification(message, type) {
    const notification = document.createElement("div")
    const colors = {
      success: "linear-gradient(135deg, #10b981, #059669)",
      error: "linear-gradient(135deg, #ef4444, #dc2626)",
      warning: "linear-gradient(135deg, #f59e0b, #d97706)",
      info: "linear-gradient(135deg, #3b82f6, #2563eb)",
    }

    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle",
    }

    notification.style.cssText = `
      background: ${colors[type] || colors.info};
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      max-width: 300px;
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      gap: 8px;
    `

    notification.innerHTML = `
      <i class="${icons[type] || icons.info}"></i>
      <span>${message}</span>
    `

    notification.addEventListener("click", () => this.remove(notification))

    return notification
  }

  remove(notification) {
    notification.style.transform = "translateX(100%)"
    notification.style.opacity = "0"

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
      this.notifications = this.notifications.filter((n) => n !== notification)
    }, 300)
  }
}

// Instancia global del sistema de notificaciones
const notifications = new NotificationSystem()

// Función global para mostrar notificaciones
function showNotification(message, type = "info", duration = 3000) {
  return notifications.show(message, type, duration)
}

// ===== UTILIDADES =====
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== MANEJO DE ERRORES =====
window.addEventListener("error", (e) => {
  console.warn("Error detectado:", e.message)
  // Implementar fallbacks gracefully
})

// ===== DETECCIÓN DE CAPACIDADES =====
function detectDeviceCapabilities() {
  const capabilities = {
    hasTouch: "ontouchstart" in window,
    hasMotion: "DeviceMotionEvent" in window,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    supportsWebGL: !!window.WebGLRenderingContext,
    supportsIntersectionObserver: "IntersectionObserver" in window,
  }

  // Aplicar optimizaciones basadas en capacidades
  if (capabilities.prefersReducedMotion) {
    document.documentElement.style.setProperty("--transition-fast", "0.01ms")
    document.documentElement.style.setProperty("--transition-normal", "0.01ms")
    document.documentElement.style.setProperty("--transition-slow", "0.01ms")
  }

  if (capabilities.hasTouch) {
    document.body.classList.add("touch-device")
    CONFIG.particles.count = Math.min(CONFIG.particles.count, 40)
  }

  return capabilities
}

// ===== ESTILOS DINÁMICOS =====
const dynamicStyles = document.createElement("style")
dynamicStyles.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes click-effect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  .scrolling * {
    pointer-events: none;
  }
  
  .touch-device .hover-lift:hover {
    transform: none;
  }
`
document.head.appendChild(dynamicStyles)

// ===== INICIALIZACIÓN FINAL =====
const deviceCapabilities = detectDeviceCapabilities()

// Mensaje de bienvenida en consola
console.log(`
🚀 Blog Futurista v1.0 Cargado
✨ Características activadas:
 • Sistema de partículas dinámico
 • Filtros de contenido avanzados
 • Búsqueda en tiempo real
 • Tema claro/oscuro
 • Animaciones de scroll
 • Sistema de notificaciones
 • Optimizaciones de rendimiento
 
📱 Dispositivo: ${deviceCapabilities.hasTouch ? "Táctil" : "Desktop"}
🎨 Animaciones: ${deviceCapabilities.prefersReducedMotion ? "Reducidas" : "Completas"}
🌙 Tema: ${currentTheme}
`)
