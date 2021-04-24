import React from "react";
import A from "../../nano/A";

const CardPrecios = ({
  id = "",
  auxiliarClass = "",
  textPrecio,
  titleR,
  contenidoR,
  enlaceR,
}) => {
  return (
    <div id={id} className={`card col-sm-4 col-xs-12 ${auxiliarClass}`}>
      <p className="textImg centerXY"><span className="dolar">$</span>{textPrecio}<span className="mes">/mes</span></p>

      {/* Cambiar a h2 */}
      <h4>{titleR}</h4>
      <p className="texto">{contenidoR}</p>
      <div className="seeMore">
        <A to={enlaceR}>Adquirir</A>
      </div>
    </div>
  );
};

export default CardPrecios;
