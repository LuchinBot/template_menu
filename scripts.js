// ===================================
// Configuración Global
// ===================================
const CONFIG = {
	scrollOffset: 100,
	scrollSpeed: 200,
	animationDelay: 100,
	scrollThreshold: 300,
	debounceDelay: 150
}

// ===================================
// Utilidades
// ===================================
const debounce = (func, wait) => {
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

// ===================================
// Sistema de Filtros
// ===================================
class FilterSystem {
	constructor() {
		this.filterButtons = document.querySelectorAll('.btn-filter')
		this.lineSections = document.querySelectorAll('.line-section')
		this.init()
	}

	init() {
		this.filterButtons.forEach((button) => {
			button.addEventListener('click', (e) => this.handleFilterClick(e))
		})
	}

	handleFilterClick(e) {
		const button = e.currentTarget
		const filter = button.getAttribute('data-filter')

		// Actualizar estados activos
		this.filterButtons.forEach((btn) => btn.classList.remove('active'))
		button.classList.add('active')

		// Aplicar filtro
		this.applyFilter(filter)

		// Scroll suave al contenido
		this.scrollToContent()
	}

	applyFilter(filter) {
		this.lineSections.forEach((section) => {
			const lineData = section.getAttribute('data-line')

			if (filter === 'all') {
				this.showSection(section)
			} else {
				if (lineData === filter) {
					this.showSection(section)
				} else {
					this.hideSection(section)
				}
			}
		})
	}

	showSection(section) {
		section.style.display = 'block'
		section.style.opacity = '0'
		section.style.transform = 'translateY(20px)'

		setTimeout(() => {
			section.style.transition = 'all 0.5s ease'
			section.style.opacity = '1'
			section.style.transform = 'translateY(0)'
		}, 50)
	}

	hideSection(section) {
		section.style.opacity = '0'
		section.style.transform = 'translateY(-20px)'

		setTimeout(() => {
			section.style.display = 'none'
		}, 300)
	}

	scrollToContent() {
		setTimeout(() => {
			const firstVisibleSection = document.querySelector('.line-section:not([style*="display: none"])')

			if (firstVisibleSection) {
				const navHeight = document.querySelector('.filter-nav').offsetHeight
				const targetPosition = firstVisibleSection.offsetTop - navHeight - 20

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				})
			}
		}, CONFIG.animationDelay)
	}
}

// ===================================
// Carrusel de Filtros
// ===================================
class FilterCarousel {
	constructor() {
		this.filterWrapper = document.getElementById('filterWrapper')
		this.scrollLeftBtn = document.getElementById('scrollLeft')
		this.scrollRightBtn = document.getElementById('scrollRight')
		this.init()
	}

	init() {
		if (!this.filterWrapper || !this.scrollLeftBtn || !this.scrollRightBtn) return

		// Event listeners
		this.scrollLeftBtn.addEventListener('click', () => this.scrollLeft())
		this.scrollRightBtn.addEventListener('click', () => this.scrollRight())
		this.filterWrapper.addEventListener(
			'scroll',
			debounce(() => this.updateButtons(), CONFIG.debounceDelay)
		)

		// Verificar overflow al cargar y al cambiar tamaño
		this.checkOverflow()
		window.addEventListener(
			'resize',
			debounce(() => this.checkOverflow(), CONFIG.debounceDelay)
		)

		// Touch swipe support
		this.addTouchSupport()
	}

	checkOverflow() {
		const hasOverflow = this.filterWrapper.scrollWidth > this.filterWrapper.clientWidth

		if (hasOverflow) {
			this.updateButtons()
		} else {
			this.scrollLeftBtn.classList.remove('visible')
			this.scrollRightBtn.classList.remove('visible')
		}
	}

	updateButtons() {
		const scrollLeft = this.filterWrapper.scrollLeft
		const maxScroll = this.filterWrapper.scrollWidth - this.filterWrapper.clientWidth

		// Botón izquierdo
		if (scrollLeft > 10) {
			this.scrollLeftBtn.classList.add('visible')
		} else {
			this.scrollLeftBtn.classList.remove('visible')
		}

		// Botón derecho
		if (scrollLeft < maxScroll - 10) {
			this.scrollRightBtn.classList.add('visible')
		} else {
			this.scrollRightBtn.classList.remove('visible')
		}
	}

	scrollLeft() {
		this.filterWrapper.scrollBy({
			left: -CONFIG.scrollSpeed,
			behavior: 'smooth'
		})
	}

	scrollRight() {
		this.filterWrapper.scrollBy({
			left: CONFIG.scrollSpeed,
			behavior: 'smooth'
		})
	}

	addTouchSupport() {
		let isDown = false
		let startX
		let scrollLeftPos

		this.filterWrapper.addEventListener('mousedown', (e) => {
			isDown = true
			startX = e.pageX - this.filterWrapper.offsetLeft
			scrollLeftPos = this.filterWrapper.scrollLeft
		})

		this.filterWrapper.addEventListener('mouseleave', () => {
			isDown = false
		})

		this.filterWrapper.addEventListener('mouseup', () => {
			isDown = false
		})

		this.filterWrapper.addEventListener('mousemove', (e) => {
			if (!isDown) return
			e.preventDefault()
			const x = e.pageX - this.filterWrapper.offsetLeft
			const walk = (x - startX) * 2
			this.filterWrapper.scrollLeft = scrollLeftPos - walk
		})
	}
}

// ===================================
// Efectos de Scroll en Navbar
// ===================================
class NavbarScroll {
	constructor() {
		this.filterNav = document.querySelector('.filter-nav')
		this.init()
	}

