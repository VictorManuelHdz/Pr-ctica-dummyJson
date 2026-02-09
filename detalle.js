document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    if (productoId) {
        fetch(`https://dummyjson.com/products/${productoId}`)
            .then(res => res.json())
            .then(data => {
                mostrarProducto(data, data.reviews);
            })
            .catch(error => console.error("Error:", error));
    }
});

const mostrarProducto = (producto, comentarios) => {
    const contenedorProducto = document.getElementById("detalle-producto-container")
    const contenedorComentarios = document.getElementById("contenedor-comentarios")

    contenedorProducto.innerHTML = `
        <div class="practice-card-detalle">
            <h2 class="detalle-title">${producto.title}</h2>
            <div class="detalle-content">
                <img src="${producto.thumbnail}" alt="${producto.title}" class="detalle-img">
                <div class="detalle-info">
                    <p><strong>Categoría:</strong> ${producto.category}</p>
                    <p><strong>Descripción:</strong> ${producto.description}</p>
                    <p><strong>Precio:</strong> $${producto.price}</p>
                    <p><strong>Marca:</strong> ${producto.brand}</p>
                    <p><strong>Rating:</strong> ${producto.rating} ⭐</p>
                </div>
            </div>
        </div>
    `;

    contenedorComentarios.innerHTML = "<h3>Opiniones de clientes</h3>";
    comentarios.forEach(com => {
        const div = document.createElement("div");
        div.className = "comentario-card";
        div.innerHTML = `
            <strong>${com.reviewerName}</strong> - ${com.rating} ⭐
            <p>"${com.comment}"</p>
            <small>${new Date(com.date).toLocaleDateString()}</small>
        `;
        contenedorComentarios.appendChild(div);
    });
};