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

			// Scroll suave al primer contenido visible
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

// ===================================
// Sistema de Colapso de Secciones
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	// Función de colapso reutilizable
	function setupCollapse(buttons) {
		buttons.forEach((button) => {
			button.addEventListener('click', function (e) {
				e.preventDefault()
				const targetId = this.getAttribute('data-target')
				const targetContent = document.getElementById(targetId)

				// Verificar si está colapsado actualmente
				const isCollapsed = targetContent.classList.contains('collapsed')

				if (isCollapsed) {
					// EXPANDIR - Quitar clase collapsed primero
					targetContent.classList.remove('collapsed')
					this.classList.remove('collapsed')

					// Establecer altura actual para la transición
					targetContent.style.maxHeight = targetContent.scrollHeight + 'px'

					// Después de la transición, permitir altura automática
					setTimeout(() => {
						targetContent.style.maxHeight = 'none'
					}, 350)
				} else {
					// COLAPSAR - Establecer altura específica primero
					targetContent.style.maxHeight = targetContent.scrollHeight + 'px'

					// Forzar reflow para que la transición funcione
					targetContent.offsetHeight

					// Aplicar altura 0 para colapsar suavemente
					requestAnimationFrame(() => {
						targetContent.style.maxHeight = '0'
						targetContent.classList.add('collapsed')
						this.classList.add('collapsed')
					})
				}
			})
		})
	}

	// Aplicar a líneas
	const collapseButtons = document.querySelectorAll('.btn-collapse')
	setupCollapse(collapseButtons)

	// Aplicar a categorías
	const collapseCategoryButtons = document.querySelectorAll('.btn-collapse-category')
	setupCollapse(collapseCategoryButtons)
})

// ===================================
// Carrusel de Filtros - Navegación Horizontal
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const filterWrapper = document.getElementById('filterWrapper')
	const scrollLeftBtn = document.getElementById('scrollLeft')
	const scrollRightBtn = document.getElementById('scrollRight')

	// Función para verificar si hay overflow
	function checkOverflow() {
		const hasOverflow = filterWrapper.scrollWidth > filterWrapper.clientWidth

		if (hasOverflow) {
			updateNavigationButtons()
		} else {
			scrollLeftBtn.classList.remove('visible')
			scrollRightBtn.classList.remove('visible')
		}
	}

	// Función para actualizar botones de navegación
	function updateNavigationButtons() {
		const scrollLeft = filterWrapper.scrollLeft
		const maxScroll = filterWrapper.scrollWidth - filterWrapper.clientWidth

		// Mostrar/ocultar botón izquierdo
		if (scrollLeft > 10) {
			scrollLeftBtn.classList.add('visible')
		} else {
			scrollLeftBtn.classList.remove('visible')
		}

		// Mostrar/ocultar botón derecho
		if (scrollLeft < maxScroll - 10) {
			scrollRightBtn.classList.add('visible')
		} else {
			scrollRightBtn.classList.remove('visible')
		}
	}

	// Navegación con los botones
	scrollLeftBtn.addEventListener('click', function () {
		filterWrapper.scrollBy({
			left: -200,
			behavior: 'smooth'
		})
	})

	scrollRightBtn.addEventListener('click', function () {
		filterWrapper.scrollBy({
			left: 200,
			behavior: 'smooth'
		})
	})

	// Actualizar botones al hacer scroll
	filterWrapper.addEventListener('scroll', updateNavigationButtons)

	// Verificar overflow al cargar y al cambiar tamaño de ventana
	checkOverflow()
	window.addEventListener('resize', checkOverflow)
})

// ===================================
// Efectos de Scroll en Navbar
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const filterNav = document.querySelector('.filter-nav')
	let lastScroll = 0

	window.addEventListener('scroll', function () {
		const currentScroll = window.pageYOffset

		// Añadir clase scrolled al navbar al hacer scroll
		if (currentScroll > 50) {
			filterNav.classList.add('scrolled')
		} else {
			filterNav.classList.remove('scrolled')
		}

		lastScroll = currentScroll
	})
})

// ===================================
// Botón Volver Arriba
// ===================================
document.addEventListener('DOMContentLoaded', function () {
	const scrollToTopBtn = document.getElementById('scrollToTop')

	// Mostrar/ocultar botón según scroll
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 300) {
			scrollToTopBtn.classList.add('visible')
		} else {
			scrollToTopBtn.classList.remove('visible')
		}
	})

	// Scroll al top al hacer click
	scrollToTopBtn.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
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
