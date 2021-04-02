import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query {
    hello
  }
`;

const Home = (props) => {
  const { loading, error, data } = useQuery(QUERY);

  if (data) {
    console.log(data);
  }

  return <h1>Hello World</h1>;
};

export default Home;
