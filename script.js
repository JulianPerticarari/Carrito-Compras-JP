// Clase Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.actualizarCarrito();
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.actualizarCarrito();
    }

    vaciarCarrito() {
        this.productos = [];
        this.actualizarCarrito();
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
    }

    actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = '';

        this.productos.forEach(producto => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('item-carrito');
            itemCarrito.innerHTML = `
                <span>${producto.nombre}</span>
                <span>$${producto.precio.toFixed(2)}</span>
                <button onclick="carrito.eliminarProducto(${producto.id})">Eliminar</button>
            `;
            listaCarrito.appendChild(itemCarrito);
        });

        document.getElementById('total').textContent = this.calcularTotal();
    }
}


const carrito = new Carrito();

// Productos 
const productos = [
    new Producto(1, 'Protork PW40', 300, 'https://http2.mlstatic.com/D_NQ_NP_2X_936748-MLA74753240420_032024-F.webp'),
    new Producto(2, 'Arandelas RB', 10, 'https://cdn.discordapp.com/attachments/851229366981230642/1280231702991605820/D_NQ_NP_675854-MLA73151854404_122023-O.webp?ex=66d94e6f&is=66d7fcef&hm=a7dc8e9bd29c2514dc7c1fe470cf398bf6f3f9a884fa5cff048fd653ca2e7720&'),
    new Producto(3, 'Manubrio Wirtz', 100, 'https://acdn.mitiendanube.com/stores/857/072/products/sin-titulo11-46fac0a4ab04780db116515852797716-1024-1024.png'),
];

// Mostrar los productos en la página
const listaProductos = document.getElementById('lista-productos');
productos.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: 100px;">
        <span>${producto.nombre}</span>
        <span>$${producto.precio.toFixed(2)}</span>
        <button onclick="carrito.agregarProducto(${producto.id})">Agregar al Carrito</button>
    `;
    listaProductos.appendChild(divProducto);
});

// Evento para vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito.vaciarCarrito();
});

// Obtener el producto por su ID
function obtenerProductoPorId(id) {
    return productos.find(producto => producto.id === id);
}

// Reemplazamos el método agregarProducto para usar obtenerProductoPorId
carrito.agregarProducto = function(id) {
    const producto = obtenerProductoPorId(id);
    if (producto) {
        this.productos.push(producto);
        this.actualizarCarrito();
    }
}
