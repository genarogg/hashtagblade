import React from "react";
import CardAnadirColeccion from "../../general/dashboard/card/CardAnadirColeccion";
import CardCollection from "../../general/dashboard/card/CardCollection";

const Collectiones = () => {
  return (
    <>
      <div className="collectionContainer">
        <div className="headerCollectiones row">
          <div className="col-xs-5 titulo">
            <h4>Sus Colecciones</h4>
          </div>
          <div className="col-xs-5 button">
            <button>
              <span>+</span>Crear Colección
            </button>
          </div>
        </div>
        <div className="cardCollections" id="cardCollections">
          <div className="row col-xs-12 center-xs  between-xs cardSpace">
            <CardCollection />
            <CardCollection />
            <CardAnadirColeccion />
          </div>
        </div>
      </div>
    </>
  );
};

export default Collectiones;
