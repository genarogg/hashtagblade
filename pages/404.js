import React from "react";
import Head from "next/head";

const notFount = () => {
  return (
    <>
      <Head>
        <title> Error 404 | Tagblade</title>
        <link rel="stylesheet" href="/style/404.css" />
      </Head>

      <div className="body404">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="main" id="id404">
          <h1>404</h1>
          <p>
            It looks like you're lost...
            <br />
            That's a trouble?
          </p>
          <button
            type="button"
            onClick={() => {
              history.back();
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </>
  );
};

export default notFount;
