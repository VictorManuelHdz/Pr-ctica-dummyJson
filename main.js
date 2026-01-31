const urlApi = "https://dummyjson.com/products"

fetch(urlApi)
    .then(respuesta => respuesta.json())
    .then(data => {
        const productos = data.products;

        console.log("Datos recibidos:", productos);

        mostrarProductos(productos)
        
        })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
        alert("Hubo un error al cargar los datos. Revisa la consola.");
    })

const mostrarProductos = (productos) =>{
    const contenedorProductos = document.getElementById("contenedor-productos")
    
    contenedorProductos.innerHTML = ""
    productos.forEach(producto => {
        const tarjeta = document.createElement("div")
        

        tarjeta.classList.add("practice-card")
        tarjeta.setAttribute("onclick", `mostrarDetalle(${producto.id})`);

        tarjeta.innerHTML = `
            <h3 class="practice-title">${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}" class = "practice-img" ">
            <p><strong>Price: </strong>$${producto.price}</p>
            <p class="practice-description"> <strong>Category:</strong> ${producto.category}</p>
            <p><strong>Rating:</strong> ${producto.rating} <span>⭐</span> </p>
            
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

const BuscarProducto = () => {
    const busqueda = document.getElementById("busqueda").value.trim();

    fetch(`https://dummyjson.com/products/search?q=${busqueda}`)
    .then(res => res.json())
    .then(data => {
        const producto = data.products;

        console.log("Datos recibidos:", producto);

        mostrarProductos(producto)
        
        })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
        alert("Hubo un error al cargar los datos. Revisa la consola.");
    })
}

const mostrarDetalle = (productoId) =>{
    window.location.href = `detalle_producto.html?id=${productoId}`;
}