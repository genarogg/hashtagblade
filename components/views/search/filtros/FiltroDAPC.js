import React from "react";
import Icono from "../../../nano/Icono";
import $ from "../../../nano/$";
const FiltroDAPC = ({ id, textContent }) => {
  const display = () => {
    $(id).classList.add("display");
  };
  return (
    <>
      <div className="element col-xs-3" id={id}>
        <div className="hashtagFiltro row around-xs">
          <div className="col-xs-9 tag">
            {" "}
            <p>{textContent}</p>
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
        <div className="tooltipFilter row">
          <div className="descripcion col-xs-12 ">
          
            <p className="col-xs-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloremque, natus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltroDAPC;
