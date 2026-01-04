// Simulación de base de datos extensa
const productos = [
	{ linea: 'Bebidas', categoria: 'Licores', marca: 'Johnnie Walker', nombre: 'Black Label 750 Ml', descripcion: 'Mezcla maestra de 12 años.', imagen: 'https://via.placeholder.com/200x200?text=Whisky' },
	{ linea: 'Bebidas', categoria: 'Licores', marca: 'Chivas Regal', nombre: 'Chivas 12 Años', descripcion: 'Whisky escocés de mezcla premium.', imagen: 'https://via.placeholder.com/200x200?text=Chivas' },
	{ linea: 'Bebidas', categoria: 'Cervezas', marca: 'Heineken', nombre: 'Botella 330ml', descripcion: 'Cerveza lager premium.', imagen: 'https://via.placeholder.com/200x200?text=Cerveza' },
	{ linea: 'Alimentos', categoria: 'Snacks', marca: "Lay's", nombre: 'Clásicas Familiares', descripcion: 'Papas fritas con sal de mar.', imagen: 'https://via.placeholder.com/200x200?text=Snack' },
	{ linea: 'aa', categoria: 'sss', marca: "Lay's", nombre: 'Clásicas Familiares', descripcion: 'Papas fritas con sal de mar.', imagen: 'https://via.placeholder.com/200x200?text=Snack' }
	// Agrega aquí cientos de productos más...
]

const productContainer = document.getElementById('productContainer')
const categoryContainer = document.getElementById('categoryContainer')
const searchInput = document.getElementById('searchInput')

function init() {
	renderCategories()
	renderProducts(productos)

	// Evento de búsqueda
	searchInput.addEventListener('input', (e) => {
		const term = e.target.value.toLowerCase()
		const filtered = productos.filter((p) => p.nombre.toLowerCase().includes(term) || p.marca.toLowerCase().includes(term))
		renderProducts(filtered)
	})
}

function renderCategories() {
	const cats = ['Todos', ...new Set(productos.map((p) => p.categoria))]
	categoryContainer.innerHTML = cats
		.map(
			(c) => `
        <div class="category-btn ${c === 'Todos' ? 'active' : ''}" onclick="filterByCategory(event, '${c}')">${c}</div>
    `
		)
		.join('')
}

function renderProducts(list) {
	productContainer.innerHTML = list
		.map(
			(p) => `
        <div class="p-card">
            <div class="p-image-box">
                <img src="${p.imagen}" loading="lazy" alt="${p.nombre}">
            </div>
            <div class="p-info">
                <span class="p-brand">${p.marca}</span>
                <h3 class="p-name">${p.nombre}</h3>
                <p class="p-desc">${p.descripcion}</p>
            </div>
        </div>
    `
		)
		.join('')
}

function filterByCategory(e, cat) {
	document.querySelectorAll('.category-btn').forEach((b) => b.classList.remove('active'))
	e.target.classList.add('active')

	const filtered = cat === 'Todos' ? productos : productos.filter((p) => p.categoria === cat)
	renderProducts(filtered)
}

init()
