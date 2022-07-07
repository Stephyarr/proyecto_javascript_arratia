const items = document.getElementById('items')
const templadeCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment() 
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
items.addEventListener('click', e => {
    addCarrito(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('js/api.json')
        const data = await res.json()
        // console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    console.log(data)
    data.forEach(producto => {
        templadeCard.querySelector('h5').textContent = producto.titulo
        templadeCard.querySelector('p').textContent = producto.precio
        templadeCard.querySelector('img').setAttribute("src", producto.imagen)
        templadeCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templadeCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

// Boton
const addCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objecto => {
    // console.log(objecto)
    const producto = {
        id: objecto.querySelector('.btn-dark').dataset.id,
        titulo: objecto.querySelector('h5').textContent,
        precio: objecto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    console.log(carrito)
    
}