import React, { useState } from "react";
import Buttons from "./Buttons";
import Icono from "../nano/Icono";
import RedesLogin from "./RedesLogin";
import $ from "../nano/$";
import { useRouter } from "next/router";

const Login = () => {
  const [check, setCheck] = useState(false);
  const [error, setError] = useState({ exist: false, message: "" });
  const router = useRouter();

  const voltearRecuperar = () => {
    const tarjetas = $("containerRegisterLogin");

    if (!tarjetas.classList.contains("activeLeft")) {
      tarjetas.classList.add("activeLeft");
      $("buttonBack").classList.add("active");
    }

    $("traseraIzq").classList.add("tarjetaFocus");

    setTimeout(() => {
      $("traseraIzq").classList.remove("tarjetaFocus");
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

    if (active === "loginCorreo") {
      addClass("activeFocus");
    } else {
      removeClass("loginCorreo", "activeFocus");
    }

    if (active === "loginPassword") {
      addClass("activeFocus");
    } else {
      removeClass("loginPassword", "activeFocus");
    }
  };

  const remerberme = () => {
    $("checkRemember").classList.toggle("active");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { loginCorreo, loginPassword } = e.currentTarget;

    if (loginCorreo.value === "" || loginPassword.value === "") {
      setError({
        exist: true,
        message: "Completa todos los campos",
      });
      return;
    }

    if (
      !loginCorreo.value.includes("@") ||
      !loginCorreo.value.includes(".com")
    ) {
      setError({
        exist: true,
        message: "Ingresa un correo valido",
      });
      return;
    }

    if (loginPassword.value.length < 4) {
      setError({
        exist: true,
        message: "Ingresa una contraseña valida",
      });
      return;
    }

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginCorreo.value,
        password: loginPassword.value,
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

        if (!check) {
          sessionStorage.setItem("token", `Bearer ${token}`);
          router.reload();
          return;
        }

        localStorage.setItem("token", `Bearer ${token}`);
        router.reload();
      });
  };

  return (
    <div
      className="front formGroupSesion col-xs-5"
      id="front"
      onClick={() => {
        focus();
      }}
    >
      <Buttons />
      <form className="row" onSubmit={handleSubmit}>
        <div className="row col-xs-12 containerInput">
          <label htmlFor="loginCorreo" className="icoBackground col-xs-1">
            <span className="ico icon-mail"></span>
          </label>
          <input
            name="loginCorreo"
            id="loginCorreo"
            className="col-xs-11"
            type="email"
            placeholder="Correo electrónico"
            autoComplete="off"
            onClick={() => {
              focus();
            }}
          />
        </div>
        <br />

        <div className="row col-xs-12 containerInput">
          <label htmlFor="loginPassword" className="icoBackground col-xs-1">
            <span className="ico icon-https"></span>
          </label>
          <input
            name="loginPassword"
            id="loginPassword"
            className="col-xs-11"
            type="password"
            placeholder="Contraseña"
            onClick={() => {
              focus();
            }}
          />
        </div>
        <br />

        <RedesLogin />

        <div
          className="row col-xs-12 checkBoxContainer"
          onClick={() => {
            setCheck(!check);
            remerberme();
          }}
        >
          <Icono css="icon-check_circle_outline" id="checkRemember" />
          <label htmlFor="checkRemember" id="checkRememberLabel">
            <p>Mantener sesion</p>
          </label>
        </div>
        <br />

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

        <br />
        <div className="buttonContainer col-xs-12">
          <button
            className="login submit"
            name="loginButton"
            id="loginButton"
            type="submit"
            value="send"
          >
            Acceder
          </button>
        </div>
        <br />
        <div className="forgotPasswordContainer col-xs-12">
          <button
            type="button"
            className="registrarse link"
            onClick={() => {
              voltearRecuperar();
            }}
            style={{ cursor: "pointer" }}
          >
            <a>¿Olvidaste tu contraseña?</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
