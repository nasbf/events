document.addEventListener("DOMContentLoaded", () => {

    cargarTopbar();
    cargarCotizacion();
    cargarFooter();
    cargarWhatsapp();

});


/* =========================================
   TOPBAR
   ========================================= */

function cargarTopbar() {

    const container =
        document.getElementById("topbar-container");

    if (!container) {
        return;
    }

    fetch("components/topbar.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("No se pudo cargar la topbar.");
            }

            return response.text();

        })
        .then(html => {

            container.innerHTML = html;

        })
        .catch(error => {

            console.error("Error cargando topbar:", error);

        });

}


/* =========================================
   COTIZACIÓN
   ========================================= */

function cargarCotizacion() {

    const container =
        document.getElementById("cotizacion-container");

    if (!container) {
        return;
    }

    fetch("components/cotizacion.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("No se pudo cargar el formulario.");

            }

            return response.text();

        })
        .then(html => {

            container.innerHTML = html;

            inicializarCotizacion();

        })
        .catch(error => {

            console.error("Error cargando cotización:", error);

        });

}


/* =========================================
   FORMULARIO DE COTIZACIÓN
   ========================================= */

function inicializarCotizacion() {

    const WHATSAPP_NUMERO = '573132644554';

    const PHP_ENDPOINT = 'enviar.php';


    const form =
        document.getElementById('cotizacion');

    const errBox =
        document.getElementById('cotiza-error');

    const fecha =
        document.getElementById('fecha');


    // No permitir fechas pasadas
    fecha.min =
        new Date().toISOString().split('T')[0];


    form.addEventListener('submit', function (e) {

        e.preventDefault();

        errBox.style.display = 'none';


        const d = {

            nombre:
                form.nombre.value.trim(),

            telefono:
                form.telefono.value.trim(),

            evento:
                form.evento.value,

            fecha:
                form.fecha.value,

            invitados:
                form.invitados.value,

            website:
                form.website.value

        };


        // Honeypot anti-spam
        if (d.website) {
            return;
        }


        // Validación
        if (
            !d.nombre ||
            !d.telefono ||
            !d.evento ||
            !d.invitados
        ) {

            errBox.textContent =
                'Por favor completa los campos marcados con *.';

            errBox.style.display =
                'block';

            return;

        }


        // Guardar lead por correo
        try {

            fetch(PHP_ENDPOINT, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(d),

                keepalive: true

            }).catch(function () {});

        } catch (_) {}


        // Mensaje de WhatsApp
        const fechaTexto =
            d.fecha ? d.fecha : 'por definir';


        const mensaje =

            'Hola, soy ' +
            d.nombre +
            '. Quiero cotizar un evento con Gourmet Real.\n\n' +

            '• Tipo de evento: ' +
            d.evento + '\n' +

            '• Fecha tentativa: ' +
            fechaTexto + '\n' +

            '• Invitados: ' +
            d.invitados + '\n' +

            '• Mi WhatsApp: ' +
            d.telefono;


        const url =
            'https://wa.me/' +
            WHATSAPP_NUMERO +
            '?text=' +
            encodeURIComponent(mensaje);


        window.location.href = url;

    });

}


function cargarFooter() {

    const container =
        document.getElementById("footer");

    if (!container) {
        return;
    }

    fetch("components/footer.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("No se pudo cargar el footer.");
            }

            return response.text();

        })
        .then(html => {

            container.innerHTML = html;

        })
        .catch(error => {

            console.error("Error cargando footer:", error);

        });

}

/* =========================================
   WHATSAPP
   ========================================= */

function cargarWhatsapp() {

    const container =
        document.getElementById("whatsapp-container");

    if (!container) {
        return;
    }

    fetch("components/whatsapp.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("No se pudo cargar WhatsApp.");
            }

            return response.text();

        })
        .then(html => {

            container.innerHTML = html;

        })
        .catch(error => {

            console.error("Error cargando WhatsApp:", error);

        });

}