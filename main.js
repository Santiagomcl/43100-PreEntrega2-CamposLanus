const pasosBallet = [];


const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const pasosForm = document.getElementById("pasosForm");
const nombrePasoInput = document.getElementById("nombrePasoInput");
const velocidadPasoInput = document.getElementById("velocidadPasoInput");
const brazosPasoInput = document.getElementById("brazosPasoInput");


let usuariosLogueados = JSON.parse(localStorage.getItem("usuariosLogueados")) || [];


loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const username = usernameInput.value;

 
  const usuarioLogueado = {
    username: username
  };

  
  usuariosLogueados.push(usuarioLogueado);

  
  usernameInput.value = "";

  
  mostrarUsuariosLogueados();

  
  localStorage.setItem("usuariosLogueados", JSON.stringify(usuariosLogueados));
});


pasosForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const nombrePaso = nombrePasoInput.value;
  const velocidadPaso = velocidadPasoInput.value;
  const brazosPaso = brazosPasoInput.value;

 
  const paso = {
    nombre: nombrePaso,
    velocidad: velocidadPaso,
    brazos: brazosPaso
  };

  
  pasosBallet.push(paso);

 
  nombrePasoInput.value = "";
  velocidadPasoInput.value = "";
  brazosPasoInput.value = "";

 
  mostrarResultado();

 
  mostrarVideo(pasosBallet.length - 1);

 
  localStorage.setItem("pasosBallet", JSON.stringify(pasosBallet));
});


function mostrarUsuariosLogueados() {
  const usuariosLogueadosUl = document.getElementById("usuariosLogueados");
  usuariosLogueadosUl.innerHTML = ""; 

  for (let i = 0; i < usuariosLogueados.length; i++) {
    const usuarioLogueado = usuariosLogueados[i];
    const li = document.createElement("li");
    li.textContent = usuarioLogueado.username;
    usuariosLogueadosUl.appendChild(li);
  }
}


function mostrarResultado() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; 

  for (let i = 0; i < pasosBallet.length; i++) {
    const paso = pasosBallet[i];
    const p = document.createElement("p");
    p.textContent = `${paso.nombre} - ${paso.velocidad} - ${paso.brazos}`;
    resultadoDiv.appendChild(p);
  }
}


function mostrarVideo(index) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = ""; 

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


function obtenerVideoId(index) {
  const videos = [
    "h_VE64GXjQQ",
    "jQ73d68HQCs",
    "vgeyctb6r50"
    
  ];
  return videos[index];
}


pasosBallet = JSON.parse(localStorage.getItem("pasosBallet")) || [];


mostrarUsuariosLogueados();


mostrarResultado();


if (pasosBallet.length > 0) {
  mostrarVideo(pasosBallet.length - 1);
}
