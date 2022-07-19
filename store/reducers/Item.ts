import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task as ITask, TaskType } from "../../interfaces/ITask";

/**
 * En este Reducer se pueden observar los siguentes detalles:
 * createSlice: permite escribir código inmutable el cual nos permite aplicar cambios en el state.
 * getItem: utilidad para acceder de manera fácil al valor del state.
 */

const initialState: ITask = {
  id: 0,
  name: "",
  detail: "",
  duration: 0,
  active: false,
  time: 0,
  durationTask: null,
  estatus: TaskType.new,
  createDate: null,
  endDate: null,
  min: null,
  seg: null,
};

const Item = createSlice({
  name: "item",
  initialState: initialState,
  reducers: {
    setItem(state: ITask, { payload }: PayloadAction<ITask>) {
      state.id = payload.id;
      state.name = payload.name;
      state.detail = payload.detail;
      state.duration = payload.duration;
      state.active = payload.active;
      state.time = payload.time;
      state.durationTask = payload.durationTask;
      state.estatus = payload.estatus;
      state.createDate = payload.createDate;
      state.endDate = payload.endDate;
      state.min = payload.min;
      state.seg = payload.seg;
    },
    resetForm(state: ITask) {
      state.id = 0;
      state.name = "";
      state.detail = "";
      state.duration = 0;
      state.active = false;
      state.time = 0;
      state.durationTask = null;
      state.estatus = TaskType.new;
      state.createDate = null;
      state.endDate = null;
      state.min = null;
      state.seg = null;
    },
  },
});

export const { actions, reducer } = Item;
export const getItem = (state: any) => state.item;
