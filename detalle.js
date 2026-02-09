document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    if (productoId) {
        fetch(`https://dummyjson.com/products/${productoId}`)
            .then(res => res.json())
            .then(data => {
                mostrarProducto(data, data.reviews);
            })
            .catch(error => console.error("Error:", error));
=======
    const valoresURL = window.location.search;
    const urlParams = new URLSearchParams(valoresURL);

    const productoId = urlParams.get('id');

    if (productoId) {
        console.log("El ID a buscar es:", productoId);
        
        fetch(`https://dummyjson.com/products/${productoId}`)
            .then(res => res.json())
            .then(data => {

                console.log("Datos recibidos:", data, data.reviews);

                mostrarProducto(data, data.reviews)

            })
            .catch(error => {
                console.error("Error al cargar los productos:", error);
                alert("Hubo un error al cargar los datos. Revisa la consola.");
            })
>>>>>>> 3836e553399b3a1e7242372df398a5282a800d06
    }
});

const mostrarProducto = (producto, comentarios) => {
<<<<<<< HEAD
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
=======
    const contenedorProducto = document.getElementById("contenedor-productos")
    const contenedorComentarios = document.getElementById("contenedor-comentarios")

    contenedorProducto.innerHTML = ""
    contenedorComentarios.innerHTML = ""

    contenedorProducto.innerHTML = `
        <div class="practice-card" style="width: 100%; max-width: 600px; align-items: flex-start; text-align: left;">
            <h2 class="practice-title">${producto.title}</h2>
            <img src="${producto.thumbnail}" alt="${producto.title}" class="practice-img" style="height: 300px;">
            <p><strong>Descripción:</strong> ${producto.description}</p>
            <p><strong>Precio:</strong> $${producto.price}</p>
            <p><strong>Marca:</strong> ${producto.brand}</p>
            <p><strong>Rating:</strong> ${producto.rating} ⭐</p>
        </div>
    `;

    comentarios.forEach(com => {
        const div = document.createElement("div");

        div.className = "comentario-card";

        div.innerHTML = `
            <div class="comentario-header">
                <span class="comentario-usuario">${com.reviewerName}</span>
                <span class="practice-rating">${com.rating} ⭐</span>
            </div>
            <p class="comentario-texto">"${com.comment}"</p>
            <small class="comentario-fecha">${new Date(com.date).toLocaleDateString()}</small>
            `;

        contenedorComentarios.appendChild(div);
    });
}
>>>>>>> 3836e553399b3a1e7242372df398a5282a800d06
