import React from "react";


const Footer = () => {
  const text = [<p>© 2021 Tagblade.com | Todos los derechos reservados.</p>];
  return (
    <>
      <footer className="row  col-xs-12">
        <div className="containerFooter">
          <div className="col-xs-12 center-xs derechos">
            {text[0]}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
