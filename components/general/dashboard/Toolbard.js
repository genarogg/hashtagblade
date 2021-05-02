import React from "react";
import Icono from "../../nano/Icono";
import A from "../../nano/A";
import Image from "next/image";

const Toolbard = () => {
  return (
    <nav className="containerTollbard">
      <ul className="toolbard row">
        <li>
          <buttom>
            <A href="/">
              <Image src="/general/logo-tagBlade.png" width={20} height={20} />
            </A>
          </buttom>
        </li>
        <li>
          <A href="/">
            <Icono css="icon-bolt" />
          </A>
        </li>
        <li>
          <A href="/">
            <Icono css="icon-bolt" />
          </A>
        </li>
        <li>
          <A href="/">
            <Icono css="icon-bolt" />
          </A>
        </li>
        <li>
          <A href="/">
            <Icono css="icon-bolt" />
          </A>
        </li>
        <li>
          <A href="/">
            <Icono css="icon-bolt" />
          </A>
        </li>
      </ul>
    </nav>
  );
};

export default Toolbard;
