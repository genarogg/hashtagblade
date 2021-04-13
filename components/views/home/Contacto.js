import React from "react";
import Image from "next/image";
const Contacto = () => {
    const data = {
        lugar: "364 Delaware Avenue Massapequa Park, NY 11762",
        correo: "example@gmail.com",
        telefono: "+00 0000 000 0000",
        imgLogo: "/general/logo-tagBlade.png"
    }
  return (
    <div className="precios row col-xs-12  top-xs center-xs">
      <div className="col-xs-12 heading-block-home">
        <h2 className="title">Contacto</h2>
      </div>
      <div className="recentsCards" id="recentsCards">
        <div className="row col-xs-12 center-xs  around-xs cardSpace">
          <div className="col-xs-4 around-xs">
            <p>Lugar: {data.lugar}</p>
            <br/>
            <p>Telefono: {data.telefono}</p>
            <br/>
            <p>Correo:  {data.correo}</p>
          </div>
          <div className="col-xs-4 around-xs">
            <Image
              src={data.imgLogo}
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
