import React, { useEffect } from "react";
import Link from "next/link";

import Logo from "../../svg/Logo";

import Image from "next/image";
import Icono from "../../nano/Icono";
import A from "../../nano/A";
import $ from "../../nano/$";

const Header = () => {
  useEffect(() => {
    window.onscroll = () => {
      scrollHeader();
    };
  }, []);

  const scrollHeader = () => {
    let altura = $("headerDesktop").offsetTop + 2;

    if (window.pageYOffset > altura) {
      $("headerDesktop").classList.add("menuFixed");
    } else {
      $("headerDesktop").classList.remove("menuFixed");
    }
  };

  const contX = () => {
    try {
      if ($("dataUser").classList.contains("dataUserDisplay")) {
        $("dataUser").classList.remove("dataUserDisplay");
      }
    } catch (error) {}

    try {
      if ($("expandMore").classList.contains("expandMore")) {
        $("expandMore").classList.remove("expandMore");
      }

      if ($("expandMore2").classList.contains("expandMore")) {
        $("expandMore2").classList.remove("expandMore");
      }
    } catch (error) {}

    $("contX").classList.toggle("active");

    $("siderbarTablet").classList.toggle("left");
  };

  const showDataUser = () => {
    if ($("siderbarTablet").classList.contains("left")) {
      $("siderbarTablet").classList.remove("left");
    }

    if ($("contX").classList.contains("active")) {
      $("contX").classList.remove("active");
    }

    $("dataUser").classList.toggle("dataUserDisplay");
    $("expandMore").classList.toggle("expandMore");
    $("expandMore2").classList.toggle("expandMore");
  };

  return (
    <>
      <header className="row col-xs-12" id="headerDesktop">
        <div className="row containerHeader headerDesktop">
          <div className="col-xs-3  col-sm-2 center-xs">
            <A href="/">
              <div className="img">
                <Logo />
              </div>
            </A>
            {<div className="borderRight"></div>}
          </div>

          <div className="col-xs-9 col-sm-10 navegation">
            <nav>
              <ul className="link">
                <li>
                  <A href="/">
                    <Icono css="icon-home" />
                    Inicio
                  </A>
                </li>
                <li>
                  <A href="/">
                    <Icono css="icon-extension" />
                    Caracteristicas
                  </A>
                </li>
                <li>
                  <A href="/">
                    <Icono css="icon-local_grocery_store" />
                    Precios
                  </A>
                </li>
                <li>
                  <A href="/">
                    <Icono css="icon-contacts" />
                    contacto
                  </A>
                </li>

                <li className="login">
                  <A href="/" css="">
                    <Icono css="icon-user-circle" />
                    Login
                  </A>
                </li>
              </ul>
              
            </nav>
          </div>
        </div>
        <div className="row between-xs headerTablet">
          <div className="col-xs-2 left">
            <button
              className="cont_x menu2"
              id="contX"
              onClick={() => {
                contX();
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="col-xs-6 imgLogo">
            <A href="/">
              <Image
                src="/logo1.png"
                alt="Picture of the author"
                width={139}
                height={41}
              />
            </A>
          </div>
          <div className="col-xs-3 right">
            <div className="usuario">
              <ul>
                <li
                  className="img"
                  onClick={() => {
                    showDataUser();
                  }}
                >
                  <img width={100} height={100} src="" alt="user" />
                </li>
                <li
                  className="name"
                  onClick={() => {
                    showDataUser();
                  }}
                >
                  <p>{/* {user.nickname} */}</p>
                </li>
                <li
                  className="morePerfile"
                  onClick={() => {
                    showDataUser();
                  }}
                  id="expandMore2"
                >
                  <Icono css="icon-expand_more" />
                </li>
              </ul>
              <ul>
                <li
                  className="img"
                  onClick={() => {
                    showDataUser();
                  }}
                >
                  <img width={100} height={100} src="" alt="user" />
                </li>
                <li
                  className="name"
                  onClick={() => {
                    showDataUser();
                  }}
                >
                  <p>genarogg</p>
                </li>
                <li
                  className="morePerfile"
                  onClick={() => {
                    showDataUser();
                  }}
                  id="expandMore2"
                >
                  <Icono css="icon-expand_more" />
                </li>
              </ul>
            </div>
          </div>

          <nav className="siderbar" id="siderbarTablet">
            <ul className="link">
              <li>
                <Link href="/">
                  <a
                    onClick={() => {
                      contX();
                    }}
                  >
                    <Icono css="icon-home" />
                    Inicio
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    onClick={() => {
                      contX();
                    }}
                  >
                    <Icono css="icon-extension" />
                    Caracteristicas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    onClick={() => {
                      contX();
                    }}
                  >
                    <Icono css="icon-local_grocery_store" />
                    Precios
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    onClick={() => {
                      contX();
                    }}
                  >
                    <Icono css="icon-contacts" />
                    contacto
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="dataUser" id="dataUser">
          <nav>
            <ul>
              <li>
                <A href="/mi-perfil">
                  <Icono css="icon-user-circle" />
                  Mi Perfil
                </A>
              </li>
              <li>
                <button onClick="">
                  <A href="/">
                    <Icono css="icon-logout" />
                    Cerrar Sesión
                  </A>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
