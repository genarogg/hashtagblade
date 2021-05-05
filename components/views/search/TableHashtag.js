import React from "react";
import $ from "../../nano/$";

const tableHashtag = () => {
  const check = () => {
    $("checkInterno").classList.toggle("display");

    const checkInterno = document.querySelectorAll(
      ".tablaHash .datoTabla .checkInterno"
    );

    const log = checkInterno.length;

    if (!$("checkInterno").classList.contains("display")) {
      for (let i = 0; i < log; i++) {
        $(checkInterno[i].id).classList.remove("display");
      }
    }

    if ($("checkInterno").classList.contains("display")) {
      for (let i = 0; i < log; i++) {
        $(checkInterno[i].id).classList.add("display");
      }
    }
  };

  return (
    <>
      <div className="tituloDato border col-xs-12 row">
        <div className="name col-xs-3">
          <buttom
            className="checkExterno centerXY"
            onClick={() => {
              check();
            }}
            id="checkExterno"
          >
            <div className="checkInterno" id="checkInterno"></div>
          </buttom>
          <p>Hashtag</p>
        </div>
        <div className="col-xs-2 competitionScore">
          <p>Competition Score</p>
        </div>
        <div className="col-xs-2 potentialReach">
          <p>Potential Reach</p>
        </div>
        <div className="col-xs-1 dapc">
          <p>DAPC</p>
        </div>
        <div className="col-xs-1 likes">
          <p>Ave. Likes</p>
        </div>
        <div className="col-xs-1 posts">
          <p>Posts made</p>
        </div>
        <div className="col-xs-2 Comments">
          <p>Ave. Comment</p>
        </div>
      </div>
    </>
  );
};

export default tableHashtag;
