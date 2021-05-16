import React from "react";

const Filtro = () => {
  return (
    <>
      {<div className="select">
        <select name="slct" id="slct">
          <option defaultValue="null">
            Choose an option
          </option>
          <option value="1">#Hola</option>
          <option value="2">#hola2</option>
          <option value="3">#hola3</option>
        </select>
      </div>}
    </>
  );
};

export default Filtro;
