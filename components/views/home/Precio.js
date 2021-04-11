import React from "react";
import CardPrecios from "./cardPrecios/CardPecios";

const Precio = () => {
  const data = {
    titleR1: "básico",
    contenidoR1:
      "For teams learning MongoDB or developing small applications. Get 512MB storage free and scale up to 5GB.",
    titleR2: "Community Manager",
    contenidoR2:
      "For teams building applications that need advanced development or production-ready environments.",
    titleR3: "Agencia",
    contenidoR3:
      "For teams developing world-class applications that require multi-region resiliency or ultra-low latency access.",
  };
  return (
    <div className="precios row col-xs-12  top-xs center-xs">
       <div className="col-xs-12 heading-block-home">
        <h2 className="tittle">Precios</h2>
      </div>
      <div className="recentsCards" id="recentsCards">
        <div className="row col-xs-12 center-xs  around-xs cardSpace">
          <CardPrecios
            id="precio1"
            textPrecio={"5$"}
            titleR={data.titleR1}
            contenidoR={data.contenidoR1}
            enlaceR={"/"}
          />
          <CardPrecios
            id="precio2"
            auxiliarClass={"cardSenuelo"}
            textPrecio={"10$"}
            titleR={data.titleR2}
            contenidoR={data.contenidoR2}
            enlaceR={"/"}
          />
          <CardPrecios
            id="precio3"
            textPrecio={"15$"}
            titleR={data.titleR3}
            contenidoR={data.contenidoR3}
            enlaceR={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Precio;
