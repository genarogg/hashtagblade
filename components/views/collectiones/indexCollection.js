import React from "react";

import Toolbard from "../../general/dashboard/Toolbard";
import TableHashtag from "../search/TableHashtag";
import DatoTabla from "../search/DatoTabla";

import Icono from "../../nano/Icono";

const IndexCollection = () => {
  return (
    <>
      <main className="dashboarMain coleccion">
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>
        <div className="dashboard">
          <Toolbard />

          <div className="headerSearch">
            <h3 className="numero">Numero de datos en la coleccion</h3>
          </div>
          <div className="continerFiltro  row between-xs">
            <div className="col-xs-3">
              <h3 className="nombre">
                <Icono css="icon-star" /> nombre de la coleccion
              </h3>
            </div>
            <div className="col-xs-9 row centerElement ">
              <div className="sugeridos">
                <button>
                  <Icono css="icon-format_list_bulleted" />
                  sugeridos
                </button>
              </div>
              <div className="copiarColeccion">
                <button>
                  <Icono css="icon-file_copy" />
                  copiar coleccion
                </button>
              </div>
              <div className="menu">
                <button>...</button>
              </div>
            </div>
          </div>
          <div className="row tablaHash">
            <TableHashtag />
            <div className="containerDatos row">
              <DatoTabla idCheck={"holsdafa2"} />
              <DatoTabla idCheck={"holafsda3"} />
              <DatoTabla idCheck={"holsadfa4"} />
              <DatoTabla idCheck={"holasdfa1"} />
              <DatoTabla idCheck={"holadsfa5"} />
              <DatoTabla idCheck={"holasdfa6"} />
              <DatoTabla idCheck={"holadsfa7"} />
              

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexCollection;
