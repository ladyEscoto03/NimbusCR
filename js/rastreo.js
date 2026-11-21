
const envios = {
    "VR-1001": {
        estado: "En tránsito",
        descripcion: "El paquete salió del centro de distribución de San José.",
        destino: "Liberia, Guanacaste",
        progreso: 66
    },

    "VR-1002": {
        estado: "Entregado",
        descripcion: "El envío fue entregado correctamente al destinatario.",
        destino: "Cartago",
        progreso: 100
    }
};

const formularioRastreo = document.getElementById("formRastreo");
const campoNumeroGuia = document.getElementById("numeroGuia");
const resultadoRastreo = document.getElementById("resultadoRastreo");


formularioRastreo.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const numeroGuia = campoNumeroGuia.value.trim().toUpperCase();


    resultadoRastreo.replaceChildren();

    if (numeroGuia === "") {
        mostrarError("Por favor, ingresa un número de guía.");
        return;
    }

    const envio = envios[numeroGuia];

    if (!envio) {
        mostrarError("No se encontró ningún envío con ese número de guía.");
        return;
    }

    mostrarResultado(numeroGuia, envio);
});



function mostrarResultado(numeroGuia, envio) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "card border-0 shadow-sm";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "h5 fw-bold";
    titulo.textContent = "Información del envío";

    const guia = document.createElement("p");
    guia.className = "mb-2";
    guia.textContent = "Número de guía: " + numeroGuia;

    const estado = document.createElement("p");
    estado.className = "mb-2";

    const etiquetaEstado = document.createElement("strong");
    etiquetaEstado.textContent = "Estado: ";

    estado.appendChild(etiquetaEstado);
    estado.appendChild(document.createTextNode(envio.estado));

    const descripcion = document.createElement("p");
    descripcion.className = "mb-2";
    descripcion.textContent = envio.descripcion;

    const destino = document.createElement("p");
    destino.className = "mb-3";

    const etiquetaDestino = document.createElement("strong");
    etiquetaDestino.textContent = "Destino: ";

    destino.appendChild(etiquetaDestino);
    destino.appendChild(document.createTextNode(envio.destino));

    const etiquetaProgreso = document.createElement("p");
    etiquetaProgreso.className = "fw-semibold mb-2";
    etiquetaProgreso.textContent = "Progreso del envío";

    const barraContenedor = document.createElement("div");
    barraContenedor.className = "progress";
    barraContenedor.setAttribute("role", "progressbar");
    barraContenedor.setAttribute("aria-label", "Progreso del envío");
    barraContenedor.setAttribute("aria-valuenow", envio.progreso);
    barraContenedor.setAttribute("aria-valuemin", "0");
    barraContenedor.setAttribute("aria-valuemax", "100");

    const barra = document.createElement("div");
    barra.className = "progress-bar bg-nimbus-green";
    barra.style.width = envio.progreso + "%";
    barra.textContent = envio.progreso + "%";

    barraContenedor.appendChild(barra);

    cuerpo.append(
        titulo,
        guia,
        estado,
        descripcion,
        destino,
        etiquetaProgreso,
        barraContenedor
    );

    tarjeta.appendChild(cuerpo);
    resultadoRastreo.appendChild(tarjeta);
}


function mostrarError(mensaje) {

    const alerta = document.createElement("div");
    alerta.className = "alert alert-warning mb-0";
    alerta.setAttribute("role", "alert");
    alerta.textContent = mensaje;

    resultadoRastreo.appendChild(alerta);
}