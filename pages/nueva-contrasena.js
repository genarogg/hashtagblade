import Layout from "../components/general/home/Layout";
import SelectCountry from "../components/forms/SelectCountry";
import SelectSex from "../components/forms/SelectSex";
import Icono from "../components/nano/Icono";
import A from "../components/nano/A";
import $ from "../components/nano/$";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const Social = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({ exist: false, message: "" });
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const ref = useRef();

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

  useEffect(() => {
    if (router.query.token) {
      setLoad(true);
    }
  }, [router.query]);

  const newPassword = (e) => {
    e.preventDefault();

    const { newPassword, newPasswordConfirm } = e.currentTarget;

    if (newPassword.value.length < 8) {
      setError({
        exist: true,
        message: "La contraseña debe ser de al menos 8 caracteres",
      });
      return;
    }

    if (newPasswordConfirm.value !== newPassword.value) {
      setError({
        exist: true,
        message: "Las contraseñas son distintas",
      });
      return;
    }

    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation{
            updatePassword(input: {
              token: "${router.query.token}"
              password: "${newPassword.value}"
            })
          }
        `,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (!data.errors) {
          setSuccess(true);
          ref.current.style.display = "none";
        } else {
          setError({
            exist: true,
            message: data.errors[0].message,
          });
        }
      });
  };

  return (
    <Layout>
      <main>
        <div className="backgroundHome"></div>
        <div className="backgroundLigth"></div>
        <div className="welcome row col-xs-12 col-sm-6  col-lg-4 center-xs">
          {!load && (
            <div className="loading_screen">
              <img src="/loading-process.png" />
            </div>
          )}
          {load && (
            <div
              className="backRight formGroupSesion col-xs-5 "
              id="traseraDerecha"
              onClick={() => {
                /* focus(); */
              }}
              style={{
                maxHeight: "inherit",
              }}
            >
              <form className="row" onSubmit={newPassword}>
                <h2
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Nueva Contraseña
                </h2>
                <br />
                <br />
                {/* Input de password */}
                <div className="row col-xs-12 containerInput">
                  <label
                    htmlFor="newPassword"
                    className="icoBackground col-xs-1"
                  >
                    <span className="ico icon-https"></span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Contraseña"
                    className="col-xs-11"
                  />
                </div>
                <br />
                {/* Input de password 2 */}
                <div className="row col-xs-12 containerInput">
                  <label
                    htmlFor="newPasswordConfirm"
                    className="icoBackground col-xs-1"
                  >
                    <span className="ico icon-enhanced_encryption"></span>
                  </label>
                  <input
                    type="password"
                    name="newPasswordConfirm"
                    id="newPasswordConfirm"
                    placeholder="Confirmar contraseña"
                    className="col-xs-11"
                  />
                </div>
                <br />

                {success && (
                  <p
                    style={{
                      width: "100%",
                      background: "green",
                      borderRadius: 10,
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    Contraseña cambiada ve al{" "}
                    <Link href="/">
                      <a
                        style={{
                          color: "#fff",
                        }}
                      >
                        Home
                      </a>
                    </Link>{" "}
                    a loguearte
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
                <div ref={ref} className="containerRegister">
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
                  <A href={"/terminos-y-condiciones"}>Términos y condiciones</A>
                  , y la
                  <A href="/politica-de-privacidad-y-protección-de-datos">
                    Política de privacidad y protección de datos
                  </A>
                  de TagBlade.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Social;
