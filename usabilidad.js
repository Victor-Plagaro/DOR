let tareas = [];

function agregarTarea(titulo, imagen, descripcion) {
    let tarea = {
        titulo: titulo,
        imagen: imagen,
        descripcion: descripcion
    };
    tareas.push(tarea);
}

function modificarTarea(indice, titulo, imagen, descripcion) {
    if (indice < tareas.length) {
        tareas[indice].titulo = titulo;
        tareas[indice].imagen = imagen;
        tareas[indice].descripcion = descripcion;
    } else {
        console.log("Índice de tarea no válido");
    }
}

function eliminarTarea(indice) {
    if (indice < tareas.length) {
        tareas.splice(indice, 1);
    } else {
        console.log("Índice de tarea no válido");
    }
}