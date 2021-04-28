import React from "react";
import Precio from "./Precio";
import Caracteristicas from "./Caracteristicas";
import Contacto from "./Contacto";

const HomeDashboard = () => {
  return (
    <>
      <div className="content row col-xs-12" id="content">
        <div className="habilidades col-xs-12 row ">
          <div className="row col-xs-12 centerXY top">
            <div className="col-xs-4 card">
              <h4>Hashtag Search</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deserunt voluptas minima ut, quaerat aspernatur voluptatem esse quis eligendi.</p>
            </div>
            <div className="col-xs-4 card">
              <h4>Hashtag Collections</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deserunt voluptas minima ut, quaerat aspernatur voluptatem esse quis eligendi.</p>
            </div>
          </div>
          <div className="row col-xs-12 centerXY bottom">
            <div className="col-xs-4 card">
              <h4>Store & Manage hashtags</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deserunt voluptas minima ut, quaerat aspernatur voluptatem esse quis eligendi.</p>
            </div>
            <div className="col-xs-4 card">
              <h4>Average Best Rank</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deserunt voluptas minima ut, quaerat aspernatur voluptatem esse quis eligendi.</p>
            </div>
          </div>
        </div>
        <Precio />
        <Caracteristicas />
        <Contacto />
      </div>
    </>
  );
};

export default HomeDashboard;
