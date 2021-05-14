import React from "react";

import Toolbard from "../../general/dashboard/Toolbard";
import SearchHashtag from "../../general/dashboard/SearchHashtag";
import TableHashtag from "./TableHashtag";
import DatoTabla from "./DatoTabla";
import Filtro from "./Filtro";
import FiltrarPor from "./FiltrarPor";
import data from "../../../data/dashboard/fakeData";
const IndexSearch = () => {
  const datos = data();

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
            
              {<DatoTabla
                id={datos[1].id}
                tagBoss={datos[1].tagBoss}
                dapc={datos[1].dapc}
                postsMade={datos[1].postsMade}
                hashtag={datos[1].hashtag}
                img={datos[1].img}
                likes={datos[1].likes}
                comments={datos[1].comments} 

              />}
             
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexSearch;
