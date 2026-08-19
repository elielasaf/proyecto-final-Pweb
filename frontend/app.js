console.log("¡El archivo app.js está conectado y funcionando!");

// 1. Referencias a los elementos del DOM
const botonNuevoContacto = document.getElementById('boton_nuevo_contacto');
const modalContacto = document.getElementById('contacto_modal');
const btnCancelar = document.getElementById('btn_cancelar_contacto');
const btnGuardar = document.getElementById('btn_guardar_contacto');
const formContacto = document.getElementById('form_contacto');

// 2. Abrir el modal al hacer clic en "Nuevo Contacto"
if (botonNuevoContacto && modalContacto) {
    botonNuevoContacto.addEventListener('click', () => {
        modalContacto.style.display = 'flex'; // Muestra el modal cambiando el display: none
    });
}

// 3. Cerrar el modal al hacer clic en "Cancelar"
if (btnCancelar && modalContacto) {
    btnCancelar.addEventListener('click', () => {
        modalContacto.style.display = 'none';
        formContacto.reset(); // Limpia los campos del formulario
    });
}

// 4. Simular la acción del botón Guardar (Preparado para cuando integres el POST de la Persona 1)
if (btnGuardar) {
    btnGuardar.addEventListener('click', async () => {
        // Capturamos los valores de los inputs usando tus IDs exactos
        const nuevoContacto = {
            nombre: document.getElementById('nombre_input').value,
            telefono: document.getElementById('telefono_input').value,
            correo: document.getElementById('correo_input').value,
            empresa: document.getElementById('empresa_input').value,
            notas: document.getElementById('notas').value
        };

        console.log("Datos listos para enviar al backend:", nuevoContacto);

        // Alerta temporal de éxito visual
        alert("¡Contacto capturado con éxito! (Listo para conectar con el servidor)");

        modalContacto.style.display = 'none';
        formContacto.reset();
    });
}