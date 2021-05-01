import React, { useState } from "react";
import A from "../nano/A";
import Buttons from "./Buttons";
import $ from "../nano/$";
import Icono from "../nano/Icono";
import RedesLogin from "./RedesLogin";
import SelectCountry from "./SelectCountry";
import SelectSex from "./SelectSex";

const Register = () => {
  const focus = () => {
    const focusClass = "activefocus";
    const activo = document.activeElement.id;

    const addClass = () => {
      return document.activeElement.parentNode.classList.add(`${focusClass}`);
    };

    const removeClass = (id) => {
      return $(`${id}`).parentNode.classList.remove(`${focusClass}`);
    };

    if (activo === "registerUserName") {
      addClass();
    } else {
      removeClass("registerUserName");
    }

    if (activo === "registerCorreo") {
      addClass();
    } else {
      removeClass("registerCorreo");
    }

    if (activo === "registerPassword") {
      addClass();
    } else {
      removeClass("registerPassword");
    }

    if (activo === "registerPasswordConfirm") {
      addClass();
    } else {
      removeClass("registerPasswordConfirm");
    }

    if (activo === "front") {
      /* removeClass("registerNombre"); */
      removeClass("registerUserName");
      removeClass("registerCorreo");
      removeClass("registerPassword");
      removeClass("registerPasswordConfirm");
    }
  };

  return (
    <div /*  */
      className="backRight formGroupSesion col-xs-5 "
      id="traseraDerecha"
      onClick={() => {
        focus();
      }}
    >
      {/* Botone de iniciar secion y registrar */}
      <Buttons />

      <form className="row">
        <br />
        {/* Input del Primer nombre */}
        <div className="row col-xs-12 containerInput">
          <label htmlFor="registerUserName" className="icoBackground col-xs-1">
            <Icono css="icon-person_add_alt_1" />
          </label>
          <input
            type="text"
            placeholder="Primer Nombre"
            maxLength="15"
            id="registerUserName"
            name="registerUserName"
            className="col-xs-11"
            onClick={() => {
              focus();
            }}
          />
        </div>
        <br />
        {/* Input del Primer apellido */}

        <div className="row col-xs-12 containerInput">
          <label
            htmlFor="registerUserSurName"
            className="icoBackground col-xs-1"
          >
            <Icono css="icon-person_add_alt_1" />
          </label>
          <input
            type="text"
            placeholder="Primer Apellido"
            maxLength="15"
            id="registerUserSurName"
            name="registerUserSurName"
            className="col-xs-11"
            onClick={() => {
              focus();
            }}
          />
        </div>
        <br />
        <SelectSex />

        <br />
        {/* Input de fecha de nacimiento */}
        <div className="row col-xs-12 containerInput">
          <label htmlFor="userData" className="icoBackground col-xs-1">
           
            <Icono css="icon-calendar"/>
          </label>
          <input
            type="date"
            placeholder="data"
            maxLength="15"
            id="userData"
            name="userData"
            className="col-xs-11"
            onClick={() => {
              focus();
            }}
          />
        </div>
        <br />

        {/* Input de country */}
        <SelectCountry />
        <div className="row col-xs-12 containerInput">
          <label htmlFor="registerCorreo" className="icoBackground col-xs-1">
            <span className="ico icon-mail"></span>
          </label>
          <input
            type="email"
            placeholder="Correo"
            name="registerCorreo"
            id="registerCorreo"
            className="col-xs-11"
          />
        </div>
        <br />
        {/* Input de password */}
        <div className="row col-xs-12 containerInput">
          <label htmlFor="registerPassword" className="icoBackground col-xs-1">
            <span className="ico icon-https"></span>
          </label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
            placeholder="Contraseña"
            className="col-xs-11"
          />
        </div>
        <br />
        {/* Input de password 2 */}
        <div className="row col-xs-12 containerInput">
          <label
            htmlFor="registerPasswordConfirm"
            className="icoBackground col-xs-1"
          >
            <span className="ico icon-enhanced_encryption"></span>
          </label>
          <input
            type="password"
            name="registerPasswordConfirm"
            id="registerPasswordConfirm"
            placeholder="Confirmar contraseña"
            className="col-xs-11"
          />
        </div>

        <RedesLogin />

        <div className="containerRegister">
          <button
            className="registerButtom submit"
            type="submit"
            value="Enviar"
            name="registerButtom"
            id="registerButtom"
          >
            Crear cuenta
          </button>
        </div>
      </form>
      <div className="legal">
        <p>
          Al registrarte, estas aceptando los{" "}
          <A href={"/terminos-y-condiciones"}>Términos y condiciones</A>, y la
          <A href="/politica-de-privacidad-y-protección-de-datos">
            Política de privacidad y protección de datos
          </A>
          de TagBlade.
        </p>
      </div>
    </div>
  );
};

export default Register;
