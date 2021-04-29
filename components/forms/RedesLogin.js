import React from "react";
import A from "../nano/A";
import Icono from "../nano/Icono";

const RedesLogin = () => {
  return (
    <div className="redesSocialesAnimadas">
      <ul>
        <li>
          <button type="button">
            <A href="#">
              <Icono css="icon-google googleHover" />
              <span></span>
            </A>
          </button>
        </li>
        <li>
          <button type="button">
            <A href="#">
              <Icono css="icon-facebook facebookHover" />
              <span></span>
            </A>
          </button>
        </li>
        <li>
          <button type="button">
            <A href="#">
              <Icono css="icon-twitter twitterHover" />
              <span></span>
            </A>
          </button>
        </li>
        <li>
          <button type="button">
            <A href="#">
              <Icono css="icon-github githubHover" />
              <span></span>
            </A>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RedesLogin;
