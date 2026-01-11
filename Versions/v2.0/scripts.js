// ===================================
// Sistema de Filtros por Línea
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const filterButtons = document.querySelectorAll('.btn-filter')
	const lineSections = document.querySelectorAll('.line-section')

	filterButtons.forEach((button) => {
		button.addEventListener('click', function () {
			// Remover clase active de todos los botones
			filterButtons.forEach((btn) => btn.classList.remove('active'))

			// Agregar clase active al botón clickeado
			this.classList.add('active')

			// Obtener el filtro seleccionado
			const filter = this.getAttribute('data-filter')

			// Mostrar/ocultar secciones según el filtro
			lineSections.forEach((section) => {
				if (filter === 'all') {
					section.style.display = 'block'
				} else {
					const lineData = section.getAttribute('data-line')
					section.style.display = lineData === filter ? 'block' : 'none'
				}
			})
		})
	})
})

// ===================================
// Sistema de Colapso de Secciones
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	// Colapso de líneas
	const collapseButtons = document.querySelectorAll('.btn-collapse')

	collapseButtons.forEach((button) => {
		button.addEventListener('click', function (e) {
			e.preventDefault()
			const targetId = this.getAttribute('data-target')
			const targetContent = document.getElementById(targetId)

			// Toggle collapsed class
			targetContent.classList.toggle('collapsed')
			this.classList.toggle('collapsed')

			// Animación suave
			if (targetContent.classList.contains('collapsed')) {
				targetContent.style.maxHeight = targetContent.scrollHeight + 'px'
				setTimeout(() => {
					targetContent.style.maxHeight = '0'
				}, 10)
			} else {
				targetContent.style.maxHeight = targetContent.scrollHeight + 'px'
				setTimeout(() => {
					targetContent.style.maxHeight = 'none'
				}, 300)
			}
		})
	})

	// Colapso de categorías
	const collapseCategoryButtons = document.querySelectorAll('.btn-collapse-category')

	collapseCategoryButtons.forEach((button) => {
		button.addEventListener('click', function (e) {
			e.preventDefault()
			const targetId = this.getAttribute('data-target')
			const targetContent = document.getElementById(targetId)

			// Toggle collapsed class
			targetContent.classList.toggle('collapsed')
			this.classList.toggle('collapsed')

			// Animación suave
			if (targetContent.classList.contains('collapsed')) {
				targetContent.style.maxHeight = targetContent.scrollHeight + 'px'
				setTimeout(() => {
					targetContent.style.maxHeight = '0'
				}, 10)
			} else {
				targetContent.style.maxHeight = targetContent.scrollHeight + 'px'
				setTimeout(() => {
					targetContent.style.maxHeight = 'none'
				}, 300)
			}
		})
	})
})

// ===================================
// Efectos de Scroll en Navbar
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const filterNav = document.querySelector('.filter-nav')
	let lastScroll = 0

	window.addEventListener('scroll', function () {
		const currentScroll = window.pageYOffset

		// Añadir sombra al navbar al hacer scroll
		if (currentScroll > 50) {
			filterNav.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)'
		} else {
			filterNav.style.boxShadow = 'none'
		}

		lastScroll = currentScroll
	})
})

// ===================================
// Lazy Loading para imágenes
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const images = document.querySelectorAll('.product-image')

	if ('IntersectionObserver' in window) {
		const imageObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target
						img.style.opacity = '0'
						img.style.transition = 'opacity 0.4s ease'

						setTimeout(() => {
							img.style.opacity = '1'
						}, 50)

						observer.unobserve(img)
					}
				})
			},
			{
				rootMargin: '50px'
			}
		)

		images.forEach((img) => imageObserver.observe(img))
	}
})

// ===================================
// Smooth Scroll para navegación
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const filterButtons = document.querySelectorAll('.btn-filter')

	filterButtons.forEach((button) => {
		button.addEventListener('click', function () {
			// Scroll suave al contenido
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
			}, 100)
		})
	})
})
