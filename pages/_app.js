import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../graphql/client";
import paypal from "paypal-rest-sdk";

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
