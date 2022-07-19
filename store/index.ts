import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as taskReducer } from "./reducers/Task";
import { reducer as itemReducer } from "./reducers/Item";
import { reducer as menuReducer } from "./reducers/Menu";
import { reducer as filterReducer } from "./reducers/Filter";
import { loadState } from "../util/LocalStorage";
import logger from "redux-logger";

/**
 * Se definió el uso de Redux tooltik ya que permite crear y administrar el estado del Redux de una manera
 * mas sencilla y efectiva, también ayuda a no generar código repetitivo en los reducers.
 *
 * configureStore: proporciona soporte automático para un redux, devtools y un middleware predeterminado, de esta manera
 * es mas sencillo la administración del State de Redux.
 */

const rootReducer = combineReducers({
  task: taskReducer,
  item: itemReducer,
  menu: menuReducer,
  filter: filterReducer,
});

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