	init() {
		if (!this.filterNav) return

		window.addEventListener(
			'scroll',
			debounce(() => this.handleScroll(), 50)
		)
	}

	handleScroll() {
		const currentScroll = window.pageYOffset

		if (currentScroll > 50) {
			this.filterNav.classList.add('scrolled')
		} else {
			this.filterNav.classList.remove('scrolled')
		}
	}
}

// ===================================
// Botón Volver Arriba
// ===================================
class ScrollToTop {
	constructor() {
		this.scrollBtn = document.getElementById('scrollToTop')
		this.init()
	}

	init() {
		if (!this.scrollBtn) return

		window.addEventListener(
			'scroll',
			debounce(() => this.handleScroll(), CONFIG.debounceDelay)
		)
		this.scrollBtn.addEventListener('click', () => this.scrollToTop())
	}

	handleScroll() {
		if (window.pageYOffset > CONFIG.scrollThreshold) {
			this.scrollBtn.classList.add('visible')
		} else {
			this.scrollBtn.classList.remove('visible')
		}
	}

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
}

// ===================================
// Animación de Categorías (Intersection Observer)
// ===================================
class CategoryAnimations {
	constructor() {
		this.categoryCards = document.querySelectorAll('.category-card')
		this.init()
	}

	init() {
		if (!('IntersectionObserver' in window)) {
			// Fallback para navegadores antiguos
			this.categoryCards.forEach((card) => {
				card.style.opacity = '1'
				card.style.transform = 'translateY(0)'
			})
			return
		}

		this.observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.animateCard(entry.target)
						this.observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -50px 0px'
			}
		)

		this.categoryCards.forEach((card) => {
			card.style.opacity = '0'
			card.style.transform = 'translateY(30px)'
			this.observer.observe(card)
		})
	}

	animateCard(card) {
		setTimeout(() => {
			card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
			card.style.opacity = '1'
			card.style.transform = 'translateY(0)'
		}, 100)
	}
}

// ===================================
// Lazy Loading de Imágenes
// ===================================
class LazyLoader {
	constructor() {
		this.images = document.querySelectorAll('img[loading="lazy"]')
		this.init()
	}

	init() {
		if (!('IntersectionObserver' in window)) {
			// Cargar todas las imágenes si no hay soporte
			this.images.forEach((img) => {
				if (img.dataset.src) {
					img.src = img.dataset.src
				}
			})
			return
		}

		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target
					if (img.dataset.src) {
						img.src = img.dataset.src
						img.classList.add('loaded')
					}
					imageObserver.unobserve(img)
				}
			})
		})

		this.images.forEach((img) => imageObserver.observe(img))
	}
}

// ===================================
// Gestión de Performance
// ===================================
class PerformanceManager {
	constructor() {
		this.init()
	}

	init() {
		// Reducir animaciones en dispositivos de bajo rendimiento
		if (this.isLowPerformanceDevice()) {
			document.body.classList.add('reduce-motion')
		}

		// Preload de recursos críticos
		this.preloadCriticalResources()
	}

	isLowPerformanceDevice() {
		return navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches
	}

	preloadCriticalResources() {
		const firstImages = document.querySelectorAll('.category-card:nth-child(-n+3) img')
		firstImages.forEach((img) => {
			if (img.dataset.src) {
				const link = document.createElement('link')
				link.rel = 'preload'
				link.as = 'image'
				link.href = img.dataset.src
				document.head.appendChild(link)
			}
		})
	}
}

// ===================================
// Inicialización
// ===================================
document.addEventListener('DOMContentLoaded', () => {
	// Inicializar todos los módulos
	new FilterSystem()
	new FilterCarousel()
	new NavbarScroll()
	new ScrollToTop()
	new CategoryAnimations()
	new LazyLoader()
	new PerformanceManager()

	// Añadir clase cuando todo está cargado
	document.body.classList.add('loaded')

	// Debug en desarrollo (comentar en producción)
	if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
		console.log('🍽️ Menú Digital inicializado correctamente')
	}
})

// ===================================
// Service Worker (PWA - Opcional)
// ===================================
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then((registration) => {
				console.log('SW registrado:', registration)
			})
			.catch((error) => {
				console.log('SW registro fallido:', error)
			})
	})
}

// ===================================
// Manejo de Errores de Imágenes
// ===================================
document.addEventListener(
	'error',
	(e) => {
		if (e.target.tagName === 'IMG') {
			e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E'
			e.target.style.opacity = '0.5'
		}
	},
	true
)

// ===================================
// Prevenir doble tap zoom en móviles
// ===================================
let lastTouchEnd = 0
document.addEventListener(
	'touchend',
	(event) => {
		const now = Date.now()
		if (now - lastTouchEnd <= 300) {
			event.preventDefault()
		}
		lastTouchEnd = now
	},
	false
)

// ===================================
// Analytics personalizado (opcional)
// ===================================
class MenuAnalytics {
	constructor() {
		this.trackFilterClicks()
		this.trackProductViews()
	}

	trackFilterClicks() {
		document.querySelectorAll('.btn-filter').forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const filter = e.target.getAttribute('data-filter')
				// Aquí puedes integrar con Google Analytics, Mixpanel, etc.
				console.log('Filter clicked:', filter)
			})
		})
	}

	trackProductViews() {
		const productObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const productName = entry.target.querySelector('.product-name')?.textContent
						// Track view
						console.log('Product viewed:', productName)
					}
				})
			},
			{ threshold: 0.5 }
		)

		document.querySelectorAll('.product-row').forEach((product) => {
			productObserver.observe(product)
		})
	}
}

// Inicializar analytics (comentar si no se necesita)
// new MenuAnalytics();
