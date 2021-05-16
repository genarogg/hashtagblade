import React from "react";
import Layout from "../components/general/home/Layout";
import Index from "../components/views/home";
import IndexDashboard from "../components/views/dashboard/IndexDashboard";
import IndexSearch from "../components/views/search/IndexSearch";
import IndexCollection from "../components/views/collectiones/indexCollection";
import data from "../data/dashboard/generadorFakeData";
import $, { $alternalClass } from "../components/nano/$";

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
  /*  console.log(data()); */
  return (
    <>
      {/*  <Layout>
        <Index />
      </Layout> */}
      {/* <IndexDashboard /> */}

      <button
        onClick={() => {
          $alternalClass("likes", "holad2", "hodla");
        }}
      >
        Mostrar/ocultar
      </button>
      <IndexSearch />
      {/* <IndexCollection /> */}
    </>
  );
};

export default Home;
