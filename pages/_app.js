import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../graphql/client";

import "../styles/lib/librerias.css"
import "../styles/lib/icons/style.css"
import "../styles/globals/globals.css"
import "../styles/form/formRegisterLongi.css"
import "../styles/form/loginRedes.css"
import "../styles/home/homeLogin.css"

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
