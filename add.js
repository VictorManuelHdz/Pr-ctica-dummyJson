<<<<<<< HEAD
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
=======
const guardarProducto = () =>{
    // Creamos las variables de los elementos con los que vamos a interctuar
    const titulo = document.getElementById("titulo").value
    const precio = parseFloat(document.getElementById("precio").value)
    const categoria = document.getElementById("categoria").value
    const descripcion = document.getElementById("descripcion").value
    const resutado = document.getElementById("mensaje-exito")

    // Verificamos que los campos no esten vacios
    if(!titulo || !precio || !descripcion)
    {
        alert("Completa los campos obligatorios")
        return
    }

    // Creamos el objeto que se va por el body
    const producto = {
        title:titulo,
        price:precio,
        category:categoria,
        description:descripcion,
        thumbnail:`https://dummyjson.com/image/400x200/008080/ffffff?text=${titulo}`
    }

    // Hacemos la peticion fetch con el metodo post
    fetch("https://dummyjson.com/products/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del API", data)
        resutado.style.display="block"
        resutado.innerHTML=`
        <strong>Producto agregado correctamente!!!</strong><br>
        Id asignado : ${data.id}<br>
        Nombre      : ${data.title}<br>
        Precio      : ${data.price}
        `
    });
}
>>>>>>> 3836e553399b3a1e7242372df398a5282a800d06
