import React from "react";
import $ from "../../nano/$";
import Icono from "../../nano/Icono";
import data from "../../../data/home/country";
import { v4 as uuidv4 } from "uuid";

const Filter = () => {
  const dropdown = () => {
    $("filter").classList.toggle("active");
  };

  const replaceText = (id2) => {
    const id = $(id2).id;

    $("selLabe3").value = $(id).getAttribute("value");
    $("selLabe3").innerHTML =
      `<span class="ico icon-sphere" id="" role="img" aria-label="sheep"></span>` +
      $(id).getAttribute("name");
    $("filter").classList.toggle("active");
  };

  return (
    <div className="dropdown" id="filter">
      <span
        className="selLabel3"
        id="selLabel"
        onClick={() => {
          dropdown();
        }}
      >
        <Icono css="icon-sphere" />
        Seleccione su pais
      </span>
      <input type="hidden" name="cd-dropdown" />
      <ul className="dropdown-list" id="dropdown-list">
        {data().map((e) => {
          return (
            <li
              onClick={() => {
                replaceText(e.iso2);
              }}
              key={uuidv4()}
              value={e.iso2}
              id={e.iso2}
              name={e.name}
            >
              <span> {e.nombre}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;