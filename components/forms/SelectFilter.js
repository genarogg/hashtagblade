import React from "react";
import $ from "../nano/$";
import Icono from "../nano/Icono";
/* import FiltrarPor from "../views/search/filtros/Demo"; */

const SelectFilter = (props) => {
  const dropdown = () => {
    $("dropdownFilter").classList.toggle("active");
  };

  const display = (id) => {
    $(id).classList.toggle("display");
  };

  return (
    <div className="dropdown filter" id="dropdownFilter">
      <span
        className="selLabel"
        id="selLabel"
        onClick={() => {
          dropdown();
        }}
      >
        <Icono css="icon-sphere" />
        Seleccione su pais
      </span>
      <input type="hidden" name="cd-dropdown" />
      <ul className="dropdown-list" id="dropdown-list5">
        <li
          onClick={() => {
            display("likes");
          }}
        >
          <button>
            <span></span>Likes Promedio
          </button>
        </li>
        <li
          onClick={() => {
            display("FiltroDAPC");
          }}
        >
          <button>
            <span></span>DAPC
          </button>
        </li>
        <li
          onClick={() => {
            display("FiltroCantidadPost");
          }}
        >
          <button>
            <span></span>Cantidad de Post
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SelectFilter;
