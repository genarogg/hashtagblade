import React from "react";
import Icono from "../../nano/Icono";

const SearchHashtag = () => {
  return (
    <>
      <div className="searchHashtag">
        <input type="text" placeholder="buscar hashtag" />
        <label htmlFor="">
          <Icono css="icon-search" />
        </label>
      </div>
    </>
  );
};

export default SearchHashtag;
