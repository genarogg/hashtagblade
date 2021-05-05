import React from "react";
import $ from "../../nano/$";
import Icono from "../../nano/Icono";

const DatoTabla = ({ idCheck = "" }) => {
  const check = () => {
    $(idCheck).classList.toggle("display");

    /*  */

    const checkInterno = document.querySelectorAll(
      ".tablaHash .datoTabla .checkInterno"
    );

    const numeroCheckInterno = document.querySelectorAll(
      ".tablaHash .datoTabla .display"
    );

    const log = checkInterno.length;
    const log2 = numeroCheckInterno.length;

    for (let i = 0; i < log; i++) {
      let booleano = $(checkInterno[i].id).classList.contains("display");

      if (!booleano) {
        $("checkInterno").classList.remove("display");
      }

      if (log === log2) {
        $("checkInterno").classList.add("display");
      }
    }
  };

  return (
    <>
      <div className="row datoTabla col-xs-12">
        <div className="tituloDato col-xs-12 row">
          <div className="dato-name col-xs-3 row">
            <div className="col-xs-1">
              <buttom
                className="checkExterno centerXY"
                onClick={() => {
                  check();
                }}
                id="checkExterno"
              >
                <div className="checkInterno" id={idCheck}></div>
              </buttom>
            </div>
            <div className="col-xs-7">
              <p>#Hashtag</p>
            </div>
            <div className="col-xs-3 row">
              <div className="col-xs-6">
                <Icono css="icon-search" />
              </div>
              <div className="col-xs-6">
                <Icono css="icon-search" />
              </div>
            </div>
          </div>
          <div className="col-xs-2 dato-competitionScore">
            <div className="canvas">
              <div className="porcentajeCanvas"></div>
            </div>
          </div>
          <div className="col-xs-2 dato-potentialReach">
            <div className="canvas">
              <div className="porcentajeCanvas"></div>
            </div>
          </div>
          <div className="col-xs-1 dato-dapc">
            <p>328</p>
          </div>
          <div className="col-xs-1 dato-likes">
            <p>3.9k</p>
          </div>
          <div className="col-xs-1 dato-posts">
            <p>228k</p>
          </div>
          <div className="col-xs-2 dato-Comments">
            <p>52</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatoTabla;
