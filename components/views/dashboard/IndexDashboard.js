import React from "react";

import Toolbard from "../../general/dashboard/Toolbard";
import SearchHashtag from "../../general/dashboard/SearchHashtag";
import Filter from "../../general/dashboard/Filter";

import Cardestadisticas from "../../general/dashboard/card/Cardestadisticas";

import Collectiones from "./Collectiones";
const IndexDashboard = () => {
  return (
    <>
      <main className="dashboarMain">
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>

        <div className="dashboard">
          <Toolbard />
          <div className="headerSearch">
            <SearchHashtag />
            <Filter />
          </div>

          <div className="cardStadisticas" id="cardStadisticas">
            <div className="row col-xs-12 center-xs  between-xs cardSpace">
              <Cardestadisticas />
              <Cardestadisticas />
              <Cardestadisticas />
            </div>
          </div>

          <Collectiones />
        </div>
      </main>
    </>
  );
};

export default IndexDashboard;
