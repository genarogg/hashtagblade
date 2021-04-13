import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../graphql/client";
import Head from "next/head";

import "../styles/lib/librerias.css";
import "../styles/lib/icons/style.css";
import "../styles/globals/globals.css";
import "../styles/form/formRegisterLongi.css";
import "../styles/form/loginRedes.css";
import "../styles/home/CardPrecios.css";
import "../styles/home/caracteristicas.css";

import "../styles/home/home.css";

import data from "../data/home";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Tagblade</title>
        <meta name="description" content={data().descripcion} />
        <meta name="keywords" content="TagBlade, instagram filter" />
        <link
          rel="shortcut icon"
          href="./general/favicon.png"
          type="image/x-icon"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
