const confirmarBorrado = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const mensaje = document.getElementById("mensaje-exito");

    fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
        let eliminados = JSON.parse(localStorage.getItem('productosEliminados')) || [];
        
        if (!eliminados.includes(id)) {
            eliminados.push(id);
            localStorage.setItem('productosEliminados', JSON.stringify(eliminados));
        }

        mensaje.style.display = "block";
        const nombreProducto = data.title || "seleccionado";
        mensaje.innerHTML = `
            <p>El producto <strong>${nombreProducto}</strong> ha sido eliminado exitosamente.</p>
            <p><strong>ID: </strong> ${id}</p>
            <p><strong>Precio: </strong> ${data.price}</p>
            <p><strong>Marca: </strong> ${data.brand}</p>
            <p><strong>Descripcion: </strong> ${data.description}</p>
            `;
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2500);
    })
    .catch(err => {
        console.error("Error al eliminar:", err);
        alert("Hubo un problema al procesar la eliminación.");
    });
};