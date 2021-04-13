import React from "react";
import Precio from "./Precio";
import Caracteristicas from "./Caracteristicas";
import Contacto from "./Contacto";

const HomeDashboard = () => {
  return (
    <>
      <div className="content row col-xs-12" id="content">
        <Precio />
        <Caracteristicas />
        <Contacto />
      </div>
    </>
  );
};

export default HomeDashboard;
