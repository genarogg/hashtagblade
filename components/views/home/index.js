import React, { useEffect, useState } from "react";

import Login from "../../forms/Login";
import Register from "../../forms/Register";
import ResetPassword from "../../forms/ResetPassword";
import HomeDashboard from "./HomeDashboard";

import data from "../../../data/home/home";

const Home = () => {
  const [load, setLoad] = useState(false);
  const [existSessToken, setExistSessToken] = useState(null);
  const [existLocalToken, setExistLocalToken] = useState(null);

  useEffect(() => {
    if (localStorage.token) {
      console.log("xd");
      setExistLocalToken(true);
      setLoad(true);
    } else if (sessionStorage.token) {
      console.log("hola");
      setExistSessToken(true);
      setLoad(true);
    } else {
      setLoad(true);
    }
  }, []);

  return (
    <>
      <main>
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>
        <div
          className="containerSesion row between-md center-xs"
          id="containerSesion"
        >
          <div className="welcome row col-xs-12 col-sm-6  col-lg-4 center-xs">
            <h1>{data().bienvenida}</h1>
            <h3>{data().subBienvenida}</h3>
            <div className="text">
              <p>{data().descripcion}</p>
            </div>
          </div>
          <div className="containerForm  " id="containerRegisterLogin">
            {!load && (
              <div className="loading_screen">
                <img src="/loading-process.png" />
              </div>
            )}
            {load && !existSessToken && !existLocalToken && (
              <>
                {" "}
                <ResetPassword />
                <Login />
                <Register />{" "}
              </>
            )}
          </div>
        </div>
        <HomeDashboard />
      </main>
    </>
  );
};

export default Home;
