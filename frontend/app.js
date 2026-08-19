console.log("¡El archivo app.js está conectado y el CRUD con retroalimentación está completo!");

const API_URL = 'http://localhost:4000/api/contactos';

let todosLosContactos = [];
let contactoEnEdicion = null;
let contactoAEliminar = null;

const contenedorContactos = document.getElementById('contenedor_contactos');
const moldeTarjeta = document.getElementById('molde_tarjeta').content;

const botonNuevoContacto = document.getElementById('boton_nuevo_contacto');
const modalContacto = document.getElementById('contacto_modal');
const btnCancelar = document.getElementById('btn_cancelar_contacto');
const btnGuardar = document.getElementById('btn_guardar_contacto');
const formContacto = document.getElementById('form_contacto');
const tituloModal = document.getElementById('titulo_modal');

const modalEliminar = document.getElementById('eliminar_modal');
const btnCancelarEliminar = document.getElementById('btn_cancelar_eliminar');
const btnConfirmarEliminar = document.getElementById('btn_confirmar_eliminar');
const spanNombreEliminar = document.getElementById('eliminar_nombre_contacto');
const inputBusqueda = document.getElementById('input_busqueda');

function mostrarNotificacion(mensaje, tipo = 'success') {
    const alertaVieja = document.querySelector('.toast-notification');
    if (alertaVieja) alertaVieja.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification ${tipo === 'success' ? 'toast-success' : 'toast-error'}`;
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

function renderizarContactos(contactos) {
    // Limpiamos todo el contenedor por completo (borra el texto de carga y tarjetas viejas)
    contenedorContactos.innerHTML = '';

    const fragment = document.createDocumentFragment();

    contactos.forEach(contacto => {
        const clon = moldeTarjeta.cloneNode(true);

        const inyectarTexto = (clase, texto) => {
            const elemento = clon.querySelector(clase);
            if (elemento) elemento.textContent = texto;
        };

        inyectarTexto('.nombre_contacto', contacto.nombre);
        inyectarTexto('.telefono_contacto', contacto.telefono);
        inyectarTexto('.email_contacto', contacto.correo);
        inyectarTexto('.empresa_contacto', contacto.empresa || 'Sin empresa');
        inyectarTexto('.notas_contacto', contacto.notas || 'Sin notas adicionales');

        const btnEditar = clon.querySelector('.btn_editar');
        if (btnEditar) btnEditar.dataset.id = contacto._id;

        const btnEliminar = clon.querySelector('.btn_eliminar');
        if (btnEliminar) btnEliminar.dataset.id = contacto._id;

        fragment.appendChild(clon);
    });

    contenedorContactos.appendChild(fragment);
}


// 1. leer GET con indicador de carga
async function obtenerContactos() {
    try {
        contenedorContactos.innerHTML = '<div class="loading-state">Cargando contactos... ⏳</div>';

        const respuesta = await fetch(API_URL);
        todosLosContactos = await respuesta.json();

        if (todosLosContactos.length === 0) {
            contenedorContactos.innerHTML = '<div class="loading-state">No hay contactos registrados.</div>';
            return;
        }

        renderizarContactos(todosLosContactos);
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        contenedorContactos.innerHTML = '<div class="loading-state" style="color: #c62828;">Error al conectar con el servidor.</div>';
    }
}


// 2. crear y actualizar POST / PUT
if (btnGuardar) {
    btnGuardar.addEventListener('click', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre_input').value;
        const telefono = document.getElementById('telefono_input').value;
        const correo = document.getElementById('correo_input').value;
        const empresa = document.getElementById('empresa_input').value;
        const notas = document.getElementById('notas').value;

        if (!nombre || !telefono || !correo) {
            mostrarNotificacion("Por favor, llena los campos obligatorios.", "error");
            return;
        }

        const datosContacto = { nombre, telefono, correo, empresa, notas };

        const url = contactoEnEdicion ? `${API_URL}/${contactoEnEdicion}` : API_URL;
        const metodo = contactoEnEdicion ? 'PUT' : 'POST';

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosContacto)
            });

            if (respuesta.ok) {
                modalContacto.style.display = 'none';
                formContacto.reset();
                const mensajeExito = contactoEnEdicion ? "¡Contacto actualizado con éxito!" : "¡Contacto guardado con éxito!";
                contactoEnEdicion = null;
                tituloModal.textContent = "NUEVO CONTACTO";

                mostrarNotificacion(mensajeExito, "success");
                obtenerContactos();
            } else {
                mostrarNotificacion("Hubo un error al guardar el contacto.", "error");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            mostrarNotificacion("Error de conexión con el servidor.", "error");
        }
    });
}


// 3. eliminar DELETE
if (btnConfirmarEliminar) {
    btnConfirmarEliminar.addEventListener('click', async () => {
        if (!contactoAEliminar) return;

        try {
            const respuesta = await fetch(`${API_URL}/${contactoAEliminar}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                modalEliminar.style.display = 'none';
                contactoAEliminar = null;
                mostrarNotificacion("¡Contacto eliminado correctamente!", "success");
                obtenerContactos();
            } else {
                mostrarNotificacion("Error al intentar eliminar el contacto.", "error");
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            mostrarNotificacion("Error de conexión con el servidor.", "error");
        }
    });
}

// 4. delegacion de eventos
contenedorContactos.addEventListener('click', (e) => {
    const btnEliminarClick = e.target.closest('.btn_eliminar');
    if (btnEliminarClick) {
        contactoAEliminar = btnEliminarClick.dataset.id;

        const contacto = todosLosContactos.find(c => c._id === contactoAEliminar);
        if (contacto && spanNombreEliminar) {
            spanNombreEliminar.textContent = contacto.nombre;
        }

        modalEliminar.style.display = 'flex';
    }

    const btnEditarClick = e.target.closest('.btn_editar');
    if (btnEditarClick) {
        contactoEnEdicion = btnEditarClick.dataset.id;

        const contacto = todosLosContactos.find(c => c._id === contactoEnEdicion);

        if (contacto) {
            document.getElementById('nombre_input').value = contacto.nombre;
            document.getElementById('telefono_input').value = contacto.telefono;
            document.getElementById('correo_input').value = contacto.correo;
            document.getElementById('empresa_input').value = contacto.empresa || '';
            document.getElementById('notas').value = contacto.notas || '';

            tituloModal.textContent = "EDITAR CONTACTO";
            modalContacto.style.display = 'flex';
        }
    }
});

if (inputBusqueda) {
    inputBusqueda.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        const filtrados = todosLosContactos.filter(contacto =>
            contacto.nombre.toLowerCase().includes(texto) ||
            contacto.correo.toLowerCase().includes(texto) ||
            contacto.telefono.toLowerCase().includes(texto)
        );
        renderizarContactos(filtrados);
    });
}

if (botonNuevoContacto && modalContacto) {
    botonNuevoContacto.addEventListener('click', () => {
        contactoEnEdicion = null;
        tituloModal.textContent = "NUEVO CONTACTO";
        formContacto.reset();
        modalContacto.style.display = 'flex';
    });
}

if (btnCancelar && modalContacto) {
    btnCancelar.addEventListener('click', () => {
        contactoEnEdicion = null;
        tituloModal.textContent = "NUEVO CONTACTO";
        formContacto.reset();
        modalContacto.style.display = 'none';
    });
}

if (btnCancelarEliminar && modalEliminar) {
    btnCancelarEliminar.addEventListener('click', () => {
        contactoAEliminar = null;
        modalEliminar.style.display = 'none';
    });
}

obtenerContactos();