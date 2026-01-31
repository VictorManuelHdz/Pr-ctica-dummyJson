document.addEventListener("DOMContentLoaded", () => {
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
    }
});

const mostrarProducto = (producto, comentarios) => {
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