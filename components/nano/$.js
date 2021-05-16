/* 
  Estas funciones son auxiliares.
*/

/* Obtiene el ide de un elemento */
const $ = (getId) => {
  return document.getElementById(getId);
};
export default $;

/* Obtine todos los hijos de un elemento */
const $selectorAll = (getElement) => {
  return document.querySelectorAll(getElement);
};
/* devolvera la funcion de document.getElementById().classList */
const $classList = (getId) => {
  return $(getId).classList;
};

const $style = (getId) => {
  return $(getId).style;
};

const $styleText = (getId) => {
  return $(getId).style.cssText;
};
/* La siguiente funcion esta pensada para obtener los ID de los 
  elementos de un padre y devolberla como un arreglo */
/* const $selectorAllId = (getElement) =>{} */

/* Permite retirar una clase u añade otra (al mismo elemento) */
const $alternalClass = (getId, aRemover, aAdd) => {
  const id = $classList(getId);

  /* Clase a remover */
  if (id.contains(aRemover)) {
    id.remove(aRemover);
    id.add(aAdd);
  } else {
    id.add(aRemover);
    id.remove(aAdd);
  }
};

/* Oculta los elementos del dom */
const $fadeOut = (getId) => {
  const id = $(getId);

  id.style.opacity = 1;

  (function fade() {
    if ((id.style.opacity -= 0.1) < 0) {
      id.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

/* Mostrar un elemento del dom */
const $fadeIn = (getId, display) => {
  const id = $(getId);
  id.style.opacity = 0;
  id.style.display = display || "block";

  (function fade() {
    var val = parseFloat(id.style.opacity);
    if (!((val += 0.1) > 1)) {
      id.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
/* Oculta el elemento si es visibe y lo muestra si es invisibl */
const $toogleFade = (id, display = "block") => {
  if ($(id).style.display === "none") {
    $fadeIn(id);
  } else {
    $fadeOut(id, display);
  }
};

export {
  $alternalClass,
  $fadeOut,
  $fadeIn,
  $toogleFade,
  $selectorAll,
  $classList,
  $style,
  $styleText,
};
