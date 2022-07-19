import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { debounce } from "debounce";
import { saveState } from "../util/LocalStorage";
import dynamic from "next/dynamic";

import "../styles/index.css";

/**
 * En este archivo se integra la configuración inicial de la aplicación, en esta sección podemos ver
 * 1.- Se inicia el almacenamiento de Redux
 * 2.- La hidratación de Redux por medio de el almacenamiento local
 * 3.- La librería debounce para programar el comportamiento de guardado del Storage(Redux) en local.
 */

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

const ClientComponent = dynamic(
  () => import("../node_modules/apexcharts/dist/apexcharts.common.js"),
  {
    // Do not import in server side
    ssr: false,
  }
);

function AppTask({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default AppTask;
