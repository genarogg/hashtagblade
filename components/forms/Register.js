import React, { useState } from "react";
import { useRouter } from "next/router";
import A from "../nano/A";
import Buttons from "./Buttons";
import $ from "../nano/$";
import Icono from "../nano/Icono";
import RedesLogin from "./RedesLogin";
import SelectCountry from "./SelectCountry";
import SelectSex from "./SelectSex";

const Register = () => {
  const [sex, setSex] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState({ exist: false, message: "" });
  const router = useRouter();

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

  const changeSex = (sex) => {
    setSex(sex);
  };

  const changeCountry = (country) => {
    setCountry(country);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      registerUserName,
      registerUserSurName,
      userData,
      registerCorreo,
      registerPassword,
      registerPasswordConfirm,
    } = e.currentTarget;

    if (
      registerUserName.value === "" ||
      registerUserSurName.value === "" ||
      userData.value === "" ||
      registerCorreo.value === "" ||
      registerPassword.value === "" ||
      !sex ||
      !country
    ) {
      setError({
        exist: true,
        message: "Completa todos los campos",
      });
      return;
    }

    if (
      !registerCorreo.value.includes("@") ||
      !registerCorreo.value.includes(".com")
    ) {
      setError({
        exist: true,
        message: "Ingresa un correo valido",
      });
      return;
    }

    if (registerPassword.value.length < 8) {
      setError({
        exist: true,
        message: "La contreaseña tiene que tener al menos 8 caracteres",
      });
      return;
    }

    if (registerPassword.value !== registerPasswordConfirm.value) {
      setError({
        exist: true,
        message: "Contraseñas desiguales",
      });
      return;
    }

    fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerCorreo.value,
        password: registerPassword.value,
        first_name: registerUserName.value,
        last_name: registerUserSurName.value,
        country: country,
        gender: sex,
        birthdate: userData.value,
      }),
    })
      .then((data) => data.json())
      .then(({ token, error }) => {
        if (error) {
          setError({
            exist: true,
            message: error,
          });
          return;
        }

        localStorage.setItem("token", `Bearer ${token}`);
        router.reload();
      });
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

      <form className="row" onSubmit={handleSubmit}>
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
        <SelectSex setSex={changeSex} />

        <br />
        {/* Input de fecha de nacimiento */}
        <div className="row col-xs-12 containerInput">
          <label htmlFor="userData" className="icoBackground col-xs-1">
            <Icono css="icon-calendar" />
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
        <SelectCountry setCountry={changeCountry} />
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

        {error.exist && (
          <p
            style={{
              width: "100%",
              background: "red",
              borderRadius: 10,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {error.message}
          </p>
        )}
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
