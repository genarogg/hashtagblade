import React from "react";
import Precio from "./Precio";
import Caracteristicas from "./Caracteristicas";
import Contacto from "./Contacto";
import data from "../../../data/home/homeDashboard";

const HomeDashboard = () => {
  return (
    <>
      <div className="content row col-xs-12" id="content">
        <div className="habilidades col-xs-12 row ">
          <div className="row col-xs-12 centerXY top">
            <div className="col-xs-4 card" id="cardHome1">
              <h4>{data().card1.titulo}</h4>
              <p>{data().card1.descripcion}</p>
            </div>
            <div className="col-xs-4 card" id="cardHome2">
              <h4>{data().card2.titulo}</h4>
              <p>{data().card2.descripcion}</p>
            </div>
          </div>
          <div className="row col-xs-12 centerXY bottom">
            <div className="col-xs-4 card" id="cardHome3">
              <h4>{data().card3.titulo}</h4>
              <p>{data().card3.descripcion}</p>
            </div>
            <div className="col-xs-4 card" id="cardHome4">
              <h4>{data().card4.titulo}</h4>
              <p>{data().card4.descripcion}</p>
            </div>
          </div>
        </div>
        <Precio />
        <Caracteristicas />
        <Contacto />
      </div>
    </>
  );
};

export default HomeDashboard;
