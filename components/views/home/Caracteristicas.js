import React from "react";

const Caracteristicas = () => {
  const caracteristica = () => {
    return (
      <div className="col-xs-10 caract ">
        <p>hola</p>
      </div>
    );
  };

  return (
    <>
      <div className="col-xs-12 heading-block-home">
        <h2 className="title">Caracteristicas</h2>
      </div>

      <div className="row col-xs-12 caractSpace centerXY">
        {caracteristica()}
        {caracteristica()}
        {caracteristica()}
        {caracteristica()}
      </div>
    </>
  );
};

export default Caracteristicas;
