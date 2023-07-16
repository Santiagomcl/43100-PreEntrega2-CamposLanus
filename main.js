const performancesDanzaContemporanea = [];
const devoluciones = [];
const usuariosLogueados = [];


const loginForm = document.getElementById("loginForm");
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const pasosForm = document.getElementById("pasosForm");
const nombrePerformanceInput = document.getElementById("nombrePerformanceInput");
const youtubeLinkInput = document.getElementById("youtubeLinkInput");
const btnDarDevolucion = document.getElementById("btnDarDevolucion");
const devolucionesIcono = document.getElementById("devolucionesIcono");
const welcomeMessage = document.getElementById("welcomeMessage");


loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;


  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);


  Swal.fire({
    icon: "success",
    title: "Inicio de sesión exitoso",
    text: "¡Bienvenido/a!",
    confirmButtonText: "Aceptar"
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarWelcomeMessage(firstName, lastName);
    }
  });
});


function mostrarWelcomeMessage(firstName, lastName) {
  welcomeMessage.textContent = `Bienvenido/a, ${firstName} ${lastName}`;
}


pasosForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const nombrePerformance = nombrePerformanceInput.value;
  const youtubeLink = youtubeLinkInput.value;

  
  const performance = {
    nombre: nombrePerformance,
    youtubeLink: youtubeLink
  };

  
  performancesDanzaContemporanea.push(performance);

  
  nombrePerformanceInput.value = "";
  youtubeLinkInput.value = "";

  
  mostrarPerformance(performancesDanzaContemporanea.length - 1);

  
  Swal.fire({
    icon: "success",
    title: "Performance agregada",
    text: "La performance ha sido agregada exitosamente",
    confirmButtonText: "Aceptar"
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarDevolutionButton();
    }
  });
});


function mostrarDevolutionButton() {
  btnDarDevolucion.classList.remove("hidden");
}


function mostrarPerformance(index) {
  const resultadoDiv = document.getElementById("resultado");
  const videoContainer = document.getElementById("videoContainer");
  resultadoDiv.innerHTML = `Performance: ${performancesDanzaContemporanea[index].nombre}`;


  const videoLink = performancesDanzaContemporanea[index].youtubeLink;
  if (videoLink) {
    const videoId = obtenerVideoIdFromLink(videoLink);
    const videoHtml = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    videoContainer.innerHTML = videoHtml;
  } else {
    videoContainer.innerHTML = "";
  }
}


function obtenerVideoIdFromLink(youtubeLink) {
  const regex = /(?:\?v=|\/embed\/|\.be\/|\/watch\?v=|\/v\/|youtu\.be\/|\/embed\/|\/v=|youtube\.com\/watch\?v=|youtube\.com\/v\/)([^#\&\?\n<>\'\" ]{11})/;
  const match = youtubeLink.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}


actualizarContadorDevoluciones();


devolucionesIcono.addEventListener("click", function () {
  mostrarDevolucionesGuardadas();
});


function actualizarContadorDevoluciones() {
  const contadorDevoluciones = document.getElementById("contadorDevoluciones");
  contadorDevoluciones.innerText = devoluciones.length.toString();
}


function mostrarDevolucionesGuardadas() {
  let html = "<ul>";
  devoluciones.forEach((devolucion, index) => {
    html += `<li>
      Performance: ${devolucion.performance}<br>
      Devolución: ${devolucion.texto}<br>
      Video: ${devolucion.videoLink}<br>
      Usuario: ${devolucion.userName}<br>
      <button class="compartir-twitter" data-index="${index}">Compartir en Twitter</button>
      <button class="compartir-facebook" data-index="${index}">Compartir en Facebook</button>
      <button class="compartir-instagram" data-index="${index}">Compartir en Instagram</button>
      </li>`;
  });
  html += "</ul>";

  Swal.fire({
    title: "Devoluciones guardadas",
    html: html,
    showConfirmButton: false,
  });


  document.querySelectorAll(".compartir-twitter").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.getAttribute("data-index"));
      compartirEnTwitter(devoluciones[index].videoLink);
    });
  });

  document.querySelectorAll(".compartir-facebook").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.getAttribute("data-index"));
      compartirEnFacebook(devoluciones[index].videoLink);
    });
  });

  document.querySelectorAll(".compartir-instagram").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.getAttribute("data-index"));
      compartirEnInstagram(devoluciones[index].videoLink);
    });
  });
}


function compartirEnTwitter(videoLink) {
  const url = `https://twitter.com/intent/tweet?text=Mira esta increíble devolución de danza contemporánea: ${videoLink}`;
  window.open(url, "_blank");
}


function compartirEnFacebook(videoLink) {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoLink)}`;
  window.open(url, "_blank");
}


function compartirEnInstagram(videoLink) {
  const url = `https://www.instagram.com/?url=${encodeURIComponent(videoLink)}`;
  window.open(url, "_blank");
}


btnDarDevolucion.addEventListener("click", function () {
  Swal.fire({
    title: "Dar Devolución",
    input: "textarea",
    inputPlaceholder: "Ingrese su devolución...",
    showCancelButton: true,
    confirmButtonText: "Enviar",
    cancelButtonText: "Cancelar",
    preConfirm: (devolucion) => {
      if (!devolucion) {
        Swal.showValidationMessage("Debe ingresar una devolución");
      } else {
        return devolucion;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const devolucion = result.value;
      guardarDevolucion(devolucion);
    }
  });
});


function guardarDevolucion(devolucion) {
  const performanceActual = performancesDanzaContemporanea[performancesDanzaContemporanea.length - 1];
  const devolucionGuardada = {
    performance: performanceActual.nombre,
    texto: devolucion,
    videoLink: performanceActual.youtubeLink,
    userName: `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`
  };
  devoluciones.push(devolucionGuardada);
  actualizarContadorDevoluciones();

  Swal.fire({
    icon: "success",
    title: "Devolución exitosa",
    text: "Tu devolución ha sido guardada exitosamente",
    confirmButtonText: "Aceptar"
  });
}
