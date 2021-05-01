import React from "react";
import $ from "../nano/$";
import Icono from "../nano/Icono";

const SelectCountry = () => {
  const dropdown = () => {
    $("dropdown-list2").style.height = "74px"
    $("dropdown-list2").style.overflow = "hidden"
    $("dropdown2").classList.toggle("active");

  };

  const replaceText = (id2) => {
    const id = id2;

    $("selLabel2").value = $(id).getAttribute("value");
    $("selLabel2").innerHTML =
      `<span class="ico icon-intersex" id="" role="img" aria-label="sheep"></span>` +
      $(id).getAttribute("name");
    $("dropdown2").classList.toggle("active");
  };

  return (
    <div className="dropdown" id="dropdown2">
      <span
        className="selLabel"
        id="selLabel2"
        onClick={() => {
          dropdown();
        }}
      >
        <Icono css="icon-intersex" />
        Seleccionar sexo
      </span>
      <input type="hidden" name="cd-dropdown" />
      <ul className="dropdown-list" id="dropdown-list2">
        <li
          id="man"
          onClick={() => {
            replaceText("man");
          }}
          value="man"
          name="hombre"
        >
          <span>Hombre</span>
        </li>
        <li
          id="woman"
          onClick={() => {
            replaceText("woman");
          }}
          value="woman"
          name="mujer"
        >
          <span>Mujer</span>
        </li>
      </ul>
    </div>
  );
};

export default SelectCountry;
