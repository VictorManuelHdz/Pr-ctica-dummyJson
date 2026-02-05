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