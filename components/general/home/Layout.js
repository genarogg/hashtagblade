import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <div className="containerAll">
        <Header />
        {props.children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
