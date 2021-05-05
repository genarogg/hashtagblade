import React from "react";
import Icono from "../../nano/Icono";
import $ from "../../nano/$";
const FiltrarPor = () => {
  const display = () => {
    $("hashtagFiltro").classList.add("display");
  };
  return (
    <>
      <div className="hashtagFiltro row around-xs" id="hashtagFiltro">
        <div className="col-xs-9 tag">
          {" "}
          <p>Hola</p>
        </div>
        <div className="col-xs-2 button">
          {" "}
          <button
            onClick={() => {
              display();
            }}
          >
            <Icono css="icon-bolt" />
          </button>
          
        </div>
      </div>
    </>
  );
};

export default FiltrarPor;
