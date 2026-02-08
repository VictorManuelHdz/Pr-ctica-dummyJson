let urlApi = "https://dummyjson.com/products"
const selectCategoria = document.getElementById("select-category")

const cargarProductos = (url) => {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            mostrarProductos(data.products);
        })
        .catch(error => console.error("Error:", error));
};

const ordenarYFiltrar = () => {
    const selectOrden = document.getElementById("select-orden").value;
    const categoriaActual = document.getElementById("select-category").value;
    const busqueda = document.getElementById("busqueda").value;

    let nuevaUrl = "";

    // Revisamos si existe alguna busqueda, filtro u orden
    if (busqueda) {
        nuevaUrl = `https://dummyjson.com/products/search?q=${busqueda}&`;
    } else if (categoriaActual) {
        nuevaUrl = `https://dummyjson.com/products/category/${categoriaActual}?`;
    } else {
        nuevaUrl = `https://dummyjson.com/products?`;
    }

    // sea el caso del orden agregamos el dnpoint correspondiente a la url
    switch (selectOrden) {
        case "price-desc":
            nuevaUrl += "sortBy=price&order=desc";
            break;
        case "price-asc":
            nuevaUrl += "sortBy=price&order=asc";
            break;
        case "title-asc":
            nuevaUrl += "sortBy=title&order=asc";
            break;
        case "title-desc":
            nuevaUrl += "sortBy=title&order=desc";
            break;
        default:
            nuevaUrl = urlApi
            break;
    }

    cargarProductos(nuevaUrl);
};

const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedor-productos")

    contenedorProductos.innerHTML = ""
    productos.forEach(producto => {
        const tarjeta = document.createElement("div")


        tarjeta.classList.add("practice-card")
        tarjeta.setAttribute("onclick", `mostrarDetalle(${producto.id})`);

        // Dentro de tu forEach en mostrarProductos:
        tarjeta.innerHTML = `
            <h3 class="practice-title">${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}" class="practice-img">
            <p><strong>Price:</strong> $${producto.price}</p>
            <p><strong>Category:</strong> ${producto.category}</p>
            <p><strong>Rating:</strong> ${producto.rating} ⭐</p>
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

const mostrarDetalle = (productoId) => {
    window.location.href = `detalle_producto.html?id=${productoId}`;
}

fetch('https://dummyjson.com/products/category-list')
    .then(res => res.json())
    .then(categorias => {
        categorias.forEach(categoria => {
            const option = `<option value= "${categoria}">${categoria}</option>`
            selectCategoria.innerHTML += option
        })
    })

const filtraCategoria = () => {
    ordenarYFiltrar();
}

cargarProductos(urlApi);
