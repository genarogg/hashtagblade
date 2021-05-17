import React, { useState } from "react";

import A from "../nano/A";
import $ from "../nano/$";
import Icono from "../nano/Icono";

const resetPassword = () => {
  const [success, setSuccess] = useState({ exist: false, message: "" });
  const [error, setError] = useState({ exist: false, message: "" });
  const voltearIniciar = () => {
    const tarjeta = $("containerRegisterLogin");

    $("traseraDerecha").style.display = "none";
    if (
      tarjeta.classList.contains("activeRight") ||
      tarjeta.classList.contains("activeLeft")
    ) {
      tarjeta.classList.remove("activeRight");
      if (tarjeta.classList.contains("activeLeft")) {
      }
      tarjeta.classList.remove("activeLeft");
      $("buttonBack").classList.remove("active");
    }

    $("front").classList.add("tarjetaFocus");

    setTimeout(() => {
      $("front").classList.remove("tarjetaFocus");
    }, 1500);
  };

  const focus = () => {
    const active = document.activeElement.id;

    const addClass = (css) => {
      return document.activeElement.parentNode.classList.add(`${css}`);
    };

    const removeClass = (id, css) => {
      return $(`${id}`).parentNode.classList.remove(`${css}`);
    };

    if (active === "resetPassword") {
      addClass("activeFocus");
    } else {
      removeClass("resetPassword", "activeFocus");
    }

    if (active === "traseraIzq") {
      removeClass("resetPassword", "activeFocus");
    }
  };

  const passwordRequest = (e) => {
    e.preventDefault();

    if (
      e.currentTarget.resetPassword.value === "" ||
      !e.currentTarget.resetPassword.value.includes("@") ||
      !e.currentTarget.resetPassword.value.includes(".com")
    ) {
      setError({
        exist: true,
        message: "Ingresa un correo valido",
      });
      return;
    }

    fetch("/api/user/request_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.currentTarget.resetPassword.value,
        uri: window.location.origin,
      }),
    })
      .then((data) => data.json())
      .then(({ message, error }) => {
        if (error) {
          setError({
            exist: true,
            message: error,
          });

          return;
        }

        setError({ exist: false, message: "" });

        setSuccess({
          exist: true,
          message: message,
        });
      });
  };

  return (
    <>
      <div
        className="backLeft formGroupSesion resetContainer"
        id="traseraIzq"
        onClick={() => {
          focus();
        }}
      >
        <div className="title row">
          <div className="buttonSesion buttonBack">
            <button
              className="iniciarSesion"
              onClick={() => {
                voltearIniciar();
              }}
            >
              <A href="#iniciarSesion" css="animationCircle" id="buttonBack">
                <Icono css="icon-arrow-left" />
              </A>
            </button>
          </div>
          <p className="col-xs-12">Restablecer la contraseña</p>
          <hr className="titleHr" />
        </div>
        <form onSubmit={passwordRequest}>
          <div className="row col-xs-12 containerInput">
            <label htmlFor="resetPassword" className="icoBackground col-xs-1">
              <Icono css="icon-mail" />
            </label>
            <input
              name="resetPassword"
              id="resetPassword"
              className="col-xs-9"
              type="email"
              placeholder="Correo electronico"
              onClick={() => {
                focus();
              }}
            />

            <button type="submit" className="col-xs-2 submitEmail">
              <span className="ico icon-send"></span>
            </button>
          </div>
          <p>
            Ingrese el correo con el que se registro, Y se Te enviará un enlace
            con el que podrá restablecer su contraseña.
          </p>
        </form>

        {success.exist && (
          <p
            style={{
              width: "100%",
              background: "green",
              borderRadius: 10,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {success.message}
          </p>
        )}

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
      </div>
    </>
  );
};
export default resetPassword;
