const items = document.getElementById('items')
const templadeCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment() 

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
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
    data.forEach(producto => {
        templadeCard.querySelector('h5').texContent = producto.titulo

        const clone = templadeCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}