import React, { useEffect, useState } from "react";
/* import { useQuery, gql } from "@apollo/client"; */
import Layout from "../components/general/home/Layout";
import Index from "../components/views/home";

/* const QUERY = gql`
  query {
    hello
  }
`; */

const Home = () => {
  /* const { loading, error, data } = useQuery(QUERY); */

  /*  if (data) {
    console.log(data);
  } */

  return (
    <Layout>
      <Index />
    </Layout>
  );
};

export default Home;
