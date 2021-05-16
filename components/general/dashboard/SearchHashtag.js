import React, { useEffect } from "react";
import Icono from "../../nano/Icono";
import data from "../../../data/dashboard/fakeDataTAG";
import $ from "../../nano/$";
import {$fadeOut} from "../../nano/$";


const SearchHashtag = () => {
  const datos = data();
  

  const filter = () => {
    
    
    
    $("backgroundInput").style.display = "block";
    let filtrado;
    let texto = $("inputTagFilter").value.toLowerCase();
    let arregloNew = [];
    let contNew = 0;
    const length1 = datos.length;

    for (let i = 0; i < length1; i++) {
      let nombre = datos[i].toLowerCase();
      filtrado = nombre.indexOf(texto) !== -1;

      if (filtrado) {
        arregloNew[contNew++] = nombre;
      }
    }

    if (texto === "") {
      limpiarInput();
      return;
    }
    if (texto !== "") {
      $("containerList").style.opacity = "1";
      $("containerList").style.top = "120%";
    }

    if (true) {
      for (let i = 0; i < arregloNew.length; i++) {
        if (i === 0) {
          $("filterUl").innerHTML = "";
        }
        $("filterUl").innerHTML += `<li id=${"search" + i}><p>${
          arregloNew[i]
        }</p></li>`;
      }
    }
    listenerSearch();
  };

  const listenerSearch = () => {
    const arregloli = document.querySelectorAll("#filterUl li");

    let leng = arregloli.length;

    for (let i = 0; i < leng; i++) {
      $(arregloli[i].id).addEventListener("click", () => {
        $("inputTagFilter").value = "";
        /* introduce el valor en el localstarage */
        guardarEnlocalStorage($(arregloli[i].id).textContent);

        limpiarInput();
      });
    }

    /* cerrar el panel de li */
  };

  const listLocalStore = () => {
    crearArregloRecentSerchSiNoExiste();
    try {
      let localStor = localStorage.getItem("recentSerch").split(",").reverse();
      /*  localStorage.setItem("recentSerch",) */
      $("filterLocal").innerHTML = "";
      for (let i = 0; i <= 4; i++) {
        $("filterLocal").innerHTML += `<li id=${"local" + i}><p>${
          localStor[i]
        }</p></li>`;
      }

      const arregloli = document.querySelectorAll("#filterLocal li");
      let leng = arregloli.length;

      for (let i = 0; i < leng; i++) {
        $(arregloli[i].id).addEventListener("click", () => {
          limpiarInput();
        });
      }
    } catch (error) {}
  };
  /* Guarda los valores del input en el local storage
   *     resive como argumento el valor que este en el input
   */
  const guardarEnlocalStorage = (valor) => {
    let arregloLocalStorage = [];
    arregloLocalStorage = localStorage.getItem("recentSerch").split(",");
    arregloLocalStorage.push(valor);
    localStorage.setItem("recentSerch", arregloLocalStorage);
    valorABuscar();
  };

  const AceptarYMandarALocalStorage = (tecla) => {
    if (tecla.key === "Enter") {
      guardarEnlocalStorage($("inputTagFilter").value);
      limpiarInput();
    }
  };

  const focusInput = () => {
    if ($("inputTagFilter").value !== "") {
      guardarEnlocalStorage($("inputTagFilter").value);

      limpiarInput();
      return;
    }

    $("inputTagFilter").focus();
  };

  const limpiarInput = () => {
    $("containerList").style.opacity = "0";
    $("containerList").style.top = "-500%";
    $("filterUl").innerHTML = "";
    $("inputTagFilter").value = "";
    $("backgroundInput").style.display = "none";
  };

  /* Este sera el valor que se buscara (El hashtag que se quire buscar) */
  const valorABuscar = () => {
    let arregloLocalStorage = localStorage
      .getItem("recentSerch")
      .split(",")
      .reverse();
      sessionStorage.setItem("hashtagABuscar", arregloLocalStorage[0]);
    
  };

  const crearArregloRecentSerchSiNoExiste = () => {
    if (localStorage.getItem("recentSerch") === null) {
      localStorage.setItem("recentSerch", [
        "emprendimiento",
        "marketing",
        "negocio",
        "online",
        "empresa",
      ]);
    }
  };

  return (
    <>
      <div className="searchHashtag row between-xs">
        <input
          type="text"
          id="inputTagFilter"
          className="col-xs-10"
          placeholder="buscar hashtag"
          onChange={() => {
            filter();
          }}
          onClick={() => {
            listLocalStore();
          }}
          onKeyDown={(tecla) => {
            AceptarYMandarALocalStorage(tecla);
          }}
        />
        <label
          className="col-xs-2 centerXY"
          htmlFor="#"
          onClick={() => {
            focusInput();
          }}
        >
          <Icono css="icon-search" />
        </label>
        <ul className="containerList" id="containerList">
          <ul className="filterUl" id="filterUl"></ul>
          <ul className="filterLocal" id="filterLocal"></ul>
        </ul>
        <div
          className="backgroundInput"
          id="backgroundInput"
          onClick={() => {
            limpiarInput();
          }}
        ></div>
      </div>
    </>
  );
};

export default SearchHashtag;
