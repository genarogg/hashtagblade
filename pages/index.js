import React from "react";
import Layout from "../components/general/home/Layout";
import Index from "../components/views/home";
import IndexDashboard from "../components/views/dashboard/IndexDashboard";


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
    <>
      {/* <Layout>
        <Index />
      </Layout> */}
      <IndexDashboard />
    </>
  );
};

export default Home;
