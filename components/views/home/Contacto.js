import React from "react";
import Image from "next/image";

import data from "../../../data/home/contacto";

const Contacto = () => {
  return (
    <div className="contacto row col-xs-12  top-xs center-xs" id="contacto">
      <div className="col-xs-12 heading-block-home">
        <h2 className="title">Contacto</h2>
      </div>
      <div className="datosContato" id="datosContato">
        <div className="row col-xs-12 center-xs  around-xs contactoSpace">
          <div className="col-xs-4 datos">
            <p>Lugar: {data().lugar}</p>
            <br />
            <p>Telefono: {data().telefono}</p>
            <br />
            <p>Correo: {data().correo}</p>
          </div>
          <div className="col-xs-4  logo">
            <Image
              src={data().imgLogo}
              width={100}
              height={100}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
