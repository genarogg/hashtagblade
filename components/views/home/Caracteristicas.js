import React from "react";
import CardCaracteristicas from "./Card/CardCaracteristicas";
import data from "../../../data/caracteristicas";

const Caracteristicas = () => {
  return (
    <>
      <div className="col-xs-12 heading-block-home">
        <h2 className="title">Caracteristicas</h2>
      </div>

      <div className="row col-xs-12 caractSpace centerXY">
        <CardCaracteristicas
          nombre={data().basico.title}
          numeroDeCuentas={data().basico.numeroDeCuentas}
          seguimientoHashtag={data().basico.seguimientoHashtag}
          numeroColecciones={data().basico.numeroColecciones}
          plan={data().basico.plan}
        />
        <CardCaracteristicas
          nombre={data().manager.title}
          numeroDeCuentas={data().manager.numeroDeCuentas}
          seguimientoHashtag={data().manager.seguimientoHashtag}
          numeroColecciones={data().manager.numeroColecciones}
          plan={data().manager.plan}
        />
        <CardCaracteristicas
          nombre={data().agencia.title}
          numeroDeCuentas={data().agencia.numeroDeCuentas}
          seguimientoHashtag={data().agencia.seguimientoHashtag}
          numeroColecciones={data().agencia.numeroColecciones}
          plan={data().agencia.plan}
        />
      </div>
    </>
  );
};

export default Caracteristicas;
