document.addEventListener('DOMContentLoaded', function () {
    const agregar = document.getElementById('agregar');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const btnClose = document.getElementById('btnClose');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const listadoTareasGrid = document.getElementById('listado-tareas-grid');
    let tareaSeleccionada = null;

    // Evento para abrir el modal cuando se hace clic en "Agregar"
    agregar.addEventListener('click', function () {
        abrirModal();
    });

    btnClose.addEventListener('click', cerrarModal);

    function abrirModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    function cerrarModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }

    function eliminarTarea(tareaContainer, titulo, descripcion) {
        listadoTareasGrid.removeChild(tareaContainer);
        console.log('Tarea eliminada:', { titulo, descripcion });
    }

    function editarTarea(titulo, descripcion) {
        titleInput.value = titulo;
        descriptionInput.value = descripcion;
        abrirModal();
    }

    function agregarTarea() {
        const titulo = titleInput.value;
        const descripcion = descriptionInput.value;

        if (titulo.trim() !== '' && descripcion.trim() !== '') {
            const tareaContainer = document.createElement('div');
            tareaContainer.classList.add('tarea-container');
            tareaContainer.innerHTML = `<strong>${titulo}:</strong> ${descripcion} <span class="eliminar-icon">&#10006;</span> <span class="editar-icon">&#9998;</span>`;
            listadoTareasGrid.appendChild(tareaContainer);

            const eliminarIcon = tareaContainer.querySelector('.eliminar-icon');
            eliminarIcon.addEventListener('click', function () {
                eliminarTarea(tareaContainer, titulo, descripcion);
            });

            const editarIcon = tareaContainer.querySelector('.editar-icon');
            editarIcon.addEventListener('click', function () {
                tareaSeleccionada = tareaContainer;
                editarTarea(tareaContainer, titulo, descripcion);
            });

            titleInput.value = '';
            descriptionInput.value = '';
            cerrarModal();
        } else {
            alert('Por favor, completa tanto el título como la descripción antes de guardar la tarea.');
        }
    }

    const guardarTareaButton = document.getElementById('guardarTarea');
    guardarTareaButton.addEventListener('click', function () {
        if (tareaSeleccionada) {
            tareaSeleccionada.innerHTML = `<strong>${titleInput.value}:</strong> ${descriptionInput.value} <span class="eliminar-icon">&#10006;</span> <span class="editar-icon">&#9998;</span>`;
            tareaSeleccionada = null;
        } else {
            agregarTarea();
        }

        titleInput.value = '';
        descriptionInput.value = '';
        cerrarModal();
    });

    listadoTareasGrid.addEventListener('click', function (event) {
        const target = event.target;
        const tareaContainer = target.closest('.tarea-container');

        if (target.classList.contains('eliminar-icon')) {
            const titulo = tareaContainer.querySelector('strong').textContent;
            const descripcion = tareaContainer.textContent.split(':')[1].trim();
            eliminarTarea(tareaContainer, titulo, descripcion);
        } else if (target.classList.contains('editar-icon')) {
            const titulo = tareaContainer.querySelector('strong').textContent;
            const descripcion = tareaContainer.textContent.split(':')[1].trim();
            tareaSeleccionada = tareaContainer;
            editarTarea(tareaContainer, titulo, descripcion);
        }
    });
});
