import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * En este Reducer se pueden observar los siguentes detalles:
 * createSlice: permite escribir código inmutable el cual nos permite aplicar cambios en el state.
 * getSelectedMenu: utilidad para acceder de manera fácil al valor del state.
 */

const Item = createSlice({
  name: "menu",
  initialState: "/",
  reducers: {
    setMenu(state: string, { payload }: PayloadAction<string>) {
      return payload;
    },
  },
});

export const { actions, reducer } = Item;
export const getSelectedMenu = (state: any) => state.menu;
