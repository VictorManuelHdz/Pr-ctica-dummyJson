const guardarProducto = () => {
    const titulo = document.getElementById("titulo").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;

    if (!titulo || isNaN(precio) || precio < 0) {
        alert("⚠️ Por favor ingresa datos válidos. El precio no puede ser negativo.");
        return;
    }

    fetch("https://dummyjson.com/products/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titulo, price: precio, category: categoria })
    })
    .then(res => res.json())
    .then(data => {
        const div = document.getElementById("mensaje-exito");
        div.style.display = "block";
        document.getElementById("texto-exito").innerHTML = `
            <ul>
                <li><strong>ID:</strong> #${data.id}</li>
                <li><strong>Nombre:</strong> ${data.title}</li>
                <li><strong>Precio:</strong> $${data.price}</li>
                <li><strong>Categoría:</strong> ${data.category}</li>
            </ul>
        `;
        setTimeout(() => window.location.href = 'index.html', 4000);
    });
};