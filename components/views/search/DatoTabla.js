import React from "react";
import $ from "../../nano/$";
import Icono from "../../nano/Icono";
import Image from "next/image";

const DatoTabla = ({
  name,
  id,
  hashtag,
  likes,
  views,
  img,
  dapc,
  postsMade,
  comments,
  isVideo,
  ownerId,
}) => {
  const check = () => {
    $(id).classList.toggle("display");

    /*  */

    const checkInterno = document.querySelectorAll(
      ".tablaHash .datoTabla .checkInterno"
    );

    const numeroCheckInterno = document.querySelectorAll(
      ".tablaHash .datoTabla .display"
    );

    const log = checkInterno.length;
    const log2 = numeroCheckInterno.length;

    for (let i = 0; i < log; i++) {
      let booleano = $(checkInterno[i].id).classList.contains("display");

      if (!booleano) {
        $("checkInterno").classList.remove("display");
      }

      if (log === log2) {
        $("checkInterno").classList.add("display");
      }
    }
  };

  const displayImg = () => {
    $(id + "2").classList.toggle("display");
  };

  return (
    <>
      <div className="row datoTabla col-xs-12">
        <div className="tituloDato col-xs-12 row">
          <div className="dato-name col-xs-3 row">
            <div className="col-xs-1">
              <buttom
                className="checkExterno centerXY"
                onClick={() => {
                  check();
                }}
                id="checkExterno"
              >
                <div className="checkInterno" id={id}></div>
              </buttom>
            </div>
            <div className="col-xs-7">
              {/* <p>{hashtag}</p> */}
            </div>
            <div className="col-xs-3 row">
              <div className="col-xs-6">
                <button>
                  <Icono css="icon-search" />
                </button>
              </div>
              <div className="col-xs-6 containerImgModal">
                <button
                  onClick={() => {
                    displayImg();
                  }}
                >
                  <span className="puntos">...</span>
                </button>
                <div className="modalImg row" id={id + "2"}>
                  <div className="img col-xs-4">
                    <Image src={img} width={80} height={80} />
                  </div> 
                  <div className="img col-xs-4">
                    <Image src={img} width={80} height={80} />
                  </div> 
                  <div className="img col-xs-4">
                    <Image src={img} width={80} height={80} />
                  </div> 
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-2 dato-competitionScore">
            <div className="canvas">
              <div className="porcentajeCanvas"></div>
            </div>
          </div>
          <div className="col-xs-2 dato-potentialReach">
            <div className="canvas">
              <div className="porcentajeCanvas"></div>
            </div>
          </div>
          <div className="col-xs-1 dato-dapc">
            <p>{dapc}</p>
          </div>
          <div className="col-xs-1 dato-likes">
            <p>{likes}</p>
          </div>
          <div className="col-xs-1 dato-posts">
            <p>{postsMade}</p>
          </div>
          <div className="col-xs-2 dato-Comments">
            <p>{comments}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatoTabla;
