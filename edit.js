document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get('id');
    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(p => {
            document.getElementById("titulo-edit").value = p.title;
            document.getElementById("precio-edit").value = p.price;
            document.getElementById("descripcion-edit").value = p.description;
        });
});

const actualizarProducto = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const titulo = document.getElementById("titulo-edit").value;
    const precio = parseFloat(document.getElementById("precio-edit").value);

    fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titulo, price: precio })
    })
    .then(res => res.json())
    .then(data => {
        const div = document.getElementById("mensaje-exito");
        div.style.display = "block";
        div.innerHTML = `<h4>¡Éxito!</h4><p>Producto ${data.title} actualizado.</p>
            <p><strong>ID: </strong> ${id}</p>
            <p><strong>Precio: </strong> ${data.price}</p>
            <p><strong>Descripcion: </strong> ${data.description}</p>
            `;
        setTimeout(() => window.location.href = 'index.html', 2500);
    });
};