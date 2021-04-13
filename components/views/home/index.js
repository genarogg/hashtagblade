import React from "react";

import Register from "../../forms/Register";
import Login from "../../forms/Login";
import ResetPassword from "../../forms/ResetPassword";
import HomeDashboard from "./HomeDashboard";

import data from "../../../data/home";

const Home = () => {
  return (
    <>
      <main>
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>
        <div className="containerSesion row between-md center-xs">
          <div className="welcome row col-xs-12 col-sm-6  col-lg-4 center-xs">
            <h1>{data().bienvenida}</h1>
            <h3>{data().subBienvenida}</h3>
            <div className="text">
              <p>{data().descripcion}</p>
            </div>
          </div>
          <div className="containerForm  " id="containerRegisterLogin">
            <ResetPassword />
            <Login />
            <Register />
          </div>
        </div>
        <HomeDashboard />
      </main>
    </>
  );
};

export default Home;
