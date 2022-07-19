import { createSlice, PayloadAction,current  } from "@reduxjs/toolkit";
import { Task } from "../../interfaces/ITask";

/**
 * En este Reducer se pueden observar los siguentes detalles:
 * createSlice: permite escribir código inmutable el cual nos permite aplicar cambios en el state.
 * getTask: utilidad para acceder de manera fácil al valor del state.
 * getTaskSize: utilidad para acceder de manera fácil al valor del state.
 */

const initialState = {
    task: new Array<Task>
};


const Task = createSlice({
    name:"task",
    initialState: initialState,
    reducers: {
        setTask(state: any,  {payload }: PayloadAction<Task>){
            state.task.push(payload);
        },
        updateTask(state: any, {payload }: PayloadAction<Task>){
            current(state.task)
            const items = state.task.map((item:Task) => {
                if(item.id == payload.id){
                    return payload
                }else{
                    return item
                }
            });
            state.task = items
        },
        deleteTask(state:any, {payload}: PayloadAction<number>){
            current(state.task)
            const index = state.task.findIndex((item:Task) => item.id == payload);
            state.task.splice(index,1);
        }
    }
})

export const { actions, reducer } = Task;
export const getTask = (state: any) => state.task.task;
export const getTaskSize = (state: any) => state.task.task.length;