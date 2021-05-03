import Layout from "../components/general/home/Layout";
import SelectCountry from "../components/forms/SelectCountry";
import SelectSex from "../components/forms/SelectSex";
import Icono from "../components/nano/Icono";
import A from "../components/nano/A";
import $ from "../components/nano/$";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Social = () => {
  const [token, setToken] = useState(null);
  const [load, setLoad] = useState(false);
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

  const verifySocial = () => {
    if (router.query.token) {
      fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              verifySocial(token: "${router.query.token}")
            }
          `,
        }),
      })
        .then((data) => data.json())
        .then(({ data, errors }) => {
          if (errors) {
            if (errors[0].message === "Invalid token") {
              router.push("/");
              return;
            }
            console.log(errors);
            setLoad(true);
            return;
          }

          localStorage.setItem("token", `Bearer ${data.verifySocial}`);
          router.push("/");
        });
    }
  };

  const registerWithSocial = (e) => {
    e.preventDefault();
    const { registerUserName, registerUserSurName, userData } = e.currentTarget;

    if (
      registerUserName.value === "" ||
      registerUserSurName.value === "" ||
      userData === "" ||
      !country ||
      !sex
    ) {
      setError({
        exist: true,
        message: "Completa todos los campos",
      });
    }

    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation{
            registerWithSocial(input: {
              token: "${router.query.token}"
              first_name: "${registerUserName.value}"
              last_name: "${registerUserSurName.value}"
              birthdate: "${userData.value}"
              country: "${country}"
              gender: "${sex}"
            })
          }
        `,
      }),
    })
      .then((data) => data.json())
      .then(({ data, errors }) => {
        if (errors) {
          setError({
            exist: true,
            message: errors[0].message,
          });

          return;
        }

        localStorage.setItem("token", `Bearer ${data.registerWithSocial}`);
        router.push("/");
      });
  };

  useEffect(() => {
    if (localStorage.token || sessionStorage.token) {
      router.push("/");
    } else {
      verifySocial();
    }
  }, [router.query]);

  const changeSex = (sex) => {
    setSex(sex);
  };

  const changeCountry = (country) => {
    setCountry(country);
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
              <form className="row" onSubmit={registerWithSocial}>
                <br />
                {/* Input del Primer nombre */}
                <div className="row col-xs-12 containerInput">
                  <label
                    htmlFor="registerUserName"
                    className="icoBackground col-xs-1"
                  >
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
                      /* focus(); */
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
                      /* focus(); */
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
                      /* focus(); */
                    }}
                  />
                </div>
                <br />

                {/* Input de country */}
                <SelectCountry setCountry={changeCountry} />

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
