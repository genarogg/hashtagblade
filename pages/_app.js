import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../graphql/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
