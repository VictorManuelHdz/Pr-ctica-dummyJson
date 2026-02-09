let skip = 0;
const limit = 10;
let totalProductos = 0;
const selectCategoria = document.getElementById("select-category");

const cargarProductos = (url) => {
    const conector = url.includes('?') ? '&' : '?';
    
    const bufferLimit = limit + 20; 
    const urlFinal = url.includes('limit') ? url : `${url}${conector}limit=${bufferLimit}&skip=${skip}`;

    fetch(urlFinal)
        .then(res => res.json())
        .then(data => {
            totalProductos = data.total;
            
            const eliminados = JSON.parse(localStorage.getItem('productosEliminados')) || [];
            const productosFiltrados = data.products.filter(p => !eliminados.includes(p.id.toString()));
            const productosParaMostrar = productosFiltrados.slice(0, limit);
            
            mostrarProductos(productosParaMostrar);
            actualizarBotonesPaginacion();
        })
        .catch(error => console.error("Error al cargar productos:", error));
};

const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; width:100%; color: white;'>No hay productos para mostrar en esta página.</p>";
        return;
    }

    productos.forEach(p => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");
        tarjeta.innerHTML = `
            <div onclick="window.location.href='detalle_producto.html?id=${p.id}'">
                <h3 class="practice-title">${p.title}</h3>
                <img src="${p.thumbnail}" alt="${p.title}" class="practice-img">
                <p><strong>Price:</strong> $${p.price}</p>
                <p><strong>Category:</strong> ${p.category}</p>
                <p><strong>Rating:</strong> ${p.rating} ⭐</p>
            </div>
            <div class="card-actions">
                <button class="btn-edit" onclick="window.location.href='edit.html?id=${p.id}'">Editar</button>
                <button class="btn-delete" onclick="window.location.href='delete.html?id=${p.id}'">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
};

const ordenarYFiltrar = () => {
    const categoria = document.getElementById("select-category").value;
    const busqueda = document.getElementById("busqueda").value.trim();
    const selectOrden = document.getElementById("select-orden").value;

    let url = "";

    if (busqueda) {
        url = `https://dummyjson.com/products/search?q=${busqueda}`;
    } else if (categoria) {
        url = `https://dummyjson.com/products/category/${categoria}`;
    } else {
        url = "https://dummyjson.com/products";
    }

    if (selectOrden !== "default") {
        const conector = url.includes('?') ? '&' : '?';
        const [campo, tipo] = selectOrden.split('-'); 
        url += `${conector}sortBy=${campo}&order=${tipo}`;
    }

    cargarProductos(url);
};

const filtraCategoria = () => {
    skip = 0; 
    ordenarYFiltrar();
};

const cambiarPagina = (dir) => {
    if (dir === 'next' && (skip + limit) < totalProductos) skip += limit;
    else if (dir === 'prev' && skip > 0) skip -= limit;
    ordenarYFiltrar();
};

const actualizarBotonesPaginacion = () => {
    document.getElementById("btn-prev").disabled = skip === 0;
    document.getElementById("btn-next").disabled = (skip + limit) >= totalProductos;
    document.getElementById("page-info").innerText = `Página ${(skip / limit) + 1}`;
};

const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
};

const limpiarFiltros = () => {
    document.getElementById("busqueda").value = "";
    document.getElementById("select-category").value = "";
    document.getElementById("select-orden").value = "default";
    
    skip = 0; 
    
    ordenarYFiltrar();
};

fetch('https://dummyjson.com/products/category-list')
    .then(res => res.json())
    .then(cats => cats.forEach(c => selectCategoria.innerHTML += `<option value="${c}">${c}</option>`));

cargarProductos("https://dummyjson.com/products");