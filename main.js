let numeroPasos = 0;
let contadorPasos = 0;
let velocidad = "";
let brazosArriba = false;
let auxiliar = 0;
let resultados = [];

const pasosBallet = [
  { nombre: "Plié", velocidad: "normal", brazos: "Primera" },
  { nombre: "Grand Plié", velocidad: "lenta", brazos: "Quinta" },
  { nombre: "Relevé", velocidad: "normal", brazos: "Primera" },
  { nombre: "Pirueta", velocidad: "rápida", brazos: "Quinta" },
  { nombre: "Passe", velocidad: "rápida", brazos: "Quinta" },
  { nombre: "Tour", velocidad: "rápida", brazos: "Primera" },
  { nombre: "Sissone", velocidad: "media", brazos: "Tercera" },
];

function ejecutarPaso(paso) {
  console.log(paso);
  alert(`Realizando ${paso.nombre}...\n${paso.nombre} ${paso.velocidad} con brazos en ${paso.brazos}`);
  resultados.push({ ...paso });
}

function seleccionarPasoAlAzar() {
  const indiceAleatorio = Math.floor(Math.random() * pasosBallet.length);
  return pasosBallet[indiceAleatorio];
}

function mostrarVideoDelDia() {
  const enlaceVideo = "https://youtu.be/5J9la3Dp9uU";
  console.log("Video del día:", enlaceVideo);
}

function realizarDanza() {
  numeroPasos = parseInt(prompt("Ingrese el número de pasos:"));
  velocidad = prompt("Ingrese la velocidad (normal/rápida/lenta):");
  brazosArriba = confirm("¿Los brazos están arriba?");

  contadorPasos = 0;
  auxiliar = 0;
  resultados = [];

  if (!isNaN(numeroPasos) && numeroPasos > 0) {
    while (contadorPasos < numeroPasos) {
      contadorPasos++;

      const pasoActual = pasosBallet[auxiliar % pasosBallet.length];
      ejecutarPaso(pasoActual);

      auxiliar++;

      if (auxiliar === 10) {
        velocidad = "lenta";
      }

      if (auxiliar === 15) {
        brazosArriba = false;
      }
    }

    console.log("Lista de resultados:");
    for (let i = 0; i < resultados.length; i++) {
      console.log(`- ${resultados[i].nombre} ${resultados[i].velocidad} con brazos en ${resultados[i].brazos}`);
    }

    console.table(resultados);

    const pasoPreferido = seleccionarPasoAlAzar();
    console.log("Paso preferido del día:", pasoPreferido);

    mostrarVideoDelDia();

    alert("Danza completada. Revisa la consola para ver los resultados.");
  } else {
    console.log("El número de pasos ingresado no es válido.");
    alert("El número de pasos ingresado no es válido.");
  }
}

function iniciarDanza() {
  if (confirm("¿Deseas iniciar la danza?")) {
    realizarDanza();
  }
}

iniciarDanza();
