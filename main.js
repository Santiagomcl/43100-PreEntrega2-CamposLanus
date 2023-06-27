const pasosBallet = [];

// Obtener el formulario y los campos de entrada
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const pasosForm = document.getElementById("pasosForm");
const nombrePasoInput = document.getElementById("nombrePasoInput");
const velocidadPasoInput = document.getElementById("velocidadPasoInput");
const brazosPasoInput = document.getElementById("brazosPasoInput");

// Obtener los usuarios logueados desde el almacenamiento local o inicializarlo como un array vacío
let usuariosLogueados = JSON.parse(localStorage.getItem("usuariosLogueados")) || [];

// Manejar el evento de envío del formulario de inicio de sesión
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  const username = usernameInput.value;

  // Crear un objeto de usuario logueado
  const usuarioLogueado = {
    username: username
  };

  // Agregar el usuario logueado al array de usuariosLogueados
  usuariosLogueados.push(usuarioLogueado);

  // Limpiar el campo de entrada
  usernameInput.value = "";

  // Mostrar los usuarios logueados
  mostrarUsuariosLogueados();

  // Guardar los usuarios logueados en el localStorage
  localStorage.setItem("usuariosLogueados", JSON.stringify(usuariosLogueados));
});

// Manejar el evento de envío del formulario de pasos de danza
pasosForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  const nombrePaso = nombrePasoInput.value;
  const velocidadPaso = velocidadPasoInput.value;
  const brazosPaso = brazosPasoInput.value;

  // Crear un objeto de paso de danza
  const paso = {
    nombre: nombrePaso,
    velocidad: velocidadPaso,
    brazos: brazosPaso
  };

  // Agregar el paso de danza al array de pasosBallet
  pasosBallet.push(paso);

  // Limpiar los campos de entrada
  nombrePasoInput.value = "";
  velocidadPasoInput.value = "";
  brazosPasoInput.value = "";

  // Mostrar el resultado
  mostrarResultado();

  // Mostrar el video correspondiente al paso de danza
  mostrarVideo(pasosBallet.length - 1);

  // Guardar los pasos de danza en el localStorage
  localStorage.setItem("pasosBallet", JSON.stringify(pasosBallet));
});

// Función para mostrar los usuarios logueados
function mostrarUsuariosLogueados() {
  const usuariosLogueadosUl = document.getElementById("usuariosLogueados");
  usuariosLogueadosUl.innerHTML = ""; // Limpiar la lista de usuarios logueados

  for (let i = 0; i < usuariosLogueados.length; i++) {
    const usuarioLogueado = usuariosLogueados[i];
    const li = document.createElement("li");
    li.textContent = usuarioLogueado.username;
    usuariosLogueadosUl.appendChild(li);
  }
}

// Función para mostrar el resultado de los pasos de danza
function mostrarResultado() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpiar el contenido previo

  for (let i = 0; i < pasosBallet.length; i++) {
    const paso = pasosBallet[i];
    const p = document.createElement("p");
    p.textContent = `${paso.nombre} - ${paso.velocidad} - ${paso.brazos}`;
    resultadoDiv.appendChild(p);
  }
}

// Función para mostrar el video correspondiente al paso de danza
function mostrarVideo(index) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = ""; // Limpiar el contenido previo

  const videoId = obtenerVideoId(index);
  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.frameborder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowfullscreen = true;

  videoContainer.appendChild(iframe);
}

// Función para obtener el ID del video de YouTube según el índice del paso
function obtenerVideoId(index) {
  const videos = [
    "h_VE64GXjQQ",
    "jQ73d68HQCs",
    "vgeyctb6r50"
    // Agrega más IDs de video según los pasos de la danza
  ];
  return videos[index];
}

// Obtener los pasos de danza desde el almacenamiento local o inicializarlo como un array vacío
pasosBallet = JSON.parse(localStorage.getItem("pasosBallet")) || [];

// Mostrar los usuarios logueados
mostrarUsuariosLogueados();

// Mostrar el resultado de los pasos de danza
mostrarResultado();

// Mostrar el video del último paso de danza si existen pasos
if (pasosBallet.length > 0) {
  mostrarVideo(pasosBallet.length - 1);
}
