import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, getTaskSize } from "../store/reducers/Task";
import { actions as itemActions } from "../store/reducers/Item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Task as ITask, TaskType } from "../interfaces/ITask";
import { getItem } from "../store/reducers/Item";
import { RadioGroup } from "@headlessui/react";
import moment from "moment";
import CustomCard, { PropsHOC } from "../hoc/Card";

/**
 * Función que despliega el formulario con los diferentes campos para el llenado de una tarea.
 * @returns
 */
export const Form = () => {
  const dispatch = useDispatch();
  const reduxTaskSize: number = useSelector(getTaskSize);
  const reduxItem: ITask = useSelector(getItem);
  const [time, setTime] = useState(30);

  /**
   * Se declaro un objeto de tipo yup, este objeto nos permitirá generar un esquema para validación del formulario y controlar mejor los
   * datos de entrada a la aplicación.
   */
  const taskSchema = yup.object({
    name: yup.string().required("Task name required"),
    detail: yup.string().required("Task description required"),
    min: yup.number().nullable(true),
    sec: yup.number().nullable(true),
  });

  /**
   * Se creo un objeto vacío para inicializar el formulario con datos controlados.
   */
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    detail: "",
    duration: 0,
    active: false,
    time: 0,
    durationTask: null,
    estatus: TaskType.new,
    min: 0,
    seg: 0,
  });

  /**
   * Se registran los listeners que se pueden generar en el formulario yup como:
   * 1.- Registro de inputs con valores
   * 2.- Manejo del formulario al momento de realizar el submit.
   * 3.- Agregar errores personalizados.
   * 4.- Reiniciar el formulario
   */
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ITask>({ resolver: yupResolver(taskSchema) });

  /**
   * Este hook permite limpiar o llenar el formulario en dependiendo del la tarea seleccionada.
   */
  useEffect(() => {
    if (reduxItem.id == 0) {
      reset(formData);
    } else {
      reset(reduxItem);
      setTime(reduxItem.duration);
    }
  }, [reduxItem]);

  /**
   * Este hook permite crear o actualizar una tarea dentro del Redux, dependiendo si el id de la tarea es 0, una vez almacenada en el state
   * la tarea el formulario volverá al estado inicial.
   */
  const submitEvent = (data: ITask) => {
    if (validCustomTime(data)) {
      if (reduxItem.id != 0) {
        data.duration = getTime(data);
        dispatch(actions.updateTask(data));
        resetForm();
      } else {
        saveTask(data);
        resetForm();
      }
    } else {
      console.log("Tiemp exedido");
    }
  };

  /**
   * Función para guardar una tarea.
   * @param data
   */
  const saveTask = (data: ITask) => {
    const date = new Date();
    data.id = reduxTaskSize == 0 ? 1 : reduxTaskSize + 1;
    data.duration = getTime(data);
    data.active = false;
    data.createDate = date.toLocaleDateString();
    data.estatus = TaskType.new;
    dispatch(actions.setTask(data));
  };

  /**
   * Función para reiniciar el formulario y liberar el ítem den el state del Redux.
   */
  const resetForm = () => {
    reset(formData);
    dispatch(itemActions.resetForm());
    setTime(30);
  };

  /**
   * Función para obtener la duración en milisegundos.
   * @param data
   * @returns
   */
  const getTime = (data: ITask): number => {
    const totalTime: number =
      (data.min ? data.min : 0) + (data.seg ? data.seg : 0);
    if (totalTime == 0) {
      return moment.duration(time, "minutes").asMilliseconds();
    } else {
      return moment
        .duration(data.min, "minutes")
        .add(data.seg, "seconds")
        .asMilliseconds();
    }
  };

  /**
   * Función para validar que la duración personalizada no sobrepase las 2 horas.
   * @param data
   * @returns
   */
  const validCustomTime = (data: ITask): boolean => {
    let totalTime: number = 0;
    totalTime += data.min ? parseInt(data.min.toString()) : 0;
    totalTime += data.seg ? parseFloat("." + data.seg.toString()) : 0;
    if (totalTime >= 0 && totalTime <= 120) {
      return true;
    }
    setError("min", { message: "Maximum duration is 2 hours" });
    return false;
  };

  return (
    <form onSubmit={handleSubmit(submitEvent)}>
      <h3 className="font-bold mb-1 uppercase">Add task</h3>
      <div className="mb-2">
        <input
          {...register("name")}
          className={
            !errors.name?.message
              ? "appearance-none border border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              : "appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          type="text"
          placeholder="Task name"
        />
        <label className="text-red-500 text-sm"> {errors.name?.message}</label>
      </div>
      <div className="mb-2">
        <textarea
          {...register("detail")}
          placeholder="Description"
          rows={2}
          className={
            !errors.detail?.message
              ? "appearance-none border border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              : "appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
        ></textarea>
        <label className="text-red-500 text-sm">
          {" "}
          {errors.detail?.message}
        </label>
      </div>
      <div className="mb-2">
        <RadioGroup value={time} onChange={setTime}>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <RadioGroup.Option
                value={30}
                className={({ checked, active }) => `
                ${
                  checked
                    ? "text-center border rounded-md p-1 bg-appBlue-dark border-white text-white font-bold "
                    : "text-center border rounded-md p-1 bg-gray-100 border-gray-400 cursor-pointer"
                }
                `}
              >
                {({ checked }) => <span>30 min</span>}
              </RadioGroup.Option>
            </div>
            <div className="col-span-4">
              <RadioGroup.Option
                value={45}
                className={({ checked, active }) => `
                ${
                  checked
                    ? "text-center border rounded-md p-1 bg-appBlue-dark border-white text-white font-bold "
                    : "text-center border rounded-md p-1 bg-gray-100 border-gray-400 cursor-pointer"
                }
                `}
              >
                {({ checked }) => <span>45 min</span>}
              </RadioGroup.Option>
            </div>
            <div className="col-span-4">
              <RadioGroup.Option
                value={60}
                className={({ checked, active }) => `
                ${
                  checked
                    ? "text-center border rounded-md p-1 bg-appBlue-dark border-white text-white font-bold "
                    : "text-center border rounded-md p-1 bg-gray-100 border-gray-400 cursor-pointer"
                }
                `}
              >
                {({ checked }) => <span>60 min</span>}
              </RadioGroup.Option>
            </div>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <hr />
            <label className="text-sm font-bold">Custom time (min, seg)</label>
          </div>
          <div className="col-span-1">
            <input
              {...register("min")}
              className={
                !errors.min?.message
                  ? "appearance-none border border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              type="text"
              placeholder="Minutes"
            />
          </div>
          <div className="col-span-1">
            <input
              {...register("seg")}
              className={
                !errors.min?.message
                  ? "appearance-none border border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              type="text"
              placeholder="Seconds"
            />
          </div>
          <div className="col-span-2">
            <span className="text-red-500">{errors.min?.message}</span>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-4">
        {reduxItem.id == 0 ? (
          <button className="bg-appBlue text-white w-full p-1 rounded-full font-semibold uppercase hover:bg-blue-400">
            Save
          </button>
        ) : (
          <div className="relative flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-300 text-black w-full p-1 m-0.5 rounded-full font-semibold uppercase hover:bg-gray-400"
              onClick={(e) => resetForm()}
            >
              Cancel
            </button>
            <button className="bg-green-500 text-white w-full p-1 m-0.5 rounded-full font-semibold uppercase hover:bg-green-400">
              Update
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

/**
 * PropsHoc proporciona los parámetros para personalizar el nuevo componente que devolverá por orden de prioridad.
 */
const props: PropsHOC = {
  styleGrid: "col-span-12 md:col-span-6 lg:col-span-3",
  styleCard: "shadow-lg md:rounded-lg px-3 pt-4 pb-4 mb-4 bg-blue-200",
};

/**
 * Se manda llamar el componente CustomCard para que devuelva el nuevo componente personalizado
 */
export default CustomCard(Form, props);
