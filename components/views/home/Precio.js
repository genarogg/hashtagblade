import React from "react";
import CardPrecios from "./Card/CardPecios";
import data from "../../../data/home/precios"

const Precio = () => {
  
  return (
    <div className="precios row col-xs-12  top-xs center-xs" id="precios">
      <div className="col-xs-12 heading-block-home">
        <h2 className="title">Precios</h2>
      </div>
      <div className="CardPrecios" id="CardPrecios">
        <div className="row col-xs-12 center-xs  around-xs cardSpace">
          <CardPrecios
            id="precio1"
            auxiliarClass={""}
            textPrecio={"5"}
            titleR={data().titleR1}
            contenidoR={data().contenidoR1}
            enlaceR={"/"}
          />
          <CardPrecios
            id="precio2"
            auxiliarClass={"cardSenuelo "}
            textPrecio={"9"}
            titleR={data().titleR2}
            contenidoR={data().contenidoR2}
            enlaceR={"/"}
          />
          <CardPrecios
            id="precio3"
            auxiliarClass={"dosCifras"}
            textPrecio={"21"}
            titleR={data().titleR3}
            contenidoR={data().contenidoR3}
            enlaceR={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Precio;
