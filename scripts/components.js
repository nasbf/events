document.addEventListener("DOMContentLoaded", () => {

    cargarTopbar();
    cargarHeader();
    cargarGaleria();
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
   HEADER
   ========================================= */

function cargarHeader() {

    const container =
        document.getElementById("header-container");

    if (!container) {
        return;
    }

    fetch("components/header.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("No se pudo cargar el header.");
            }

            return response.text();

        })
        .then(html => {

            container.innerHTML = html;

        })
        .catch(error => {

            console.error("Error cargando header:", error);

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

function cargarConversion(tipo) {
    console.log("TIPO RECIBIDO:", tipo);

    const conversionContainer = document.getElementById("conversion-container");

    if (!conversionContainer) return;

    const conversiones = {

        bodas: {
            etiqueta: "TU HISTORIA, TU DÍA, TU BODA",
            titulo: "Tu boda empieza aquí",
            frase: "Tú imaginas el día. Nosotros hacemos que suceda.",
            descripcion:
                "Cada boda es diferente y merece ser diseñada alrededor de quienes la viven. Nuestro equipo te acompaña para encontrar el lugar ideal, coordinar cada detalle y crear una celebración que refleje tu historia y haga de este día un recuerdo inolvidable.",

            paso1Titulo: "Cuéntanos tu idea",
            paso1Texto:
                "Háblanos de la boda que estás imaginando: fecha, invitados, estilo y todo aquello que sueñas para ese día.",

            paso2Titulo: "Diseñamos tu propuesta",
            paso2Texto:
                "Te orientamos y buscamos las opciones que mejor se adapten a tu celebración y a lo que deseas vivir.",

            paso3Titulo: "Disfruta tu gran día",
            paso3Texto:
                "Nosotros cuidamos la organización y los detalles para que tú puedas dedicarte a disfrutar cada momento.",

            accion: "¿Comenzamos a planear tu día especial?",
            accionTexto:
                "Cuéntanos cómo imaginas tu boda y déjanos ayudarte a hacerla realidad."
        },

        cumpleanos: {
            etiqueta: "CELEBRA, DISFRUTA, RECUERDA",
            titulo: "Tu celebración empieza aquí",
            frase: "Tú imaginas la fiesta. Nosotros hacemos que cada momento sea especial.",
            descripcion:
                "Queremos que tu celebración sea tan especial como la persona que estás festejando. Creamos experiencias pensadas para disfrutar, compartir y convertir cada momento en un recuerdo inolvidable.",

            paso1Titulo: "Cuéntanos tu idea",
            paso1Texto:
                "Háblanos de tu celebración, tus invitados y el estilo de fiesta que tienes en mente.",

            paso2Titulo: "Creamos tu propuesta",
            paso2Texto:
                "Te ayudamos a encontrar las mejores opciones para que tu celebración tenga todo lo que imaginas.",

            paso3Titulo: "Disfruta la fiesta",
            paso3Texto:
                "Nosotros cuidamos cada detalle para que tú y tus invitados solo tengan que disfrutar.",

            accion: "¿Comenzamos a celebrar?",
            accionTexto:
                "Cuéntanos qué tienes en mente y hagamos de tu celebración un momento inolvidable."
        },

        corporativo: {
            etiqueta: "EVENTOS QUE REPRESENTAN TU EMPRESA",
            titulo: "Tu evento empieza aquí",
            frase: "Cuidamos cada detalle para que tu empresa proyecte la imagen que merece.",
            descripcion:
                "Un evento corporativo también comunica quién eres. Te ayudamos a crear una experiencia organizada, profesional y memorable, pensada para tus colaboradores, clientes e invitados.",

            paso1Titulo: "Cuéntanos tus objetivos",
            paso1Texto:
                "Comparte con nosotros el propósito de tu evento, número de invitados, fecha y necesidades.",

            paso2Titulo: "Diseñamos tu propuesta",
            paso2Texto:
                "Creamos una propuesta adaptada a la identidad de tu empresa y a los objetivos de tu evento.",

            paso3Titulo: "Vive un evento profesional",
            paso3Texto:
                "Nos encargamos de los detalles para que puedas concentrarte en tus invitados y en los resultados.",

            accion: "¿Planeamos tu próximo evento?",
            accionTexto:
                "Cuéntanos qué necesita tu empresa y encontremos juntos la mejor propuesta."
        }
    };

    const datos = conversiones[tipo];

    if (!datos) return;

    conversionContainer.innerHTML = `

        <section class="evento-conversion">

            <div class="evento-conversion-contenido">

                <div class="evento-conversion-texto">

                    <span class="evento-etiqueta">
                        ${datos.etiqueta}
                    </span>

                    <h2>${datos.titulo}</h2>

                    <p class="evento-frase">
                        ${datos.frase}
                    </p>

                    <p class="evento-descripcion">
                        ${datos.descripcion}
                    </p>

                </div>


                <div class="evento-pasos">

                    <div class="evento-paso">
                        <span>01</span>

                        <div>
                            <h3>${datos.paso1Titulo}</h3>
                            <p>${datos.paso1Texto}</p>
                        </div>
                    </div>


                    <div class="evento-paso">
                        <span>02</span>

                        <div>
                            <h3>${datos.paso2Titulo}</h3>
                            <p>${datos.paso2Texto}</p>
                        </div>
                    </div>


                    <div class="evento-paso">
                        <span>03</span>

                        <div>
                            <h3>${datos.paso3Titulo}</h3>
                            <p>${datos.paso3Texto}</p>
                        </div>
                    </div>

                </div>

            </div>


            <div class="evento-conversion-accion">

                <h3>${datos.accion}</h3>

                <p>${datos.accionTexto}</p>

                <a href="https://wa.me/573132644554" class="evento-boton">
                    SOLICITAR COTIZACIÓN
                </a>

            </div>

        </section>
    `;
}

/* =========================================
   GALERÍA
   ========================================= */

function cargarGaleria(tipo) {

    const container =
        document.getElementById("galeria-container");

    if (!container) {
        return;
    }


    const galerias = {

        bodas: {

            imagenes: [
                "images/hye_boda.jpg",
                "images/CapillaMonteLeon2.jpeg",
                "images/decoracion.jpeg",
                "images/MACIA3.jpeg",
                "images/mesaDecoradaBoda.webp",
                "images/rumbaBoda.jpg"
            ],

            alt: [
                "Boda Gourmet Real",
                "Decoración de boda",
                "Celebración de boda",
                "Montaje de boda",
                "Mesa decorada para boda",
                "Momento especial de boda"
            ]

        },


        cumpleanos: {

            imagenes: [
                "images/quinceAnos.jpeg",
                "images/quinceanero.jpeg",
                "images/quinceanera2.jpeg",
                "images/decoExteriorQuinceanos.jpeg",
                "images/quinceAños.jpg",
                "images/lucesMinitk.jpg"
            ],

            alt: [
                "Decoración de cumpleaños",
                "Decoración de quinceañero",
                "Quinceañera",
                "Decoración exterior para quince años",
                "Decoración interior para cumpleaños",
                "Mini-Tk para cumpleaños"
            ]

        },


        corporativo: {

            imagenes: [
                "images/auditorio.jpg",
                "images/agendasCorporativo.webp",
                "images/eventoOscars.webp",
                "images/escarapelas.jpg",
                "images/brunch.jpg",
                "images/mesaCorporativo.jpg"
            ],

            alt: [
                "auditorio corporativo",
                "Agendas corporativas",
                "Evento empresarial",
                "Escarapelas corporativo",
                "Evento Gourmet Real",
                "Evento corporativo Gourmet Real"
            ]

        }

    };


    const datos = galerias[tipo];

    if (!datos) {
        return;
    }


    fetch("components/galeria.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("No se pudo cargar la galería.");

            }

            return response.text();

        })
        .then(html => {

            container.innerHTML = html;


            datos.imagenes.forEach((imagen, index) => {

                const elemento =
                    container.querySelector(
                        `.galeria-imagen-${index + 1}`
                    );

                if (elemento) {

                    elemento.src = imagen;
                    elemento.alt = datos.alt[index];

                }

            });

        })
        .catch(error => {

            console.error("Error cargando galería:", error);

        });

}