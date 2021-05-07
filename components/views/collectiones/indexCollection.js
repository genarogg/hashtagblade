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
              <DatoTabla idCheck={"hola2"} />
              <DatoTabla idCheck={"hola3"} />
              <DatoTabla idCheck={"hola4"} />
              <DatoTabla idCheck={"hola1"} />
              <DatoTabla idCheck={"hola5"} />
              <DatoTabla idCheck={"hola6"} />
              <DatoTabla idCheck={"hola7"} />
              <DatoTabla idCheck={"hola8"} />
              <DatoTabla idCheck={"hola867"} />
              <DatoTabla idCheck={"hola56"} />
              <DatoTabla idCheck={"hola45"} />
              <DatoTabla idCheck={"hola3434"} />
              <DatoTabla idCheck={"hola65"} />
              <DatoTabla idCheck={"hola343"} />
              <DatoTabla idCheck={"hola67"} />
              <DatoTabla idCheck={"hol67a"} />
              <DatoTabla idCheck={"hola8"} />
              <DatoTabla idCheck={"hola09"} />
              <DatoTabla idCheck={"hola0"} />
              <DatoTabla idCheck={"holahj"} />
              <DatoTabla idCheck={"holadf"} />
              <DatoTabla idCheck={"holafd"} />
              <DatoTabla idCheck={"holafd"} />
              <DatoTabla idCheck={"holadf"} />
              <DatoTabla idCheck={"holadf"} />

              <DatoTabla idCheck={"hola3"} />
              <DatoTabla idCheck={"hola4"} />
              <DatoTabla idCheck={"hola1"} />
              <DatoTabla idCheck={"hola5"} />
              <DatoTabla idCheck={"hola6"} />
              <DatoTabla idCheck={"hola7"} />
              <DatoTabla idCheck={"hola8"} />
              <DatoTabla idCheck={"hola867"} />
              <DatoTabla idCheck={"hola56"} />
              <DatoTabla idCheck={"hola45"} />
              <DatoTabla idCheck={"hola3434"} />
              <DatoTabla idCheck={"hola65"} />
              <DatoTabla idCheck={"hola343"} />
              <DatoTabla idCheck={"hola67"} />
              <DatoTabla idCheck={"hol67a"} />
              <DatoTabla idCheck={"hola8"} />
              <DatoTabla idCheck={"hola09"} />
              <DatoTabla idCheck={"hola0"} />
              <DatoTabla idCheck={"holahj"} />
              <DatoTabla idCheck={"holadf"} />
              <DatoTabla idCheck={"holafd"} />
              <DatoTabla idCheck={"holafd"} />
              <DatoTabla idCheck={"holadf"} />
              <DatoTabla idCheck={"holadf"} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexCollection;
