import React from "react";
import HomeDashboard from "./HomeDashboard";
import Register from "../../forms/Register";
import Login from "../../forms/Login";
import ResetPassword from "../../forms/ResetPassword";

const HomeLogin = () => {
  return (
    <>
      <main>
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>
        <div className="containerSesion row between-md center-xs">
          <div className="welcome row col-xs-12 col-sm-6  col-lg-4 center-xs">
            <h1>Bienvenido a TagBlade </h1>
            <h3>¡Busca, maneja y analiza Instagram hashtags con TagBlade!</h3>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                quis, in dolor dignissimos fuga, numquam eveniet ut corrupti
                ipsa possimus molestiae quo eligendi quia officia aperiam ullam
                repellat incidunt distinctio.
              </p>
            </div>
          </div>
          <div className="containerForm  " id="containerRegisterLogin">
            <ResetPassword />
            <Login />
            <Register />
          </div>
        </div>
        {/* <HomeDashboard /> */}
      </main>
    </>
  );
};

export default HomeLogin;
