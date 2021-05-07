import React from "react";

import Toolbard from "../../general/dashboard/Toolbard";
import SearchHashtag from "../../general/dashboard/SearchHashtag";
import TableHashtag from "./TableHashtag";
import DatoTabla from "./DatoTabla";
import Filtro from "./Filtro";
import FiltrarPor from "./FiltrarPor";

const IndexSearch = () => {
  return (
    <>
      <main className="dashboarMain">
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>

        <div className="dashboard">
          <Toolbard />
          <div className="headerSearch">
            <SearchHashtag />
          </div>

          <div className="continerFiltro row">
            <div className="col-xs-3">
              <Filtro />
            </div>
            <div className="col-xs-9 row centerElement around-xs">
              <FiltrarPor id="d5" />

              <FiltrarPor id="d2" />

              <FiltrarPor id="d3" />

              <FiltrarPor id="d4" />

              <FiltrarPor id="d1" />

              {/* Estos contenedores son para
                  centrar el contenido visible */}
              <div className="col-xs-3"></div>
              <div className="col-xs-3"></div>
              <div className="col-xs-3"></div>
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

export default IndexSearch;
