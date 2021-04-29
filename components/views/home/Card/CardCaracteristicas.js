import React from "react";
import { v4 as uuidv4 } from "uuid";

const CardCaracteristicas = ({
  id = "",
  auxiliarClass = "",
  nombre,
  numeroDeCuentas,
  numeroColecciones,
  plan,
}) => {
  return (
    <div id={id} className={`card col-sm-4 col-xs-12 ${auxiliarClass} `}>
      <div className="titulo centerXY">
        <h3>{nombre}</h3>
      </div>
      <h4>uso</h4>
      <p>
        <b>{numeroDeCuentas.numero}</b>
        {numeroDeCuentas.nombre}
      </p>
      <p>
        <b>{numeroColecciones.numero}</b> {numeroColecciones.nombre}
      </p>
      <h4>Funciones</h4>
      {plan.map((e) => {
        return <p key={uuidv4()}>{e}</p>;
      })}
    </div>
  );
};

export default CardCaracteristicas;
