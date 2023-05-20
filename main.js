let numeroPasos = prompt("Ingrese el número de pasos:");
let contadorPasos = 0;
let velocidad = prompt("Ingrese la velocidad (rápida/lenta):");
let brazosArriba = confirm("¿Los brazos están Arriba?");
let auxiliar = 0;


function plié() {
  switch (velocidad) {
    case "rápida":
      console.log("Plié rápido");
      break;
    case "lenta":
      console.log("Plié lento");
      break;
    default:
      console.log("Grand Plié");
      break;
  }
  alert("Realizando plié...");
}


function plié(velocidad, brazosArriba) {
    let mensaje = "";
    switch (velocidad) {
      case "rápida":
        mensaje = "Plié rápido";
        break;
      case "lenta":
        mensaje = "Grand Plié";
        break;
      default:
        mensaje = "Plié";
        break;
    }
    if (brazosArriba) {
      mensaje += " con brazos en Quinta";
    } else {
      mensaje += " con brazos en Primera";
    }
    console.log(mensaje);
    alert(`Realizando plié...\n${mensaje}`);
    return mensaje;
  }
  
  function relevé(brazosArriba) {
    let mensaje = "";
    if (brazosArriba) {
      mensaje = "Relevé con brazos en Quinta";
    } else {
      mensaje = "Relevé con brazos en Primera";
    }
    console.log(mensaje);
    alert(`Realizando relevé...\n${mensaje}`);
    return mensaje;
  }
  

  function pirueta(velocidad, brazosArriba) {
    let mensaje = "";
    switch (velocidad) {
      case "rápida":
        mensaje = "Pirueta rápida";
        break;
      case "lenta":
        mensaje = "Pirueta lenta";
        break;
      default:
        mensaje = "Pirueta";
        break;
    }
    if (brazosArriba) {
      mensaje += " con brazos en Quinta";
    } else {
      mensaje += " con brazos en Primera";
    }
    console.log(mensaje);
    alert(`Realizando pirueta...\n${mensaje}`);
    return mensaje;
  }
  
  


if (!isNaN(numeroPasos) && numeroPasos > 0) {

  while (contadorPasos < numeroPasos) {
    contadorPasos++;

    if (auxiliar % 3 === 0 && auxiliar % 5 === 0) {
        pirueta(velocidad, brazosArriba);
      } else if (auxiliar % 3 === 0) {
        plié(velocidad, brazosArriba);
      } else if (auxiliar % 5 === 0) {
        relevé(brazosArriba);
      } else {
        console.log("Primer Port de Bras");
        alert("Realizando Primer Port de Bras...");
      }

    auxiliar++;

    if (auxiliar === 10) {
      velocidad = "lenta";
    }

    if (auxiliar === 15) {
      brazosArriba = false;
    }
  }
} else {
  console.log("El número de pasos ingresado no es válido.");
  alert("El número de pasos ingresado no es válido.");
}
