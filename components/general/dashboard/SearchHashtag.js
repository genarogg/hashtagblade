import React from "react";
import Icono from "../../nano/Icono"; /* 
import handler from "../../../pages/api/hashtag/test" */
import data from "../../../data/dashboard/fakeDataTAG";
import $ from "../../nano/$";

const SearchHashtag = () => {
  const datos = data();

  const filter = async () => {
    let filtrado;
    let texto = $("inputTagFilter").value.toLowerCase();
    let arregloNew = [];
    let contNew = 0;
    const length1 = datos.length;

    for (let i = 0; i < length1; i++) {
      let nombre = datos[i].toLowerCase();
      filtrado = nombre.indexOf(texto) !== -1;

      if (filtrado) {
        arregloNew[contNew++] = nombre;
      }
    }

    console.log("Respuestas");
    console.log(filtrado);
    console.log(arregloNew);

    if (true) {
      $("filterUl").innerHTML = arregloNew.map((e) => {
        return `<li>${e}</li>`;
      });
    }

    const hola2 = fetch("/api/hashtag/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hashtags: ["hola", "adios", "love", "tag", "json"],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    console.log(hola2);
  };

  return (
    <>
      <div className="searchHashtag">
        <input
          type="text"
          id="inputTagFilter"
          placeholder="buscar hashtag"
          onChange={() => {
            filter();
          }}
        />
        <label htmlFor="">
          <Icono css="icon-search" />
        </label>
        <ul className="filterUl" id="filterUl"></ul>
      </div>
    </>
  );
};

export default SearchHashtag;
