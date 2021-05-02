import React from "react";
import Icono from "../../../nano/Icono";
const cardCollection = () => {
  return (
    <div className="row estadistica col-sm-4 col-xs-12">
      <div className="titulo col-xs-9">
        <h4>Recientemente Rankeado</h4>
      </div>
      <div className="icono col-xs-3">
        <Icono css="icon-mail" />
      </div>
      <div className="col-xs-12 content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quis
          obcaecati nesciunt ad. Perferendis, ut minima deleniti
        </p>
      </div>
    </div>
  );
};

export default cardCollection;
