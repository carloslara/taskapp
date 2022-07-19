import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFilter } from "../../interfaces/EFilter";

/**
 * En este Reducer se pueden observar los siguentes detalles:
 * createSlice: permite escribir código inmutable el cual nos permite aplicar cambios en el state.
 * getSelectedFilter: utilidad para acceder de manera fácil al valor del state.
 */
const Item = createSlice({
  name: "filter",
  initialState: EFilter.clear,
  reducers: {
    setFilter(state: EFilter, { payload }: PayloadAction<EFilter>) {
      return payload;
    },
  },
});

export const { actions, reducer } = Item;
export const getSelectedFilter = (state: any) => state.filter;
